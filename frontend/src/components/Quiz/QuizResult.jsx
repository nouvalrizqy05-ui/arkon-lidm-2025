import { Trophy, RefreshCcw, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function QuizResult({ score, total, onRetry, topicSlug }) {
  const navigate = useNavigate()
  const percentage = Math.round((score / total) * 100)
  
  let grade = { text: 'Perlu Belajar Lagi', color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10' }
  if (percentage >= 80) grade = { text: 'Sangat Baik!', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' }
  else if (percentage >= 60) grade = { text: 'Cukup Baik', color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' }

  return (
    <div className="glass rounded-2xl p-8 sm:p-12 text-center animate-scaleIn max-w-lg mx-auto">
      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg ${grade.bg} ${grade.border} border`}>
        <Trophy className={`w-10 h-10 ${grade.color}`} />
      </div>

      <h2 className="text-3xl font-bold text-white mb-2">Skor Kamu</h2>
      
      <div className="text-6xl font-black gradient-text-static my-6">
        {score} <span className="text-3xl text-slate-500">/ {total}</span>
      </div>

      <div className={`inline-block px-4 py-1.5 rounded-full border ${grade.border} ${grade.bg} ${grade.color} font-medium mb-8`}>
        {grade.text}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={onRetry} className="btn-secondary w-full sm:w-auto">
          <RefreshCcw className="w-4 h-4" />
          Coba Lagi
        </button>
        <button onClick={() => navigate('/topics')} className="btn-primary w-full sm:w-auto">
          Topik Lainnya
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
