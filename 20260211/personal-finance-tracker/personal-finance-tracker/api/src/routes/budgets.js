const express = require('express');
const Budget = require('../models/Budget');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const items = await Budget.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  const { categoryId, month, limit } = req.body || {};
  if (!categoryId || !month || !limit) {
    return res.status(400).json({ message: 'Category, month, and limit are required.' });
  }

  const item = await Budget.create({ userId: req.user.id, categoryId, month, limit });
  return res.status(201).json(item);
});

router.delete('/:id', auth, async (req, res) => {
  const item = await Budget.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!item) {
    return res.status(404).json({ message: 'Budget not found.' });
  }

  return res.json({ message: 'Budget deleted.' });
});

module.exports = router;
