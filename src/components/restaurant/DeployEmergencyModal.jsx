import React, { useState, useEffect } from 'react';
import { useRescue } from '../../context/RescueContext';
import { Siren, X, AlertTriangle, Terminal, ArrowLeft, Clock, Calendar, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { formatTimeStr, getFilmyTriageReportForFood } from '../../data/mockEmergencies';

export const DeployEmergencyModal = ({ isOpen, onClose }) => {
  const { addEmergency } = useRescue();

  const getInitialTime = () => {
    return formatTimeStr(Date.now());
  };

  const calculateDeadline = (listingStr, windowMinutes) => {
    try {
      const now = new Date();
      const deadline = new Date(now.getTime() + (parseInt(windowMinutes, 10) || 30) * 60 * 1000);
      return formatTimeStr(deadline.getTime());
    } catch {
      return 'In 30 mins';
    }
  };

  const [formData, setFormData] = useState({
    name: 'Miss 64-Layers Shahi Veg Pattice',
    category: 'Patties',
    emoji: '🥐',
    originalPrice: '200',
    rescuePrice: '79',
    quantity: '10',
    listedTimeStr: getInitialTime(),
    rescueWindowMinutes: '30',
    rescueDeadlineStr: calculateDeadline(getInitialTime(), 30),
    pickupWindowMinutes: '15',
    restaurant: 'Sharma Ji Ka Diljala Bakery & ICU',
    address: 'Corner Stall 8, University Circle',
    doctorNotes: getFilmyTriageReportForFood('Miss 64-Layers Shahi Veg Pattice', 'Patties', '🥐')
  });

  // Recompute deadline when rescueWindowMinutes changes
  const handleWindowChange = (mins) => {
    const deadline = calculateDeadline(formData.listedTimeStr, mins);
    setFormData(prev => ({
      ...prev,
      rescueWindowMinutes: mins,
      rescueDeadlineStr: deadline
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const original = Number(formData.originalPrice) || 0;
  const rescue = Number(formData.rescuePrice) || 0;
  const discount = original > 0 ? Math.round(((original - rescue) / original) * 100) : 0;
  const savings = Math.max(0, original - rescue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !original || !rescue) return;

    const now = Date.now();
    const windowMinutes = parseInt(formData.rescueWindowMinutes, 10) || 30;
    const expiresAt = now + windowMinutes * 60 * 1000;

    addEmergency({
      ...formData,
      listedAt: now,
      expiresAt,
      rescueWindowMinutes: windowMinutes,
      pickupWindowMinutes: parseInt(formData.pickupWindowMinutes, 10) || 15
    });

    onClose();
  };

  const emojiOptions = [
    { label: 'Patties', emoji: '🥐', defaultName: 'Miss 64-Layers Shahi Veg Pattice' },
    { label: 'Vadapav', emoji: '🥔', defaultName: 'ACP Pradyuman Vada Pav (Daya, Tod Do!)' },
    { label: 'Biryani', emoji: '🍗', defaultName: 'Nawab Majnu Dum Biryani (Zafrani Aansoo)' },
    { label: 'Bhaji', emoji: '🍲', defaultName: 'Makhan Tadpa Pav Bhaji (Amul Overdose ICU)' },
    { label: 'Kachori', emoji: '🍘', defaultName: 'Gabbar Ki Khasta Kachori (Kitne Aloo The?)' },
    { label: 'Sweets', emoji: '🍯', defaultName: 'Rasbhara Romeo Gulab Jamun (Chashni Me Dooba)' },
    { label: 'Samosa', emoji: '🥟', defaultName: 'Crime Master Gogo Samosa (Aankhein Nikaal Lunga)' },
    { label: 'Sandwich', emoji: '🥪', defaultName: 'Baburao Ka Grilled Cheese Sandwich (Utha Le Re Deva!)' },
    { label: 'Dosa', emoji: '🥞', defaultName: 'Aiyyo Thalaiva Paper Masala Dosa' },
    { label: 'Momos', emoji: '🥟', defaultName: 'Chulbul Pandey Steamed Momos (Fiery Teekha)' },
    { label: 'Pizza', emoji: '🍕', defaultName: 'Don Ka Cheesy Pizza Slice (11 Mulkon Ki Police)' },
    { label: 'Burger', emoji: '🍔', defaultName: 'Munna Bhai Double Cheese MBBS Burger' }
  ];

  const handleSelectPreset = (opt) => {
    const tailoredNotes = getFilmyTriageReportForFood(opt.defaultName, opt.label, opt.emoji);
    setFormData(prev => ({
      ...prev,
      emoji: opt.emoji,
      category: opt.label,
      name: opt.defaultName,
      doctorNotes: tailoredNotes
    }));
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-mono"
    >
      <div className="relative w-full max-w-xl bg-zinc-950 border-2 border-amber-500/80 rounded-3xl shadow-2xl shadow-amber-950/80 overflow-hidden text-left flex flex-col max-h-[90vh]">
        {/* Top Caution Stripe Bar */}
        <div className="h-2 bg-hazard-stripes shrink-0" />

        {/* Industrial Header with Back Button */}
        <div className="bg-zinc-900 p-3.5 sm:p-4 border-b border-zinc-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-mono text-xs font-bold transition-all border border-zinc-700 active:scale-95 shrink-0"
              title="Cancel and return"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← BACK</span>
            </button>

            <div className="p-1.5 rounded-lg bg-amber-500 text-black font-black shrink-0 hidden sm:block">
              <Terminal className="w-4 h-4" />
            </div>

            <div className="min-w-0">
              <h3 className="font-black text-sm sm:text-base tracking-wide uppercase text-amber-400 m-0 truncate">
                SURPLUS RESCUE WINDOW DISPATCH
              </h3>
              <p className="text-[11px] text-zinc-400 truncate">
                Configure timing & instant broadcast to hungry rescuers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors shrink-0 ml-2"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1 custom-scrollbar">
            {/* Quick Emoji Selection */}
            <div>
              <label className="block text-zinc-400 font-bold uppercase mb-1.5 text-[11px]">
                Food Category & Fast Preset
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {emojiOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleSelectPreset(opt)}
                    className={`p-2 rounded-xl text-center border transition-all ${
                      formData.emoji === opt.emoji
                        ? 'border-amber-400 bg-amber-500/20 text-white shadow-lg shadow-amber-500/20 scale-105'
                        : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xl">{opt.emoji}</div>
                    <div className="text-[10px] mt-0.5 truncate">{opt.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Food Name & Portions */}
            <div>
              <label className="block text-zinc-400 font-bold uppercase mb-1 text-[11px]">
                Food Rescue Listing Name (e.g. 10 Veg Pattice)
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                placeholder="e.g. 10 Veg Pattice"
              />
            </div>

            {/* Pricing and Quantity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-zinc-400 font-bold uppercase mb-1 text-[11px]">
                  Original Menu Price (₹)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-amber-400 font-bold uppercase mb-1 text-[11px]">
                  Emergency Rescue Price (₹)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.rescuePrice}
                  onChange={(e) => setFormData({ ...formData, rescuePrice: e.target.value })}
                  className="w-full bg-zinc-900 border border-amber-500/80 rounded-xl px-3.5 py-2.5 text-sm text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-bold uppercase mb-1 text-[11px]">
                  Portions Available
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* ========================================================= */}
            {/* RESCUE TIMING CONFIGURATION (THE CORE RESCUE WINDOW SYSTEM) */}
            {/* ========================================================= */}
            <div className="bg-zinc-900/90 border border-amber-500/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs border-b border-zinc-800 pb-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>RESCUE WINDOW & DEADLINE CONFIGURATION</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Food preparation/listing time */}
                <div>
                  <label className="block text-zinc-400 font-bold uppercase mb-1 text-[11px]">
                    Listing / Prep Time
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.listedTimeStr}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        listedTimeStr: val,
                        rescueDeadlineStr: calculateDeadline(val, prev.rescueWindowMinutes)
                      }));
                    }}
                    placeholder="e.g. 7:30 PM"
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-zinc-500 mt-0.5 block">When surplus was listed</span>
                </div>

                {/* 2. Rescue window duration */}
                <div>
                  <label className="block text-amber-300 font-bold uppercase mb-1 text-[11px]">
                    Rescue Window
                  </label>
                  <select
                    value={formData.rescueWindowMinutes}
                    onChange={(e) => handleWindowChange(e.target.value)}
                    className="w-full bg-zinc-950 border border-amber-500/60 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                  >
                    <option value="15">15 minutes (RUSH)</option>
                    <option value="30">30 minutes (STANDARD)</option>
                    <option value="45">45 minutes (EXTENDED)</option>
                    <option value="60">60 minutes (1 HOUR)</option>
                    <option value="90">90 minutes (LONG)</option>
                  </select>
                  <span className="text-[10px] text-zinc-500 mt-0.5 block">Customer claim countdown</span>
                </div>

                {/* 3. Rescue deadline */}
                <div>
                  <label className="block text-rose-400 font-bold uppercase mb-1 text-[11px]">
                    Rescue Deadline
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.rescueDeadlineStr}
                    onChange={(e) => setFormData({ ...formData, rescueDeadlineStr: e.target.value })}
                    placeholder="e.g. 8:00 PM"
                    className="w-full bg-zinc-950 border border-rose-500/40 rounded-xl px-3 py-2 text-xs text-rose-300 font-bold focus:outline-none focus:border-rose-400"
                  />
                  <span className="text-[10px] text-zinc-500 mt-0.5 block">Closing discard time</span>
                </div>
              </div>

              {/* 4. Pickup duration/window */}
              <div className="pt-1 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-zinc-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
                  <span>🚶 Customer Pickup Window (After Claim):</span>
                </label>
                <select
                  value={formData.pickupWindowMinutes}
                  onChange={(e) => setFormData({ ...formData, pickupWindowMinutes: e.target.value })}
                  className="bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-teal-300 font-bold focus:outline-none focus:border-teal-400"
                >
                  <option value="10">10 mins after claim</option>
                  <option value="15">15 mins after claim (Default)</option>
                  <option value="20">20 mins after claim</option>
                  <option value="30">30 mins after claim</option>
                </select>
              </div>

              {/* Exact Example Summary Box matching prompt */}
              <div className="bg-zinc-950/90 rounded-xl p-3 border border-amber-500/20 text-[11px] text-zinc-300 space-y-1">
                <div className="text-amber-400 font-bold">📋 RESCUE SPECIFICATION SUMMARY:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] font-mono text-zinc-300">
                  <div>• <strong>Food:</strong> {formData.name || 'Veg Pattice'}</div>
                  <div>• <strong>Listed at:</strong> {formData.listedTimeStr}</div>
                  <div>• <strong>Rescue deadline:</strong> {formData.rescueDeadlineStr}</div>
                  <div>• <strong>Rescue window:</strong> {formData.rescueWindowMinutes} minutes</div>
                </div>
                <div className="text-teal-400 text-[10px] pt-0.5">
                  • <strong>Pickup duration:</strong> {formData.pickupWindowMinutes} minutes allowed after customer claims
                </div>
              </div>
            </div>

            {/* Restaurant Details & Pickup Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-bold uppercase mb-1 text-[11px]">
                  Kitchen / Brand Name
                </label>
                <input
                  type="text"
                  value={formData.restaurant}
                  onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-bold uppercase mb-1 text-[11px]">
                  Pickup Counter / Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Humorous Filmy Flirty Emergency Reason */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-amber-400 font-bold uppercase text-[11px] flex items-center gap-1">
                  <span>💋</span>
                  <span>Chef / Doctor Ki Filmy & Flirty Diagnosis:</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const freshNote = getFilmyTriageReportForFood(formData.name, formData.category, formData.emoji);
                    setFormData(prev => ({ ...prev, doctorNotes: freshNote }));
                  }}
                  className="px-2 py-0.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-bold transition-all flex items-center gap-1 active:scale-95"
                >
                  <RefreshCw className="w-3 h-3 animate-spin-slow" />
                  <span>🎲 Generate Food Dialogue</span>
                </button>
              </div>
              <textarea
                rows="2"
                value={formData.doctorNotes}
                onChange={(e) => setFormData({ ...formData, doctorNotes: e.target.value })}
                placeholder="e.g. Babu Moshai... Biryani aur Ishq dono garam hi acche lagte hain! Aao aur rescue karo jaaneman! 😉🔥"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-amber-200 italic focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="p-3.5 sm:p-4 bg-zinc-900/95 border-t border-zinc-800 shrink-0 space-y-2">
            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 rounded-xl font-black text-sm tracking-wider text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-500/20 border-2 border-amber-300 flex items-center justify-center gap-2 transform active:scale-98 transition-all"
            >
              <Siren className="w-5 h-5 text-black animate-siren-wiggle shrink-0" />
              <span>🚨 BROADCAST SURPLUS TO RESCUERS NOW</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 rounded-xl text-xs font-mono font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← CANCEL & RETURN TO KITCHEN DASHBOARD</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
