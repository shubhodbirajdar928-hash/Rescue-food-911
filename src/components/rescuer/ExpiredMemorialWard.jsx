import React from 'react';
import { useRescue } from '../../context/RescueContext';
import { AlertTriangle, Clock, MapPin, Sparkles, HeartCrack, ShieldAlert } from 'lucide-react';

export const ExpiredMemorialWard = () => {
  const { expiredEmergencies } = useRescue();

  return (
    <div className="space-y-6 text-left font-mono">
      {/* Memorial Ward Header Chassis */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 rounded-3xl border border-rose-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <HeartCrack className="w-3.5 h-3.5" />
                <span>911 MISSED RESCUES MEMORIAL WARD • शिफ्ट बंद वॉर्ड</span>
              </span>
              <span className="text-xs text-rose-400 font-bold bg-rose-950/80 border border-rose-500/40 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                RESCUE WINDOW CLOSED (00:00)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3 font-sans">
              <span>🥀 AREY BHAI! TIME KHATAM HO GAYA WARD</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-sans font-normal">
              Yeh woh lazeez pakwaan hain jinhe waqt rehte hero ka sahara nahi mil saka! Rescue window flatline hone ke baad inhe active radar se hata kar yahan memorial ward mein rakha gaya hai. 
            </p>
          </div>

          <div className="shrink-0 bg-slate-950/80 p-4 rounded-2xl border border-rose-900/50 text-center sm:text-right">
            <div className="text-[11px] text-rose-400 uppercase font-bold">Missed Portions</div>
            <div className="text-3xl font-black text-white mt-0.5">
              {expiredEmergencies.reduce((sum, item) => sum + (item.quantity || 1), 0)}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Total {expiredEmergencies.length} Batches</div>
          </div>
        </div>

        {/* Safety Note banner */}
        <div className="mt-6 pt-4 border-t border-rose-900/30 flex items-center gap-2 text-xs text-rose-300/90 font-mono">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <span>
            <strong>Food Safety Protocol:</strong> All items listed here were 100% fresh and edible, but their kitchen-mandated rescue timer hit 00:00. To prevent cold food deliveries, expired items are locked from being claimed.
          </span>
        </div>
      </div>

      {/* Grid of Expired Foods */}
      {expiredEmergencies.length === 0 ? (
        <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-12 border border-slate-800 text-center font-mono space-y-3 shadow-xl">
          <span className="text-6xl block">🏆</span>
          <h3 className="text-2xl font-black text-white">
            Dil Khush Ho Gaya Hero! Zero Missed Rescues!
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Filhal koi bhi swadisht khana expire nahi hua hai. Sabhi delicious surplus meals active radar par maujood hain ya phir hungry heroes ne chat kar liye!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expiredEmergencies.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/80 rounded-2xl border border-rose-900/40 p-5 space-y-4 shadow-xl relative overflow-hidden flex flex-col justify-between opacity-90 hover:opacity-100 transition-opacity"
            >
              {/* Expired top ribbon */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-rose-400 bg-rose-950/70 border border-rose-500/30 px-2 py-0.5 rounded">
                  {item.code}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  💀 00:00 FLATLINED
                </span>
              </div>

              {/* Food Emoji & Name */}
              <div className="flex items-start gap-3">
                <div className="text-4xl p-2 rounded-xl bg-slate-950 border border-slate-800 grayscale shrink-0">
                  {item.emoji}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-200 line-through decoration-rose-500/80">
                    {item.name}
                  </h3>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.restaurant}</span>
                  </div>
                </div>
              </div>

              {/* Bollywood Heartbreak Diagnosis Card */}
              <div className="bg-rose-950/30 border border-rose-500/20 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                  <HeartCrack className="w-3.5 h-3.5 text-rose-400" />
                  <span>🎬 AASHIQ KA SHOKAASANDESH (शोक संदेश)</span>
                </div>
                <p className="text-xs text-rose-200/90 italic leading-relaxed">
                  "{(item.doctorNotes || '').replaceAll('💋', '💔')}"
                </p>
              </div>

              {/* Price & Quantity Lost */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 line-through">₹{item.originalPrice}</span>{' '}
                  <span className="text-slate-400 font-bold">₹{item.rescuePrice}</span>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {item.quantity} units unrescued
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-rose-400 font-bold block">
                    Window: {item.rescueWindowMinutes}m closed
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Edible at counter close
                  </span>
                </div>
              </div>

              {/* Disabled Claim Button */}
              <button
                disabled
                className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-950 border border-rose-900/50 text-rose-400/60 cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>🚨 AREY BHAI! TIME KHATAM HO GAYA! 😭</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
