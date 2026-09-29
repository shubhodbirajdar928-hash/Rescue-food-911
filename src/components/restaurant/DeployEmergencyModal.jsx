import React, { useState, useEffect } from 'react';
import { useRescue } from '../../context/RescueContext';
import {
  Siren,
  X,
  AlertTriangle,
  Terminal,
  ArrowLeft,
  Clock,
  Calendar,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Check,
  CheckCircle2
} from 'lucide-react';
import { formatTimeStr, getFilmyTriageReportForFood } from '../../data/mockEmergencies';

const MANDATORY_ITEMS = [
  {
    id: 'safeForConsumption',
    label: 'I confirm that this food is safe for consumption.'
  },
  {
    id: 'preparedAndStoredSafely',
    label: 'I confirm that the food has been prepared and stored safely.'
  },
  {
    id: 'accurateDetails',
    label: 'I confirm that the preparation time and food details are accurate.'
  },
  {
    id: 'allergenInfoProvided',
    label: 'I have provided all relevant allergen information.'
  },
  {
    id: 'notPreviouslyServed',
    label: 'I confirm that this food has not been previously served to another customer.'
  },
  {
    id: 'platformDisclaimerUnderstood',
    label: 'I understand that Food Rescue 911 does not guarantee the safety or quality of food provided by the restaurant.'
  }
];

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

  // Food Safety Disclaimer states
  const [safetyChecks, setSafetyChecks] = useState({
    safeForConsumption: false,
    preparedAndStoredSafely: false,
    accurateDetails: false,
    allergenInfoProvided: false,
    notPreviouslyServed: false,
    platformDisclaimerUnderstood: false
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isDispatchedSuccess, setIsDispatchedSuccess] = useState(false);
  const [dispatchedItem, setDispatchedItem] = useState(null);

  // Reset disclaimer states when modal opens
  useEffect(() => {
    if (isOpen) {
      setSafetyChecks({
        safeForConsumption: false,
        preparedAndStoredSafely: false,
        accurateDetails: false,
        allergenInfoProvided: false,
        notPreviouslyServed: false,
        platformDisclaimerUnderstood: false
      });
      setIsAgreed(false);
      setIsDispatchedSuccess(false);
      setDispatchedItem(null);
    }
  }, [isOpen]);

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

  const allSafetyChecked = MANDATORY_ITEMS.every(item => safetyChecks[item.id]);
  const isFormValid = formData.name && original > 0 && rescue > 0 && allSafetyChecked && isAgreed;

  const toggleSafetyCheck = (id) => {
    setSafetyChecks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToggleAllSafety = () => {
    const allChecked = MANDATORY_ITEMS.every(item => safetyChecks[item.id]);
    const newState = !allChecked;
    const updated = {};
    MANDATORY_ITEMS.forEach(item => {
      updated[item.id] = newState;
    });
    setSafetyChecks(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const now = Date.now();
    const windowMinutes = parseInt(formData.rescueWindowMinutes, 10) || 30;
    const expiresAt = now + windowMinutes * 60 * 1000;
    const filmyNote = getFilmyTriageReportForFood(formData.name, formData.category, formData.emoji);

    const preparedData = {
      ...formData,
      listedAt: now,
      expiresAt,
      rescueWindowMinutes: windowMinutes,
      pickupWindowMinutes: parseInt(formData.pickupWindowMinutes, 10) || 15,
      doctorNotes: filmyNote,
      safetyPledge: 'Kitchen Clearance: 100% verified edible surplus, inspected and cleared for rescue. 🩺✅'
    };

    addEmergency(preparedData);
    setDispatchedItem(preparedData);
    setIsDispatchedSuccess(true);
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
    setFormData(prev => ({
      ...prev,
      emoji: opt.emoji,
      category: opt.label,
      name: opt.defaultName
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

        {/* If successfully cleared & dispatched, show funny clearance confirmation */}
        {isDispatchedSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-6 overflow-y-auto animate-scale-in">
            {/* Header Badge */}
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-3xl animate-bounce">🚑</span>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>OFFICIALLY CLEARED FOR RESCUE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2 font-sans">
                <span>🚑 FOOD CLEARED FOR DISPATCH</span>
              </h3>
            </div>

            {/* Medical / Triage Clearance Card */}
            <div className="bg-zinc-900/90 border border-emerald-500/40 rounded-2xl p-5 text-left font-mono space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-zinc-800">
                <span className="text-zinc-400 flex items-center gap-2">
                  <span>🩺</span>
                  <span>Kitchen clearance:</span>
                </span>
                <span className="text-emerald-400 font-black tracking-wider bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  APPROVED
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-zinc-800">
                <span className="text-zinc-400 flex items-center gap-2">
                  <span>❤️</span>
                  <span>Food vitals:</span>
                </span>
                <span className="text-emerald-400 font-bold tracking-wider">
                  STABLE
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-zinc-800">
                <span className="text-zinc-400 flex items-center gap-2">
                  <span>🍔</span>
                  <span>Rescue status:</span>
                </span>
                <span className="text-amber-400 font-bold tracking-wider">
                  READY
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                <span className="text-zinc-400 flex items-center gap-2">
                  <span>📡</span>
                  <span>Emergency broadcast:</span>
                </span>
                <span className="text-blue-400 font-bold tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping inline-block" />
                  SENT
                </span>
              </div>
            </div>

            {/* Funny Farewell Quote */}
            <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 text-center">
              <p className="text-sm sm:text-base text-amber-200 font-semibold italic">
                "Patient has officially left the kitchen. Good luck, little burger. 🫡"
              </p>
              {dispatchedItem?.name && (
                <p className="text-[11px] text-zinc-400 font-mono mt-1">
                  Dispatched Patient: <span className="text-amber-300 font-bold">{dispatchedItem.emoji || '🥐'} {dispatchedItem.name}</span> ({dispatchedItem.quantity || 'surplus'} units)
                </p>
              )}
            </div>

            {/* Return Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 sm:py-4 rounded-xl font-black text-sm tracking-wider text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 shadow-xl shadow-emerald-500/20 border-2 border-emerald-300 flex items-center justify-center gap-2 transform active:scale-98 transition-all"
            >
              <span>👨‍🍳 RETURN TO KITCHEN DASHBOARD</span>
            </button>
          </div>
        ) : (
          /* Form Content */
          <>
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
                <div>
                  <h3 className="font-black text-sm sm:text-base tracking-wider text-amber-400 flex items-center gap-2">
                    <span>DEPLOY EMERGENCY FOOD BATCH</span>
                  </h3>
                  <p className="text-[10px] sm:text-xs text-zinc-400 truncate">
                    Station #04 • Broadcast Live Surplus to Rescuers
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-300 p-1 rounded-lg hover:bg-zinc-800 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 space-y-5 text-xs">
                {/* 1-Tap Preset Strip */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-zinc-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Quick Preset Food Select:</span>
                    </label>
                    <span className="text-[10px] text-amber-400 font-bold">TAP TO FILL</span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {emojiOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectPreset(opt)}
                        className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                          formData.category === opt.label
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10'
                            : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                        }`}
                      >
                        <span className="text-xl">{opt.emoji}</span>
                        <span className="text-[10px] font-bold truncate w-full">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Food Item Name */}
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold uppercase text-[11px]">
                    Food / Surplus Item Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Miss 64-Layers Shahi Veg Pattice"
                  />
                </div>

                {/* Dual Pricing Engine */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-zinc-900/60 rounded-2xl border border-zinc-800">
                  <div>
                    <label className="block text-zinc-400 mb-1 text-[11px] font-bold uppercase">
                      Regular Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-400 mb-1 text-[11px] font-bold uppercase flex items-center justify-between">
                      <span>Rescue Price (₹)</span>
                      {discount > 0 && (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px]">
                          {discount}% OFF
                        </span>
                      )}
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.rescuePrice}
                      onChange={(e) => setFormData({ ...formData, rescuePrice: e.target.value })}
                      className="w-full bg-zinc-900 border border-emerald-500/60 rounded-xl px-3 py-2 text-sm text-emerald-400 font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                {/* Units & Lifeline Window */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 text-[11px] font-bold uppercase">
                      Available Units
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 text-[11px] font-bold uppercase flex items-center justify-between">
                      <span>Rescue Lifeline</span>
                      <span className="text-amber-400 font-bold">{formData.rescueWindowMinutes}m</span>
                    </label>
                    <select
                      value={formData.rescueWindowMinutes}
                      onChange={(e) => handleWindowChange(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="15">⚡ 15 Minutes (Critical ICU)</option>
                      <option value="20">⚡ 20 Minutes (Urgent)</option>
                      <option value="30">⏱️ 30 Minutes (Standard)</option>
                      <option value="45">⏱️ 45 Minutes (Extended)</option>
                      <option value="60">⌛ 60 Minutes (Closing Shift)</option>
                    </select>
                  </div>
                </div>

                {/* Restaurant & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 text-[11px] font-bold uppercase">
                      Restaurant / Kitchen Outlet
                    </label>
                    <input
                      type="text"
                      value={formData.restaurant}
                      onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 text-[11px] font-bold uppercase">
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

                {/* ========================================================== */}
                {/* MANDATORY FOOD SAFETY CLEARANCE & DISCLAIMER SECTION      */}
                {/* (Replaces the flirty diagnosis box per user request)       */}
                {/* ========================================================== */}
                <div className="bg-zinc-900/90 border-2 border-amber-500/50 rounded-2xl p-4 sm:p-5 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0">
                        <ShieldAlert className="w-4 h-4 text-amber-400 animate-pulse" />
                      </div>
                      <h4 className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-1.5 font-mono">
                        <span>🚨 FOOD SAFETY CLEARANCE REQUIRED</span>
                      </h4>
                    </div>
                    <p className="text-xs text-amber-300/90 font-medium italic pl-9">
                      "Before this patient leaves the kitchen, the kitchen must confirm that it is safe for rescue."
                    </p>
                  </div>

                  {/* Select all helper */}
                  <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
                    <span className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider font-mono">
                      Mandatory Safety Checklist ({Object.values(safetyChecks).filter(Boolean).length}/{MANDATORY_ITEMS.length})
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleAllSafety}
                      className="text-[11px] text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors font-mono"
                    >
                      {allSafetyChecked ? 'Uncheck all' : 'Check all safety items'}
                    </button>
                  </div>

                  {/* 6 Mandatory Checkboxes */}
                  <div className="space-y-2">
                    {MANDATORY_ITEMS.map((item) => {
                      const isChecked = safetyChecks[item.id];
                      return (
                        <label
                          key={item.id}
                          className={`flex items-start gap-3 p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer select-none ${
                            isChecked
                              ? 'bg-amber-500/10 border-amber-500/50 text-amber-100'
                              : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSafetyCheck(item.id)}
                            className="sr-only"
                          />
                          <div
                            className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                              isChecked
                                ? 'bg-amber-500 border-amber-400 text-black'
                                : 'border-zinc-600 bg-zinc-900 hover:border-amber-400'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs leading-relaxed">
                            {item.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Declaration text & Agreement checkbox */}
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2.5">
                    <p className="text-xs text-zinc-300 italic leading-relaxed font-sans">
                      "By dispatching this food, I confirm that the information provided is accurate and that the food is suitable for rescue."
                    </p>

                    <label
                      className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border-2 transition-all cursor-pointer select-none ${
                        isAgreed
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-200'
                          : 'bg-zinc-900 border-emerald-500/40 hover:border-emerald-500 text-zinc-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isAgreed
                            ? 'bg-emerald-500 border-emerald-400 text-black'
                            : 'border-emerald-500/60 bg-zinc-800 hover:border-emerald-400'
                        }`}
                      >
                        {isAgreed && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-black tracking-wide font-mono">
                        I AGREE & CLEAR THIS FOOD FOR RESCUE
                      </span>
                    </label>
                  </div>

                  {!isFormValid && (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90 font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {!allSafetyChecked
                          ? 'Please check all 6 food safety statements and agree to proceed.'
                          : !isAgreed
                          ? 'Please check the final agreement to clear this food for rescue.'
                          : 'Please fill in required name and pricing fields.'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Bottom Actions */}
              <div className="p-3.5 sm:p-4 bg-zinc-900/95 border-t border-zinc-800 shrink-0 space-y-2">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-3.5 sm:py-4 rounded-xl font-black text-sm tracking-wider flex items-center justify-center gap-2 transform active:scale-98 transition-all ${
                    isFormValid
                      ? 'text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 shadow-xl shadow-emerald-500/20 border-2 border-emerald-300 cursor-pointer'
                      : 'text-zinc-500 bg-zinc-800/60 border border-zinc-700/50 cursor-not-allowed opacity-60'
                  }`}
                >
                  <Siren className="w-5 h-5 shrink-0" />
                  <span>🚑 CLEAR & DISPATCH FOOD</span>
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
          </>
        )}
      </div>
    </div>
  );
};
