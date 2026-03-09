import { useState } from 'react'
import { Sparkles, Eye, EyeOff, ArrowRight, Lock, Mail } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function LoginPage({ onLogin, onGoToRegister }) {
  const { isDark, toggleTheme } = useTheme()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = 'Enter a valid email address'
    if (!form.password || form.password.length < 6)
      errs.password = 'Password must be at least 6 characters'
    return errs
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    onLogin?.()
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-ink-950 flex transition-colors duration-300">

  
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-ink-900 dark:bg-ink-900 flex-col justify-between p-14">

      
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-emerald-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-emerald-400 rounded-full blur-[100px] opacity-10 pointer-events-none" />

       
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center">
            <Sparkles size={18} className="text-ink-900" />
          </div>
          <span className="font-display text-2xl font-bold text-white tracking-tight">FN</span>
        </div>
        <div className="relative">
          <p className="font-display text-3xl font-semibold text-white leading-snug mb-6">
            "Take control of<br />your money before<br />it controls you."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-ink-700 flex items-center justify-center text-lg">💼</div>
            <div>
              <p className="text-sm font-medium text-white font-sans">Personal Finance</p>
              <p className="text-xs text-ink-400 font-sans mt-0.5">Track · Budget · Grow</p>
            </div>
          </div>
        </div>
        <div className="relative flex gap-8">
          {[
            { label: 'Avg. savings boost', value: '+23%' },
            { label: 'Budget accuracy', value: '94%' },
            { label: 'Users on track', value: '9/10' },
          ].map(s => (
            <div key={s.label}>
              <p className="font-display text-2xl font-bold text-emerald-400">{s.value}</p>
              <p className="text-xs text-ink-400 font-sans mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 w-9 h-9 rounded-xl bg-cream-100 dark:bg-ink-800 border border-cream-200 dark:border-ink-700 flex items-center justify-center text-ink-500 dark:text-ink-400 hover:bg-cream-200 dark:hover:bg-ink-700 transition-all"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-xl bg-ink-900 dark:bg-emerald-500 flex items-center justify-center">
            <Sparkles size={14} className="text-emerald-400 dark:text-ink-900" />
          </div>
          <span className="font-display text-xl font-bold text-ink-900 dark:text-white">Fina</span>
        </div>

        <div className="w-full max-w-sm animate-fade-up">

        
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white mb-2 transition-colors">
              Welcome back
            </h1>
            <p className="text-sm text-ink-400 dark:text-ink-500 font-sans transition-colors">
              Sign in to your financial dashboard
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4" noValidate>

           
            <div>
              <label className="block text-xs font-medium font-sans uppercase tracking-wide text-ink-500 dark:text-ink-400 mb-1.5 transition-colors">
                Email address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300 dark:text-ink-600" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-ink-800 text-ink-900 dark:text-white placeholder-ink-300 dark:placeholder-ink-600 font-sans text-sm focus:outline-none focus:ring-2 transition-all
                    ${errors.email
                      ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-100 dark:focus:ring-rose-900 focus:border-rose-400'
                      : 'border-cream-200 dark:border-ink-700 focus:ring-emerald-100 dark:focus:ring-emerald-900 focus:border-emerald-400'}`}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-500 dark:text-rose-400 mt-1.5 font-sans">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium font-sans uppercase tracking-wide text-ink-500 dark:text-ink-400 transition-colors">
                  Password
                </label>
                <button type="button" className="text-xs font-sans text-emerald-600 dark:text-emerald-400 hover:underline transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300 dark:text-ink-600" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-white dark:bg-ink-800 text-ink-900 dark:text-white placeholder-ink-300 dark:placeholder-ink-600 font-sans text-sm focus:outline-none focus:ring-2 transition-all
                    ${errors.password
                      ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-100 dark:focus:ring-rose-900 focus:border-rose-400'
                      : 'border-cream-200 dark:border-ink-700 focus:ring-emerald-100 dark:focus:ring-emerald-900 focus:border-emerald-400'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-300 dark:text-ink-600 hover:text-ink-500 dark:hover:text-ink-400 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-rose-500 dark:text-rose-400 mt-1.5 font-sans">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 py-3.5 rounded-xl font-semibold font-sans text-sm flex items-center justify-center gap-2
                bg-ink-900 dark:bg-emerald-500 hover:bg-ink-800 dark:hover:bg-emerald-400
                text-white dark:text-ink-900
                transition-all duration-200
                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0'}`}
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 dark:border-ink-900/30 border-t-white dark:border-t-ink-900 rounded-full animate-spin" />
                : <>Sign in <ArrowRight size={15} /></>
              }
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-cream-200 dark:bg-ink-700 transition-colors" />
            <span className="text-xs text-ink-300 dark:text-ink-600 font-sans transition-colors">or</span>
            <div className="flex-1 h-px bg-cream-200 dark:bg-ink-700 transition-colors" />
          </div>

          {/* Switch to register */}
          <p className="text-center text-sm text-ink-400 dark:text-ink-500 font-sans transition-colors">
            Don't have an account?{' '}
            <button
              onClick={onGoToRegister}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline transition-colors"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}