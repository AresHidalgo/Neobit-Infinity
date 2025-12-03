import { useState } from 'react';
import { BrutalCard } from './BrutalCard';
import { MessageSquare, X, Send, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BrutalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'System: Connected to NeoBit Support Node.', sender: 'system' },
    { id: 2, text: 'Bot: How can I assist you today, human?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), text: `You: ${inputValue}`, sender: 'user' }]);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: 'Bot: Processing request... [SIMULATION]', 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 sm:w-96"
          >
            <BrutalCard className="p-0 overflow-hidden border-4 border-black shadow-brutal-lg bg-black text-neon-green font-mono">
              {/* Header */}
              <div className="bg-neon-green text-black p-3 flex justify-between items-center border-b-4 border-black">
                <div className="flex items-center gap-2 font-bold uppercase">
                  <Terminal className="w-5 h-5" />
                  <span>NeoBit_Support_v1.0</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-black hover:text-white p-1 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3 bg-black">
                {messages.map((msg) => (
                  <div key={msg.id} className={`text-sm ${msg.sender === 'system' ? 'text-gray-500 italic' : ''}`}>
                    <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 bg-gray-900 border-t-4 border-black flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Enter command..."
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-gray-600"
                />
                <button onClick={handleSend} className="text-neon-green hover:text-white">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </BrutalCard>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-neon-green border-4 border-black p-4 shadow-brutal hover:shadow-brutal-hover transition-all"
        >
          <MessageSquare className="w-8 h-8 text-black" />
        </motion.button>
      )}
    </div>
  );
}
