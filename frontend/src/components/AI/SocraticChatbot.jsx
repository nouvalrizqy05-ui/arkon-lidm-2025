import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { chatWithTutor } from '../../utils/aiApi';

export default function SocraticChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Halo! Saya ARKON AI Tutor. Ada yang bisa saya bantu terkait Organisasi dan Arsitektur Komputer?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass the current route as context
      const context = window.location.pathname; 
      const reply = await chatWithTutor(userMessage, `User is currently at route: ${context}`);
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Maaf, saya sedang mengalami gangguan koneksi. Coba lagi nanti.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Socratic Tutor</h3>
                  <p className="text-xs text-indigo-400">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                    {msg.role === 'user' ? <User size={16} className="text-white"/> : <Bot size={16} className="text-indigo-400"/>}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-indigo-400"/>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800 text-slate-400 rounded-tl-none border border-slate-700/50 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce delay-75"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-700/50 bg-slate-800/50">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanya sesuatu..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-full px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 disabled:opacity-50 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 rounded-full shadow-lg shadow-indigo-600/30 flex items-center justify-center text-white hover:bg-indigo-500 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
