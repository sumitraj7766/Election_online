import React from 'react';
import { motion } from 'motion/react';
import { Calendar, UserCheck, Vote, Award, Landmark } from 'lucide-react';
import { cn } from '../lib/utils';

const timelineData = [
  {
    icon: Calendar,
    title: "Registration Period",
    date: "Months before Election Day",
    description: "The window to register as a voter opens. Deadlines vary by jurisdiction, often closing 30 days before the election.",
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    icon: UserCheck,
    title: "Primary Elections / Caucuses",
    date: "6-12 months before General Election",
    description: "Political parties select their nominees for various offices through a series of local elections.",
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    icon: Landmark,
    title: "Conventions & Nominations",
    date: "Summer before Election",
    description: "Parties formally nominate their candidates and unify their platform for the general campaign.",
    color: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    icon: Vote,
    title: "Early Voting & Election Day",
    date: "The Main Event",
    description: "Citizens cast their final ballots. Results start trickling in after polls close in the evening.",
    color: "bg-red-50 text-red-600 border-red-200"
  },
  {
    icon: Award,
    title: "Certification & Inauguration",
    date: "Weeks following Election",
    description: "Final results are certified, electors meet (in some systems), and winners take their oath of office.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200"
  }
];

export default function ElectionTimeline() {
  return (
    <div className="relative py-8">
      {/* Connector Line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-200 hidden md:block" />

      <div className="space-y-12">
        {timelineData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex flex-col md:flex-row gap-6 md:items-start"
          >
            {/* Icon Circle */}
            <div className={cn(
              "z-10 w-16 h-16 rounded-full flex items-center justify-center border shrink-0 mx-auto md:mx-0 shadow-sm transition-transform hover:scale-110",
              item.color
            )}>
              <item.icon className="w-8 h-8" />
            </div>

            {/* Content Card */}
            <div className="flex-1 text-center md:text-left bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-all">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                {item.date}
              </span>
              <h3 className="text-xl font-display font-semibold text-zinc-900 mb-2">
                {item.title}
              </h3>
              <p className="text-zinc-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
