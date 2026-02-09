import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
const CATEGORY_OPTIONS = [
  'Housing',
  'Food',
  'Transport',
  'Utilities',
  'Shopping',
  'Health',
  'Savings',
  'Entertainment',
  'Salary',
  'Freelance',
  'Other',
];
const PIE_COLORS = ['#f37550', '#2da676', '#4f79ff', '#f6c453', '#8f6ded'];
const LOCALE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'hi-IN', label: 'Hindi (IN)' },
  { value: 'bn-BD', label: 'Bangla (BD)' },
  { value: 'ja-JP', label: 'Japanese (JP)' },
];
const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

const Dashboard = () => {
  const [data, setData] = useState({ totalIncome: 0, totalExpenses: 0 });
  const [transactions, setTransactions] = useState([]);
  const [monthlySeries, setMonthlySeries] = useState([]);
  const [weeklySeries, setWeeklySeries] = useState([]);
  const [categorySeries, setCategorySeries] = useState([]);
  const [forecast, setForecast] = useState({ baseBalance: 0, averageNet: 0, series: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const [currency, setCurrency] = useState('USD');
  const [locale, setLocale] = useState('en-US');
  const [theme, setTheme] = useState('light');
  const [chartRange, setChartRange] = useState('monthly');
  const [formState, setFormState] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: '',
    note: '',
  });
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');
  const [importing, setImporting] = useState(false);
  const [toast, setToast] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toastTimerRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const topRef = useRef(null);
  const addSectionRef = useRef(null);
  const historySectionRef = useRef(null);
  const profileMenuRef = useRef(null);
  const [activePanel, setActivePanel] = useState('home');

  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    });
  }, [currency, locale]);

  const showToast = (message, type = 'success') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const loadDashboard = async (isRefresh = false) => {
    setError('');
    setActionMessage('');
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const [summary, recent, monthly, weekly, categories, forecastResponse] =
        await Promise.all([
          axios.get(`${API_BASE}/api/dashboard`),
          axios.get(`${API_BASE}/api/transactions?limit=8`),
          axios.get(`${API_BASE}/api/analytics/monthly?months=6`),
          axios.get(`${API_BASE}/api/analytics/weekly?weeks=8`),
          axios.get(`${API_BASE}/api/analytics/categories`),
          axios.get(`${API_BASE}/api/analytics/forecast?months=4&historyMonths=3`),
        ]);

      setData(summary.data);
      setTransactions(recent.data);
      setMonthlySeries(monthly.data);
      setWeeklySeries(weekly.data);
      setCategorySeries(categories.data);
      setForecast(forecastResponse.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Could not load dashboard data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard(false);
  }, []);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem('pf-locale');
    const storedCurrency = window.localStorage.getItem('pf-currency');
    const storedTheme = window.localStorage.getItem('pf-theme');
    if (storedLocale) {
      setLocale(storedLocale);
    }
    if (storedCurrency) {
      setCurrency(storedCurrency);
    }
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('pf-locale', locale);
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem('pf-currency', currency);
  }, [currency]);

  useEffect(() => {
    window.localStorage.setItem('pf-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!profileMenuRef.current) {
        return;
      }
      if (!profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const balance = data.totalIncome - data.totalExpenses;
  const savingsRate = data.totalIncome > 0 ? (balance / data.totalIncome) * 100 : 0;
  const chartData = chartRange === 'weekly' ? weeklySeries : monthlySeries;
  const profile = { name: 'User', initials: 'U' };
  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.note || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || item.type === filterType;
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchTerm, filterType, filterCategory]);

  const handleFormChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTransaction = async (event) => {
    event.preventDefault();
    setActionError('');
    setActionMessage('');

    if (!formState.amount || !formState.category || !formState.date) {
      setActionError('Please fill in amount, category, and date.');
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/transactions`, {
        ...formState,
        amount: Number(formState.amount),
      });
      setFormState({ type: 'expense', amount: '', category: '', date: '', note: '' });
      setActionMessage('Transaction saved.');
      showToast('Transaction saved.');
      loadDashboard(true);
    } catch (err) {
      setActionError('Unable to save transaction.');
      showToast('Unable to save transaction.', 'error');
    }
  };

  const handleExportCsv = async () => {
    setActionError('');
    setActionMessage('');
    try {
      const response = await axios.get(`${API_BASE}/api/transactions/export`, {
        responseType: 'blob',
      });
      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'transactions.csv';
      link.click();
      window.URL.revokeObjectURL(blobUrl);
      showToast('CSV exported.');
    } catch (err) {
      setActionError('Export failed.');
      showToast('Export failed.', 'error');
    }
  };

  const handleImportCsv = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setImporting(true);
    setActionError('');
    setActionMessage('');
    try {
      const text = await file.text();
      await axios.post(`${API_BASE}/api/transactions/import`, { csv: text });
      setActionMessage('CSV imported successfully.');
      showToast('CSV imported successfully.');
      loadDashboard(true);
    } catch (err) {
      setActionError('Import failed. Check CSV format.');
      showToast('Import failed. Check CSV format.', 'error');
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  const applyQuickAdd = (patch) => {
    setFormState((prev) => ({ ...prev, ...patch }));
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openPanel = (panel, ref) => {
    setActivePanel(panel);
    scrollToSection(ref);
  };

  return (
    <div className="wallet-shell" ref={topRef}>
      <header className="top-nav" role="banner">
        <div className="nav-left">
          <div className="brand-mark">FP</div>
        </div>
        <div className="nav-center">
          <h1 className="app-title">FinPulse</h1>
        </div>
        <div className="nav-right" ref={profileMenuRef}>
          <button
            className="profile-card"
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={isProfileOpen}
          >
            <span className="avatar" aria-hidden="true">
              {profile.initials}
            </span>
            <span className="profile-text">
              <strong>{profile.name}</strong>
              <span>Profile</span>
            </span>
          </button>
          {isProfileOpen && (
            <div className="profile-menu" role="menu">
              <button type="button" role="menuitem">
                Settings
              </button>
              <button type="button" role="menuitem">
                Edit profile
              </button>
              <div className="menu-divider" />
              <div className="menu-group">
                <label htmlFor="theme">Theme</label>
                <select
                  id="theme"
                  value={theme}
                  onChange={(event) => setTheme(event.target.value)}
                >
                  {THEME_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="menu-group">
                <label htmlFor="locale">Locale</label>
                <select
                  id="locale"
                  value={locale}
                  onChange={(event) => setLocale(event.target.value)}
                >
                  {LOCALE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="menu-group">
                <label htmlFor="currency">Currency</label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                  <option value="BDT">BDT</option>
                  <option value="JPY">JPY</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="hero-strip">
        <div>
          <p className="eyebrow">Personal Finance</p>
          <h2>Good afternoon, {profile.name}</h2>
          <p className="subtitle">Your money snapshot, refreshed in real time.</p>
          {lastUpdated && (
            <p className="timestamp">Last updated {lastUpdated.toLocaleTimeString(locale)}</p>
          )}
        </div>
        <button
          className="ghost-button"
          type="button"
          onClick={() => loadDashboard(true)}
          disabled={loading || refreshing}
          aria-busy={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </section>

      {toast && (
        <div className={`toast ${toast.type}`} role="status" aria-live="polite">
          {toast.message}
        </div>
      )}

      {loading && (
        <div className="status-card" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true" />
          <p>Loading dashboard data...</p>
        </div>
      )}

      {!loading && error && (
        <div className="status-card error" role="alert">
          <p>{error}</p>
          <button className="ghost-button" type="button" onClick={() => loadDashboard(true)}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <section className="wallet-content">
          <div className="wallet-left">
            <section className="balance-strip">
              <article className="balance-card">
                <p>Total Balance</p>
                <h2>{currencyFormatter.format(balance)}</h2>
                <span>{balance >= 0 ? 'On track' : 'Needs review'}</span>
              </article>
              <article className="mini-card">
                <p>Income</p>
                <strong>{currencyFormatter.format(data.totalIncome)}</strong>
              </article>
              <article className="mini-card">
                <p>Expenses</p>
                <strong>{currencyFormatter.format(data.totalExpenses)}</strong>
              </article>
            </section>

            <section className="insight-row">
              <div className="insight-tile">
                <p>Savings rate</p>
                <strong>{savingsRate.toFixed(1)}%</strong>
              </div>
              <div className="insight-tile">
                <p>Expense ratio</p>
                <strong>
                  {data.totalIncome > 0
                    ? `${((data.totalExpenses / data.totalIncome) * 100).toFixed(1)}%`
                    : '0.0%'}
                </strong>
              </div>
              <div className="insight-tile">
                <p>Status</p>
                <strong>{balance >= 0 ? 'Healthy' : 'Watchlist'}</strong>
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <div>
                  <h3>Income vs Expenses</h3>
                  <p>Monthly and weekly performance tracking.</p>
                </div>
                <div className="segmented">
                  <button
                    type="button"
                    className={chartRange === 'monthly' ? 'active' : ''}
                    onClick={() => setChartRange('monthly')}
                    aria-pressed={chartRange === 'monthly'}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    className={chartRange === 'weekly' ? 'active' : ''}
                    onClick={() => setChartRange('weekly')}
                    aria-pressed={chartRange === 'weekly'}
                  >
                    Weekly
                  </button>
                </div>
              </div>
              <div className="chart-container">
                {chartData.length === 0 ? (
                  <div className="empty-state">No chart data yet. Add transactions to see trends.</div>
                ) : (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={chartData} margin={{ left: 8, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey={chartRange === 'weekly' ? 'week' : 'month'} />
                      <YAxis tickFormatter={(value) => currencyFormatter.format(value)} />
                      <Tooltip formatter={(value) => currencyFormatter.format(value)} />
                      <Legend />
                      <Bar dataKey="income" fill="#2da676" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="expenses" fill="#f37550" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <div>
                  <h3>Expense Categories</h3>
                  <p>Where your spending is concentrated.</p>
                </div>
              </div>
              <div className="chart-container">
                {categorySeries.length === 0 ? (
                  <div className="empty-state">No category data yet. Add expenses to populate.</div>
                ) : (
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={categorySeries}
                        dataKey="total"
                        nameKey="category"
                        innerRadius={50}
                        outerRadius={90}
                      >
                        {categorySeries.map((entry, index) => (
                          <Cell key={entry.category} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => currencyFormatter.format(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              {categorySeries.length > 0 && (
                <div className="legend-list">
                  {categorySeries.slice(0, 4).map((item, index) => (
                    <div key={item.category} className="legend-item">
                      <span
                        className="legend-dot"
                        style={{ background: PIE_COLORS[index % PIE_COLORS.length] }}
                      />
                      <span>{item.category}</span>
                      <strong>{currencyFormatter.format(item.total)}</strong>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="panel">
              <div className="panel-header">
                <div>
                  <h3>Cashflow Forecast</h3>
                  <p>Projected balance for upcoming months.</p>
                </div>
              </div>
              <div className="forecast-summary">
                <div>
                  <p>Base Balance</p>
                  <h4>{currencyFormatter.format(forecast.baseBalance)}</h4>
                </div>
                <div>
                  <p>Avg. Monthly Net</p>
                  <h4>{currencyFormatter.format(forecast.averageNet)}</h4>
                </div>
              </div>
              <div className="chart-container">
                {forecast.series.length === 0 ? (
                  <div className="empty-state">
                    Forecast will appear once you have transaction history.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={forecast.series} margin={{ left: 8, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => currencyFormatter.format(value)} />
                      <Tooltip formatter={(value) => currencyFormatter.format(value)} />
                      <Line
                        type="monotone"
                        dataKey="projectedBalance"
                        stroke="#4f79ff"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </section>
          </div>

          <aside className="wallet-right">
            {activePanel === 'add' && (
              <section className="panel" ref={addSectionRef} id="add-transaction">
                <div className="panel-header">
                  <div>
                    <h3>Add Transaction</h3>
                    <p>Keep your dashboard up to date in real time.</p>
                  </div>
                </div>
                <form className="transaction-form" onSubmit={handleAddTransaction}>
                  <div className="field">
                    <label htmlFor="type">Type</label>
                    <select
                      id="type"
                      value={formState.type}
                      onChange={(event) => handleFormChange('type', event.target.value)}
                      aria-label="Transaction type"
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="amount">Amount</label>
                    <input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formState.amount}
                      onChange={(event) => handleFormChange('amount', event.target.value)}
                      placeholder="0.00"
                      aria-label="Transaction amount"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      value={formState.category}
                      onChange={(event) => handleFormChange('category', event.target.value)}
                      aria-label="Transaction category"
                    >
                      <option value="">Select category</option>
                      {CATEGORY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="date">Date</label>
                    <input
                      id="date"
                      type="date"
                      value={formState.date}
                      onChange={(event) => handleFormChange('date', event.target.value)}
                      aria-label="Transaction date"
                    />
                  </div>
                  <div className="field full">
                    <label htmlFor="note">Note</label>
                    <input
                      id="note"
                      type="text"
                      value={formState.note}
                      onChange={(event) => handleFormChange('note', event.target.value)}
                      placeholder="Optional note"
                      aria-label="Transaction note"
                    />
                  </div>
                  <div className="quick-actions" role="group" aria-label="Quick add shortcuts">
                    <button
                      type="button"
                      className="chip"
                      onClick={() => applyQuickAdd({ type: 'income', category: 'Salary', amount: '1200' })}
                    >
                      + Salary
                    </button>
                    <button
                      type="button"
                      className="chip"
                      onClick={() => applyQuickAdd({ type: 'expense', category: 'Food', amount: '25' })}
                    >
                      + Food
                    </button>
                    <button
                      type="button"
                      className="chip"
                      onClick={() => applyQuickAdd({ type: 'expense', category: 'Transport', amount: '12' })}
                    >
                      + Transport
                    </button>
                  </div>
                  <button className="primary-button" type="submit">
                    Save Transaction
                  </button>
                  {actionError && <p className="form-message error">{actionError}</p>}
                  {actionMessage && <p className="form-message">{actionMessage}</p>}
                </form>
              </section>
            )}

            {activePanel === 'history' && (
              <section className="panel" ref={historySectionRef} id="recent-activity">
                <div className="panel-header">
                  <div>
                    <h3>Recent Activity</h3>
                    <p>Latest transactions synced from the backend.</p>
                  </div>
                </div>
                <div className="filters">
                  <input
                    type="search"
                    placeholder="Search category or note"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    aria-label="Search transactions"
                  />
                  <select
                    value={filterType}
                    onChange={(event) => setFilterType(event.target.value)}
                    aria-label="Filter by type"
                  >
                    <option value="all">All types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  <select
                    value={filterCategory}
                    onChange={(event) => setFilterCategory(event.target.value)}
                    aria-label="Filter by category"
                  >
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="transaction-list" aria-live="polite">
                  {filteredTransactions.length === 0 ? (
                    <div className="empty-state">No transactions match your filters.</div>
                  ) : (
                    filteredTransactions.map((item) => (
                      <div key={item._id} className="transaction-item">
                        <div>
                          <p>{item.category}</p>
                          <span>{new Date(item.date).toLocaleDateString(locale)}</span>
                        </div>
                        <strong className={item.type === 'income' ? 'positive' : 'negative'}>
                          {currencyFormatter.format(item.amount)}
                        </strong>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            <section className="panel">
              <div className="panel-header">
                <div>
                  <h3>CSV Import / Export</h3>
                  <p>Move data in and out of the tracker quickly.</p>
                </div>
              </div>
              <div className="csv-actions">
                <button className="ghost-button" type="button" onClick={handleExportCsv}>
                  Export CSV
                </button>
                <label className="file-upload">
                  <input type="file" accept=".csv" onChange={handleImportCsv} />
                  {importing ? 'Importing...' : 'Import CSV'}
                </label>
              </div>
              {actionError && <p className="form-message error">{actionError}</p>}
              {actionMessage && <p className="form-message">{actionMessage}</p>}
            </section>
          </aside>
        </section>
      )}

      <nav className="bottom-nav" role="navigation" aria-label="Primary">
        <button
          type="button"
          className={activePanel === 'home' ? 'active' : ''}
          onClick={() => openPanel('home', topRef)}
        >
          Home
        </button>
        <button
          type="button"
          className="nav-plus"
          onClick={() => openPanel('add', addSectionRef)}
          aria-label="Add transaction"
        >
          +
        </button>
        <button
          type="button"
          className={activePanel === 'history' ? 'active' : ''}
          onClick={() => openPanel('history', historySectionRef)}
        >
          History
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;