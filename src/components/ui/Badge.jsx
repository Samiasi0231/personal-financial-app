import { CATEGORIES } from '../../utils/finance'

export function CategoryBadge({ categoryId, size = 'sm' }) {
  const cat = CATEGORIES[categoryId]
  if (!cat) return null

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-sans font-medium rounded-full
        ${size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5'}
      `}
      style={{ background: cat.bgLight, color: cat.textColor }}
    >
      <span className={size === 'sm' ? 'text-xs' : 'text-sm'}>{cat.icon}</span>
      {cat.label}
    </span>
  )
}

export function AmountPill({ amount, type, size = 'sm' }) {
  const isIncome = type === 'income'
  return (
    <span className={`
      font-mono font-medium rounded-lg inline-block
      ${size === 'sm' ? 'text-sm px-2 py-0.5' : 'text-base px-2.5 py-1'}
      ${isIncome
        ? 'text-emerald-700 bg-emerald-50'
        : 'text-rose-600 bg-rose-50'}
    `}>
      {isIncome ? '+' : '−'}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
    </span>
  )
}

export function Chip({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-cream-100 text-ink-600',
    success: 'bg-emerald-50 text-emerald-700',
    danger:  'bg-rose-50 text-rose-600',
    warning: 'bg-amber-50 text-amber-700',
    info:    'bg-sky-50 text-sky-700',
  }
  return (
    <span className={`
      inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full
      ${variants[variant]} ${className}
    `}>
      {children}
    </span>
  )
}
