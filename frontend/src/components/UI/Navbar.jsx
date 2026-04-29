import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Cpu, Menu, X, Home, BookOpen, Brain,
  BarChart3, LogIn, ChevronRight, Network,
  Sun, Moon
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const NAV_ITEMS = [
  { path: '/', label: 'Beranda', icon: Home },
  { path: '/topics', label: 'Topik AR', icon: BookOpen },
  { path: '/quiz', label: 'Kuis', icon: Brain },
  { path: '/workspace', label: 'Workspace AI', icon: Network },
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm'
          : 'bg-transparent'
        }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo (Prodify Style) */}
          <Link to="/" className="flex items-center gap-3 group" id="nav-logo">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-300">
              <Cpu className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex items-baseline gap-0">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tighter">AR</span>
              <span className="text-2xl font-extrabold gradient-text-static tracking-tighter">KON</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${active
                      ? 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-400/10'
                      : 'text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop Login & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-violet-600 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              to="/login"
              className="flex items-center gap-2 px-7 py-2.5 rounded-2xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-violet-600 dark:hover:bg-violet-500 shadow-xl shadow-slate-900/10 dark:shadow-violet-500/20 transition-all duration-200"
            >
              Masuk / Daftar
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-50"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${active
                    ? 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-400/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  {item.label}
                </div>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </Link>
            )
          })}
          <div className="pt-3">
            <Link
              to="/login"
              className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold text-white bg-violet-600 hover:bg-violet-500 transition-all shadow-lg shadow-violet-500/20"
            >
              <LogIn className="w-5 h-5" />
              Masuk / Daftar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
