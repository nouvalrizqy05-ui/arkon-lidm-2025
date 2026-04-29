import { useNavigate } from 'react-router-dom'
import {
  Cpu, Eye, Layers, Brain, Zap, BookOpen,
  ArrowRight, Sparkles, Monitor, CircuitBoard,
  GraduationCap, Target, ChevronDown
} from 'lucide-react'

const FEATURES = [
  {
    icon: Eye,
    title: 'AR Component Viewer',
    desc: 'Scan halaman buku — komponen CPU muncul 3D langsung di layar handphone Anda',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: Layers,
    title: 'Data Flow Animator',
    desc: 'Lihat alur data CPU → RAM → Cache secara real-time dengan animasi interaktif',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Zap,
    title: 'Pipeline Simulator',
    desc: 'Step-by-step eksekusi instruksi di pipeline 5 tahap — IF, ID, EX, MEM, WB',
    color: 'from-violet-400 to-pink-400',
  },
  {
    icon: Brain,
    title: 'Kuis Interaktif',
    desc: 'Uji pemahaman dengan kuis 12+ topik arsitektur komputer dalam Bahasa Indonesia',
    color: 'from-pink-600 to-violet-600',
  },
]

const STATS = [
  { value: '12+', label: 'Topik OAK', icon: BookOpen },
  { value: '3', label: 'AR Viewer', icon: Monitor },
  { value: '60+', label: 'Soal Kuis', icon: Brain },
  { value: '100%', label: 'Bahasa Indonesia', icon: GraduationCap },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-slate-950">
      {/* ═══ BACKGROUND BLOBS (PRODIFY STYLE) ═══ */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="blob w-[500px] h-[500px] bg-violet-400/10 top-[-100px] left-[-100px] animate-pulse" />
        <div className="blob w-[600px] h-[600px] bg-pink-400/10 bottom-[-100px] right-[-100px] animate-pulse delay-700" />
        <div className="blob w-[300px] h-[300px] bg-blue-400/5 top-1/2 left-1/4" />
      </div>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20" id="hero">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fadeInDown inline-flex items-center gap-2 px-6 py-2 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 mb-12 shadow-sm">
            <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-violet-600 dark:text-violet-400 text-xs font-bold tracking-[0.1em] uppercase">Sistem Pembelajaran OAK #1 Untuk Mahasiswa</span>
          </div>

          {/* Main Title (Prodify Style) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1] animate-fadeInUp">
            Ubah Diagram Statis Jadi <br/>
            <span className="gradient-text">Eksplorasi Interaktif.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-3xl mx-auto mb-12 leading-relaxed animate-fadeInUp delay-100">
            Diagram di buku bikin pusing? ARKON menggabungkan <span className="text-violet-600 font-bold">Augmented Reality</span>,
            <span className="text-violet-600 font-bold"> Simulator Pipeline</span>, dan <span className="text-pink-600 font-bold"> AI Tutor</span> ke dalam
            satu platform belajar ala game RPG.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fadeInUp delay-200">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary group text-lg"
            >
              Masuk ke Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/topics')}
              className="btn-secondary text-lg"
            >
              Coba Mode Demo 🎮
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 animate-fadeIn delay-300">
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-slate-300 hover:text-violet-500 transition-colors"
            >
              <ChevronDown className="w-8 h-8 mx-auto animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES SECTION ═══ */}
      <section className="relative py-32 px-4 bg-slate-50/30 dark:bg-slate-900/20" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="badge badge-primary mb-6">Bento Fitur</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Belajar Arsitektur Komputer <span className="gradient-text-static">Masa Depan</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-semibold text-lg">
              Kami menghadirkan teknologi AR mutakhir untuk membantu Anda memvisualisasikan sistem komputer yang kompleks secara intuitif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon
              return (
                <div
                  key={i}
                  className="glass p-10 hover:translate-y-[-10px] transition-all duration-300 group cursor-pointer border-transparent hover:border-violet-500/20"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-4 tracking-tight">{feat.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-semibold">{feat.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative py-24 px-4 bg-violet-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center text-white">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-4xl font-extrabold mb-2">{stat.value}</div>
                  <div className="text-violet-100 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA BOTTOM ═══ */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative glass-strong p-16 sm:p-24 text-center overflow-hidden border-violet-500/10">
            <div className="blob w-96 h-96 bg-violet-500/10 top-[-10%] right-[-10%]" />
            <div className="blob w-96 h-96 bg-pink-500/10 bottom-[-10%] left-[-10%]" />

            <Cpu className="w-16 h-16 text-violet-600 mx-auto mb-10 animate-float" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">
              Siap Menjelajahi <span className="gradient-text-static">Sistem Terstruktur?</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xl mb-12 max-w-xl mx-auto font-semibold">
              Bergabunglah dengan ribuan mahasiswa lainnya dan mulai petualangan AR-mu hari ini.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button
                onClick={() => navigate('/login')}
                className="btn-primary w-full sm:w-auto text-lg"
              >
                Mulai Sekarang Gratis
              </button>
              <button
                onClick={() => navigate('/topics')}
                className="btn-secondary w-full sm:w-auto text-lg"
              >
                Lihat Kurikulum
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}