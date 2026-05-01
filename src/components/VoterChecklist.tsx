import React, { useState } from 'react';
import { CheckCircle2, Circle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function VoterChecklist() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'reg',
      title: 'Check Voter Registration Status',
      description: 'Ensure you are registered to vote at your current address. Most states have an online portal.',
      completed: false
    },
    {
      id: 'id',
      title: 'Verify ID Requirements',
      description: 'Check what form of identification is required at your polling place (Driver’s license, Passport, etc.)',
      completed: false
    },
    {
      id: 'method',
      title: 'Decide Your Voting Method',
      description: 'Will you vote in person on Election Day, during Early Voting, or via Mail-in/Absentee ballot?',
      completed: false
    },
    {
      id: 'poll',
      title: 'Find Your Polling Location',
      description: 'Confirm your specific polling station, as it may have changed since the last election.',
      completed: false
    },
    {
      id: 'research',
      title: 'Research Candidates & Ballot Measures',
      description: 'Read non-partisan guides on the candidates and any local initiatives on the ballot.',
      completed: false
    }
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-semibold text-civic-900">Voter Readiness</h2>
          <p className="text-zinc-500 text-sm">Follow these steps to ensure you're ready for Election Day.</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-civic-600 font-mono">{progress}% Ready</span>
          <div className="w-32 h-2 bg-zinc-200 rounded-full mt-1 overflow-hidden">
            <motion.div 
              className="h-full bg-civic-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={cn(
              "flex items-start text-left p-4 rounded-2xl transition-all border group",
              task.completed 
                ? "bg-civic-50 border-civic-200" 
                : "bg-white border-zinc-200 hover:border-civic-300 hover:shadow-md"
            )}
            id={`task-${task.id}`}
          >
            <div className={cn(
               "mt-0.5 mr-4 transition-colors",
               task.completed ? "text-civic-600" : "text-zinc-300 group-hover:text-civic-300"
            )}>
              {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </div>
            <div>
              <h3 className={cn(
                "font-medium leading-tight mb-1",
                task.completed ? "text-civic-900" : "text-zinc-800"
              )}>
                {task.title}
              </h3>
              <p className={cn(
                "text-sm leading-relaxed",
                task.completed ? "text-civic-600/70" : "text-zinc-500"
              )}>
                {task.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800">
          <strong>Note:</strong> Election laws vary significantly by state and country. Always verify your specific requirements at your local election commissioner's official website.
        </p>
      </div>
    </div>
  );
}
