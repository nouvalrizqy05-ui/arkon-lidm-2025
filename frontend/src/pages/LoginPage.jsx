import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Cpu, Mail, Lock, User, ArrowRight, AlertCircle, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        await register(formData.name, formData.email, formData.password)
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center relative bg-slate-50 dark:bg-slate-950">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fadeInUp">
        {/* Branding Area */}
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-600 to-emerald-500 shadow-xl shadow-indigo-500/20 mb-6">
              <Cpu className="w-8 h-8 text-white" strokeWidth={2.5} />
           </div>
           <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
             {isLogin ? 'Selamat Datang Kembali' : 'Bergabung dengan ARKON'}
           </h2>
           <p className="text-slate-500 dark:text-slate-400 font-medium">
             {isLogin ? 'Masuk untuk melanjutkan petualangan AR kamu.' : 'Mulai perjalanan belajar arsitektur komputer modern.'}
           </p>
        </div>

        {/* Auth Card */}
        <div className="glass-strong p-8 sm:p-10">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 flex items-start gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <p className="text-rose-600 dark:text-rose-400 text-sm font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Contoh: Budi Arsitek"
                    required
                    className="input pl-11"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-1.5">
               <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
               <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input
                   type="email"
                   placeholder="name@email.com"
                   required
                   className="input pl-11"
                   value={formData.email}
                   onChange={e => setFormData({ ...formData, email: e.target.value })}
                 />
               </div>
            </div>

            <div className="space-y-1.5">
               <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
               <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input
                   type="password"
                   placeholder="••••••••"
                   required
                   className="input pl-11"
                   value={formData.password}
                   onChange={e => setFormData({ ...formData, password: e.target.value })}
                 />
               </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? 'Memproses Sistem...' : (isLogin ? 'Masuk ke Dashboard' : 'Daftar Akun Baru')}
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </span>
                {loading && (
                   <div className="absolute inset-0 bg-white/10 animate-pulse" />
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 flex items-center gap-4">
             <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Pilihan Lain</span>
             <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-indigo-600 dark:text-emerald-400 hover:underline font-bold text-sm tracking-tight transition-all"
            >
              {isLogin ? 'Belum punya akun? Daftar gratis sekarang' : 'Sudah punya akun? Masuk di sini'}
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 flex items-center justify-center gap-6 opacity-40">
           <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">LIDM 2025</span>
           </div>
           <div className="w-[1px] h-4 bg-slate-400" />
           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">UNNES ITDP</span>
        </div>
      </div>
    </div>
  )
}