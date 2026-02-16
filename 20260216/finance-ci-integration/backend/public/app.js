const statusEl = document.getElementById("status");
const totalIncomeEl = document.getElementById("totalIncome");
const totalExpensesEl = document.getElementById("totalExpenses");
const balanceEl = document.getElementById("balance");
const expenseListEl = document.getElementById("expenseList");
const incomeListEl = document.getElementById("incomeList");

function formatCurrency(value) {
  const numeric = Number(value || 0);
  return `INR ${numeric.toLocaleString("en-IN")}`;
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#9b2c2c" : "";
}

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

function renderList(listEl, items, getLabel) {
  listEl.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    const title = document.createElement("span");
    const amount = document.createElement("span");
    title.textContent = getLabel(item);
    amount.textContent = formatCurrency(item.amount);
    li.appendChild(title);
    li.appendChild(amount);
    listEl.appendChild(li);
  });
}

async function loadDashboard() {
  const [dashboard, expenses, income] = await Promise.all([
    fetchJson("/api/dashboard"),
    fetchJson("/api/expenses"),
    fetchJson("/api/income"),
  ]);

  totalIncomeEl.textContent = formatCurrency(dashboard.totalIncome);
  totalExpensesEl.textContent = formatCurrency(dashboard.totalExpenses);
  balanceEl.textContent = formatCurrency(dashboard.balance);

  renderList(expenseListEl, expenses, (item) => item.title);
  renderList(incomeListEl, income, (item) => item.source);
}

async function handleExpenseSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const payload = {
    title: formData.get("title"),
    amount: Number(formData.get("amount")),
  };

  try {
    setStatus("Adding expense...");
    await fetchJson("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    form.reset();
    await loadDashboard();
    setStatus("Expense added.");
  } catch (error) {
    setStatus(error.message, true);
  }
}

async function handleIncomeSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const payload = {
    source: formData.get("source"),
    amount: Number(formData.get("amount")),
  };

  try {
    setStatus("Adding income...");
    await fetchJson("/api/income", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    form.reset();
    await loadDashboard();
    setStatus("Income added.");
  } catch (error) {
    setStatus(error.message, true);
  }
}

document.getElementById("expenseForm").addEventListener("submit", handleExpenseSubmit);
document.getElementById("incomeForm").addEventListener("submit", handleIncomeSubmit);
document.getElementById("refresh").addEventListener("click", async () => {
  try {
    setStatus("Refreshing...");
    await loadDashboard();
    setStatus("Data refreshed.");
  } catch (error) {
    setStatus(error.message, true);
  }
});

loadDashboard().catch((error) => {
  setStatus(error.message, true);
});
