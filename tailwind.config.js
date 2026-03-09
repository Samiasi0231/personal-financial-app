/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cream: { 50: '#FAFAF7', 100: '#F5F5EF', 200: '#EEEEE5' },
        ink:   { 50: '#F8F8F8', 100: '#E8E8E8', 200: '#C8C8C8', 400: '#8A8A8A', 600: '#4A4A4A', 800: '#2A2A2A', 900: '#1A1A1A', 950: '#0F0F0F' },
        emerald: { 50:'#ECFDF5', 100:'#D1FAE5', 400:'#34D399', 500:'#10B981', 600:'#059669', 700:'#047857' },
        rose:   { 50:'#FFF1F2', 100:'#FFE4E6', 400:'#FB7185', 500:'#F43F5E', 600:'#E11D48' },
        amber:  { 50:'#FFFBEB', 100:'#FEF3C7', 400:'#FBBF24', 500:'#F59E0B', 600:'#D97706' },
        violet: { 50:'#F5F3FF', 100:'#EDE9FE', 400:'#A78BFA', 500:'#8B5CF6', 600:'#7C3AED' },
        sky:    { 50:'#F0F9FF', 100:'#E0F2FE', 400:'#38BDF8', 500:'#0EA5E9', 600:'#0284C7' },
      },
      boxShadow: {
        'soft':  '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card':  '0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
        'lift':  '0 8px 30px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        'glow-green': '0 0 20px rgba(16,185,129,0.25)',
        'glow-rose':  '0 0 20px rgba(244,63,94,0.20)',
      },
      animation: {
        'fade-up':    'fadeUp 0.4s ease forwards',
        'fade-in':    'fadeIn 0.3s ease forwards',
        'slide-in':   'slideIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':   'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards',
        'count-up':   'countUp 0.6s ease forwards',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp:   { from:{opacity:0,transform:'translateY(12px)'}, to:{opacity:1,transform:'translateY(0)'} },
        fadeIn:   { from:{opacity:0}, to:{opacity:1} },
        slideIn:  { from:{transform:'translateX(100%)'}, to:{transform:'translateX(0)'} },
        scaleIn:  { from:{opacity:0,transform:'scale(0.95)'}, to:{opacity:1,transform:'scale(1)'} },
        countUp:  { from:{opacity:0,transform:'translateY(6px)'}, to:{opacity:1,transform:'translateY(0)'} },
        shimmer:  { '0%,100%':{opacity:1}, '50%':{opacity:.5} },
      }
    }
  },
  plugins: [],
}
