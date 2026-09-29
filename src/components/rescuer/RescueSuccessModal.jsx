import React, { useEffect } from 'react';
import { useRescue } from '../../context/RescueContext';
import { Award, Sparkles, ArrowRight, X, ArrowLeft } from 'lucide-react';
import { triggerRescueConfetti } from '../../utils/confetti';

export const RescueSuccessModal = () => {
  const { completedRescueData, setCompletedRescueData } = useRescue();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setCompletedRescueData(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCompletedRescueData]);

  if (!completedRescueData) return null;

  const { reservation, historyEntry } = completedRescueData;

  const handleCelebrateAgain = () => {
    triggerRescueConfetti();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setCompletedRescueData(null);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200 font-mono"
    >
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/60 rounded-3xl shadow-2xl shadow-emerald-900/50 overflow-hidden text-center flex flex-col max-h-[90vh]">
        {/* Top Header with Back / Close Button */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/80">
          <button
            onClick={() => setCompletedRescueData(null)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs font-bold transition-all border border-slate-700 active:scale-95"
            title="Return to Radar"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← BACK TO RADAR</span>
          </button>

          <button
            onClick={() => setCompletedRescueData(null)}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Celebration Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          {/* Celebration Header Graphic */}
          <div className="relative my-1 inline-block">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-400 flex items-center justify-center text-4xl sm:text-5xl shadow-xl shadow-emerald-500/30 mx-auto animate-bounce">
              {reservation.foodEmoji || '🍔'}
            </div>
            <span className="absolute -bottom-1 -right-1 text-2xl sm:text-3xl">🎉</span>
          </div>

          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              PATIENT ADOPTED & SAVED!
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
              🎉 FOOD RESCUED!
            </h2>

            <p className="text-sm sm:text-base font-bold text-amber-300">
              {reservation.foodName} has found a loving belly!
            </p>

            <p className="text-xs text-slate-400 italic max-w-md mx-auto">
              "Congratulations. You saved a meal from a tragic fate in the dumpster."
            </p>
          </div>

          {/* Victory Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3 text-left">
            <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-2xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">You Saved</div>
              <div className="text-base sm:text-lg font-black text-emerald-400">
                ₹{historyEntry.savedAmount}
              </div>
            </div>

            <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-2xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Hero Pts</div>
              <div className="text-base sm:text-lg font-black text-amber-400">
                +{historyEntry.points}
              </div>
            </div>

            <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-2xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Rescued</div>
              <div className="text-base sm:text-lg font-black text-white">
                {reservation.quantity} item{reservation.quantity > 1 ? 's' : ''}
              </div>
            </div>

            <div className="bg-slate-950/80 p-2.5 sm:p-3 rounded-2xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Waste Avoided</div>
              <div className="text-base sm:text-lg font-black text-teal-400">
                ~{(reservation.quantity * 0.45).toFixed(1)} kg
              </div>
            </div>
          </div>

          {/* Hero Certificate */}
          <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-3 sm:p-4 text-xs text-emerald-200/90 text-left space-y-1">
            <div className="flex items-center gap-2 font-bold text-emerald-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>OFFICIAL CITIZEN VALOR CERTIFICATE</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Issued to <strong className="text-white">{reservation.customerName}</strong> for courageous consumption of safe surplus food before closing.
            </p>
          </div>
        </div>

        {/* Sticky Bottom Actions */}
        <div className="p-3.5 sm:p-4 bg-slate-950/95 border-t border-slate-800 shrink-0 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleCelebrateAgain}
            className="w-full sm:w-auto flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>More Confetti!</span>
          </button>

          <button
            onClick={() => setCompletedRescueData(null)}
            className="w-full sm:w-auto flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Awesome, Dismiss</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
