import { useNavigate } from 'react-router-dom'
import {
  Cpu, Zap, HardDrive, Network, MemoryStick,
  Settings, Calculator, Clock, MonitorCog, Server,
  History, BarChart3, Eye, Brain, ArrowLeft,
  Sparkles, ArrowRight, Binary, Container, Terminal, FunctionSquare
} from 'lucide-react'

const TOPICS = [
  // === Topik dengan AR Viewer ===
  {
    slug: 'cpu-overview',
    title: 'CPU Overview',
    icon: Cpu,
    description: 'Komponen dasar CPU: ALU, Control Unit, dan Register',
    color: 'from-indigo-600 to-indigo-700',
    borderColor: 'border-indigo-500/20',
    badge: 'Dasar',
    badgeColor: 'badge-primary',
    hasAR: true,
  },
  {
    slug: 'pipeline',
    title: 'CPU Pipeline',
    icon: Zap,
    description: 'Visualisasi 5 tahap pipeline: IF, ID, EX, MEM, WB',
    color: 'from-emerald-600 to-emerald-700',
    borderColor: 'border-emerald-500/20',
    badge: 'Menengah',
    badgeColor: 'badge-success',
    hasAR: true,
  },
  {
    slug: 'logic-gates',
    title: 'Boolean Logic & Gates',
    icon: Binary,
    description: 'Sub-CPMK 2 & 6: Simulasi gerbang logika AND, OR, NOT, XOR',
    color: 'from-violet-600 to-violet-700',
    borderColor: 'border-violet-500/20',
    badge: 'Math-Core',
    badgeColor: 'badge-primary',
    hasAR: true,
  },
  {
    slug: 'cache',
    title: 'Cache Memory',
    icon: HardDrive,
    description: 'Hierarki memori: L1, L2, L3 Cache hingga RAM',
    color: 'from-indigo-400 to-indigo-500',
    borderColor: 'border-indigo-400/20',
    badge: 'Menengah',
    badgeColor: 'badge-secondary',
    hasAR: true,
  },
  // === Topik RPS Khusus (Matematika & Pemecahan Masalah) ===
  {
    slug: 'set-theory-mem',
    title: 'Set Theory in Memory',
    icon: Container,
    description: 'Sub-CPMK 1 & 5: Pemetaan set himpunan alamat pada Cache mapping',
    color: 'from-indigo-500 to-violet-500',
    borderColor: 'border-indigo-500/20',
    badge: 'Sub-CPMK',
    badgeColor: 'badge-primary',
    hasAR: false,
  },
  {
    slug: 'number-theory-adv',
    title: 'Advanced Number Theory',
    icon: Terminal,
    description: 'Sub-CPMK 3, 7, 9: Representasi Two\'s Complement & IEEE 754 Floating Point',
    color: 'from-emerald-500 to-emerald-700',
    borderColor: 'border-emerald-500/20',
    badge: 'Sub-CPMK',
    badgeColor: 'badge-success',
    hasAR: false,
  },
  {
    slug: 'algebra-arch',
    title: 'Algebraic Architecture',
    icon: FunctionSquare,
    description: 'Sub-CPMK 4, 8, 10: Penyederhanaan aljabar boolean untuk unit kontrol',
    color: 'from-violet-500 to-indigo-700',
    borderColor: 'border-violet-500/20',
    badge: 'Sub-CPMK',
    badgeColor: 'badge-primary',
    hasAR: false,
  },
  // === Topik Quiz Lainnya ===
  {
    slug: 'komponen-komputer',
    title: 'Komponen Komputer',
    icon: MonitorCog,
    description: 'Top-level view: CPU, I/O, memori, dan sistem bus',
    color: 'from-emerald-500 to-emerald-600',
    borderColor: 'border-emerald-500/20',
    badge: 'Dasar',
    badgeColor: 'badge-success',
    hasAR: false,
  },
  {
    slug: 'sejarah-komputer',
    title: 'Sejarah & Evolusi',
    icon: History,
    description: 'Evolusi komputer dari vacuum tube hingga era modern',
    color: 'from-slate-600 to-slate-700',
    borderColor: 'border-slate-500/20',
    badge: 'Dasar',
    badgeColor: 'badge-secondary',
    hasAR: false,
  },
  {
    slug: 'sistem-interkoneksi',
    title: 'Sistem Interkoneksi',
    icon: Network,
    description: 'Bus sistem: address bus, data bus, dan control bus',
    color: 'from-indigo-500 to-emerald-500',
    borderColor: 'border-indigo-500/20',
    badge: 'Menengah',
    badgeColor: 'badge-primary',
    hasAR: false,
  },
  {
    slug: 'memori-utama',
    title: 'Memori Utama',
    icon: MemoryStick,
    description: 'RAM, ROM, SRAM, DRAM, dan klasifikasi memori',
    color: 'from-emerald-400 to-emerald-500',
    borderColor: 'border-emerald-400/20',
    badge: 'Menengah',
    badgeColor: 'badge-success',
    hasAR: false,
  },
  {
    slug: 'siklus-instruksi',
    title: 'Siklus Instruksi',
    icon: Clock,
    description: 'Fetch-Decode-Execute cycle dan interrupt handling',
    color: 'from-indigo-500 to-indigo-600',
    borderColor: 'border-indigo-500/20',
    badge: 'Menengah',
    badgeColor: 'badge-secondary',
    hasAR: false,
  },
]

