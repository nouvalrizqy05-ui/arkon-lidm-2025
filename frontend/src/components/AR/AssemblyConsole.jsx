import { useState, useEffect } from 'react';
import { simulator } from '../../utils/assemblySimulator';
import { Terminal, Play, RotateCcw, Cpu } from 'lucide-react';

export default function AssemblyConsole() {
  const [code, setCode] = useState('LOAD R1, 10\nLOAD R2, 20\nADD R3, R1, R2\nSTORE R3, M[0]');
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [machineState, setMachineState] = useState(simulator.getState());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setLines(code.split('\n').filter(l => l.trim() !== ''));
  }, [code]);

  const handleStep = () => {
    if (currentLine >= lines.length) {
      setIsPlaying(false);
      return;
    }
    
    const newState = simulator.execute(lines[currentLine]);
    setMachineState(newState);
    if (!newState.error) {
      setCurrentLine(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    simulator.reset();
    setMachineState(simulator.getState());
    setCurrentLine(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        handleStep();
      }, 1000); // 1 step per second
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentLine, lines]);

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
      {/* Header */}
      <div className="bg-slate-800/80 px-4 py-3 border-b border-slate-700/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Terminal className="text-sky-400 w-5 h-5" />
          <h3 className="text-slate-200 font-semibold">Assembly Simulator Console</h3>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentLine >= lines.length || machineState.error}
            className="p-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
          </button>
          <button 
            onClick={handleReset}
            className="p-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div className="w-1/2 border-r border-slate-700/50 flex flex-col bg-slate-950 p-4">
          <textarea
            value={code}
            onChange={(e) => { setCode(e.target.value); handleReset(); }}
            className="flex-1 bg-transparent text-sky-300 font-mono text-sm resize-none focus:outline-none"
            spellCheck="false"
          />
          {machineState.error && (
            <div className="mt-2 p-2 bg-rose-500/20 text-rose-400 text-xs rounded border border-rose-500/30">
              Error: {machineState.error}
            </div>
          )}
        </div>

        {/* Visualizer */}
        <div className="w-1/2 bg-slate-900 p-4 flex flex-col gap-4 overflow-y-auto">
          {/* Registers */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
            <h4 className="text-xs text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Cpu className="w-3 h-3" /> CPU Registers
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(machineState.registers).map(([reg, val]) => (
                <div key={reg} className="bg-slate-900 px-3 py-2 rounded-lg flex justify-between items-center border border-slate-700/50">
                  <span className="text-indigo-400 font-mono text-sm">{reg}</span>
                  <span className="text-white font-mono">{val}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* PC & ALU */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex flex-col items-center justify-center">
              <span className="text-xs text-slate-400 uppercase">Program Counter</span>
              <span className="text-2xl text-sky-400 font-mono font-bold mt-1">{machineState.pc}</span>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex flex-col items-center justify-center">
              <span className="text-xs text-slate-400 uppercase">ALU Output</span>
              <span className="text-2xl text-emerald-400 font-mono font-bold mt-1">{machineState.alu.result}</span>
            </div>
          </div>

          {/* Memory Preview (First 4 blocks) */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
            <h4 className="text-xs text-slate-400 uppercase tracking-wider mb-2">Memory (RAM)</h4>
            <div className="grid grid-cols-4 gap-2">
              {machineState.memory.slice(0, 4).map((val, idx) => (
                <div key={idx} className="bg-slate-900 p-2 rounded flex flex-col items-center border border-slate-700/50">
                  <span className="text-[10px] text-slate-500 font-mono">M[{idx}]</span>
                  <span className="text-amber-400 font-mono text-sm">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
