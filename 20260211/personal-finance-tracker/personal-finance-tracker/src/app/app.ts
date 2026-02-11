import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

const API_BASE = 'http://localhost:4000/api';

type AuthUser = { id: string; name: string; email: string };
type Category = { _id: string; name: string; type: 'income' | 'expense' };
type Transaction = {
  _id: string;
  categoryId?: string | null;
  type: 'income' | 'expense';
  amount: number;
  note?: string;
  date: string;
};
type Budget = { _id: string; categoryId: string; month: string; limit: number };
type Report = { month: string; income: number; expense: number; net: number };

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly token = signal<string | null>(localStorage.getItem('pft_token'));
  protected readonly user = signal<AuthUser | null>(this.loadUser());
  protected readonly message = signal<string>('');
  protected selectedMonth = this.currentMonth();

  protected readonly isAuthenticated = computed(() => !!this.token());

  protected readonly categories = signal<Category[]>([]);
  protected readonly transactions = signal<Transaction[]>([]);
  protected readonly budgets = signal<Budget[]>([]);
  protected readonly report = signal<Report | null>(null);

  protected registerForm = { name: '', email: '', password: '' };
  protected loginForm = { email: '', password: '' };
  protected categoryForm: { name: string; type: 'income' | 'expense' } = {
    name: '',
    type: 'expense'
  };
  protected transactionForm: {
    type: 'income' | 'expense';
    amount: number | null;
    note: string;
    date: string;
    categoryId: string;
  } = {
    type: 'expense',
    amount: null,
    note: '',
    date: this.currentDate(),
    categoryId: ''
  };
  protected budgetForm: { categoryId: string; month: string; limit: number | null } = {
    categoryId: '',
    month: this.currentMonth(),
    limit: null
  };

  ngOnInit(): void {
    if (this.token()) {
      this.loadAll();
    }
  }

  register(): void {
    this.message.set('');
    this.http
      .post<{ token: string; user: AuthUser }>(`${API_BASE}/auth/register`, this.registerForm)
      .subscribe({
        next: (data) => {
          this.setAuth(data);
          this.registerForm = { name: '', email: '', password: '' };
          this.loadAll();
        },
        error: (err) => this.setError(err)
      });
  }

  login(): void {
    this.message.set('');
    this.http
      .post<{ token: string; user: AuthUser }>(`${API_BASE}/auth/login`, this.loginForm)
      .subscribe({
        next: (data) => {
          this.setAuth(data);
          this.loginForm = { email: '', password: '' };
          this.loadAll();
        },
        error: (err) => this.setError(err)
      });
  }

  logout(): void {
    this.token.set(null);
    this.user.set(null);
    localStorage.removeItem('pft_token');
    localStorage.removeItem('pft_user');
    this.categories.set([]);
    this.transactions.set([]);
    this.budgets.set([]);
    this.report.set(null);
  }

  addCategory(): void {
    this.message.set('');
    this.http
      .post<Category>(`${API_BASE}/categories`, this.categoryForm, this.authOptions())
      .subscribe({
        next: (item) => {
          this.categories.set([item, ...this.categories()]);
          this.categoryForm = { name: '', type: 'expense' };
        },
        error: (err) => this.setError(err)
      });
  }

  deleteCategory(id: string): void {
    this.http.delete(`${API_BASE}/categories/${id}`, this.authOptions()).subscribe({
      next: () => this.categories.set(this.categories().filter((item) => item._id !== id)),
      error: (err) => this.setError(err)
    });
  }

  addTransaction(): void {
    this.message.set('');
    const payload = {
      ...this.transactionForm,
      amount: Number(this.transactionForm.amount || 0)
    };

    this.http
      .post<Transaction>(`${API_BASE}/transactions`, payload, this.authOptions())
      .subscribe({
        next: (item) => {
          this.transactions.set([item, ...this.transactions()]);
          this.transactionForm = {
            type: 'expense',
            amount: null,
            note: '',
            date: this.currentDate(),
            categoryId: ''
          };
          this.refreshReport();
        },
        error: (err) => this.setError(err)
      });
  }

  deleteTransaction(id: string): void {
    this.http.delete(`${API_BASE}/transactions/${id}`, this.authOptions()).subscribe({
      next: () => {
        this.transactions.set(this.transactions().filter((item) => item._id !== id));
        this.refreshReport();
      },
      error: (err) => this.setError(err)
    });
  }

  addBudget(): void {
    this.message.set('');
    const payload = {
      ...this.budgetForm,
      limit: Number(this.budgetForm.limit || 0)
    };

    this.http
      .post<Budget>(`${API_BASE}/budgets`, payload, this.authOptions())
      .subscribe({
        next: (item) => {
          this.budgets.set([item, ...this.budgets()]);
          this.budgetForm = { categoryId: '', month: this.currentMonth(), limit: null };
        },
        error: (err) => this.setError(err)
      });
  }

  deleteBudget(id: string): void {
    this.http.delete(`${API_BASE}/budgets/${id}`, this.authOptions()).subscribe({
      next: () => this.budgets.set(this.budgets().filter((item) => item._id !== id)),
      error: (err) => this.setError(err)
    });
  }

  refreshReport(): void {
    this.http
      .get<Report>(`${API_BASE}/reports/summary?month=${this.selectedMonth}`, this.authOptions())
      .subscribe({
        next: (data) => this.report.set(data),
        error: (err) => this.setError(err)
      });
  }

  private loadAll(): void {
    this.loadCategories();
    this.loadTransactions();
    this.loadBudgets();
    this.refreshReport();
  }

  private loadCategories(): void {
    this.http.get<Category[]>(`${API_BASE}/categories`, this.authOptions()).subscribe({
      next: (items) => this.categories.set(items),
      error: (err) => this.setError(err)
    });
  }

  private loadTransactions(): void {
    this.http.get<Transaction[]>(`${API_BASE}/transactions`, this.authOptions()).subscribe({
      next: (items) => this.transactions.set(items),
      error: (err) => this.setError(err)
    });
  }

  private loadBudgets(): void {
    this.http.get<Budget[]>(`${API_BASE}/budgets`, this.authOptions()).subscribe({
      next: (items) => this.budgets.set(items),
      error: (err) => this.setError(err)
    });
  }

  private authOptions(): { headers: HttpHeaders } {
    const token = this.token();
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }

  private setAuth(data: { token: string; user: AuthUser }): void {
    this.token.set(data.token);
    this.user.set(data.user);
    localStorage.setItem('pft_token', data.token);
    localStorage.setItem('pft_user', JSON.stringify(data.user));
  }

  private loadUser(): AuthUser | null {
    const raw = localStorage.getItem('pft_user');
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  private setError(err: { error?: { message?: string } }): void {
    const message = err?.error?.message || 'Something went wrong. Please try again.';
    this.message.set(message);
  }

  private currentMonth(): string {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  }

  private currentDate(): string {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  }
}
