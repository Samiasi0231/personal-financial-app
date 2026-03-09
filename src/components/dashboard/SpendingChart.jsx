import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { CATEGORIES, formatCurrency } from '../../utils/finance'
import { FaMoneyBillWave } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function SpendingChart({ spending, totalExpenses }) {
  const { isDark } = useTheme()

  const entries = useMemo(() =>
    Object.entries(spending).filter(([, v]) => v > 0).sort(([, a], [, b]) => b - a)
  , [spending])

  const hasData = entries.length > 0

  const data = useMemo(() => ({
    labels: entries.map(([id]) => CATEGORIES[id]?.label || id),
    datasets: [{
      data: entries.map(([, v]) => v),
      backgroundColor: entries.map(([id]) => CATEGORIES[id]?.color + 'CC' || '#888'),
      borderColor: isDark ? '#1A1A1A' : '#FFFFFF',
      borderWidth: 2,
      hoverBorderWidth: 3,
      hoverOffset: 8,
    }],
  }), [entries, isDark])

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#2A2A2A' : '#1A1A1A',
        titleColor: '#FAFAF7',
        bodyColor: '#C8C8C8',
        borderColor: isDark ? '#3A3A3A' : '#2A2A2A',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => {
            const pct = ((ctx.parsed / totalExpenses) * 100).toFixed(1)
            return ` ${formatCurrency(ctx.parsed)} (${pct}%)`
          },
        },
      },
    },
  }), [totalExpenses, isDark])

  return (
    <div className="bg-white dark:bg-ink-900 rounded-2xl p-6 shadow-soft border border-cream-200 dark:border-ink-700 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-white transition-colors">Spending Breakdown</h3>
          <p className="text-sm text-ink-400 dark:text-ink-500 font-sans mt-0.5 transition-colors">Where your money went</p>
        </div>
        <span className="text-sm font-mono font-medium text-ink-600 dark:text-ink-300 bg-cream-100 dark:bg-ink-800 px-3 py-1.5 rounded-xl transition-colors">
          {formatCurrency(totalExpenses)} total
        </span>
      </div>

      {hasData ? (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative flex-shrink-0" style={{ width: 180, height: 180 }}>
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-xs text-ink-400 dark:text-ink-500 font-sans transition-colors">Total</p>
              <p className="font-display font-semibold text-ink-900 dark:text-white text-lg leading-tight transition-colors">
                {formatCurrency(totalExpenses, true)}
              </p>
            </div>
          </div>
          <div className="flex-1 w-full">
            {entries.map(([catId, amount]) => {
              const cat = CATEGORIES[catId]
              const pct = ((amount / totalExpenses) * 100).toFixed(1)
              return (
                <div key={catId} className="flex items-center gap-3 mb-2.5 last:mb-0">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat?.color }} />
                  <span className="text-sm text-ink-600 dark:text-ink-300 font-sans flex-1 truncate transition-colors">{cat?.icon} {cat?.label}</span>
                  <span className="text-xs text-ink-400 dark:text-ink-500 font-mono w-10 text-right transition-colors">{pct}%</span>
                  <span className="text-sm font-mono font-medium text-ink-700 dark:text-ink-200 w-20 text-right transition-colors">
                    {formatCurrency(amount)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 text-center">
          <span className="text-3xl mb-3 text-ink-400 dark:text-ink-600"><FaMoneyBillWave /></span>
          <p className="text-sm text-ink-400 dark:text-ink-500 font-sans transition-colors">No expenses recorded this month</p>
          <p className="text-xs text-ink-200 dark:text-ink-700 font-sans mt-1 transition-colors">Add a transaction to see your breakdown</p>
        </div>
      )}
    </div>
  )
}