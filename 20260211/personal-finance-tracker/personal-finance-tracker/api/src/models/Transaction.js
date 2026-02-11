const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: { type: Number, required: true },
    note: { type: String, trim: true },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
