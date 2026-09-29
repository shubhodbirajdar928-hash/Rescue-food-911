import React from 'react';
import { useRescue } from '../../context/RescueContext';
import { StatusBadge } from '../common/StatusBadge';
import { CountdownTimer } from '../common/CountdownTimer';
import { MapPin, Utensils, Siren, HeartPulse, Clock, AlertTriangle, AlertCircle } from 'lucide-react';

export const EmergencyCard = ({ emergency }) => {
  const { setSelectedEmergency, playAudio } = useRescue();

  const now = Date.now();
  const secondsLeft = Math.max(0, Math.floor(((emergency.expiresAt || (now + (emergency.secondsLeft || 0) * 1000)) - now) / 1000));
  const isExpired = secondsLeft === 0;
  const isLowTime = !isExpired && secondsLeft <= 300; // < 5 minutes
  const isSoldOut = (emergency.quantity || 0) <= 0;

  const discountPercent = Math.round(
    ((emergency.originalPrice - emergency.rescuePrice) / emergency.originalPrice) * 100
  );
  const savings = emergency.originalPrice - emergency.rescuePrice;

  const handleCardClick = () => {
    setSelectedEmergency(emergency);
    playAudio(isExpired ? 'error' : isLowTime ? 'siren' : 'ecg');
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative bg-slate-900/85 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between overflow-hidden ${
        isExpired
          ? 'border-rose-500/30 opacity-75 hover:opacity-95 hover:border-rose-500/60'
          : isLowTime
          ? 'border-orange-500/60 hover:border-orange-400 hover:shadow-orange-950/60 animate-pulse-slow'
          : 'border-slate-800 hover:border-emerald-500/40 hover:shadow-emerald-950/30'
      }`}
    >
      {/* Top Emergency Indicator Strip */}
      <div
        className={`h-1.5 w-full ${
          isExpired
            ? 'bg-rose-950'
            : isLowTime
            ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 animate-pulse'
            : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500'
        }`}
      />

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Tag & Countdown */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-300 bg-slate-800/90 px-2.5 py-1 rounded-md border border-slate-700/80 flex items-center gap-1">
                <span>📋</span>
                <span>{emergency.code}</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Loot: Bachao ₹{savings} ({discountPercent}% OFF)
              </span>
            </div>

            <CountdownTimer secondsLeft={secondsLeft} size="sm" showIcon={true} />
          </div>

          {/* Big Food Icon & Name */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`relative w-16 h-16 rounded-2xl border flex items-center justify-center text-4xl shadow-inner shrink-0 group-hover:scale-105 transition-transform ${
              isExpired
                ? 'bg-slate-950 border-slate-800 grayscale'
                : 'bg-gradient-to-br from-slate-800 to-slate-950 border-slate-700/70'
            }`}>
              <span className="filter drop-shadow-md">{emergency.emoji}</span>
              <span className="absolute -top-1 -right-1 text-xs select-none">🩹</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="mb-1 flex items-center gap-1.5">
                {isExpired ? (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950/80 text-rose-400 border border-rose-500/40">
                    💀 DUSTBIN FLATLINE
                  </span>
                ) : isLowTime ? (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-950/80 text-orange-400 border border-orange-500/60 animate-pulse">
                    🔥 DHADKAN TEZ (JALDI AAO!)
                  </span>
                ) : (
                  <StatusBadge condition={emergency.condition} size="sm" />
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                {emergency.name}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-mono">
                <Utensils className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate">{emergency.restaurant}</span>
              </p>
            </div>
          </div>

          {/* Timing details row */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950/70 p-2 rounded-xl border border-slate-800/80 mb-3 text-[11px] font-mono text-slate-400">
            <div>
              <span className="text-slate-500 block text-[10px]">RESCUE DEADLINE:</span>
              <span className={isExpired ? 'text-rose-400 font-bold' : 'text-slate-300 font-bold'}>
                {emergency.rescueDeadlineStr || 'Shift End'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">PICKUP WINDOW:</span>
              <span className="text-teal-400 font-bold">
                {emergency.pickupWindowMinutes || 15} mins after claim
              </span>
            </div>
          </div>

          {/* Doctor Triage Diagnosis Box */}
          <div className="bg-slate-950/80 rounded-xl p-3 border border-rose-500/20 mb-4 text-xs font-mono text-slate-300 leading-relaxed">
            <div className="text-[10px] text-rose-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>🎬 FILMY TRIAGE REPORT:</span>
            </div>
            <p className="text-amber-200/90 italic line-clamp-2 font-sans text-xs">
              "{(emergency.doctorNotes || '').replaceAll('💋', '❤️')}"
            </p>
          </div>

          {/* Location & Quantity info */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-mono pb-2 border-b border-slate-800/60">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{emergency.distance} km door hai</span>
            </div>
            <div className={isSoldOut ? 'text-rose-400 font-bold' : 'text-amber-300/90 font-medium'}>
              {isSoldOut ? '🚫 SAB KHA GAYE HERO LOG' : `📦 ${emergency.quantity} mareez bache hain`}
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-xs text-slate-400 line-through font-mono">
              MRP: ₹{emergency.originalPrice}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white font-mono">
                ₹{emergency.rescuePrice}
              </span>
              <span className="text-xs text-emerald-400 font-bold font-mono">
                (Bachat ₹{savings})
              </span>
            </div>
          </div>

          {isExpired ? (
            <div className="px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider text-rose-300 bg-rose-950/40 border border-rose-500/30 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>EXPIRED</span>
            </div>
          ) : isSoldOut ? (
            <div className="px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider text-slate-400 bg-slate-800/80 border border-slate-700/50">
              <span>ALL RESCUED</span>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wide text-white transition-all shadow-md ${
                isLowTime
                  ? 'bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 hover:from-orange-500 hover:to-red-500 shadow-orange-600/40 animate-pulse'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/30'
              }`}
            >
              <Siren className="w-4 h-4 animate-siren-wiggle" />
              <span>🚨 BACHA LO! (ADOPT)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
