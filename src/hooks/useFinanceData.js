import { useState, useCallback, useMemo } from 'react'
import { format, subMonths, addMonths } from 'date-fns'
import {
  generateSeedData, DEFAULT_BUDGETS, getMonthTransactions,
  calcSummary, getSpendingByCategory, getLast6MonthsTrend, getBudgetStatus,
} from '../utils/finance'

const STORAGE_KEY = 'fina_transactions_v1'
const BUDGET_KEY  = 'fina_budgets_v1'

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function useFinanceData() {
  const [transactions, setTransactions] = useState(() => {
    const stored = loadFromStorage(STORAGE_KEY, null)
    if (stored && stored.length > 0) return stored
    const seed = generateSeedData()
    saveToStorage(STORAGE_KEY, seed)
    return seed
  })

  const [budgets, setBudgets] = useState(() =>
    loadFromStorage(BUDGET_KEY, DEFAULT_BUDGETS)
  )

  // Which month we're viewing (ISO yyyy-MM)
  const [viewMonth, setViewMonth] = useState(() => format(new Date(), 'yyyy-MM'))

  // ─── Derived: current month date ─────────────────────────────────────────
  const viewDate = useMemo(() => {
    const [y, m] = viewMonth.split('-').map(Number)
    return new Date(y, m - 1, 1)
  }, [viewMonth])

  const isCurrentMonth = useMemo(() =>
    viewMonth === format(new Date(), 'yyyy-MM')
  , [viewMonth])

  // ─── Month transactions ───────────────────────────────────────────────────
  const monthTransactions = useMemo(() =>
    getMonthTransactions(transactions, viewDate)
  , [transactions, viewDate])

  // ─── Summary ──────────────────────────────────────────────────────────────
  const summary = useMemo(() => calcSummary(monthTransactions), [monthTransactions])

  // ─── Spending by category ─────────────────────────────────────────────────
  const spending = useMemo(() => getSpendingByCategory(monthTransactions), [monthTransactions])

  // ─── Budget status ────────────────────────────────────────────────────────
  const budgetStatus = useMemo(() => getBudgetStatus(spending, budgets), [spending, budgets])

  // ─── 6-month trend ────────────────────────────────────────────────────────
  const trend = useMemo(() => getLast6MonthsTrend(transactions), [transactions])

  // ─── Mutations ────────────────────────────────────────────────────────────
  const addTransaction = useCallback((tx) => {
    const newTx = {
      ...tx,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTransactions(prev => {
      const updated = [newTx, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
      saveToStorage(STORAGE_KEY, updated)
      return updated
    })
    return newTx
  }, [])

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => {
      const updated = prev.filter(t => t.id !== id)
      saveToStorage(STORAGE_KEY, updated)
      return updated
    })
  }, [])

  const updateBudget = useCallback((catId, amount) => {
    setBudgets(prev => {
      const updated = { ...prev, [catId]: amount }
      saveToStorage(BUDGET_KEY, updated)
      return updated
    })
  }, [])

  const navigateMonth = useCallback((direction) => {
    setViewMonth(prev => {
      const [y, m] = prev.split('-').map(Number)
      const date = new Date(y, m - 1, 1)
      const next = direction === 'prev' ? subMonths(date, 1) : addMonths(date, 1)
      return format(next, 'yyyy-MM')
    })
  }, [])

  return {
    transactions, monthTransactions, summary, spending, budgetStatus, trend,
    budgets, viewMonth, viewDate, isCurrentMonth,
    addTransaction, deleteTransaction, updateBudget, navigateMonth,
  }
}
