import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import StatsGrid from '../components/UI/StatsGrid'
import ProgressCard from '../components/UI/ProgressCard'
import { LogOut, Cpu, Zap, HardDrive, Layout, Award, Settings, User } from 'lucide-react'

// Dummy topics mapping for UI matching
const TOPIC_ICONS = {
  'cpu-overview': { icon: Cpu, color: 'from-arkon-blue to-blue-600', title: 'CPU Overview' },
  'pipeline': { icon: Zap, color: 'from-sky-500 to-arkon-blue', title: 'CPU Pipeline' },
  'cache': { icon: HardDrive, color: 'from-blue-400 to-sky-500', title: 'Cache Memory' },
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get('/progress')
        setProgress(res.data)
      } catch (error) {
        console.error("Failed to fetch progress", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProgress()
  }, [])

  // Generate mock data if empty (for MVP demo purposes)
  const displayProgress = progress.length > 0 ? progress : [
    { topic: { slug: 'cpu-overview' }, viewCount: 5, isCompleted: true },
    { topic: { slug: 'pipeline' }, viewCount: 2, isCompleted: false },
    { topic: { slug: 'cache' }, viewCount: 0, isCompleted: false },
  ]

  const completedCount = displayProgress.filter(p => p.isCompleted).length

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative bg-slate-50 dark:bg-arkon-dark">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-arkon-blue/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-sky-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-fadeInDown">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-arkon-blue flex items-center justify-center text-white shadow-xl shadow-arkon-blue/30">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Halo, <span className="gradient-text-static">{user?.name}</span> 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Pantau progress belajar OAK dan pencapaian kuis kamu di sini.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 rounded-2xl bg-white dark:bg-arkon-card border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-arkon-blue transition-all shadow-sm">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-rose-600 dark:text-rose-400 font-bold text-sm shadow-sm hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:border-rose-200 dark:hover:border-rose-500/20 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 animate-fadeInUp">
          <StatsGrid
            totalTopics={12}
            completedTopics={completedCount}
            totalQuizzes={8}
            avgScore={85}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Progress List */}
          <div className="lg:col-span-2 space-y-6 animate-fadeInUp delay-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                <Layout className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Progress Topik AR
              </h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">REAL-TIME TRACKING</span>
            </div>

            <div className="glass p-6 space-y-4">
              {displayProgress.map((item, idx) => {
                const topicData = TOPIC_ICONS[item.topic.slug] || TOPIC_ICONS['cpu-overview']
                return (
                  <ProgressCard
                    key={idx}
                    topicSlug={item.topic.slug}
                    title={topicData.title}
                    icon={topicData.icon}
                    color={topicData.color}
                    isCompleted={item.isCompleted}
                    viewCount={item.viewCount}
                  />
                )
              })}
            </div>
          </div>

          {/* Sidebar / Leaderboard / Achievements */}
          <div className="space-y-6 animate-fadeInUp delay-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Achievements
              </h3>
            </div>

            <div className="glass p-6 space-y-4">
              {[
                { title: 'First Blood', desc: 'Menyelesaikan 1 topik AR pertama', unlocked: true, icon: '🔥' },
                { title: 'Perfect Score', desc: 'Mendapat nilai 100 di kuis', unlocked: true, icon: '🎯' },
                { title: 'OAK Master', desc: 'Menyelesaikan semua 12 topik', unlocked: false, icon: '🏛️' },
              ].map((achv, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${achv.unlocked
                      ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl ${achv.unlocked ? 'bg-emerald-100 dark:bg-emerald-500/20' : 'bg-slate-200 dark:bg-slate-800'
                    }`}>
                    {achv.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 tracking-tight ${achv.unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-600'}`}>
                      {achv.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{achv.desc}</p>
                    {achv.unlocked && (
                      <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">UNLOCKED</span>
                    )}
                  </div>
                </div>
              ))}

              <button className="w-full py-4 mt-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest transition-all">
                Lihat Semua Koleksi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}