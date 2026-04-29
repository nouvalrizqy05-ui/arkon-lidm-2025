import { CheckCircle2, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProgressCard({ topicSlug, title, icon: Icon, isCompleted, viewCount, color }) {
  return (
    <div className="glass rounded-xl p-4 sm:p-5 flex items-center justify-between border border-slate-700/50 hover:border-sky-500/30 transition-colors">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Info */}
        <div>
          <h4 className="text-white font-medium mb-0.5">{title}</h4>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Dilihat: {viewCount}x</span>
            {isCompleted ? (
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
              </span>
            ) : (
              <span className="flex items-center gap-1 text-slate-500">
                <Circle className="w-3.5 h-3.5" /> Belum Selesai
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action */}
      <Link
        to={`/ar/${topicSlug}`}
        className="px-4 py-2 rounded-lg bg-sky-500/10 text-sky-400 text-xs font-medium hover:bg-sky-500/20 transition-colors shrink-0"
      >
        Lanjut Belajar
      </Link>
    </div>
  )
}
