import { BookOpen, Brain, Zap, Trophy } from 'lucide-react'

export default function StatsGrid({ totalTopics, completedTopics, totalQuizzes, avgScore }) {
  const stats = [
    {
      label: 'Topik Selesai',
      value: `${completedTopics} / ${totalTopics}`,
      icon: BookOpen,
      color: 'from-sky-500 to-cyan-400',
      bg: 'bg-sky-500/10',
      text: 'text-sky-400'
    },
    {
      label: 'Total Kuis Diikuti',
      value: totalQuizzes,
      icon: Brain,
      color: 'from-violet-500 to-purple-400',
      bg: 'bg-violet-500/10',
      text: 'text-violet-400'
    },
    {
      label: 'Skor Rata-Rata',
      value: `${avgScore}%`,
      icon: Trophy,
      color: 'from-amber-500 to-yellow-400',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400'
    },
    {
      label: 'Streak Belajar',
      value: '3 Hari',
      icon: Zap,
      color: 'from-emerald-500 to-green-400',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <div key={i} className="glass rounded-2xl p-6 border border-slate-700/50 relative overflow-hidden group">
            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500`} />

            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${stat.text}`} />
            </div>

            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-slate-400">{stat.label}</div>
          </div>
        )
      })}
    </div>
  )
}
