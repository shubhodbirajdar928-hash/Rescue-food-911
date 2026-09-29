import React from 'react';
import { useRescue } from '../../context/RescueContext';
import { Trophy, Heart, IndianRupee, Utensils, Award } from 'lucide-react';

export const RescuerProfile = () => {
  const { history, totalHeroPoints, totalMoneySaved, totalRescuedCount } = useRescue();

  const getHeroTitle = (points) => {
    if (points >= 300) return { title: 'SUPREME FOOD GUARDIAN 🎖️', rank: 'Level 5 (Max Rank)', next: 'Max Level Achieved' };
    if (points >= 150) return { title: 'CAPED SURPLUS CRUSADER 🦸', rank: 'Level 4', next: '150 pts to Supreme Guardian' };
    if (points >= 80) return { title: 'FIRST RESPONDER CHEW SQUAD 🚑', rank: 'Level 3', next: '70 pts to Caped Crusader' };
    return { title: 'TRAINEE RESCUER 🧢', rank: 'Level 1', next: '30 pts to Chew Squad' };
  };

  const heroStats = getHeroTitle(totalHeroPoints);

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 text-left font-mono">
      {/* Rescuer Badge Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 flex items-center justify-center text-3xl shadow-lg shadow-red-500/30 border border-amber-300/40">
            🦸
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                {heroStats.rank}
              </span>
              <span className="text-xs text-slate-400">CALLSIGN: HUNGRY_LEGEND</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white m-0 tracking-tight font-sans">
              {heroStats.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Authorized emergency consumer of safe discounted restaurant surplus.
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-right">
          <div className="text-[10px] text-slate-400 uppercase">RESCUE POINTS</div>
          <div className="text-2xl font-black text-amber-400 flex items-center gap-1 justify-end">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>{totalHeroPoints} PTS</span>
          </div>
        </div>
      </div>

      {/* Hero Stats Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5 uppercase">
            <Utensils className="w-3.5 h-3.5 text-red-400" />
            <span>TOTAL FOOD RESCUED</span>
          </div>
          <div className="text-2xl font-black text-white">
            {totalRescuedCount} items
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">
            Zero casualties reported
          </div>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5 uppercase">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
            <span>TOTAL MONEY SAVED</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">
            ₹{totalMoneySaved}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Direct savings on delicious meals
          </div>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5 uppercase">
            <Heart className="w-3.5 h-3.5 text-amber-400" />
            <span>NEXT TIER</span>
          </div>
          <div className="text-xl font-bold text-amber-300">
            {heroStats.next}
          </div>
          <div className="text-[11px] text-amber-400/80 mt-1">
            Keep chewing for glory!
          </div>
        </div>
      </div>

      {/* History Feed */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>PREVIOUS HEROIC MEALS ADOPTED ({history.length})</span>
          </h4>
          <span className="text-[11px] text-slate-500">
            Verified Survival Log
          </span>
        </div>

        {history.length === 0 ? (
          <div className="bg-slate-950/60 rounded-2xl p-8 border border-slate-800 text-center">
            <span className="text-3xl block mb-2">🍽️</span>
            <p className="text-sm text-slate-300 font-medium">No rescues yet.</p>
            <p className="text-xs text-slate-500 mt-1">
              Your superhero stomach is needed! Rescue an urgent meal from the active feed.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/90 rounded-2xl p-3.5 border border-slate-800 flex items-center justify-between gap-4 text-xs hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {item.emoji || '🍔'}
                  </span>
                  <div>
                    <div className="font-bold text-white text-sm">
                      {item.foodName}
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      {item.restaurant} • <span className="text-slate-500">{item.date}</span>
                    </div>
                    {item.heroReview && (
                      <div className="text-[11px] text-amber-300/80 italic mt-0.5">
                        {item.heroReview}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-amber-400 font-bold text-sm">
                    +{item.points} pts
                  </div>
                  <div className="text-emerald-400 text-[11px]">
                    Saved ₹{item.savedAmount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
