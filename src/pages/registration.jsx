import { useState } from 'react'
import { Sparkles, Eye, EyeOff, ArrowRight, Lock, Mail, User, Check } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const rules = [
  { label: 'At least 8 characters', test: v => v.length >= 8 },
  { label: 'One uppercase letter',  test: v => /[A-Z]/.test(v) },
  { label: 'One number',            test: v => /[0-9]/.test(v) },
]

export default function RegisterPage({ onRegister, onGoToLogin }) {
  const { isDark, toggleTheme } = useTheme()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = 'Enter your full name'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = 'Enter a valid email address'
    if (form.password.length < 8)
      errs.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirm)
      errs.confirm = 'Passwords do not match'
    return errs
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    onRegister?.()
  }

  const passStrength = rules.filter(r => r.test(form.password)).length
  const strengthColor = passStrength === 3 ? '#10B981' : passStrength === 2 ? '#F59E0B' : '#F43F5E'
  const strengthLabel = passStrength === 3 ? 'Strong' : passStrength === 2 ? 'Fair' : passStrength === 1 ? 'Weak' : ''

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-ink-950 flex transition-colors duration-300">

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-ink-900 flex-col justify-between p-14">

        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-emerald-500 rounded-full blur-[140px] opacity-15 pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/3 w-60 h-60 bg-emerald-400 rounded-full blur-[100px] opacity-10 pointer-events-none" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center">
            <Sparkles size={18} className="text-ink-900" />
          </div>
          <span className="font-display text-2xl font-bold text-white tracking-tight">FN</span>
        </div>

    
        <div className="relative">
          <p className="font-display text-3xl font-semibold text-white leading-snug mb-8">
            Everything you need<br />to master your<br />finances.
          </p>
          <ul className="space-y-4">
            {[
              { icon: '📊', text: 'Visual spending breakdowns by category' },
              { icon: '🎯', text: 'Set budgets and track in real-time' },
              { icon: '📈', text: '6-month income vs expense trends' },
              { icon: '🔒', text: 'All data stored locally — fully private' },
            ].map(f => (
              <li key={f.text} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-ink-700 flex items-center justify-center text-sm flex-shrink-0">
                  {f.icon}
                </span>
                <span className="text-sm text-ink-200 font-sans">{f.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-ink-600 font-sans">
          Free forever · No credit card required
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 w-9 h-9 rounded-xl bg-cream-100 dark:bg-ink-800 border border-cream-200 dark:border-ink-700 flex items-center justify-center text-ink-500 dark:text-ink-400 hover:bg-cream-200 dark:hover:bg-ink-700 transition-all"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-xl bg-ink-900 dark:bg-emerald-500 flex items-center justify-center">
            <Sparkles size={14} className="text-emerald-400 dark:text-ink-900" />
          </div>
          <span className="font-display text-xl font-bold text-ink-900 dark:text-white">FN</span>
        </div>

        <div className="w-full max-w-sm animate-fade-up">

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white mb-2 transition-colors">
              Create your account
            </h1>
            <p className="text-sm text-ink-400 dark:text-ink-500 font-sans transition-colors">
              Start tracking your finances today
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4" noValidate>

            <div>
              <label className="block text-xs font-medium font-sans uppercase tracking-wide text-ink-500 dark:text-ink-400 mb-1.5 transition-colors">
                Full name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300 dark:text-ink-600" />
                <input
                  type="text"
                  placeholder="sam"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-ink-800 text-ink-900 dark:text-white placeholder-ink-300 dark:placeholder-ink-600 font-sans text-sm focus:outline-none focus:ring-2 transition-all
                    ${errors.name
                      ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-100 dark:focus:ring-rose-900 focus:border-rose-400'
                      : 'border-cream-200 dark:border-ink-700 focus:ring-emerald-100 dark:focus:ring-emerald-900 focus:border-emerald-400'}`}
                />
              </div>
              {errors.name && <p className="text-xs text-rose-500 dark:text-rose-400 mt-1.5 font-sans">{errors.name}</p>}
            </div>

            
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
              <label className="block text-xs font-medium font-sans uppercase tracking-wide text-ink-500 dark:text-ink-400 mb-1.5 transition-colors">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300 dark:text-ink-600" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-white dark:bg-ink-800 text-ink-900 dark:text-white placeholder-ink-300 dark:placeholder-ink-600 font-sans text-sm focus:outline-none focus:ring-2 transition-all
                    ${errors.password
                      ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-100 dark:focus:ring-rose-900 focus:border-rose-400'
                      : 'border-cream-200 dark:border-ink-700 focus:ring-emerald-100 dark:focus:ring-emerald-900 focus:border-emerald-400'}`}
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-300 dark:text-ink-600 hover:text-ink-500 dark:hover:text-ink-400 transition-colors">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-rose-500 dark:text-rose-400 mt-1.5 font-sans">{errors.password}</p>}

              {form.password.length > 0 && (
                <div className="mt-2.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                          style={{ background: i < passStrength ? strengthColor : '#E8E8E8' }}
                        />
                      ))}
                    </div>
                    {strengthLabel && (
                      <span className="text-xs font-medium font-sans transition-colors"
                        style={{ color: strengthColor }}>
                        {strengthLabel}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {rules.map(r => (
                      <span key={r.label}
                        className={`text-xs font-sans flex items-center gap-1 transition-colors
                          ${r.test(form.password) ? 'text-emerald-600 dark:text-emerald-400' : 'text-ink-300 dark:text-ink-600'}`}>
                        <Check size={10} />
                        {r.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

    
            <div>
              <label className="block text-xs font-medium font-sans uppercase tracking-wide text-ink-500 dark:text-ink-400 mb-1.5 transition-colors">
                Confirm password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300 dark:text-ink-600" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={e => set('confirm', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-ink-800 text-ink-900 dark:text-white placeholder-ink-300 dark:placeholder-ink-600 font-sans text-sm focus:outline-none focus:ring-2 transition-all
                    ${errors.confirm
                      ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-100 dark:focus:ring-rose-900 focus:border-rose-400'
                      : form.confirm && form.confirm === form.password
                        ? 'border-emerald-300 dark:border-emerald-700 focus:ring-emerald-100 focus:border-emerald-400'
                        : 'border-cream-200 dark:border-ink-700 focus:ring-emerald-100 dark:focus:ring-emerald-900 focus:border-emerald-400'}`}
                />
                {form.confirm && form.confirm === form.password && (
                  <Check size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                )}
              </div>
              {errors.confirm && <p className="text-xs text-rose-500 dark:text-rose-400 mt-1.5 font-sans">{errors.confirm}</p>}
            </div>

        
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
                : <>Create account <ArrowRight size={15} /></>
              }
            </button>

            <p className="text-center text-xs text-ink-300 dark:text-ink-600 font-sans transition-colors">
              By creating an account you agree to our{' '}
              <button type="button" className="text-ink-400 dark:text-ink-500 hover:underline">Terms</button>
              {' '}and{' '}
              <button type="button" className="text-ink-400 dark:text-ink-500 hover:underline">Privacy Policy</button>
            </p>
          </form>
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-cream-200 dark:bg-ink-700 transition-colors" />
            <span className="text-xs text-ink-300 dark:text-ink-600 font-sans">or</span>
            <div className="flex-1 h-px bg-cream-200 dark:bg-ink-700 transition-colors" />
          </div>

          
          <p className="text-center text-sm text-ink-400 dark:text-ink-500 font-sans transition-colors">
            Already have an account?{' '}
            <button onClick={onGoToLogin}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline transition-colors">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}