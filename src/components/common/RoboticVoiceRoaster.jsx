import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Bot, Sparkles, X, Radio } from 'lucide-react';
import { isRoboRoastEnabled, setRoboRoastEnabled, testRandomRoast } from '../../utils/roboticVoiceRoaster';

export const RoboticVoiceRoaster = () => {
  const [enabled, setEnabled] = useState(isRoboRoastEnabled);
  const [currentRoast, setCurrentRoast] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleRoast = (e) => {
      if (!e.detail) return;
      setCurrentRoast(e.detail);
      setVisible(true);

      // Auto dismiss after 6 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 6000);

      return () => clearTimeout(timer);
    };

    const handleToggle = (e) => {
      setEnabled(e.detail.enabled);
    };

    window.addEventListener('robotic-roast-spoken', handleRoast);
    window.addEventListener('robo-roast-toggle', handleToggle);

    return () => {
      window.removeEventListener('robotic-roast-spoken', handleRoast);
      window.removeEventListener('robo-roast-toggle', handleToggle);
    };
  }, []);

  const toggleVoice = () => {
    const next = !enabled;
    setEnabled(next);
    setRoboRoastEnabled(next);
  };

  return (
    <>
      {/* On-screen visual Cyberpunk Roast Subtitle Balloon */}
      {visible && currentRoast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md animate-in slide-in-from-bottom-5 duration-300">
          <div className={`p-4 rounded-3xl border shadow-2xl backdrop-blur-xl text-left font-mono ${
            currentRoast.isError
              ? 'bg-rose-950/95 border-rose-500/80 text-rose-100 shadow-rose-950/80'
              : 'bg-slate-900/95 border-amber-500/80 text-amber-100 shadow-amber-950/80'
          }`}>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-black/40 border border-white/20 text-white flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="font-bold text-[11px] tracking-wider uppercase">ROBO-ROASTER 3000 🤖</span>
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <Radio className="w-2.5 h-2.5 animate-ping" />
                  TALKING OUT LOUD
                </span>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm font-sans leading-relaxed text-white">
              "{currentRoast.text}"
            </p>

            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/70">
              <span className="italic flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Browser Voice Audio Active
              </span>
              <button
                onClick={testRandomRoast}
                className="px-2 py-1 rounded bg-black/40 hover:bg-black/60 text-amber-300 font-bold border border-amber-500/30"
              >
                Next Roast 🎙️
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
