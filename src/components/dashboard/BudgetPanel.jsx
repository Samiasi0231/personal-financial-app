import { useState } from 'react'
import { Settings, Check, X } from 'lucide-react'
import { CATEGORIES, formatCurrency } from '../../utils/finance'

function BudgetRow({ status, onEdit }) {
  const cat = CATEGORIES[status.catId]
  if (!cat) return null

  const barColor = status.pct >= 100 ? '#F43F5E' : status.pct >= 80 ? '#F59E0B' : '#10B981'

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-base">{cat.icon}</span>
          <span className="text-sm font-medium text-ink-700 font-sans">{cat.label}</span>
          {status.overBudget && (
            <span className="text-xs bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-full font-medium">
              Over!
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-ink-400">
            {formatCurrency(status.spent)} / {formatCurrency(status.limit)}
          </span>
          <button
            onClick={() => onEdit(status.catId)}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-cream-100 text-ink-400 hover:text-ink-600 transition-all"
          >
            <Settings size={13} />
          </button>
        </div>
      </div>
     
      <div className="h-2 bg-cream-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${status.pct}%`,
            background: barColor,
            boxShadow: `0 0 6px ${barColor}66`,
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-ink-400 font-sans">
          {status.overBudget
            ? `${formatCurrency(status.spent - status.limit)} over limit`
            : `${formatCurrency(status.limit - status.spent)} remaining`}
        </span>
        <span className="text-xs font-mono" style={{ color: barColor }}>
          {status.pct.toFixed(0)}%
        </span>
      </div>
    </div>
  )
}

function EditBudgetInline({ catId, current, onSave, onCancel }) {
  const [val, setVal] = useState(String(current))
  const cat = CATEGORIES[catId]

  return (
    <div className="bg-cream-50 border border-cream-200 rounded-xl p-3 flex items-center gap-3">
      <span className="text-lg">{cat?.icon}</span>
      <span className="text-sm font-medium text-ink-700 font-sans flex-1">{cat?.label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-ink-400">$</span>
        <input
          type="number"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') onSave(Number(val))
            if (e.key === 'Escape') onCancel()
          }}
          className="w-24 text-sm font-mono border border-cream-200 rounded-lg px-2 py-1.5 bg-white text-ink-900 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 text-right"
          autoFocus
        />
        <button
          onClick={() => onSave(Number(val))}
          className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
        >
          <Check size={13} />
        </button>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg hover:bg-cream-200 text-ink-400 transition-colors"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  )
}

export default function BudgetPanel({ budgetStatus, onUpdateBudget }) {
  const [editingCat, setEditingCat] = useState(null)

  const overBudgetCount = budgetStatus.filter(s => s.overBudget).length

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-cream-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-900">Monthly Budgets</h3>
          <p className="text-sm text-ink-400 font-sans mt-0.5">
            {overBudgetCount > 0
              ? <span className="text-rose-600">{overBudgetCount} category over limit</span>
              : <span className="text-emerald-600">All categories within budget ✓</span>
            }
          </p>
        </div>
        <span className="text-xs text-ink-400 font-sans hidden sm:block">Hover to edit</span>
      </div>

      <div className="space-y-5">
        {budgetStatus.map(status => (
          editingCat === status.catId ? (
            <EditBudgetInline
              key={status.catId}
              catId={status.catId}
              current={status.limit}
              onSave={(v) => { onUpdateBudget(status.catId, v); setEditingCat(null) }}
              onCancel={() => setEditingCat(null)}
            />
          ) : (
            <BudgetRow
              key={status.catId}
              status={status}
              onEdit={setEditingCat}
            />
          )
        ))}
      </div>
    </div>
  )
}
