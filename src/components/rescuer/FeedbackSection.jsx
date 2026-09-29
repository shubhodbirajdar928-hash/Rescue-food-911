import React, { useState } from 'react';
import { useRescue } from '../../context/RescueContext';
import {
  MessageSquareQuote,
  MessageSquarePlus,
  Send,
  Star,
  ThumbsUp,
  AlertOctagon,
  CheckCircle2,
  HeartHandshake,
  Clock,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Utensils,
  AlertTriangle
} from 'lucide-react';

const FEEDBACK_TYPES = [
  {
    id: 'PRAISE',
    label: '🌟 Chef Praise',
    sub: '100% Lazeez & Garam (5-Star)',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    defaultRating: 5
  },
  {
    id: 'TEMPERATURE',
    label: '🥶 Temperature Issue',
    sub: 'Thoda Thanda Tha (Lukewarm / Cold)',
    badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-500/40',
    defaultRating: 3
  },
  {
    id: 'PACKAGING',
    label: '📦 Packaging Spill',
    sub: 'Container Leaked / Damage',
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    defaultRating: 2
  },
  {
    id: 'DELAY',
    label: '⏱️ Counter Delay',
    sub: 'Waiting time at pickup was high',
    badgeColor: 'bg-orange-500/15 text-orange-300 border-orange-500/40',
    defaultRating: 3
  },
  {
    id: 'COMPLAINT',
    label: '🚨 Quality / Safety',
    sub: 'Taste Off / Missing items / Not Fresh',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
    defaultRating: 1
  },
  {
    id: 'SUGGESTION',
    label: '💡 Doctor’s Idea',
    sub: 'Suggestion for the restaurant',
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/40',
    defaultRating: 4
  }
];

const RATING_DESCRIPTIONS = {
  1: '💀 ICU Critical (Bahut Bura Tajurba / Totally Unhappy)',
  2: '🟡 Observation (Thoda Sudhaar Chahiye / Room for Improvement)',
  3: '🟠 Average (Theek Thaak Tha / Edible but Okay)',
  4: '🟢 Swadisht (Garma Garam & Badhiya / Fresh & Tasty)',
  5: '🌟 Supreme Masterpiece (Chef Ko Salute & 21 Topon Ki Salami!)'
};

const QUICK_TAGS = [
  '🌶️ Ekdum Masaledaar & Tasty',
  '🥶 Thoda Thanda Tha',
  '⚡ Super Fast Counter Pickup',
  '📦 Packaging Leaked',
  '🍲 Fresh & Hygienic',
  '❤️ Bachat Ke Sath Pet Bhar Gaya'
];

