const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');
const Transaction = require('./models/Transaction');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/personal_finance_tracker';

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

const toMonthKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const buildDateRange = (from, to) => {
  if (!from && !to) {
    return null;
  }

  const range = {};
  if (from) {
    range.$gte = new Date(from);
  }
  if (to) {
    range.$lte = new Date(to);
  }
  return range;
};

app.get('/api/dashboard', async (req, res) => {
  try {
    const totals = await Transaction.aggregate([
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
        },
      },
    ]);

    const totalIncome = totals.find((entry) => entry._id === 'income')?.total || 0;
    const totalExpenses = totals.find((entry) => entry._id === 'expense')?.total || 0;

    res.json({ totalIncome, totalExpenses });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load dashboard totals.' });
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const { from, to, type, category } = req.query;
    const limit = Number.parseInt(req.query.limit, 10) || 50;
    const query = {};

    const dateRange = buildDateRange(from, to);
    if (dateRange) {
      query.date = dateRange;
    }
    if (type) {
      query.type = type;
    }
    if (category) {
      query.category = category;
    }

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .limit(limit);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load transactions.' });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const { type, amount, category, date, note } = req.body;
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'Type must be income or expense.' });
    }
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero.' });
    }
    if (!category || !date) {
      return res.status(400).json({ message: 'Category and date are required.' });
    }

    const transaction = await Transaction.create({
      type,
      amount: Number(amount),
      category: category.trim(),
      date: new Date(date),
      note: note ? note.trim() : '',
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Unable to save transaction.' });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, category, date, note } = req.body;

    const updated = await Transaction.findByIdAndUpdate(
      id,
      {
        type,
        amount: Number(amount),
        category,
        date,
        note: note || '',
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update transaction.' });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    const removed = await Transaction.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }
    res.json({ message: 'Transaction deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete transaction.' });
  }
});

app.get('/api/analytics/monthly', async (req, res) => {
  try {
    const months = Number.parseInt(req.query.months, 10) || 6;
    const start = new Date();
    start.setDate(1);
    start.setMonth(start.getMonth() - (months - 1));
    start.setHours(0, 0, 0, 0);

    const rows = await Transaction.aggregate([
      { $match: { date: { $gte: start } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m', date: '$date' },
          },
          income: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
            },
          },
          expenses: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const rowMap = new Map(rows.map((row) => [row._id, row]));
    const series = [];
    const cursor = new Date(start);
    for (let i = 0; i < months; i += 1) {
      const key = toMonthKey(cursor);
      const match = rowMap.get(key);
      series.push({
        month: key,
        income: match?.income || 0,
        expenses: match?.expenses || 0,
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }

    res.json(series);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load monthly analytics.' });
  }
});

app.get('/api/analytics/weekly', async (req, res) => {
  try {
    const weeks = Number.parseInt(req.query.weeks, 10) || 8;
    const start = new Date();
    start.setDate(start.getDate() - (weeks - 1) * 7);
    start.setHours(0, 0, 0, 0);

    const rows = await Transaction.aggregate([
      { $match: { date: { $gte: start } } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: { $dateTrunc: { date: '$date', unit: 'week' } },
            },
          },
          income: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
            },
          },
          expenses: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(
      rows.map((row) => ({
        week: row._id,
        income: row.income,
        expenses: row.expenses,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: 'Unable to load weekly analytics.' });
  }
});

app.get('/api/analytics/categories', async (req, res) => {
  try {
    const { from, to } = req.query;
    const dateRange = buildDateRange(from, to);
    const match = { type: 'expense' };
    if (dateRange) {
      match.date = dateRange;
    }

    const rows = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(rows.map((row) => ({ category: row._id, total: row.total })));
  } catch (error) {
    res.status(500).json({ message: 'Unable to load category analytics.' });
  }
});

app.get('/api/analytics/forecast', async (req, res) => {
  try {
    const historyMonths = Number.parseInt(req.query.historyMonths, 10) || 3;
    const forecastMonths = Number.parseInt(req.query.months, 10) || 3;

    const start = new Date();
    start.setDate(1);
    start.setMonth(start.getMonth() - (historyMonths - 1));
    start.setHours(0, 0, 0, 0);

    const history = await Transaction.aggregate([
      { $match: { date: { $gte: start } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m', date: '$date' },
          },
          income: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
            },
          },
          expenses: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
            },
          },
        },
      },
    ]);

    const netTotals = history.reduce(
      (acc, row) => acc + (row.income - row.expenses),
      0
    );
    const averageNet = historyMonths > 0 ? netTotals / historyMonths : 0;

    const totals = await Transaction.aggregate([
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
        },
      },
    ]);

    const totalIncome = totals.find((entry) => entry._id === 'income')?.total || 0;
    const totalExpenses =
      totals.find((entry) => entry._id === 'expense')?.total || 0;
    const baseBalance = totalIncome - totalExpenses;

    const series = [];
    const cursor = new Date();
    cursor.setDate(1);
    for (let i = 1; i <= forecastMonths; i += 1) {
      cursor.setMonth(cursor.getMonth() + 1);
      series.push({
        month: toMonthKey(cursor),
        projectedBalance: baseBalance + averageNet * i,
      });
    }

    res.json({ baseBalance, averageNet, series });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load forecast.' });
  }
});

app.get('/api/transactions/export', async (req, res) => {
  try {
    const { from, to } = req.query;
    const dateRange = buildDateRange(from, to);
    const query = dateRange ? { date: dateRange } : {};

    const transactions = await Transaction.find(query).sort({ date: -1 });
    const records = transactions.map((item) => ({
      date: item.date.toISOString().slice(0, 10),
      type: item.type,
      category: item.category,
      amount: item.amount,
      note: item.note || '',
    }));

    const csv = stringify(records, {
      header: true,
      columns: ['date', 'type', 'category', 'amount', 'note'],
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('transactions.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Unable to export transactions.' });
  }
});

app.post('/api/transactions/import', async (req, res) => {
  try {
    const { csv } = req.body;
    if (!csv) {
      return res.status(400).json({ message: 'CSV content is required.' });
    }

    const records = parse(csv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const mapped = records.map((row) => ({
      type: row.type,
      amount: Number(row.amount),
      category: row.category,
      date: new Date(row.date),
      note: row.note || '',
    }));

    const invalid = mapped.find(
      (row) =>
        !['income', 'expense'].includes(row.type) ||
        !row.category ||
        !row.date ||
        Number.isNaN(row.amount)
    );

    if (invalid) {
      return res.status(400).json({ message: 'CSV contains invalid rows.' });
    }

    const inserted = await Transaction.insertMany(mapped);
    res.status(201).json({ count: inserted.length });
  } catch (error) {
    res.status(500).json({ message: 'Unable to import transactions.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});