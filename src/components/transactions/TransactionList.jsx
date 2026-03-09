import { useState, useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { Trash2, Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { CATEGORIES, formatCurrencyFull } from '../../utils/finance'
import toast from 'react-hot-toast'

function TransactionItem({ tx, onDelete }) {
  const cat = CATEGORIES[tx.category]
  const isIncome = tx.category === 'income'

  return (
    <div className="flex items-center gap-3 py-3.5 border-b border-cream-100 dark:border-ink-700 last:border-0 group hover:bg-cream-50 dark:hover:bg-ink-800 -mx-2 px-2 rounded-lg transition-colors">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
        style={{ background: cat?.bgLight || '#F5F5EF' }}>
        {cat?.icon || '📦'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink-800 dark:text-ink-100 truncate font-sans leading-tight transition-colors">
          {tx.description}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-ink-400 dark:text-ink-500 font-sans transition-colors">
            {format(parseISO(tx.date), 'MMM d, yyyy')}
          </span>
          <span className="text-ink-200 dark:text-ink-700 text-xs">·</span>
          <span className="text-xs font-medium truncate" style={{ color: cat?.textColor }}>
            {cat?.label}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`font-mono text-sm font-semibold ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-ink-800 dark:text-ink-100'} transition-colors`}>
          {isIncome ? '+' : '−'}{formatCurrencyFull(tx.amount)}
        </span>
        <button
          onClick={() => onDelete(tx.id)}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 text-ink-300 hover:text-rose-500 transition-all"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  )
}

export default function TransactionList({ transactions, onDelete }) {
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = [...transactions]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(t =>
        t.description.toLowerCase().includes(q) ||
        CATEGORIES[t.category]?.label.toLowerCase().includes(q)
      )
    }
    if (filterCat !== 'all') list = list.filter(t => t.category === filterCat)
    return list
  }, [transactions, search, filterCat])

  const grouped = useMemo(() => {
    const groups = {}
    filtered.forEach(tx => {
      if (!groups[tx.date]) groups[tx.date] = []
      groups[tx.date].push(tx)
    })
    return Object.entries(groups).sort(([a], [b]) => new Date(b) - new Date(a))
  }, [filtered])

  const handleDelete = (id) => {
    onDelete(id)
    toast.success('Transaction removed', {
      icon: '🗑️',
      style: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px' }
    })
  }

  return (
    <div className="bg-white dark:bg-ink-900 rounded-2xl shadow-soft border border-cream-200 dark:border-ink-700 transition-colors duration-300">
      <div className="p-5 border-b border-cream-100 dark:border-ink-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-white transition-colors">Transactions</h3>
            <p className="text-sm text-ink-400 dark:text-ink-500 font-sans mt-0.5 transition-colors">
              {filtered.length} of {transactions.length} this month
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 text-xs font-medium font-sans px-3 py-1.5 rounded-xl transition-colors
              ${showFilters
                ? 'bg-ink-900 dark:bg-white text-white dark:text-ink-900'
                : 'bg-cream-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-cream-200 dark:hover:bg-ink-700'}`}
          >
            <SlidersHorizontal size={13} />
            Filter
            <ChevronDown size={13} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300 dark:text-ink-600" />
          <input
            type="text"
            placeholder="Search transactions…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-cream-200 dark:border-ink-600 bg-cream-50 dark:bg-ink-800 text-sm font-sans text-ink-900 dark:text-white placeholder-ink-300 dark:placeholder-ink-600 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-900 focus:border-emerald-400 transition-all"
          />
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setFilterCat('all')}
              className={`text-xs px-3 py-1.5 rounded-full font-medium font-sans transition-colors
                ${filterCat === 'all'
                  ? 'bg-ink-900 dark:bg-white text-white dark:text-ink-900'
                  : 'bg-cream-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-cream-200 dark:hover:bg-ink-700'}`}
            >
              All
            </button>
            {Object.values(CATEGORIES).map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCat(cat.id)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium font-sans transition-all
                  ${filterCat === cat.id
                    ? 'text-white'
                    : 'bg-cream-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-cream-200 dark:hover:bg-ink-700'}`}
                style={filterCat === cat.id ? { background: cat.color } : {}}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-2 max-h-[480px] overflow-y-auto scrollbar-thin">
        {grouped.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-sm text-ink-400 dark:text-ink-500 font-sans transition-colors">No transactions found</p>
            <p className="text-xs text-ink-300 dark:text-ink-600 mt-1 font-sans transition-colors">
              {search || filterCat !== 'all' ? 'Try adjusting your filters' : 'Add your first transaction above'}
            </p>
          </div>
        ) : (
          grouped.map(([date, txs]) => (
            <div key={date} className="px-2">
              <div className="flex items-center gap-2 py-2">
                <span className="text-xs font-semibold text-ink-400 dark:text-ink-500 font-sans uppercase tracking-wider transition-colors">
                  {format(parseISO(date), 'EEEE, MMM d')}
                </span>
                <div className="flex-1 h-px bg-cream-100 dark:bg-ink-700 transition-colors" />
                <span className="text-xs font-mono text-ink-400 dark:text-ink-500 transition-colors">
                  {txs.reduce((s, t) => t.category === 'income' ? s + t.amount : s - t.amount, 0) >= 0 ? '+' : ''}
                  ${Math.abs(txs.reduce((s, t) => t.category === 'income' ? s + t.amount : s - t.amount, 0)).toFixed(0)}
                </span>
              </div>
              {txs.map(tx => <TransactionItem key={tx.id} tx={tx} onDelete={handleDelete} />)}
            </div>
          ))
        )}
      </div>
    </div>
  )
}