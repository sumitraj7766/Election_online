/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Search, ShieldCheck, ChevronRight, Share2, Globe, Users, Vote } from 'lucide-react';
import Navigation from './components/Navigation';
import ElectionAssistant from './components/ElectionAssistant';
import ElectionTimeline from './components/ElectionTimeline';
import VoterChecklist from './components/VoterChecklist';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-zinc-50 pb-32 md:pb-12 md:pl-32 lg:pl-48 pr-4 lg:pr-12 pt-8">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-zinc-200/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-5%] w-[30%] h-[30%] bg-blue-100/50 rounded-full blur-[100px]" />
      </div>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-civic-600 font-bold uppercase tracking-widest text-[10px]">
              <div className="w-4 h-px bg-civic-500" />
              <span>Verified Civic Information</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-display font-black text-civic-950 tracking-tight flex items-center gap-4">
              CivicPulse <Landmark className="w-8 h-8 md:w-12 md:h-12 text-civic-600" />
            </h1>
            <p className="text-zinc-500 lg:text-lg max-w-xl font-medium">
              Empowering voters with clear, non-partisan guidance on the democratic process.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden md:flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-4 border-zinc-50 bg-zinc-200 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                   <Users className="w-4 h-4" />
                 </div>
               ))}
               <div className="w-10 h-10 rounded-full border-4 border-zinc-50 bg-civic-600 flex items-center justify-center text-[10px] font-bold text-white">
                 +12k
               </div>
             </div>
             <p className="text-xs font-semibold text-zinc-400">Users helped this month</p>
          </div>
        </header>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="group p-8 rounded-[2rem] bg-white border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-civic-900/5 hover:-translate-y-1 transition-all cursor-pointer" onClick={() => setActiveTab('assistant')}>
                   <div className="w-14 h-14 rounded-2xl bg-civic-50 flex items-center justify-center text-civic-600 mb-6 group-hover:scale-110 transition-transform">
                     <Globe className="w-7 h-7" />
                   </div>
                   <h3 className="text-xl font-bold text-civic-900 mb-2">Understand the Process</h3>
                   <p className="text-zinc-500 text-sm mb-6">Ask our AI assistant about any step of the election cycle, from registration to inauguration.</p>
                   <div className="flex items-center gap-2 text-civic-600 font-bold text-xs uppercase tracking-wider">
                     Ask Assistant <ChevronRight className="w-4 h-4" />
                   </div>
                 </div>

                 <div className="group p-8 rounded-[2rem] bg-zinc-900 text-white shadow-2xl shadow-zinc-900/20 hover:-translate-y-1 transition-all cursor-pointer" onClick={() => setActiveTab('timeline')}>
                   <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                     <Vote className="w-7 h-7" />
                   </div>
                   <h3 className="text-xl font-bold mb-2">Road to Election Day</h3>
                   <p className="text-zinc-400 text-sm mb-6">Interactive timeline of key milestones. Don't miss critical deadlines in your journey to the polls.</p>
                   <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                     View Timeline <ChevronRight className="w-4 h-4" />
                   </div>
                 </div>

                 <div className="group p-8 rounded-[2rem] bg-white border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-civic-900/5 hover:-translate-y-1 transition-all cursor-pointer" onClick={() => setActiveTab('checklist')}>
                   <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                     <ShieldCheck className="w-7 h-7" />
                   </div>
                   <h3 className="text-xl font-bold text-civic-900 mb-2">Voter Readiness</h3>
                   <p className="text-zinc-500 text-sm mb-6">A step-by-step checklist to ensure you're fully prepared and registered before it's too late.</p>
                   <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                     Check Readiness <ChevronRight className="w-4 h-4" />
                   </div>
                 </div>
              </div>

              {/* Stats/Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 p-8 rounded-[2.5rem] border border-zinc-200 bg-white relative overflow-hidden">
                   <div className="relative z-10">
                     <h2 className="text-2xl font-bold text-civic-950 mb-4 tracking-tight leading-tight">Your vote is your voice.<br /><span className="text-civic-600">CivicPulse ensures it's heard.</span></h2>
                     <p className="text-zinc-500 text-sm max-w-sm mb-8">
                       Democracy works best when everyone participates. We provide the tools to make participation simple, secure, and stress-free.
                     </p>
                     <div className="flex items-center gap-6">
                        <div>
                          <p className="text-3xl font-black text-civic-900 leading-none">100%</p>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Non-Partisan</p>
                        </div>
                        <div className="w-px h-8 bg-zinc-200" />
                        <div>
                          <p className="text-3xl font-black text-civic-900 leading-none">24/7</p>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">AI Support</p>
                        </div>
                        <div className="w-px h-8 bg-zinc-200" />
                        <div>
                          <p className="text-3xl font-black text-civic-900 leading-none">Real-time</p>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Updates</p>
                        </div>
                     </div>
                   </div>
                   <div className="absolute right-[-5%] bottom-[-10%] opacity-10">
                     <Landmark className="w-64 h-64 text-civic-900" />
                   </div>
                </div>
                
                <div className="p-8 rounded-[2.5rem] bg-civic-600 text-white flex flex-col justify-between shadow-xl shadow-civic-900/20">
                   <div>
                     <Share2 className="w-8 h-8 mb-4 opacity-80" />
                     <h3 className="font-bold text-lg mb-2">Spread Awareness</h3>
                     <p className="text-civic-100 text-xs">Help your friends and family get ready for the next election cycle.</p>
                   </div>
                   <button className="mt-8 bg-white text-civic-900 font-bold py-3 px-6 rounded-2xl text-xs uppercase tracking-widest hover:bg-civic-50 transition-colors">
                     Copy Invite Link
                   </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'assistant' && (
            <motion.div
              key="assistant"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-8">
                 <h2 className="text-3xl font-black text-civic-900 mb-2">AI Civic Advisor</h2>
                 <p className="text-zinc-500">Ask any question about the democratic process.</p>
              </div>
              <ElectionAssistant />
            </motion.div>
          )}

          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="mb-12">
                 <h2 className="text-3xl font-black text-civic-900 mb-2">Election Roadmap</h2>
                 <p className="text-zinc-500 font-medium">Standard milestones in the journey of a democratic election.</p>
              </div>
              <ElectionTimeline />
            </motion.div>
          )}

          {activeTab === 'checklist' && (
            <motion.div
              key="checklist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-8">
                 <h2 className="text-3xl font-black text-civic-900 mb-2">Voter Toolkit</h2>
                 <p className="text-zinc-500">Essential steps for every eligible citizen.</p>
              </div>
              <VoterChecklist />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-zinc-200 py-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-2">
          <Landmark className="w-5 h-5 text-civic-600" />
          <span className="font-display font-bold text-zinc-900">CivicPulse</span>
          <span className="text-xs text-zinc-400 font-medium ml-4">© 2026 Hackathon Edition</span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-civic-600 transition-colors">Privacy</a>
          <a href="#" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-civic-600 transition-colors">Transparency</a>
          <a href="#" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-civic-600 transition-colors">Official Sources</a>
        </div>
      </footer>
    </div>
  );
}
