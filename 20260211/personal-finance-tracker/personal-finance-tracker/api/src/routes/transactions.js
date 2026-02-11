const express = require('express');
const Transaction = require('../models/Transaction');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const items = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  const { categoryId, type, amount, note, date } = req.body || {};
  if (!type || !amount || !date) {
    return res.status(400).json({ message: 'Type, amount, and date are required.' });
  }

  const item = await Transaction.create({
    userId: req.user.id,
    categoryId: categoryId || null,
    type,
    amount,
    note: note || '',
    date: new Date(date)
  });

  return res.status(201).json(item);
});

router.delete('/:id', auth, async (req, res) => {
  const item = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!item) {
    return res.status(404).json({ message: 'Transaction not found.' });
  }

  return res.json({ message: 'Transaction deleted.' });
});

module.exports = router;
