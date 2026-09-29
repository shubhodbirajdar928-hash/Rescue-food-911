import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Bot, Sparkles, X, Radio, Film, Clapperboard } from 'lucide-react';
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
                <span className="p-1.5 rounded-lg bg-black/40 border border-amber-500/40 text-amber-300 flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="font-bold text-[11px] tracking-wider uppercase">🎬 BOLLYWOOD VOICE 🎭</span>
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  <Radio className="w-2.5 h-2.5 animate-ping" />
                  70mm AUDIO 🔊
                </span>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="py-2.5 text-center space-y-1.5">
              {currentRoast.star && (
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] sm:text-[11px] text-amber-300 font-bold font-sans tracking-wide">
                  ⭐ {currentRoast.star}
                </div>
              )}
              <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-wider animate-bounce font-sans">
                {currentRoast.text}
              </div>
              {currentRoast.roman && (
                <div className="text-xs sm:text-sm font-mono font-bold text-white/80 uppercase tracking-widest">
                  [{currentRoast.roman}]
                </div>
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/70">
              <span className="italic flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Bollywood Fanfare & Speech
              </span>
              <button
                onClick={testRandomRoast}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 active:scale-95 transition-all flex items-center gap-1"
              >
                <span>Agla Dialogue</span>
                <Clapperboard className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
