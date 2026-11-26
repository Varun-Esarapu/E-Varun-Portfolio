"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const formatMessage = (text: string, isUser: boolean) => {
  if (!text) return null;

  const normalized = text.replace(/\[([^\]]+)\]\s+\((https?:\/\/[^\s)]+)\)/g, '[$1]($2)');
  const tokenRegex = /(\[[^\]]+\]\([^\s)]+\)|\*\*.*?\*\*|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|https?:\/\/[^\s<]+)/g;
  const tokens = normalized.split(tokenRegex);

  return tokens.filter(Boolean).map((token, i) => {
    const linkMatch = token.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className={isUser ? "underline font-medium text-white" : "text-[#0A0A0A] underline underline-offset-4 hover:text-[#6F6F6F] font-semibold transition-colors cursor-pointer"}
        >
          {linkMatch[1]}
        </a>
      );
    }

    if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
      const inner = token.slice(2, -2);
      const innerLink = inner.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (innerLink) {
        return (
          <a
            key={i}
            href={innerLink[2]}
            target="_blank"
            rel="noopener noreferrer"
            className={isUser ? "underline font-medium text-white" : "text-[#0A0A0A] underline underline-offset-4 hover:text-[#6F6F6F] font-semibold transition-colors cursor-pointer"}
          >
            {innerLink[1]}
          </a>
        );
      }
      return (
        <strong
          key={i}
          className={isUser ? "font-semibold text-white" : "font-semibold text-[#0A0A0A]"}
        >
          {inner}
        </strong>
      );
    }

    const emailMatch = token.match(/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
    if (emailMatch) {
      return (
        <a
          key={i}
          href={`mailto:${emailMatch[1]}`}
          className={isUser ? "underline font-medium text-white" : "text-[#0A0A0A] underline underline-offset-4 font-semibold transition-colors cursor-pointer"}
        >
          {emailMatch[1]}
        </a>
      );
    }

    return <span key={i}>{token}</span>;
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
  if (lower.includes('education') || lower.includes('degree') || lower.includes('college')) {
    return ["What is his GPA?", "Did he do any extracurriculars?"];
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

    const userMessage = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setLocalInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, I couldn't process that." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again later." },
      ]);
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
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[520px] bg-white border border-[#E5E5E5] rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#EBEBEB] bg-[#F8F8F8] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ADFA1D]" />
                <h3 className="text-[#0A0A0A] font-semibold text-sm tracking-tight font-sans">
                  Varun's AI Assistant
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMessages([])} 
                  className="text-[#6F6F6F] hover:text-[#0A0A0A] transition-colors text-xs font-medium cursor-pointer"
                  title="Clear Chat"
                >
                  Clear
                </button>
                <button onClick={() => setIsOpen(false)} className="text-[#6F6F6F] hover:text-[#0A0A0A] transition-colors cursor-pointer">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat message body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-200">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-6 space-y-4">
                  <div className="inline-flex flex-col items-center gap-3 p-5 bg-[#F8F8F8] border border-[#EBEBEB] rounded-2xl text-[#6F6F6F] text-sm text-center">
                    <Bot size={26} className="text-[#0A0A0A]" />
                    <p>Ask anything about Varun's experience, skills, or engineering deployments.</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {["Education", "Industry experience", "Top projects", "Contact details"].map((faq) => (
                      <button
                        key={faq}
                        onClick={() => handleSend(undefined, faq)}
                        className="px-3 py-1.5 bg-white border border-[#E5E5E5] rounded-full text-xs text-[#0A0A0A] font-medium hover:bg-[#F5F5F5] transition-all cursor-pointer shadow-2xs"
                      >
                        {faq}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user' 
                      ? 'bg-[#000000] !text-white rounded-br-none font-medium' 
                      : 'bg-[#F8F8F8] !text-[#000000] rounded-bl-none border border-[#EBEBEB]'
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
                      className="px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs text-[#000000] font-medium hover:bg-[#000000] hover:!text-white hover:border-[#000000] transition-all cursor-pointer shadow-2xs"
                    >
                      {faq}
                    </button>
                  ))}
                </motion.div>
              )}

              {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-[#F8F8F8] text-[#000000] p-3 rounded-2xl rounded-bl-none border border-[#EBEBEB] text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#000000] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#000000] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#000000] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <form onSubmit={handleSend} className="p-4 border-t border-[#EBEBEB] bg-[#F8F8F8]">
              <div className="relative flex items-center">
                <input
                  value={localInput}
                  onChange={(e) => setLocalInput(e.target.value)}
                  placeholder="Ask about Varun..."
                  className="w-full bg-white border border-[#E5E5E5] rounded-full py-3 pl-5 pr-12 text-sm text-[#000000] focus:outline-none focus:border-[#000000] placeholder:text-[#6B7280]/60 transition-colors shadow-2xs"
                />
                <button
                  type="submit"
                  disabled={isLoading || !localInput.trim()}
                  className="absolute right-1.5 p-2 bg-[#000000] text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1D1D1F] transition-colors cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 sm:w-14 sm:h-14 bg-[#000000] hover:bg-[#1D1D1F] text-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex items-center justify-center hover:scale-105 transition-all duration-200 relative group cursor-pointer"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X size={22} className="text-white" /> : <Bot size={22} className="text-white" />}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
          </span>
        )}
      </button>
    </div>
  );
}
