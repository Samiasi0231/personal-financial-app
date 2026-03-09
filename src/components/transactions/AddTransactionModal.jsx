import { useState } from 'react'
import { format } from 'date-fns'
import { DollarSign, Calendar, Tag, FileText, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import Modal from '../ui/Modal'
import { CATEGORIES, EXPENSE_CATEGORIES } from '../../utils/finance'
import toast from 'react-hot-toast'

const INITIAL = {
  type: 'expense', amount: '', category: 'food',
  description: '', date: format(new Date(), 'yyyy-MM-dd'),
}

export default function AddTransactionModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      errs.amount = 'Enter a valid amount'
    if (!form.description.trim()) errs.description = 'Description is required'
    if (!form.date) errs.date = 'Date is required'
    return errs
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 250))
    const category = form.type === 'income' ? 'income' : form.category
    onAdd({
      amount: parseFloat(Number(form.amount).toFixed(2)),
      category, description: form.description.trim(), date: form.date,
    })
    const cat = CATEGORIES[category]
    toast.success(`${cat?.icon} ${form.type === 'income' ? 'Income' : 'Expense'} added!`,
      { style: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px' } })
    setForm(INITIAL); setErrors({}); setSubmitting(false); onClose()
  }

  const handleClose = () => { setForm(INITIAL); setErrors({}); onClose() }

  const InputWrap = ({ label, icon: Icon, error, children }) => (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-ink-500 dark:text-ink-400 mb-1.5 font-sans uppercase tracking-wide transition-colors">
        <Icon size={12} />{label}
      </label>
      {children}
      {error && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 font-sans">{error}</p>}
    </div>
  )

  return (
    <Modal open={open} onClose={handleClose} title="Add Transaction" subtitle="Record a new income or expense">
      <form onSubmit={submit} className="space-y-5">
      
        <div className="grid grid-cols-2 gap-2 p-1 bg-cream-100 dark:bg-ink-800 rounded-xl transition-colors">
          {[
            { key: 'expense', label: 'Expense', icon: ArrowDownCircle, color: 'rose' },
            { key: 'income',  label: 'Income',  icon: ArrowUpCircle,   color: 'emerald' },
          ].map(({ key, label, icon: Icon, color }) => (
            <button key={key} type="button"
              onClick={() => { set('type', key); if (key === 'income') set('category', 'income') }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium font-sans transition-all duration-200
                ${form.type === key
                  ? color === 'rose'
                    ? 'bg-white dark:bg-ink-900 shadow-soft text-rose-600 border border-rose-100 dark:border-rose-900'
                    : 'bg-white dark:bg-ink-900 shadow-soft text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900'
                  : 'text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300'}`}
            >
              <Icon size={15} />{label}
            </button>
          ))}
        </div>

       
        <InputWrap label="Amount" icon={DollarSign} error={errors.amount}>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 font-mono text-lg font-medium">$</span>
            <input type="number" step="0.01" min="0" placeholder="0.00"
              value={form.amount} onChange={e => set('amount', e.target.value)}
              className={`w-full pl-9 pr-4 py-3 text-xl font-mono font-medium rounded-xl border bg-cream-50 dark:bg-ink-800 text-ink-900 dark:text-white placeholder-ink-200 dark:placeholder-ink-600 focus:outline-none focus:ring-2 transition-all
                ${errors.amount ? 'border-rose-300 focus:ring-rose-100 focus:border-rose-400' : 'border-cream-200 dark:border-ink-600 focus:ring-emerald-100 dark:focus:ring-emerald-900 focus:border-emerald-400'}`}
              autoFocus />
          </div>
        </InputWrap>

     
        {form.type === 'expense' && (
          <InputWrap label="Category" icon={Tag} error={errors.category}>
            <div className="grid grid-cols-4 gap-2">
              {EXPENSE_CATEGORIES.map(cat => (
                <button key={cat.id} type="button" onClick={() => set('category', cat.id)}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs font-sans transition-all duration-200
                    ${form.category === cat.id ? 'border-2 shadow-soft' : 'border-cream-200 dark:border-ink-600 hover:border-cream-300 dark:hover:border-ink-500 hover:bg-cream-50 dark:hover:bg-ink-700'}`}
                  style={form.category === cat.id ? { borderColor: cat.color, background: cat.bgLight, color: cat.textColor } : {}}>
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-center leading-tight truncate w-full text-center" style={{ fontSize: 10 }}>
                    {cat.label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </InputWrap>
        )}

      
        <InputWrap label="Description" icon={FileText} error={errors.description}>
          <input type="text"
            placeholder={form.type === 'income' ? 'e.g. Monthly salary, freelance...' : 'e.g. Weekly groceries, Uber...'}
            value={form.description} onChange={e => set('description', e.target.value)} maxLength={80}
            className={`w-full px-4 py-3 rounded-xl border bg-cream-50 dark:bg-ink-800 text-ink-900 dark:text-white placeholder-ink-200 dark:placeholder-ink-600 font-sans text-sm focus:outline-none focus:ring-2 transition-all
              ${errors.description ? 'border-rose-300 focus:ring-rose-100 focus:border-rose-400' : 'border-cream-200 dark:border-ink-600 focus:ring-emerald-100 dark:focus:ring-emerald-900 focus:border-emerald-400'}`}
          />
        </InputWrap>

     
        <InputWrap label="Date" icon={Calendar} error={errors.date}>
          <input type="date" value={form.date} max={format(new Date(), 'yyyy-MM-dd')}
            onChange={e => set('date', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border bg-cream-50 dark:bg-ink-800 text-ink-900 dark:text-white font-sans text-sm focus:outline-none focus:ring-2 transition-all cursor-pointer
              ${errors.date ? 'border-rose-300 focus:ring-rose-100 focus:border-rose-400' : 'border-cream-200 dark:border-ink-600 focus:ring-emerald-100 dark:focus:ring-emerald-900 focus:border-emerald-400'}`}
          />
        </InputWrap>

       
        <button type="submit" disabled={submitting}
          className={`w-full py-3.5 rounded-xl font-semibold font-sans text-sm transition-all duration-200 flex items-center justify-center gap-2
            ${submitting ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-lift'}
            ${form.type === 'income' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-ink-900 dark:bg-white hover:bg-ink-800 dark:hover:bg-cream-100 text-white dark:text-ink-900'}`}
        >
          {submitting
            ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <>{form.type === 'income' ? <ArrowUpCircle size={16} /> : <ArrowDownCircle size={16} />} Add {form.type === 'income' ? 'Income' : 'Expense'}</>
          }
        </button>
      </form>
    </Modal>
  )
}