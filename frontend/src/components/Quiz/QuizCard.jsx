import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

export default function QuizCard({ 
  question, 
  currentIdx, 
  total, 
  selectedAnswer, 
  isAnswered, 
  onSelectAnswer, 
  onNext 
}) {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8 animate-fadeInUp">
      {/* Progress */}
      <div className="flex justify-between items-center mb-6 text-sm">
        <span className="text-slate-400 font-medium">Pertanyaan {currentIdx + 1} dari {total}</span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full w-4 sm:w-6 transition-colors ${
                i === currentIdx ? 'bg-sky-400' : i < currentIdx ? 'bg-sky-400/30' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-8">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((opt, i) => {
          const isSelected = selectedAnswer === i
          const isCorrect = question.answer === i
          
          let stateStyle = "bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-sky-500/50"
          
          if (isAnswered) {
            if (isCorrect) stateStyle = "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
            else if (isSelected) stateStyle = "bg-rose-500/10 border-rose-500/50 text-rose-400"
            else stateStyle = "bg-slate-800/20 border-slate-800 opacity-50"
          } else if (isSelected) {
            stateStyle = "bg-sky-500/10 border-sky-500 text-sky-400"
          }

          return (
            <button
              key={i}
              disabled={isAnswered}
              onClick={() => onSelectAnswer(i)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${stateStyle}`}
            >
              <span className="font-medium">{opt}</span>
              {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {isAnswered && (
        <div className="animate-fadeInDown bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Penjelasan:</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action */}
      <div className="flex justify-end">
        <button
          disabled={!isAnswered}
          onClick={onNext}
          className={`btn-primary ${!isAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {currentIdx === total - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
        </button>
      </div>
    </div>
  )
}
