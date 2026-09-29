import React, { useState } from 'react';
import { useRescue } from '../../context/RescueContext';
import { Sparkles, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

export const DemoGuideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { role, setRole, resetToZero, loadSampleEmergencies, setDemoStep } = useRescue();

  const demoSteps = [
    {
      step: 1,
      targetRole: 'restaurant',
      title: '1. Restaurant Deploy',
      desc: 'Broadcast surplus food emergency (e.g. Inspector Vada Pav / Dum Biryani)',
      actionText: 'Go to Restaurant'
    },
    {
      step: 2,
      targetRole: 'rescuer',
      title: '2. Rescuer Feed',
      desc: 'Spot food patients in CRITICAL condition and click [🚨 RESCUE MEAL]',
      actionText: 'Go to Rescuer'
    },
    {
      step: 3,
      targetRole: 'rescuer',
      title: '3. Mission Accepted',
      desc: 'Confirm rescue dispatch order & click [🏃 I\'m on my way]',
      actionText: 'View Rescuer Mission'
    },
    {
      step: 4,
      targetRole: 'restaurant',
      title: '4. Restaurant Verify',
      desc: 'Open Reservations list and click [✅ Mark as Rescued]',
      actionText: 'Go to Control Room'
    },
    {
      step: 5,
      targetRole: 'rescuer',
      title: '5. Celebrate & Impact',
      desc: 'Witness confetti celebration, hero points, and impact stats!',
      actionText: 'View Hero Impact'
    }
  ];

  return (
    <div className="bg-slate-900/95 border-b border-indigo-500/30 text-xs backdrop-blur-md sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
          </span>
          <span className="font-bold tracking-wide uppercase text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            2-Min Hackathon Demo Guide
          </span>
          <span className="hidden md:inline-block text-slate-400">|</span>
          <span className="hidden md:inline-block text-slate-300">
            Current mode: <strong className="text-white uppercase">{role}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToZero}
            className="flex items-center gap-1 text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 px-2 py-1 rounded transition-colors font-bold"
            title="Reset all metrics and data to 0"
          >
            <RotateCcw className="w-3 h-3 text-rose-400" />
            <span>Reset to 0</span>
          </button>

          <button
            onClick={loadSampleEmergencies}
            className="flex items-center gap-1 text-amber-300 hover:text-white bg-amber-950/60 hover:bg-amber-900 border border-amber-500/40 px-2 py-1 rounded transition-colors font-bold"
            title="Load 8 sample food emergencies"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Load Samples</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-slate-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/30 px-2 py-1 rounded transition-colors"
          >
            <span>{isOpen ? 'Hide Walkthrough' : 'Show Walkthrough'}</span>
            {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-800/80 bg-slate-950/70 px-4 py-2.5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {demoSteps.map((s) => {
              const isActive = role === s.targetRole;
              return (
                <div
                  key={s.step}
                  onClick={() => {
                    setRole(s.targetRole);
                    setDemoStep(s.step);
                  }}
                  className={`cursor-pointer p-2 rounded-lg border transition-all text-left ${
                    isActive
                      ? 'bg-indigo-950/50 border-indigo-500/70 ring-1 ring-indigo-500/30 shadow-md'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold text-slate-200">
                    <span className="flex items-center gap-1">
                      {s.title}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300">
                      {s.targetRole === 'restaurant' ? '👨‍🍳 Rest.' : '🦸 Hero'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-tight line-clamp-2">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
