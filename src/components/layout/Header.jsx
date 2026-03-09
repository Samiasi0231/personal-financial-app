import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, Plus, Sparkles, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function Header({ viewMonth, isCurrentMonth, onNavigate, onAddTransaction }) {
  const { isDark, toggleTheme } = useTheme()
  const [year, month] = viewMonth.split('-').map(Number)
  const date = new Date(year, month - 1, 1)
  const monthLabel = format(date, 'MMMM')
  const yearLabel  = format(date, 'yyyy')

  return (
    <header className="sticky top-0 z-30 bg-cream-50/90 dark:bg-ink-950/90 backdrop-blur-md border-b border-cream-200 dark:border-ink-800 px-4 sm:px-6 py-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-ink-900 dark:bg-emerald-500 flex items-center justify-center transition-colors duration-300">
              <Sparkles size={14} className="text-emerald-400 dark:text-ink-900" />
            </div>
            <span className="font-display text-xl font-bold text-ink-900 dark:text-white tracking-tight hidden sm:block transition-colors duration-300">
              FN
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white dark:bg-ink-800 border border-cream-200 dark:border-ink-700 rounded-xl p-1 shadow-soft transition-colors duration-300">
            <button
              onClick={() => onNavigate('prev')}
              className="p-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-ink-700 text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="px-3 py-1 min-w-[130px] text-center">
              <span className="font-display text-base font-semibold text-ink-900 dark:text-white">{monthLabel}</span>
              <span className="text-ink-400 dark:text-ink-500 font-sans text-sm ml-1.5">{yearLabel}</span>
            </div>
            <button
              onClick={() => onNavigate('next')}
              disabled={isCurrentMonth}
              className="p-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-ink-700 text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {isCurrentMonth && (
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to light' : 'Switch to dark'}
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium font-sans px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer select-none
                text-emerald-700 bg-emerald-50 hover:bg-emerald-100
                dark:text-emerald-300 dark:bg-emerald-950 dark:hover:bg-emerald-900"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Live
              {isDark
                ? <Sun size={11} className="ml-0.5 opacity-80" />
                : <Moon size={11} className="ml-0.5 opacity-80" />
              }
            </button>
          )}
        </div>

        <button
          onClick={onAddTransaction}
          className="flex items-center gap-2 bg-ink-900 dark:bg-emerald-500 hover:bg-ink-800 dark:hover:bg-emerald-400 text-white dark:text-ink-900 px-4 py-2.5 rounded-xl font-semibold font-sans text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  )
}