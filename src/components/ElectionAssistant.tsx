import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, RefreshCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { getElectionAdvice } from '../services/gemini';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function ElectionAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      content: "Hello! I'm your Election Assistant. I can help you understand voter registration, election timelines, or explain how different parts of the voting process work. What would you like to know?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await getElectionAdvice(userMessage, messages);
    
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([{ 
      role: 'model', 
      content: "Chat cleared. How else can I help you understand the election process?" 
    }]);
  };

  return (
    <div className="flex flex-col h-[600px] border border-zinc-200 bg-white rounded-3xl overflow-hidden shadow-sm relative">
      {/* Header */}
      <div className="p-4 border-bottom border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-civic-600 flex items-center justify-center text-white shadow-lg shadow-civic-900/10">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-civic-900 text-sm">Election Assistant</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">AI Expert Ready</span>
            </div>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-zinc-400 hover:text-civic-600 transition-colors rounded-lg hover:bg-civic-50"
          title="Clear Chat"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3",
                m.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center",
                m.role === 'user' ? "bg-zinc-100 text-zinc-600" : "bg-civic-100 text-civic-700"
              )}>
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                m.role === 'user' 
                  ? "bg-civic-900 text-white rounded-tr-none" 
                  : "bg-zinc-50 border border-zinc-100 text-zinc-800 rounded-tl-none shadow-sm"
              )}>
                <div className="markdown-body">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-civic-100 text-civic-700 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-zinc-50 border border-zinc-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-zinc-50/50 border-t border-zinc-100">
        <form onSubmit={handleSubmit} className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about voter registration, ID laws, or timelines..."
            className="w-full bg-white border border-zinc-200 rounded-2xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-civic-500/20 focus:border-civic-500 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-civic-600 text-white rounded-xl flex items-center justify-center hover:bg-civic-700 transition-colors disabled:opacity-50 disabled:hover:bg-civic-600 shadow-md shadow-civic-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-zinc-400 mt-2 text-center uppercase tracking-widest font-medium">
          Non-partisan educational assistant powered by AI
        </p>
      </div>
    </div>
  );
}
