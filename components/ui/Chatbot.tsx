"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const formatMessage = (text: string, isUser: boolean) => {
  if (!text) return null;
  // Match both **bold** and [text](url), allowing optional whitespace
  const parts = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\s*\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className={isUser ? "font-bold text-[#0F0C0A]" : "font-semibold text-[#D4AF37]"}>
          {part.slice(2, -2)}
        </strong>
      );
    } else if (part.startsWith('[') && part.includes(']')) {
      const match = part.match(/\[([^\]]+)\]\s*\(([^)]+)\)/);
      if (match) {
        return (
          <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] underline underline-offset-2 hover:text-white transition-colors font-medium">
            {match[1]}
          </a>
        );
      }
    }
    return <span key={i}>{part}</span>;
  });
};

const getSuggestions = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.includes('machine learning') || lower.includes('tensorflow') || lower.includes('model') || lower.includes('ai')) {
    return ["Tell me about his ML projects", "What ML libraries does he use?"];
  }
  if (lower.includes('backend') || lower.includes('django') || lower.includes('api')) {
    return ["What is his Vehicle Service project?", "What databases does he know?"];
  }
  if (lower.includes('education') || lower.includes('degree') || lower.includes('hkbk') || lower.includes('college')) {
    return ["What is his GPA?", "Did he do any extracurriculars?"];
  }
  if (lower.includes('experience') || lower.includes('apprentice') || lower.includes('intern') || lower.includes('work')) {
    return ["What are his top skills?", "Show me his certifications"];
  }
  return ["What are his top projects?", "How do I contact him?"];
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent, presetText?: string) => {
    e?.preventDefault();
    const textToSend = presetText || localInput;
    if (!textToSend.trim() || isLoading) return;
    
    const userMsg = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setLocalInput("");
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `API Error: ${res.status}`);
      }
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = { role: 'assistant', content: '' };
      
      setMessages((prev) => [...prev, assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        assistantMsg.content += decoder.decode(value, { stream: true });
        setMessages((prev) => [...prev.slice(0, -1), { ...assistantMsg }]);
      }
      
      if (!assistantMsg.content) {
        setMessages((prev) => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = "I'm currently receiving too many requests! Please wait a moment and try again, or email Varun directly at varunesarapu@gmail.com.";
          return newMsgs;
        });
        return;
      }
    } catch (error: any) {
      setMessages((prev) => {
        const newMsgs = [...prev];
        const errorMsg = error.message?.includes('429')
          ? "I'm currently receiving too many requests! Please wait a moment and try again, or email Varun directly at varunesarapu@gmail.com."
          : (error.message || "An error occurred.");
        if (newMsgs[newMsgs.length - 1]?.role === 'assistant' && newMsgs[newMsgs.length - 1].content === '') {
           newMsgs[newMsgs.length - 1].content = errorMsg;
        } else {
           newMsgs.push({ role: 'assistant', content: errorMsg });
        }
        return newMsgs;
      });
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
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-[#1A1614] border border-[#D4AF37]/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-[#D4AF37]/10 bg-[#0F0C0A] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h3 className="text-[#FDFBF7] font-semibold text-sm tracking-wide">Varun's AI Assistant</h3>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMessages([])} 
                  className="text-[#B5B0A1] hover:text-[#D4AF37] transition-colors text-xs font-medium"
                  title="Clear Chat"
                >
                  Clear
                </button>
                <button onClick={() => setIsOpen(false)} className="text-[#B5B0A1] hover:text-[#D4AF37] transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#D4AF37]/20 scrollbar-track-transparent">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-6 space-y-4">
                  <div className="inline-flex flex-col items-center gap-3 p-5 bg-[#2D2723] border border-[#D4AF37]/10 rounded-2xl text-[#B5B0A1] text-sm text-center">
                    <Bot size={28} className="text-[#D4AF37]" />
                    <p>Hi! I'm an AI trained on Varun's resume. <br/>Ask me about his skills, experience, or projects!</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {["What is his educational background?", "Tell me about his experience", "What are his top projects?", "How do I contact him?"].map((faq) => (
                      <button
                        key={faq}
                        onClick={() => handleSend(undefined, faq)}
                        className="px-3 py-1.5 bg-[#1A1614] border border-[#D4AF37]/20 rounded-full text-xs text-[#FDFBF7] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all"
                      >
                        {faq}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user' 
                      ? 'bg-[#D4AF37] text-[#0F0C0A] rounded-br-none font-medium shadow-md' 
                      : 'bg-[#2D2723] text-[#FDFBF7] rounded-bl-none border border-[#D4AF37]/10'
                  }`}>
                    {formatMessage(m.content, m.role === 'user')}
                  </div>
                </div>
              ))}
              
              {!isLoading && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mt-2 pt-2"
                >
                  {getSuggestions(messages[messages.length - 1].content).map((faq) => (
                    <button
                      key={faq}
                      onClick={() => handleSend(undefined, faq)}
                      className="px-3 py-1.5 bg-transparent border border-[#D4AF37]/30 rounded-full text-xs text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0C0A] transition-all"
                    >
                      {faq}
                    </button>
                  ))}
                </motion.div>
              )}

              {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-[#2D2723] text-[#FDFBF7] p-3 rounded-xl rounded-bl-none border border-[#D4AF37]/10 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-[#D4AF37]/10 bg-[#0F0C0A]">
              <div className="relative flex items-center">
                <input
                  value={localInput}
                  onChange={(e) => setLocalInput(e.target.value)}
                  placeholder="Ask about Varun..."
                  className="w-full bg-[#1A1614] border border-[#2D2723] rounded-full py-3 pl-5 pr-12 text-sm text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]/50 placeholder:text-[#B5B0A1]/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !localInput.trim()}
                  className="absolute right-2 p-2 bg-[#D4AF37] text-[#0F0C0A] rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FDFBF7] transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#D4AF37] text-[#0F0C0A] rounded-full shadow-[0_0_25px_rgba(212,175,55,0.3)] flex items-center justify-center hover:scale-105 hover:bg-[#FDFBF7] transition-all duration-300 relative group"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}
