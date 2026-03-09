import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { format } from 'date-fns'
import Header from './components/layout/Header'
import SummaryCards from './components/dashboard/SummaryCards'
import SpendingChart from './components/dashboard/SpendingChart'
import TrendChart from './components/dashboard/TrendChart'
import BudgetPanel from './components/dashboard/BudgetPanel'
import TransactionList from './components/transactions/TransactionList'
import AddTransactionModal from './components/transactions/AddTransactionModal'
import LoginPage from './pages/login'
import RegisterPage from './pages/registration'
import { useFinanceData } from './hooks/useFinanceData'
import { useTheme } from './context/ThemeContext'

export default function App() {
  const [authPage, setAuthPage] = useState('register')
  const [addOpen, setAddOpen] = useState(false)
  const { isDark } = useTheme()

  const {
    transactions, monthTransactions, summary, spending, budgetStatus, trend,
    budgets, viewMonth, viewDate, isCurrentMonth,
    addTransaction, deleteTransaction, updateBudget, navigateMonth,
  } = useFinanceData()

  
  if (authPage === 'register') {
    return (
      <RegisterPage
        onRegister={() => setAuthPage('login')}
        onGoToLogin={() => setAuthPage('login')}
      />
    )
  }

  if (authPage === 'login') {
    return (
      <LoginPage
        onLogin={() => setAuthPage(null)}
        onGoToRegister={() => setAuthPage('register')}
      />
    )
  }

 
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-ink-950 transition-colors duration-300">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: isDark ? '#2A2A2A' : '#1A1A1A',
            color: '#FAFAF7',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '13px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
          },
          success: { iconTheme: { primary: '#10B981', secondary: '#FAFAF7' } },
          error:   { iconTheme: { primary: '#F43F5E', secondary: '#FAFAF7' } },
        }}
      />

      <Header
        viewMonth={viewMonth}
        isCurrentMonth={isCurrentMonth}
        onNavigate={navigateMonth}
        onAddTransaction={() => setAddOpen(true)}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="sm:hidden">
          <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white transition-colors">
            {format(viewDate, 'MMMM yyyy')}
          </h1>
          <p className="text-sm text-ink-400 dark:text-ink-500 font-sans mt-0.5 transition-colors">
            {monthTransactions.length} transactions recorded
          </p>
        </div>

        <section className="animate-fade-up" style={{ animationDelay: '0ms' }}>
          <SummaryCards summary={summary} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
          <SpendingChart spending={spending} totalExpenses={summary.expenses} />
          <TrendChart trend={trend} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: '160ms' }}>
          <BudgetPanel budgetStatus={budgetStatus} onUpdateBudget={updateBudget} />
          <TransactionList transactions={monthTransactions} onDelete={deleteTransaction} />
        </section>

        <footer className="text-center py-4">
          <p className="text-xs text-ink-300 dark:text-ink-600 font-sans transition-colors">
            FN · Personal Finance App <span>spend wisely</span>
          </p>
        </footer>
      </main>

      <AddTransactionModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={addTransaction}
      />
    </div>
  )
}