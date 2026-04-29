import { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { generateMindmap } from '../utils/aiApi';
import { BrainCircuit, Sparkles, Save, FileText, Share2, Download } from 'lucide-react';

const initialNodes = [
  { id: '1', position: { x: 250, y: 150 }, data: { label: 'Tulis Catatan untuk Memulai Mindmap' } },
];
const initialEdges = [];

export default function WorkspacePage() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [note, setNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const handleGenerate = async () => {
    if (!note.trim()) return;
    setIsGenerating(true);
    try {
      const data = await generateMindmap(note);
      if (data && data.nodes && data.edges) {
        setNodes(data.nodes);
        setEdges(data.edges);
      }
    } catch (error) {
      alert("Gagal memproses mindmap. Coba lagi.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-6 flex flex-col bg-slate-50 dark:bg-slate-950 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 animate-fadeInDown">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Intelligent Workspace</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Auto-generate neural mindmaps from your notes.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <button className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-indigo-600 transition-all shadow-sm">
                <Share2 className="w-5 h-5" />
             </button>
             <button className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-emerald-600 transition-all shadow-sm">
                <Download className="w-5 h-5" />
             </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6">
          {/* Note Taking Area */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 animate-fadeInUp delay-100">
            <div className="glass-strong flex-1 flex flex-col overflow-hidden border-indigo-500/10">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-2">
                   <FileText className="w-4 h-4 text-indigo-600" />
                   <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm tracking-tight">Neural Notes</h3>
                </div>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !note.trim()}
                  className="btn-primary py-2 px-4 text-xs"
                >
                  <Sparkles size={14} />
                  {isGenerating ? "Menganalisis..." : "Generate Mindmap"}
                </button>
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ketik catatan kuliahmu di sini... (Contoh: CPU terdiri dari ALU, CU, dan Register...)"
                className="flex-1 w-full p-6 bg-transparent text-slate-700 dark:text-slate-300 resize-none focus:outline-none font-medium leading-relaxed placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* React Flow Mindmap Area */}
          <div className="w-full lg:w-2/3 h-[500px] lg:h-auto glass-strong overflow-hidden relative animate-fadeInUp delay-200 border-emerald-500/10">
            {isGenerating && (
              <div className="absolute inset-0 z-20 bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-3xl bg-indigo-600/10 flex items-center justify-center mb-4 animate-bounce">
                  <Sparkles className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-slate-900 dark:text-white font-extrabold tracking-tight">Merakit Neural Mindmap...</p>
                <div className="mt-2 w-32 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-600 animate-progress" style={{ width: '60%' }} />
                </div>
              </div>
            )}
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
              className="bg-transparent"
            >
              <Background color="#6366f1" gap={20} size={1} opacity={0.1} />
              <Controls className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl rounded-xl overflow-hidden" />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
}