export default function TopicsPage() {
  const navigate = useNavigate()

  const arTopics = TOPICS.filter(t => t.hasAR)
  const quizTopics = TOPICS.filter(t => !t.hasAR)

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative bg-slate-50 dark:bg-slate-950">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-12 animate-fadeInDown">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-emerald-400 font-bold text-sm mb-6 transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
            Beranda
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                Kurikulum <span className="gradient-text-static">RPS OAK</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl font-medium">
                Pilih topik yang sesuai dengan capaian pembelajaran (Sub-CPMK) RPS Anda. 
                Visualisasi AR dan Kuis AI akan membantu Anda menguasai materi lebih cepat.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
               <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 text-sm font-bold border border-indigo-100 dark:border-indigo-500/20">
                 {TOPICS.length} Modul Terintegrasi
               </div>
            </div>
          </div>
        </div>

        {/* ═══ AR-Enabled Topics ═══ */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-400/10 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Visualisasi 3D (RPS Core)</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Gunakan Marker untuk Memunculkan AR</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {arTopics.map((topic) => (
              <TopicCard
                key={topic.slug}
                topic={topic}
                navigate={navigate}
                showAR
              />
            ))}
          </div>
        </div>

        {/* ═══ Quiz-Only Topics ═══ */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 dark:bg-emerald-400/10 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
              <Brain className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Modul Sub-CPMK</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Uji Pemahaman Teori & Matematika Komputer</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {quizTopics.map((topic) => (
              <TopicCard
                key={topic.slug}
                topic={topic}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TopicCard({ topic, navigate, showAR = false }) {
  const Icon = topic.icon
  return (
    <div
      className={`group relative glass p-6 hover:translate-y-[-4px] transition-all duration-300 cursor-pointer overflow-hidden`}
      onClick={() => showAR ? navigate(`/ar/${topic.slug}`) : navigate(`/quiz/${topic.slug}`)}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${topic.color} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-2xl transition-opacity`} />

      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col items-end gap-2">
            {showAR && (
              <span className="badge badge-primary font-bold px-2.5 py-0.5">
                AR SUPPORT
              </span>
            )}
            <span className={`badge ${topic.badgeColor} font-bold px-2.5 py-0.5`}>{topic.badge}</span>
          </div>
        </div>

        <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2 group-hover:text-indigo-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
          {topic.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium line-clamp-2">
          {topic.description}
        </p>

        <div className="flex gap-2">
          {showAR ? (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/ar/${topic.slug}`) }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/10 active:scale-95"
              >
                <Eye className="w-3.5 h-3.5" />
                BUKA AR
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/quiz/${topic.slug}`) }}
                className="flex items-center justify-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-all active:scale-95"
                title="Mulai Kuis"
              >
                <Brain className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/quiz/${topic.slug}`) }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/10 active:scale-95"
            >
              <Brain className="w-3.5 h-3.5" />
              MULAI KUIS
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}