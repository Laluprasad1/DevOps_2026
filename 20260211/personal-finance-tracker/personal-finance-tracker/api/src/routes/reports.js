const express = require('express');
const Transaction = require('../models/Transaction');
const { auth } = require('../middleware/auth');

const router = express.Router();

const resolveMonthRange = (month) => {
  const now = new Date();
  const [year, monthIndex] = month ? month.split('-').map((part) => Number(part)) : [];
  const start = month && year && monthIndex ? new Date(year, monthIndex - 1, 1) : new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
  return { start, end, label: `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}` };
};

router.get('/summary', auth, async (req, res) => {
  const { start, end, label } = resolveMonthRange(req.query.month);

  const items = await Transaction.find({
    userId: req.user.id,
    date: { $gte: start, $lt: end }
  });

  const totals = items.reduce(
    (acc, item) => {
      if (item.type === 'income') {
        acc.income += item.amount;
      } else {
        acc.expense += item.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const net = totals.income - totals.expense;

  res.json({ month: label, income: totals.income, expense: totals.expense, net });
});

module.exports = router;
