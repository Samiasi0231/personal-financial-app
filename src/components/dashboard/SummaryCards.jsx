import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react'
import { formatCurrency } from '../../utils/finance'

function StatCard({ label, value, icon: Icon, trend, color, delay = 0, subtitle }) {
  return (
    <div
      className="bg-white dark:bg-ink-900 rounded-2xl p-5 shadow-soft border border-cream-200 dark:border-ink-700 hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: color + '22' }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full font-sans
            ${trend >= 0 ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                        : 'bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
          </span>
        )}
      </div>
      <p className="text-sm text-ink-400 dark:text-ink-500 font-sans mb-1 transition-colors">{label}</p>
      <p className="font-display text-2xl font-semibold text-ink-900 dark:text-white leading-tight tracking-tight transition-colors">
        {formatCurrency(value)}
      </p>
      {subtitle && (
        <p className="text-xs text-ink-400 dark:text-ink-500 mt-1.5 font-sans transition-colors">{subtitle}</p>
      )}
    </div>
  )
}

function SavingsRingCard({ rate, balance }) {
  const clamped = Math.max(0, Math.min(100, rate))
  const r = 28
  const circ = 2 * Math.PI * r
  const dash = (clamped / 100) * circ
  const color = rate >= 20 ? '#10B981' : rate >= 10 ? '#F59E0B' : '#F43F5E'

  return (
    <div className="bg-white dark:bg-ink-900 rounded-2xl p-5 shadow-soft border border-cream-200 dark:border-ink-700 hover:shadow-card transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + '22' }}>
          <PiggyBank size={18} style={{ color }} />
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full font-sans"
          style={{ background: color + '18', color }}>
          of income
        </span>
      </div>
      <p className="text-sm text-ink-400 dark:text-ink-500 font-sans mb-1 transition-colors">Savings Rate</p>
      <div className="flex items-center gap-4">
        <div>
          <p className="font-display text-2xl font-semibold text-ink-900 dark:text-white leading-tight transition-colors">
            {clamped.toFixed(1)}%
          </p>
          <p className="text-xs text-ink-400 dark:text-ink-500 mt-1 font-sans transition-colors">
            {balance >= 0 ? '+' : ''}{formatCurrency(balance)} saved
          </p>
        </div>
        <svg width="72" height="72" viewBox="0 0 72 72" className="flex-shrink-0 -rotate-90">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#2A2A2A" strokeWidth="6" className="dark:stroke-ink-700" />
          <circle cx="36" cy="36" r={r} fill="none"
            stroke={color} strokeWidth="6"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
      </div>
    </div>
  )
}

export default function SummaryCards({ summary }) {
  const { income, expenses, balance, savingsRate } = summary
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total Income"    value={income}            icon={TrendingUp}   color="#10B981" delay={0}   subtitle="This month" />
      <StatCard label="Total Expenses"  value={expenses}          icon={TrendingDown} color="#F43F5E" delay={50}  subtitle="This month" />
      <StatCard label="Net Balance"     value={Math.abs(balance)} icon={Wallet}
        color={balance >= 0 ? '#10B981' : '#F43F5E'} delay={100}
        subtitle={balance >= 0 ? 'Under budget 🎉' : 'Over budget ⚠️'} />
      <SavingsRingCard rate={savingsRate} balance={balance} />
    </div>
  )
}