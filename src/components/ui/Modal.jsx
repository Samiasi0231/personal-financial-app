import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, subtitle, children, size = 'md' }) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [open, onClose])

  if (!open) return null
  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl' }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-ink-950/50 dark:bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]}
        bg-white dark:bg-ink-900
        rounded-t-3xl sm:rounded-2xl shadow-lift animate-scale-in
        max-h-[92vh] flex flex-col sm:animate-fade-up
        border-0 dark:border dark:border-ink-700 transition-colors`}>
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white transition-colors">{title}</h2>
            {subtitle && <p className="text-sm text-ink-400 dark:text-ink-500 mt-0.5 font-sans transition-colors">{subtitle}</p>}
          </div>
          <button onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-cream-100 dark:hover:bg-ink-700 transition-colors text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-200 ml-4 flex-shrink-0">
            <X size={18} />
          </button>
        </div>
        <div className="h-px bg-cream-200 dark:bg-ink-700 mx-6 transition-colors" />
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  )
}