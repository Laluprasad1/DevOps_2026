const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const seedExpenses = [
  { id: 1, title: "Groceries", amount: 500 },
  { id: 2, title: "Fuel", amount: 300 },
];

const seedIncome = [
  { id: 1, source: "Salary", amount: 10000 },
  { id: 2, source: "Freelance", amount: 2000 },
];

let expenses = seedExpenses.map((item) => ({ ...item }));
let income = seedIncome.map((item) => ({ ...item }));

function resetData() {
  expenses = seedExpenses.map((item) => ({ ...item }));
  income = seedIncome.map((item) => ({ ...item }));
}

// Utility: compute dashboard summary
function getDashboardSummary() {
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const totalIncome = income.reduce((sum, i) => sum + Number(i.amount), 0);
  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  };
}

// API 1: Dashboard summary
app.get("/api/dashboard", (req, res) => {
  res.json(getDashboardSummary());
});

// API 2: Get all expenses
app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

// API 3: Add a new expense
app.post("/api/expenses", (req, res) => {
  const { title, amount } = req.body || {};

  if (!title || amount === undefined || Number.isNaN(Number(amount))) {
    return res.status(400).json({ message: "Invalid expense data." });
  }

  const nextId = expenses.length
    ? Math.max(...expenses.map((item) => item.id)) + 1
    : 1;

  const newExpense = {
    id: nextId,
    title,
    amount: Number(amount),
  };

  expenses.push(newExpense);
  return res.status(201).json(newExpense);
});

// API 4: Get all income
app.get("/api/income", (req, res) => {
  res.json(income);
});

// API 5: Add new income
app.post("/api/income", (req, res) => {
  const { source, amount } = req.body || {};

  if (!source || amount === undefined || Number.isNaN(Number(amount))) {
    return res.status(400).json({ message: "Invalid income data." });
  }

  const nextId = income.length
    ? Math.max(...income.map((item) => item.id)) + 1
    : 1;

  const newIncome = {
    id: nextId,
    source,
    amount: Number(amount),
  };

  income.push(newIncome);
  return res.status(201).json(newIncome);
});

module.exports = app;
module.exports._internal = {
  _resetData: resetData,
};
