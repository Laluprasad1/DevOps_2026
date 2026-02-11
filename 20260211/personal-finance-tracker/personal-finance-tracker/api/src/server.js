const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDb } = require('./db');

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const transactionRoutes = require('./routes/transactions');
const budgetRoutes = require('./routes/budgets');
const reportRoutes = require('./routes/reports');

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true
  })
);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/reports', reportRoutes);

const port = process.env.PORT || 4000;

connectDb(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });
