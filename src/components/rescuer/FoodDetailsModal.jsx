import React, { useState, useEffect } from 'react';
import { useRescue } from '../../context/RescueContext';
import { StatusBadge } from '../common/StatusBadge';
import { CountdownTimer } from '../common/CountdownTimer';
import { EcgLine } from '../common/EcgLine';
import {
  X,
  Siren,
  MapPin,
  Utensils,
  ShieldCheck,
  HeartPulse,
  AlertTriangle,
  Minus,
  Plus,
  ArrowLeft,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const FoodDetailsModal = () => {
  const { selectedEmergency, setSelectedEmergency, reserveEmergency, emergencies } = useRescue();
  const [qty, setQty] = useState(1);
  const [realClock, setRealClock] = useState(() => new Date());

  // Real-time ticking clock
  useEffect(() => {
    const timer = setInterval(() => setRealClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedEmergency(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedEmergency]);

  if (!selectedEmergency) return null;

  // Retrieve live updated item from emergencies to guarantee live second-by-second countdown
  const item = emergencies.find(e => e.id === selectedEmergency.id) || selectedEmergency;

  // Calculate remaining seconds strictly from absolute timestamp (prevents page refresh restart & negatives)
  const secondsLeft = Math.max(0, Math.floor(((item.expiresAt || (Date.now() + (item.secondsLeft || 0) * 1000)) - Date.now()) / 1000));
  const isExpired = secondsLeft === 0;
  const isLowTime = !isExpired && secondsLeft <= 300; // Less than 5 minutes remain
  const isActive = !isExpired && !isLowTime;
  const isSoldOut = (item.quantity || 0) <= 0;

  const currentAvailableQty = Math.max(0, item.quantity || 0);
  const effectiveQty = Math.min(qty, Math.max(1, currentAvailableQty));

  const savings = (item.originalPrice - item.rescuePrice) * effectiveQty;
  const totalCost = item.rescuePrice * effectiveQty;
  const discountPercent = Math.round(
    ((item.originalPrice - item.rescuePrice) / item.originalPrice) * 100
  );

  const formatClock = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  const formatMinutesSeconds = (totalSeconds) => {
    if (totalSeconds <= 0) return '00:00';
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRescueSubmit = () => {
    if (isExpired || isSoldOut) return;
    reserveEmergency(item, effectiveQty, 'You (Hero On-Duty)');
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedEmergency(null);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className={`relative w-full max-w-xl bg-slate-900 border rounded-3xl shadow-2xl overflow-hidden text-left flex flex-col max-h-[90vh] transition-colors ${
        isExpired
          ? 'border-rose-500/50 shadow-rose-950/60'
          : isLowTime
          ? 'border-orange-500/80 shadow-orange-950/80 animate-pulse-slow'
          : 'border-red-500/40 shadow-red-950/60'
      }`}>
        {/* Sticky Top Emergency Header with Prominent BACK Button */}
        <div className={`p-3.5 sm:p-4 text-white flex items-center justify-between shrink-0 shadow-md ${
          isExpired
            ? 'bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border-b border-rose-500/30'
            : isLowTime
            ? 'bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 animate-pulse'
            : 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600'
        }`}>
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setSelectedEmergency(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 text-white font-mono text-xs font-bold transition-all border border-white/20 active:scale-95 shadow-sm shrink-0"
              title="Return to Radar"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← BACK</span>
            </button>

            <div className="flex items-center gap-1.5 font-mono text-xs font-black tracking-wider uppercase text-white truncate ml-1">
              <Siren className="w-4 h-4 text-amber-200 animate-siren-wiggle shrink-0" />
              <span className="truncate">911 PATIENT • {item.code}</span>
            </div>
          </div>

          <button
            onClick={() => setSelectedEmergency(null)}
            className="p-1.5 rounded-xl bg-black/25 hover:bg-black/50 text-white transition-colors shrink-0 ml-2"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Patient Trauma File Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          {/* Main Title & Status */}
          <div className="flex items-start gap-3.5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
              <span className="filter drop-shadow-md">{item.emoji}</span>
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <StatusBadge condition={isExpired ? 'EXPIRED' : item.condition} size="md" showVibe={true} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white m-0 leading-tight">
                {item.name}
              </h2>
              <p className="text-xs sm:text-sm text-amber-300/90 font-medium flex items-center gap-1.5 mt-1 font-mono">
                <Utensils className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Hospital Kitchen: {item.restaurant}</span>
              </p>
            </div>
          </div>

          {/* VENDOR CONFIGURATION TIME TELEMETRY BAR */}
          <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 font-mono text-xs text-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Listed At</div>
              <div className="font-bold text-white text-xs mt-0.5">{item.listedTimeStr || 'Recent'}</div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-amber-400 uppercase">Rescue Window</div>
              <div className="font-bold text-amber-300 text-xs mt-0.5">{item.rescueWindowMinutes || 30} mins</div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-rose-400 uppercase">Rescue Deadline</div>
              <div className="font-bold text-rose-300 text-xs mt-0.5">{item.rescueDeadlineStr || 'Shift End'}</div>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-teal-400 uppercase">Pickup Window</div>
              <div className="font-bold text-teal-300 text-xs mt-0.5">{item.pickupWindowMinutes || 15} mins</div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* THE 3 RESCUE TIMER STATES (ACTIVE, LOW TIME, EXPIRED)           */}
          {/* =============================================================== */}

          {/* STATE 3: EXPIRED (00:00) */}
          {isExpired ? (
            <div className="bg-gradient-to-b from-rose-950/60 to-slate-950 border-2 border-red-500/80 rounded-2xl p-5 text-center space-y-3 shadow-2xl shadow-rose-950/50 animate-in fade-in">
              <div className="text-4xl animate-bounce">😭</div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/50">
                  <AlertCircle className="w-4 h-4" />
                  RESCUE WINDOW CLOSED • 00:00
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-rose-400 font-mono tracking-tight m-0 pt-1">
                  🚨 AREY BHAI! TIME KHATAM HO GAYA! 😭
                </h3>

                <p className="text-sm sm:text-base font-bold text-white font-mono m-0">
                  Food rescue nahi ho paya...
                </p>

                <p className="text-xs sm:text-sm text-rose-300 font-mono m-0">
                  The rescue window for this food has expired. 🥲
                </p>
              </div>

              {/* Explicit Food Safety Clarification as mandated */}
              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-left font-mono text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>FOOD SAFETY CONFIRMATION:</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  The food is <strong>not unsafe</strong>. The timer simply marks the end of the vendor's configured surplus rescue window before kitchen shift closure.
                </p>
              </div>
            </div>
          ) : (
            /* STATE 1 (ACTIVE) OR STATE 2 (LOW TIME < 5 MINS) */
            <div className={`rounded-2xl p-4 border text-center space-y-2.5 shadow-inner transition-all ${
              isLowTime
                ? 'bg-gradient-to-b from-orange-950/40 via-slate-950 to-slate-950 border-orange-500/70 shadow-orange-950/50 animate-pulse-slow'
                : 'bg-slate-950 border-slate-800'
            }`}>
              {/* State Header Banner */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider border ${
                  isLowTime
                    ? 'bg-orange-500/25 text-orange-300 border-orange-500/60 animate-pulse'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                  {isLowTime ? '🟠 TIME RUNNING OUT!' : '🟢 RESCUE MISSION ACTIVE'}
                </span>

                <div className="text-[11px] font-mono text-slate-400">
                  Real Time: <span className="text-white font-bold">{formatClock(realClock)}</span>
                </div>
              </div>

              {/* Prominent Live Countdown Header */}
              <div className="text-xs font-mono text-red-400 uppercase tracking-widest font-black flex items-center justify-center gap-1.5 pt-1">
                <HeartPulse className="w-4 h-4 text-red-500 animate-pulse" />
                <span>🚨 RESCUE TIME LEFT</span>
              </div>

              {/* Big Visually Prominent Timer Updating Every Second */}
              <div className="flex items-center justify-center py-1">
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border font-mono text-4xl sm:text-5xl font-black tracking-widest backdrop-blur-md shadow-2xl ${
                  isLowTime
                    ? 'bg-orange-950/60 text-orange-400 border-orange-500/80 shadow-orange-500/30 animate-pulse'
                    : 'bg-slate-900/90 text-emerald-400 border-emerald-500/40 shadow-emerald-950/50'
                }`}>
                  <Clock className={`w-8 h-8 sm:w-10 sm:h-10 ${isLowTime ? 'text-orange-400 animate-bounce' : 'text-emerald-400'}`} />
                  <span>{formatMinutesSeconds(secondsLeft)}</span>
                  <span className="text-xs sm:text-sm font-sans uppercase font-bold text-slate-400 block -mt-2">
                    LEFT
                  </span>
                </div>
              </div>

              {/* Heartbeat ECG Line */}
              <div className="pt-1">
                <EcgLine className="h-6" color={isLowTime ? '#f97316' : '#10b981'} />
              </div>
            </div>
          )}

          {/* Doctor Triage Diagnosis - Hindi Filmy & Flirty */}
          <div className="bg-gradient-to-r from-slate-950 via-rose-950/20 to-slate-950 rounded-2xl p-4 border border-rose-500/40 text-xs font-mono space-y-2 shadow-inner">
            <div className="text-[11px] text-rose-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-black text-amber-300">
                <span className="text-base">💋</span>
                <span>CHEF & DOCTOR KI FILMY DIAGNOSIS (मसालेदार रिपोर्ट):</span>
              </span>
              <span className="text-[10px] text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-500/40">
                🎬 100% FILMY & FLIRTY
              </span>
            </div>
            <p className="text-amber-100 font-sans italic leading-relaxed text-sm sm:text-base border-l-2 border-rose-500/80 pl-3 py-1 font-medium bg-black/20 rounded-r-xl">
              "{item.doctorNotes}"
            </p>
          </div>

          {/* Location & Safe food pledge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 flex items-start gap-2.5 text-xs font-mono">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="font-bold text-white truncate">Pickup ({item.distance} km away)</div>
                <div className="text-slate-400 text-[11px] truncate">{item.address}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-300/90 bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-xl font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-[11px] leading-tight">
                <strong>Safe Food Pledge:</strong> Fresh surplus. 100% edible before shift end.
              </span>
            </div>
          </div>

          {/* Quantity Selector & Price Breakdown */}
          <div className={`rounded-2xl p-3.5 sm:p-4 border flex flex-col sm:flex-row items-center justify-between gap-3 font-mono transition-opacity ${
            isExpired || isSoldOut ? 'bg-slate-950/50 border-slate-800/60 opacity-60' : 'bg-slate-950 border-slate-800'
          }`}>
            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">PATIENTS:</span>
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-1">
                <button
                  disabled={isExpired || isSoldOut || effectiveQty <= 1}
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-20 disabled:hover:bg-slate-800 flex items-center justify-center text-white"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-white text-base">
                  {effectiveQty}
                </span>
                <button
                  disabled={isExpired || isSoldOut || effectiveQty >= currentAvailableQty}
                  onClick={() => setQty(q => Math.min(currentAvailableQty, q + 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-20 disabled:hover:bg-slate-800 flex items-center justify-center text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-slate-400">
                {isSoldOut ? (
                  <span className="text-rose-400 font-bold">(ALL RESCUED)</span>
                ) : (
                  <span>({currentAvailableQty} available)</span>
                )}
              </span>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-xs text-slate-400 line-through">
                Original: ₹{item.originalPrice * effectiveQty}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  ₹{totalCost}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  SAVE ₹{savings} ({discountPercent}% OFF)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Actions */}
        <div className="p-3.5 sm:p-4 bg-slate-950/95 border-t border-slate-800 shrink-0 space-y-2">
          {/* If EXPIRED: Show "🔄 FIND ANOTHER RESCUE" button and disable accept */}
          {isExpired ? (
            <button
              onClick={() => setSelectedEmergency(null)}
              className="w-full py-4 rounded-2xl font-black text-base sm:text-lg tracking-wider text-white bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 hover:from-amber-500 hover:to-orange-500 shadow-xl shadow-amber-600/30 border border-amber-400/40 flex items-center justify-center gap-2 transform active:scale-98 transition-all"
            >
              <RotateCcw className="w-5 h-5 animate-spin-slow" />
              <span>🔄 FIND ANOTHER RESCUE</span>
            </button>
          ) : isSoldOut ? (
            /* If SOLD OUT: Prevent claiming */
            <div className="space-y-2">
              <button
                disabled
                className="w-full py-4 rounded-2xl font-black text-sm tracking-wider text-slate-400 bg-slate-800/80 border border-slate-700/60 cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>🚫 ALL PORTIONS HAVE ALREADY BEEN RESCUED</span>
              </button>
              <button
                onClick={() => setSelectedEmergency(null)}
                className="w-full py-2 rounded-xl text-xs font-mono font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← BACK TO EMERGENCY RADAR</span>
              </button>
            </div>
          ) : (
            /* ACTIVE OR LOW TIME: "🚨 ACCEPT RESCUE" button */
            <div className="space-y-2">
              <button
                onClick={handleRescueSubmit}
                className={`w-full py-3.5 sm:py-4 rounded-2xl font-black text-base sm:text-lg tracking-wider text-white shadow-xl flex items-center justify-center gap-2 transform active:scale-98 transition-all ${
                  isLowTime
                    ? 'bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 hover:from-orange-500 hover:to-red-500 shadow-orange-600/40 border-2 border-orange-400/60 animate-pulse'
                    : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 shadow-red-600/40 border border-red-400/40'
                }`}
              >
                <Siren className="w-5 h-5 animate-siren-wiggle shrink-0" />
                <span>🚨 ACCEPT RESCUE (SAVE ₹{savings})</span>
              </button>

              <button
                onClick={() => setSelectedEmergency(null)}
                className="w-full py-2 rounded-xl text-xs font-mono font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← BACK TO EMERGENCY RADAR</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
