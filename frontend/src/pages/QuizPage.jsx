import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { quizData } from '../data/quizData'
import QuizCard from '../components/Quiz/QuizCard'
import QuizResult from '../components/Quiz/QuizResult'
import { ArrowLeft, Brain, Sparkles, Clock, Target } from 'lucide-react'
import { generateQuiz } from '../utils/aiApi'

export default function QuizPage() {
  const { topicSlug } = useParams()
  const navigate = useNavigate()
  
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (!topicSlug) {
      navigate('/topics')
      return
    }
    
    const data = quizData[topicSlug]
    if (data) {
      const shuffled = [...data].sort(() => 0.5 - Math.random())
      setQuestions(shuffled)
    } else {
      navigate('/topics')
    }
  }, [topicSlug, navigate])

  const handleSelectAnswer = (idx) => {
    if (isAnswered) return
    setSelectedAnswer(idx)
    setIsAnswered(true)
    
    if (idx === questions[currentIdx].answer) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIdx === questions.length - 1) {
      setIsFinished(true)
    } else {
      setCurrentIdx(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }

  const handleRetry = () => {
    const data = quizData[topicSlug] || []
    const shuffled = [...data].sort(() => 0.5 - Math.random())
    setQuestions(shuffled)
    setCurrentIdx(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setIsFinished(false)
  }

  const handleGenerateAIQuiz = async () => {
    setIsGenerating(true)
    try {
      const generated = await generateQuiz(topicSlug, "konsep lanjutan");
      const formatted = generated.map(q => ({
        ...q,
        answer: q.correctAnswer
      }));
      setQuestions(formatted);
      setCurrentIdx(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setScore(0);
      setIsFinished(false);
    } catch (error) {
      alert("Gagal membuat kuis dengan AI. Pastikan backend menyala dan API key valid.");
    } finally {
      setIsGenerating(false)
    }
  }

  if (questions.length === 0 && !isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-bold animate-pulse">MEMPERSIAPKAN KUIS...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative bg-slate-50 dark:bg-slate-950">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-4xl mx-auto relative">
        {/* Header Section */}
        <div className="mb-10 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/topics')}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-emerald-400 shadow-sm transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight capitalize">
                  {topicSlug.replace(/-/g, ' ')}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="badge badge-primary font-bold px-2 py-0.5">KUIS AKTIF</span>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Arsitektur Komputer</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleGenerateAIQuiz}
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 active:scale-95"
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? "MERACIK KUIS..." : "AI GENERATED QUIZ"}
              </button>
            </div>
          </div>
          
          {/* Progress Bar Header */}
          {!isFinished && !isGenerating && (
            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-300 dark:border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 transition-all duration-500"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>
              <div className="text-sm font-bold text-slate-600 dark:text-slate-400 font-mono tracking-widest">
                {currentIdx + 1}/{questions.length}
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="relative animate-fadeInUp">
          {isGenerating ? (
            <div className="glass-strong p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-3xl bg-indigo-600/10 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-12 h-12 text-indigo-600" />
                </div>
                <div className="absolute inset-0 w-24 h-24 rounded-3xl border-2 border-indigo-600 border-t-transparent animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">AI Sedang Meracik Soal Spesial Untukmu</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm">
                Harap tunggu sebentar, kami sedang menyiapkan pertanyaan baru yang menantang berdasarkan topik {topicSlug}.
              </p>
            </div>
          ) : !isFinished ? (
            <div className="relative">
              <QuizCard 
                question={questions[currentIdx]}
                currentIdx={currentIdx}
                total={questions.length}
                selectedAnswer={selectedAnswer}
                isAnswered={isAnswered}
                onSelectAnswer={handleSelectAnswer}
                onNext={handleNext}
              />
            </div>
          ) : (
            <QuizResult 
              score={score} 
              total={questions.length} 
              onRetry={handleRetry}
              topicSlug={topicSlug}
            />
          )}
        </div>
      </div>
    </div>
  )
}