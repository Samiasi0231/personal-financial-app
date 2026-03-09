import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { formatCurrency } from '../../utils/finance'
import { useTheme } from '../../context/ThemeContext'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function TrendChart({ trend }) {
  const { isDark } = useTheme()

  const tickColor  = isDark ? '#6B7280' : '#8A8A8A'
  const gridColor  = isDark ? '#2A2A2A' : '#F5F5EF'
  const legendColor = isDark ? '#9CA3AF' : '#6B7280'

  const data = useMemo(() => ({
    labels: trend.map(t => t.label),
    datasets: [
      {
        label: 'Income',
        data: trend.map(t => t.income),
        backgroundColor: '#10B98122',
        borderColor: '#10B981',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: '#10B98133',
      },
      {
        label: 'Expenses',
        data: trend.map(t => t.expenses),
        backgroundColor: '#F43F5E1A',
        borderColor: '#F43F5E',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: '#F43F5E28',
      },
    ],
  }), [trend])

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
          color: legendColor,
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#2A2A2A' : '#1A1A1A',
        titleColor: '#FAFAF7',
        bodyColor: '#C8C8C8',
        borderColor: isDark ? '#3A3A3A' : '#2A2A2A',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 }, color: tickColor },
      },
      y: {
        grid: { color: gridColor, drawBorder: false },
        border: { display: false, dash: [4, 4] },
        ticks: {
          font: { family: "'JetBrains Mono', monospace", size: 11 },
          color: tickColor,
          callback: (v) => formatCurrency(v, true),
        },
      },
    },
    interaction: { mode: 'index', intersect: false },
  }), [isDark, tickColor, gridColor, legendColor])

  return (
    <div className="bg-white dark:bg-ink-900 rounded-2xl p-6 shadow-soft border border-cream-200 dark:border-ink-700 transition-colors duration-300">
      <div className="mb-6">
        <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-white transition-colors">6-Month Trend</h3>
        <p className="text-sm text-ink-400 dark:text-ink-500 font-sans mt-0.5 transition-colors">Income vs. expenses over time</p>
      </div>
      <div style={{ height: 220 }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}