export const FeedbackSection = () => {
  const { feedbacks, addFeedback, emergencies, history, reservations } = useRescue();

  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'list'
  const [filterType, setFilterType] = useState('ALL');

  // Form State
  const [selectedType, setSelectedType] = useState(FEEDBACK_TYPES[0]);
  const [selectedFood, setSelectedFood] = useState('Miss 64-Layers Shahi Veg Pattice');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [rescuerName, setRescuerName] = useState('You (Hero On-Duty)');
  const [message, setMessage] = useState('');
  const [isSuccessToast, setIsSuccessToast] = useState(null);

  // Available food options to tag
  const availableFoods = Array.from(
    new Set([
      ...emergencies.map((e) => e.name),
      ...reservations.map((r) => r.foodName),
      ...history.map((h) => h.foodName),
      'Miss 64-Layers Shahi Veg Pattice',
      'ACP Pradyuman Vada Pav',
      'Nawab Majnu Dum Biryani',
      'Makhan Tadpa Pav Bhaji',
      'General Platform / Other Outpost'
    ])
  );

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setRating(type.defaultRating);
  };

  const handleQuickTagClick = (tag) => {
    setMessage((prev) => (prev ? `${prev} • ${tag}` : tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newTicket = addFeedback({
      foodName: selectedFood,
      restaurant: 'Central Kitchen Station #04',
      type: selectedType.id,
      typeLabel: selectedType.label,
      rating,
      rescuerName: rescuerName || 'Anonymous Hero',
      message
    });

    setIsSuccessToast(newTicket);
    setMessage('');
    setTimeout(() => {
      setActiveTab('list');
      setIsSuccessToast(null);
    }, 2500);
  };

  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'PRAISE') return fb.type === 'PRAISE';
    if (filterType === 'COMPLAINT') return fb.type === 'COMPLAINT' || fb.type === 'TEMPERATURE' || fb.type === 'PACKAGING';
    return true;
  });

  return (
    <div className="space-y-6 text-left font-mono">
      {/* Helpline Chassis Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 rounded-3xl border border-rose-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>911 RESCUE COMPLAINT & FEEDBACK HELPLINE</span>
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ICU OMBUDSMAN: LIVE ON-DUTY
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3 font-sans">
              <span>📢 KITCHEN COMPLAINTS & CHEF PRAISE CENTER</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-sans font-normal">
              Khana lajawab tha ya packaging mein gadbad thi? Directly share your experience with the Chef! Report temperature drops, missing chutney, packaging spills, or send 5-star love to the kitchen.
            </p>
          </div>

          {/* Quick Counter Gauges */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase">SATISFACTION</div>
              <div className="text-2xl font-black text-emerald-400">96.8%</div>
              <div className="text-[10px] text-emerald-300">Positive Rescues</div>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase">TOTAL LOGGED</div>
              <div className="text-2xl font-black text-amber-400">{feedbacks.length}</div>
              <div className="text-[10px] text-amber-300">Audited Reports</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: File Report vs View Reports */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3 flex-wrap">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider transition-all ${
            activeTab === 'form'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>✍️ File New Complaint / Feedback</span>
        </button>

        <button
          onClick={() => setActiveTab('list')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider transition-all relative ${
            activeTab === 'list'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>📋 Incident Log & Case Status ({feedbacks.length})</span>
        </button>
      </div>

      {/* SUCCESS CONFIRMATION MODAL TOAST */}
      {isSuccessToast && (
        <div className="bg-emerald-950/90 border-2 border-emerald-500 rounded-2xl p-5 shadow-2xl space-y-2 animate-scale-in">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>REPORT REGISTERED SUCCESSFULLY! TICKET #{isSuccessToast.code}</span>
          </div>
          <p className="text-xs text-slate-200">
            "{isSuccessToast.resolutionNote}"
          </p>
          <div className="text-[10px] text-emerald-400 font-mono">
            Redirecting to Live Case Status Log...
          </div>
        </div>
      )}

      {/* TAB 1: FILE NEW REPORT FORM */}
      {activeTab === 'form' && (
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Select Category */}
            <div>
              <label className="block text-slate-300 font-bold uppercase text-xs tracking-wider mb-2.5">
                1. Select Report Nature / Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {FEEDBACK_TYPES.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleTypeSelect(type)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-rose-500/20 border-rose-500 shadow-md text-white'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-xs truncate">{type.label}</div>
                      <div className="text-[10px] text-slate-400 mt-1 truncate">{type.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Rescued Food Item */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold uppercase text-xs tracking-wider mb-2">
                  2. Select Rescued Food / Outlet:
                </label>
                <select
                  value={selectedFood}
                  onChange={(e) => setSelectedFood(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                >
                  {availableFoods.map((name, i) => (
                    <option key={i} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase text-xs tracking-wider mb-2">
                  Rescuer Callsign / Name:
                </label>
                <input
                  type="text"
                  value={rescuerName}
                  onChange={(e) => setRescuerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                  placeholder="e.g. Inspector Daya / Hungry Hero"
                />
              </div>
            </div>

            {/* Step 3: Interactive Star Rating */}
            <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-2">
              <label className="block text-slate-300 font-bold uppercase text-xs tracking-wider">
                3. Doctor & Rescuer Experience Rating:
              </label>

              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const active = starVal <= (hoverRating || rating);
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(starVal)}
                      className="p-1 text-2xl sm:text-3xl transition-transform hover:scale-110 active:scale-95"
                      aria-label={`${starVal} stars`}
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 ${
                          active
                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                            : 'text-slate-700'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-amber-400 font-bold text-sm ml-2">
                  {rating} / 5 Stars
                </span>
              </div>

              <div className="text-xs text-amber-300/90 font-medium italic pt-1">
                {RATING_DESCRIPTIONS[rating]}
              </div>
            </div>

            {/* Step 4: Incident Description & Quick Tags */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-bold uppercase text-xs tracking-wider">
                  4. Your Message / Complaint Description:
                </label>
                <span className="text-[11px] text-slate-500">Tap below to add quick tags</span>
              </div>

              {/* Quick Tags */}
              <div className="flex items-center gap-1.5 flex-wrap pb-1">
                {QUICK_TAGS.map((tag, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleQuickTagClick(tag)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>

              <textarea
                rows="3"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Batao hero, kaisa tha khana? Agar badhiya tha toh chef ko dua do, agar thanda ya packaging kharab thi toh complaint file karo! 🩺📋"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-rose-500 leading-relaxed font-sans"
              />
            </div>

            {/* Action Submit Button */}
            <button
              type="submit"
              disabled={!message.trim()}
              className={`w-full py-4 rounded-2xl font-black text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all ${
                message.trim()
                  ? 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-rose-950/50 cursor-pointer active:scale-98'
                  : 'bg-slate-800/60 text-slate-500 border border-slate-700/40 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4 shrink-0" />
              <span>🚀 TRANSMIT INCIDENT REPORT TO KITCHEN 🚑</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: INCIDENT LOG & CASE STATUS */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {/* Filter sub-bar */}
          <div className="flex items-center justify-between gap-3 flex-wrap bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Filter Reports ({filteredFeedbacks.length} cases):
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  filterType === 'ALL'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                All Cases
              </button>
              <button
                onClick={() => setFilterType('PRAISE')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  filterType === 'PRAISE'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                🌟 Chef Praises
              </button>
              <button
                onClick={() => setFilterType('COMPLAINT')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  filterType === 'COMPLAINT'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                🚨 Complaints & Issues
              </button>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            {filteredFeedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg space-y-3 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 font-bold">
                      {fb.code}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {fb.foodName}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs text-slate-400">
                      {fb.restaurant}
                    </span>
                  </div>

                  {/* Rating Stars & Date */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-amber-400">
                      {[...Array(fb.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {new Date(fb.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Rescuer Complaint / Message */}
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="font-bold text-slate-300">{fb.rescuerName}:</span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {fb.typeLabel}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-sans italic pl-2 border-l-2 border-rose-500/60 leading-relaxed">
                    "{fb.message}"
                  </p>
                </div>

                {/* Official Kitchen / Doctor Response Card */}
                {fb.resolutionNote && (
                  <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-3 text-xs font-mono space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Kitchen Supervisor Action:</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        {fb.statusLabel || 'RESOLVED'}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] italic">
                      {fb.resolutionNote}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
