import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, Sparkles, Terminal } from 'lucide-react'
import AssemblyConsole from '../components/AR/AssemblyConsole'

const AR_FILES = {
  'cpu-overview': '/ar-viewer.html',
  'pipeline': '/ar-pipeline.html',
  'cache': '/ar-cache.html',
  'logic-gates': '/ar-logic.html'
}

export default function ARViewerPage() {
  const { topicSlug } = useParams()
  const navigate = useNavigate()

  const handleOpenAR = () => {
    const file = AR_FILES[topicSlug] || '/ar-viewer.html'
    window.location.href = `${file}?topic=${topicSlug}`
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative bg-slate-50 dark:bg-slate-950">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-6xl mx-auto relative flex flex-col gap-8">
        {/* Header Section */}
        <div className="animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/topics')}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-emerald-400 shadow-sm transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Holographic Simulator</h1>
                <div className="flex items-center gap-2 mt-1">
                   <span className="badge badge-primary font-bold px-2 py-0.5 uppercase tracking-tighter">Topic: {topicSlug}</span>
                   <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Augmented Reality Core</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleOpenAR}
              className="btn-primary group"
            >
              <Camera className="w-5 h-5" />
              BUKA KAMERA AR
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-fadeInUp delay-100">
          <div className="glass-strong p-8 mb-8 border-indigo-500/10">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center">
                   <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Assembly Console</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Uji coba kode instruksi sebelum memproyeksikannya ke dunia nyata.</p>
                </div>
             </div>
             
             <div className="relative">
                <AssemblyConsole />
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="glass p-6 border-emerald-500/10">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 tracking-tight uppercase tracking-widest">Langkah 1</h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">Masukkan kode assembly di konsol simulator di atas untuk melihat alur data.</p>
             </div>
             <div className="glass p-6 border-indigo-500/10">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 tracking-tight uppercase tracking-widest">Langkah 2</h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">Klik tombol "Buka Kamera AR" untuk mengaktifkan sensor kamera perangkat Anda.</p>
             </div>
             <div className="glass p-6 border-emerald-500/10">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 tracking-tight uppercase tracking-widest">Langkah 3</h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">Arahkan ke marker yang tersedia di modul OAK untuk memunculkan model 3D.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}