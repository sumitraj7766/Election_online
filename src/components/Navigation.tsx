import React from 'react';
import { Home, MessageSquare, Calendar, CheckSquare, Search, Landmark } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: Home },
    { id: 'assistant', label: 'Assistant', icon: MessageSquare },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'checklist', label: 'Readiness', icon: CheckSquare },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:top-24 md:left-8 md:translate-x-0 md:bottom-auto">
      <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-2 flex md:flex-col gap-2 shadow-2xl shadow-black/20">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex flex-col md:flex-row items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-300 group",
              activeTab === item.id 
                ? "bg-white text-zinc-900 shadow-lg" 
                : "text-zinc-500 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform group-hover:scale-110",
              activeTab === item.id ? "text-civic-600" : ""
            )} />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest md:hidden lg:block">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
