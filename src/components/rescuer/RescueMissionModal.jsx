import React, { useEffect, useState } from 'react';
import { useRescue } from '../../context/RescueContext';
import { Clock, MapPin, CheckCircle2, Navigation, X, ArrowLeft, AlertCircle, AlertTriangle } from 'lucide-react';

export const RescueMissionModal = () => {
  const { activeMission, setActiveMission, markOnTheWay } = useRescue();
  const [clockTick, setClockTick] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setClockTick(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveMission(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveMission]);

  if (!activeMission) return null;

  const mission = activeMission;
  const isOnTheWay = mission.status === 'ON_THE_WAY';

  // Calculate live pickup seconds remaining from absolute timestamp
  const now = Date.now();
  const pickupExpiresAt = mission.pickupExpiresAt || (now + 15 * 60 * 1000);
  const pickupSecondsLeft = Math.max(0, Math.floor((pickupExpiresAt - now) / 1000));
  const isPickupExpired = pickupSecondsLeft === 0;

  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return '00:00';
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setActiveMission(null);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className={`relative w-full max-w-lg bg-slate-900 border rounded-3xl shadow-2xl overflow-hidden text-left flex flex-col max-h-[90vh] font-mono transition-colors ${
        isPickupExpired
          ? 'border-rose-500/60 shadow-rose-950/60'
          : 'border-emerald-500/50 shadow-emerald-950/60'
      }`}>
        {/* Animated Top Dispatch Banner with Back Button */}
        <div className={`p-3.5 sm:p-4 text-white shrink-0 shadow-md ${
          isPickupExpired
            ? 'bg-gradient-to-r from-rose-900 via-red-950 to-slate-900'
            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={() => setActiveMission(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/30 hover:bg-black/50 text-white font-mono text-xs font-bold transition-all border border-white/20 active:scale-95 shrink-0"
                title="Back to Radar"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← BACK</span>
              </button>

              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xl animate-bounce shrink-0">🚑</span>
                <div className="min-w-0">
                  <h3 className="font-black text-sm sm:text-base tracking-wider m-0 truncate">
                    {isPickupExpired ? 'PICKUP WINDOW CLOSED' : 'RESCUE IN PROGRESS'}
                  </h3>
                  <p className="text-[11px] text-emerald-100 truncate">
                    {mission.missionCode}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveMission(null)}
              className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors shrink-0 ml-2"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Mission Details */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          {/* USER ACCEPTED MISSION STATUS & LIVE PICKUP COUNTDOWN */}
          {!isPickupExpired ? (
            <div className="bg-emerald-950/40 border-2 border-emerald-500/50 rounded-2xl p-4 text-center space-y-2 shadow-inner">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>✅ RESCUE MISSION ACCEPTED</span>
              </div>

              {/* Prominent Live Pickup Countdown */}
              <div className="pt-1">
                <div className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>⏱️ PICKUP TIME LEFT: {formatTime(pickupSecondsLeft)}</span>
                </div>
                <div className="inline-block px-5 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 font-black text-3xl sm:text-4xl text-emerald-400 tracking-widest shadow-lg">
                  {formatTime(pickupSecondsLeft)}
                </div>
              </div>

              <p className="text-xs text-slate-300 pt-1">
                Head to the restaurant counter before this pickup window closes!
              </p>
            </div>
          ) : (
            /* PICKUP WINDOW EXPIRED STATE */
            <div className="bg-rose-950/40 border-2 border-red-500/70 rounded-2xl p-4 text-center space-y-2 animate-in fade-in">
              <div className="text-3xl animate-bounce">😭</div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/50">
                <AlertCircle className="w-4 h-4" />
                <span>🚨 PICKUP WINDOW EXPIRED</span>
              </div>

              <h4 className="text-lg font-black text-rose-300 m-0 font-sans">
                "Arre bhai, pickup ka time bhi nikal gaya! 😭"
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                The restaurant's configured pickup window has elapsed. Please check directly at the kitchen counter with your mission code.
              </p>
            </div>
          )}

          {/* Mission Details Card */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-300">
              <span className="text-slate-400">PATIENT (FOOD):</span>
              <span className="font-bold text-white text-sm flex items-center gap-1.5">
                <span>{mission.foodEmoji}</span>
                <span>{mission.foodName}</span>
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-300">
              <span className="text-slate-400">QUANTITY RESCUED:</span>
              <span className="font-bold text-amber-300 text-sm">
                {mission.quantity} item{mission.quantity > 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-300">
              <span className="text-slate-400">RESCUE PAYMENT:</span>
              <span className="font-bold text-emerald-400 text-sm">
                ₹{mission.rescuePrice * mission.quantity} (Pay at counter)
              </span>
            </div>

            <div className="pt-1">
              <span className="text-slate-400 block mb-1">PICKUP LOCATION:</span>
              <div className="font-bold text-white text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{mission.restaurant}</span>
              </div>
              <div className="text-slate-400 text-[11px] pl-5 mt-0.5">
                {mission.address}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-950/95 border-t border-slate-800 shrink-0 space-y-2">
          {!isPickupExpired ? (
            <>
              {!isOnTheWay ? (
                <button
                  onClick={() => markOnTheWay(mission.id)}
                  className="w-full py-3.5 rounded-xl font-black text-sm tracking-wider text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transform active:scale-98 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>🏃 I'M ON MY WAY (ALERT THE KITCHEN)</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-center space-y-1">
                  <div className="text-xs text-amber-300 font-bold">
                    ✓ Kitchen alerted! Food is reserved for you at the counter.
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Present Mission Code <span className="text-white font-mono font-bold">{mission.missionCode}</span> to counter staff to collect your meal.
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => setActiveMission(null)}
              className="w-full py-3.5 rounded-xl font-black text-sm tracking-wider text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2 transition-all"
            >
              <span>DISMISS EXPIRED MISSION</span>
            </button>
          )}

          <button
            onClick={() => setActiveMission(null)}
            className="w-full py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white transition-colors text-center"
          >
            ← Minimize / Back to Radar
          </button>
        </div>
      </div>
    </div>
  );
};
