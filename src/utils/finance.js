import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO, subMonths, getMonth, getYear } from 'date-fns'


export const CATEGORIES = {
  income: {
    id: 'income', label: 'Income', icon: '💼', color: '#10B981',
    bgLight: '#ECFDF5', textColor: '#047857', type: 'income',
  },
  housing: {
    id: 'housing', label: 'Housing', icon: '🏠', color: '#8B5CF6',
    bgLight: '#F5F3FF', textColor: '#6D28D9', type: 'expense',
  },
  food: {
    id: 'food', label: 'Food & Dining', icon: '🍽️', color: '#F59E0B',
    bgLight: '#FFFBEB', textColor: '#B45309', type: 'expense',
  },
  transport: {
    id: 'transport', label: 'Transport', icon: '🚗', color: '#0EA5E9',
    bgLight: '#F0F9FF', textColor: '#0369A1', type: 'expense',
  },
  entertainment: {
    id: 'entertainment', label: 'Entertainment', icon: '🎬', color: '#F43F5E',
    bgLight: '#FFF1F2', textColor: '#BE123C', type: 'expense',
  },
  health: {
    id: 'health', label: 'Health & Fitness', icon: '💊', color: '#06B6D4',
    bgLight: '#ECFEFF', textColor: '#0E7490', type: 'expense',
  },
  shopping: {
    id: 'shopping', label: 'Shopping', icon: '🛍️', color: '#EC4899',
    bgLight: '#FDF4FF', textColor: '#9D174D', type: 'expense',
  },
  other: {
    id: 'other', label: 'Other', icon: '📦', color: '#6B7280',
    bgLight: '#F9FAFB', textColor: '#374151', type: 'expense',
  },
}

export const EXPENSE_CATEGORIES = Object.values(CATEGORIES).filter(c => c.type === 'expense')


export const DEFAULT_BUDGETS = {
  housing: 1200,
  food: 400,
  transport: 200,
  entertainment: 150,
  health: 100,
  shopping: 250,
  other: 100,
}

// ─── Seed data ────────────────────────────────────────────────────────────────
export function generateSeedData() {
  const now = new Date()
  const transactions = []
  let id = 1

  // Helper to create transaction
  const tx = (amount, category, description, daysAgo) => {
    const date = new Date(now)
    date.setDate(date.getDate() - daysAgo)
    transactions.push({
      id: String(id++),
      amount: Math.abs(amount),
      category,
      description,
      date: format(date, 'yyyy-MM-dd'),
      createdAt: date.toISOString(),
    })
  }

  // Current month
  tx(5200, 'income', 'Monthly salary', 2)
  tx(800, 'income', 'Freelance project', 8)
  tx(1200, 'housing', 'Rent — August', 1)
  tx(89, 'housing', 'Electricity bill', 3)
  tx(45, 'housing', 'Internet bill', 5)
  tx(124, 'food', 'Weekly groceries', 1)
  tx(38, 'food', 'Lunch with team', 3)
  tx(22, 'food', 'Coffee & snacks', 5)
  tx(87, 'food', 'Weekend dinner', 7)
  tx(56, 'transport', 'Monthly bus pass', 2)
  tx(34, 'transport', 'Uber rides', 6)
  tx(15, 'entertainment', 'Netflix subscription', 4)
  tx(12, 'entertainment', 'Spotify', 4)
  tx(45, 'entertainment', 'Cinema tickets', 9)
  tx(89, 'health', 'Gym membership', 1)
  tx(34, 'health', 'Vitamins & supplements', 8)
  tx(156, 'shopping', 'New running shoes', 5)
  tx(67, 'shopping', 'Clothing', 10)

  // Last month
  tx(5200, 'income', 'Monthly salary', 35)
  tx(600, 'income', 'Side project payment', 28)
  tx(1200, 'housing', 'Rent — July', 32)
  tx(92, 'housing', 'Utilities', 30)
  tx(210, 'food', 'Groceries (2 weeks)', 28)
  tx(145, 'food', 'Restaurant meals', 25)
  tx(56, 'transport', 'Bus pass', 34)
  tx(78, 'transport', 'Petrol', 22)
  tx(15, 'entertainment', 'Netflix', 35)
  tx(89, 'health', 'Gym', 32)
  tx(230, 'shopping', 'Home goods', 26)
  tx(55, 'other', 'Miscellaneous', 24)

  // Two months ago
  tx(5200, 'income', 'Monthly salary', 65)
  tx(1200, 'housing', 'Rent — June', 62)
  tx(88, 'housing', 'Electricity', 60)
  tx(195, 'food', 'Groceries', 58)
  tx(65, 'food', 'Dining out', 55)
  tx(56, 'transport', 'Bus pass', 64)
  tx(15, 'entertainment', 'Netflix', 65)
  tx(50, 'entertainment', 'Concert ticket', 52)
  tx(89, 'health', 'Gym', 62)
  tx(120, 'shopping', 'Books & stationery', 57)
  tx(45, 'other', 'Charity donation', 50)

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// ─── Calculation helpers ──────────────────────────────────────────────────────

export function getMonthTransactions(transactions, date = new Date()) {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  return transactions.filter(tx => {
    const txDate = parseISO(tx.date)
    return isWithinInterval(txDate, { start, end })
  })
}

export function calcSummary(transactions) {
  const income = transactions
    .filter(t => t.category === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const expenses = transactions
    .filter(t => t.category !== 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const balance = income - expenses
  const savingsRate = income > 0 ? ((balance / income) * 100) : 0
  return { income, expenses, balance, savingsRate }
}

export function getSpendingByCategory(transactions) {
  const byCategory = {}
  transactions
    .filter(t => t.category !== 'income')
    .forEach(t => {
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount
    })
  return byCategory
}

export function getLast6MonthsTrend(transactions) {
  const now = new Date()
  const months = Array.from({ length: 6 }, (_, i) => subMonths(now, 5 - i))
  return months.map(month => {
    const monthTxs = getMonthTransactions(transactions, month)
    const { income, expenses } = calcSummary(monthTxs)
    return {
      label: format(month, 'MMM'),
      income,
      expenses,
      month: format(month, 'yyyy-MM'),
    }
  })
}

export function getBudgetStatus(spending, budgets) {
  return Object.entries(budgets).map(([catId, limit]) => {
    const spent = spending[catId] || 0
    const pct = limit > 0 ? (spent / limit) * 100 : 0
    return { catId, spent, limit, pct: Math.min(pct, 100), overBudget: spent > limit }
  }).sort((a, b) => b.pct - a.pct)
}

export function formatCurrency(amount, compact = false) {
  if (compact && amount >= 1000) {
    return '$' + (amount / 1000).toFixed(1) + 'k'
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCurrencyFull(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(amount)
}
