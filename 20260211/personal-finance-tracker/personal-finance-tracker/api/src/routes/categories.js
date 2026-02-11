const express = require('express');
const Category = require('../models/Category');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const items = await Category.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  const { name, type } = req.body || {};
  if (!name || !type) {
    return res.status(400).json({ message: 'Name and type are required.' });
  }

  const item = await Category.create({ userId: req.user.id, name, type });
  return res.status(201).json(item);
});

router.put('/:id', auth, async (req, res) => {
  const { name, type } = req.body || {};
  const item = await Category.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { name, type },
    { new: true }
  );

  if (!item) {
    return res.status(404).json({ message: 'Category not found.' });
  }

  return res.json(item);
});

router.delete('/:id', auth, async (req, res) => {
  const item = await Category.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!item) {
    return res.status(404).json({ message: 'Category not found.' });
  }

  return res.json({ message: 'Category deleted.' });
});

module.exports = router;
