import React, { useState } from 'react';
import { useRescue } from '../../context/RescueContext';
import { StatusBadge } from '../common/StatusBadge';
import { CountdownTimer } from '../common/CountdownTimer';
import { DeployEmergencyModal } from './DeployEmergencyModal';
import { FoodSafetyDisclaimerModal } from './FoodSafetyDisclaimerModal';
import { ReservationsList } from './ReservationsList';
import { KitchenFeedbackInbox } from './KitchenFeedbackInbox';
import { Siren, Plus, IndianRupee, Utensils, Users, Terminal, Zap, ArrowUpRight, ShieldCheck, Clock, RotateCcw, Sparkles, RefreshCw, Trash2, Archive, AlertTriangle, MessageSquareQuote } from 'lucide-react';
import { getFilmyTriageReportForFood } from '../../data/mockEmergencies';

export const RestaurantDashboard = () => {
  const {
    emergencies,
    expiredEmergencies,
    reservations,
    totalRevenueRecovered,
    totalRescuedCount,
    addEmergency,
    relistEmergency,
    deleteExpiredEmergency,
    clearAllExpired,
    playAudio,
    resetToZero,
    feedbacks,
    resolveFeedback
  } = useRescue();

  const [isDeployOpen, setIsDeployOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('kds'); // 'kds' | 'inventory' | 'expired'
  const [safetyFood, setSafetyFood] = useState(null);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);

  const activeReservationsCount = reservations.filter(r => r.status !== 'COMPLETED').length;

  // 1-Click Fast Surplus Broadcast presets (routed through Food Safety Clearance)
  const handleQuickDeploy = (preset) => {
    const tailoredNote = preset.doctorNotes || getFilmyTriageReportForFood(preset.name, preset.category, preset.emoji);
    const preparedData = {
      name: preset.name,
      category: preset.category,
      emoji: preset.emoji,
      originalPrice: preset.originalPrice,
      rescuePrice: preset.rescuePrice,
      quantity: preset.quantity,
      rescueWindowMinutes: preset.minutes,
      restaurant: "Central Kitchen Station #04",
      address: 'Main Express Counter, Food Hub',
      doctorNotes: tailoredNote
    };
    setSafetyFood(preparedData);
    setIsSafetyOpen(true);
  };

  const quickPresets = [
    {
      name: 'Inspector Vada Pav (Mumbai 911)',
      category: 'Vadapav',
      emoji: '🥔',
      originalPrice: 45,
      rescuePrice: 19,
      quantity: 6,
      minutes: 20,
      doctorNotes: 'Aata maajhi satakli! Itna hot batata vada aur spicy teekhi garlic chutney dekh kar bhi tumhara dil nahi pighla re Majnu? Hero bano aur le chalo mujhe apne saath, varna cold air lag jayegi! 🥔🌶️❤️'
    },
    {
      name: 'Count Biryani of Hyderabad (Royal Handi)',
      category: 'Biryani',
      emoji: '🍗',
      originalPrice: 280,
      rescuePrice: 99,
      quantity: 4,
      minutes: 35,
      doctorNotes: 'Babu Moshai... Biryani aur Ishq dono garam hi acche lagte hain! Itni zafrani khushboo, lambe chawal aur nazaakat... aao na hero, kab tak door se dekh ke rulaoge? Bas ek baar apna bana lo! 😉🍗🔥'
    },
    {
      name: 'Pav Bhaji Emergency ICU (Butter Deficit)',
      category: 'Bhaji',
      emoji: '🍲',
      originalPrice: 150,
      rescuePrice: 59,
      quantity: 4,
      minutes: 25,
      doctorNotes: 'Tawa par itna saara Amul butter pighal gaya... par tumhara patthar dil kab pighlega re Deewane? Masaledaar bhaji aur garam toasted pav ready hain, bas tumhare honthon ke sahare ka intezaar hai! 🍲🧈😘'
    },
    {
      name: '10 Veg Pattice (Crispy Golden Puff)',
      category: 'Patties',
      emoji: '🥐',
      originalPrice: 200,
      rescuePrice: 79,
      quantity: 10,
      minutes: 30,
      doctorNotes: 'Haye re meri 64 crispy layers! Sirf tumhare hot bites ke liye pighal rahi hoon jaaneman! Thoda ketchup lagao, thoda pyaar jatao... aakhir kab tak akele tadpaoge? Jaldi rescue karo! 🥐🔥'
    },
    {
      name: 'Major Samosa & Spicy Potato Boys',
      category: 'Samosa',
      emoji: '🥟',
      originalPrice: 60,
      rescuePrice: 25,
      quantity: 8,
      minutes: 25,
      doctorNotes: 'Jab tak rahega samose mein aalu, tab tak rahenge hum tumhare aashiq babu! Golden crunchy triangle aur spicy aalu filling tadap rahi hai... Aao hero, teekhi green chutney ke saath hamari shaadi kara do! 🥟🌶️💍'
    },
    {
      name: 'Gulab Jamun ICU Sugar Drip (4-Pack)',
      category: 'Sweets',
      emoji: '🍯',
      originalPrice: 120,
      rescuePrice: 45,
      quantity: 5,
      minutes: 15,
      doctorNotes: 'Haye mar jawaan! Desi ghee mein tale huye rasbhare gulaab jamun hain hum... itni meethi chaashni mein doobe hain ki chhoo lo toh pyaar ho jaye! Aaja meri rasmalai, hume apne pet mein panah de do! 🍯🍮❤️'
    },
    {
      name: 'Express Grilled Cheese Sandwich Batch',
      category: 'Snacks',
      emoji: '🥪',
      originalPrice: 140,
      rescuePrice: 55,
      quantity: 4,
      minutes: 20,
      doctorNotes: 'Dekho kitna crazy cheese pull ho raha hai jaaneman! Crispy grilled slices ke beech mein tumhare pyaar ki tapish dhoondh rahe hain... Jaldi khao varna cheese tight ho jayega aur dil toot jayega! 🥪🧀❤️'
    },
    {
      name: 'Hot Steamed Darjeeling Momos (8-Pack)',
      category: 'Momos',
      emoji: '🥟',
      originalPrice: 160,
      rescuePrice: 65,
      quantity: 5,
      minutes: 25,
      doctorNotes: 'Itne soft, steamed aur juicy momos hain hum... red fiery teekhi chutney ke bina adhoore hain aur tumhare bina anaath! Ek spicy bite lo aur seedha swarg pahunch jao hero! 🥟🌶️🔥'
    },
    {
      name: 'Paneer Tikka ICU Sizzle (Tandoori)',
      category: 'Snacks',
      emoji: '🍢',
      originalPrice: 220,
      rescuePrice: 89,
      quantity: 4,
      minutes: 30,
      doctorNotes: 'Tandoor se nikla hua smokey aroma aur soft malai paneer! Chaat masala chhidak ke tawa pe tadap rahe hain... Aao na hero, aisi sizzling tandoori aashiqui dhoondhe se bhi nahi milegi! 🍢🔥❤️'
    }
  ];

  return (
    <div className="space-y-8 text-left font-mono">
      {/* Sleek BOH Operations Console Chassis */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 rounded-3xl border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5" />
                <span>BOH KITCHEN DISPATCH TERMINAL • STATION #04</span>
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                SURPLUS RESCUE WINDOW: ACTIVE
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3 font-sans">
              <span>👨‍🍳 KITCHEN DISPLAY SYSTEM & RECOVERY ER</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-sans font-normal">
              Convert unsold, high-quality surplus batches into urgent 911 rescue dispatches in 1-click. Turn edible food waste into immediate recovered revenue before kitchen closing time.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="shrink-0 flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={resetToZero}
              title="Reset all metrics and broadcasts to 0 for a clean demo"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl font-bold text-xs tracking-wider text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-rose-400" />
              <span>RESET ALL TO 0</span>
            </button>

            <button
              onClick={() => setIsDeployOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-black text-xs sm:text-sm tracking-wider text-white bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 hover:from-amber-500 hover:to-orange-500 shadow-xl shadow-orange-600/30 border border-amber-400/40 transform active:scale-98 transition-all"
            >
              <Siren className="w-4 h-4 text-white animate-siren-wiggle" />
              <span>DEPLOY CUSTOM BATCH</span>
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Operations Telemetry Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between uppercase">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Siren className="w-3.5 h-3.5 text-red-400" />
                Live Broadcasts
              </span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>
            <div className="text-3xl font-black text-white">
              {emergencies.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Active foods on customer radar
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between uppercase">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Utensils className="w-3.5 h-3.5" />
                Meals Rescued
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">100% OK</span>
            </div>
            <div className="text-3xl font-black text-emerald-400">
              {totalRescuedCount}
            </div>
            <div className="text-[11px] text-emerald-400/80 mt-1">
              Diverted from kitchen bin
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between uppercase">
              <span className="flex items-center gap-1.5 text-amber-400">
                <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
                Recovered Cash
              </span>
              <span className="text-[10px] text-amber-400 font-bold">TODAY</span>
            </div>
            <div className="text-3xl font-black text-amber-400">
              ₹{totalRevenueRecovered.toLocaleString()}
            </div>
            <div className="text-[11px] text-amber-300/80 mt-1">
              Direct counter recovery
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between uppercase">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Users className="w-3.5 h-3.5" />
                Kitchen Tickets
              </span>
              {activeReservationsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold animate-bounce">
                  URGENT
                </span>
              )}
            </div>
            <div className="text-3xl font-black text-blue-400">
              {reservations.length}
            </div>
            <div className="text-[11px] text-blue-300 mt-1">
              {activeReservationsCount} awaiting counter pickup
            </div>
          </div>

          <div
            onClick={() => setActiveTab('feedback')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-inner group ${
              feedbacks?.some((f) => f.status === 'IN_INVESTIGATION')
                ? 'bg-rose-950/30 border-rose-500/50 hover:border-rose-400'
                : 'bg-slate-950/80 border-slate-800 hover:border-purple-500/50'
            }`}
          >
            <div className="text-xs text-slate-400 mb-1 flex items-center justify-between uppercase">
              <span className="flex items-center gap-1.5 text-purple-400 group-hover:text-purple-300">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                Rescuer Desk
              </span>
              {feedbacks?.some((f) => f.status === 'IN_INVESTIGATION') ? (
                <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold animate-pulse">
                  ACTION
                </span>
              ) : (
                <span className="text-[10px] text-emerald-400 font-bold">100% OK</span>
              )}
            </div>
            <div className="text-3xl font-black text-purple-400">
              {feedbacks?.length || 0}
            </div>
            <div className="text-[11px] text-purple-300 mt-1">
              {feedbacks?.filter((f) => f.status === 'IN_INVESTIGATION').length || 0} open incidents • Tap to view
            </div>
          </div>
        </div>

        {/* 1-Click Fast Surplus Broadcast Keypad */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>CHEF 1-CLICK RAPID SURPLUS BROADCAST (TAP TO BROADCAST INSTANTLY)</span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              1-tap pushes surplus batch live to rescuer app
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickDeploy(preset)}
                className="bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-3.5 rounded-2xl transition-all text-left group flex flex-col justify-between shadow-md active:scale-95"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                      {preset.emoji}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      +{preset.quantity} BATCH
                    </span>
                  </div>
                  <div className="font-bold text-white text-xs truncate group-hover:text-amber-300">
                    {preset.name}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 line-through text-[11px]">₹{preset.originalPrice}</span>{' '}
                    <span className="text-emerald-400 font-bold">₹{preset.rescuePrice}</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    <span>DEPLOY</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Switcher: KDS Tickets vs Matrix vs Expired Vault */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3 flex-wrap">
        <button
          onClick={() => setActiveTab('kds')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider transition-all relative ${
            activeTab === 'kds'
              ? 'bg-amber-600 text-white shadow-lg shadow-orange-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Kitchen Ticket Rack (KDS)</span>
          {activeReservationsCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {activeReservationsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider transition-all ${
            activeTab === 'inventory'
              ? 'bg-amber-600 text-white shadow-lg shadow-orange-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Siren className="w-4 h-4" />
          <span>Surplus Shelf-Life Matrix ({emergencies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('expired')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider transition-all relative ${
            activeTab === 'expired'
              ? 'bg-rose-700 text-white shadow-lg shadow-rose-900/40'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Archive className="w-4 h-4 text-rose-400" />
          <span>Expired Batches ({expiredEmergencies?.length || 0})</span>
          {expiredEmergencies?.length > 0 && (
            <span className="bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {expiredEmergencies.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('feedback')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider transition-all relative ${
            activeTab === 'feedback'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <MessageSquareQuote className="w-4 h-4 text-purple-400" />
          <span>Rescuer Feedback & Complaints ({feedbacks?.length || 0})</span>
          {feedbacks?.some((f) => f.status === 'IN_INVESTIGATION') && (
            <span className="bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
              {feedbacks.filter((f) => f.status === 'IN_INVESTIGATION').length}
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: KDS Order Ticket Rack */}
      {activeTab === 'kds' && (
        <ReservationsList onSwitchToFeedback={() => setActiveTab('feedback')} />
      )}

      {/* Tab 2: Surplus Matrix Table */}
      {activeTab === 'inventory' && (
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-black text-white m-0 tracking-wider">
                SURPLUS SHELF-LIFE TELEMETRY MATRIX
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Monitoring active food emergencies and live countdowns ({emergencies.length} active on live customer radar)
              </p>
            </div>
            <button
              onClick={() => setIsDeployOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-700"
            >
              + Deploy Item to Matrix
            </button>
          </div>

          {emergencies.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/50 space-y-2">
              <span className="text-4xl block">✨</span>
              <h4 className="text-white font-bold text-sm">NO ACTIVE SURPLUS BROADCASTS</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No food is currently live on customer radars. Click "Deploy Custom Batch" or tap a 1-click preset above to broadcast!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                    <th className="py-3 px-3">Item Code</th>
                    <th className="py-3 px-3">Food & Diagnostic Notes</th>
                    <th className="py-3 px-3">Stock Left</th>
                    <th className="py-3 px-3">Time Left</th>
                    <th className="py-3 px-3">Price (Was → Rescue)</th>
                    <th className="py-3 px-3">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {emergencies.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-950/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-amber-400">
                        {item.code}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <div className="font-bold text-white text-sm">{item.name}</div>
                            <div className="text-slate-400 text-[11px] italic">"{item.doctorNotes}"</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-white font-bold">
                          {item.quantity} units
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <CountdownTimer secondsLeft={item.secondsLeft} size="sm" />
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="text-slate-500 line-through">₹{item.originalPrice}</span>{' '}
                        <span className="text-emerald-400 font-bold text-sm">₹{item.rescuePrice}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <StatusBadge condition={item.condition} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Expired Batches Archive */}
      {activeTab === 'expired' && (
        <div className="bg-slate-900/90 rounded-3xl border border-rose-950/60 p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold uppercase tracking-wider">
                  BOH ARCHIVE
                </span>
                <h3 className="text-lg font-black text-white m-0 tracking-wider flex items-center gap-2">
                  <span>⛔ EXPIRED SURPLUS VAULT (एक्सपायर्ड खाना वॉर्ड)</span>
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Surplus batches whose rescue window closed without hero claims. The food is safe, but because its rescue deadline expired, it has been <strong>automatically removed from live customer broadcasts</strong>. You can re-list with an extended rescue window (+15m) or safely archive.
              </p>
            </div>
            {expiredEmergencies.length > 0 && (
              <button
                onClick={clearAllExpired}
                className="px-3.5 py-1.5 rounded-xl bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 text-xs font-bold border border-rose-500/30 flex items-center gap-1.5 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Archive All</span>
              </button>
            )}
          </div>

          {expiredEmergencies.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/50 space-y-2">
              <span className="text-4xl block">✨</span>
              <h4 className="text-white font-bold text-sm">NO EXPIRED BATCHES</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                All food emergencies are either actively on the rescue radar or successfully devoured! Zero food casualties.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                    <th className="py-3 px-3">Item Code</th>
                    <th className="py-3 px-3">Food & Filmy Diagnosis</th>
                    <th className="py-3 px-3">Unrescued Stock</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3 text-right">Chef Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {expiredEmergencies.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-950/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-rose-400">
                        {item.code}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl grayscale">{item.emoji}</span>
                          <div>
                            <div className="font-bold text-slate-300 text-sm line-through decoration-rose-500/60">{item.name}</div>
                            <div className="text-rose-300/80 text-[11px] italic mt-0.5">"{item.doctorNotes}"</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {item.safetyPledge || 'Safe edible surplus. Window expired at shift end.'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-1 rounded-md bg-rose-950/40 border border-rose-500/30 text-rose-300 font-bold">
                          {item.quantity} units unrescued
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-950 border border-rose-500/50 text-rose-400 font-bold text-[10px]">
                          💀 RESCUE WINDOW EXPIRED (00:00)
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="text-slate-500 line-through">₹{item.originalPrice}</span>{' '}
                        <span className="text-slate-400 font-bold text-sm">₹{item.rescuePrice}</span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => relistEmergency(item.id, 15)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-all active:scale-95"
                            title="Re-broadcast to rescuer app with a fresh 15-minute window"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Re-list (+15m)</span>
                          </button>
                          <button
                            onClick={() => deleteExpiredEmergency(item.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-all"
                            title="Remove from archive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Rescuer Feedback & Complaints Inbox */}
      {activeTab === 'feedback' && <KitchenFeedbackInbox />}

      {/* Deploy Modal */}
      <DeployEmergencyModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
      />

      {/* Mandatory Food Safety Clearance Modal for Quick Presets */}
      <FoodSafetyDisclaimerModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
        onConfirm={(clearedData) => {
          addEmergency(clearedData || safetyFood);
          playAudio('siren');
        }}
        onSuccessDismiss={() => {
          setIsSafetyOpen(false);
        }}
        foodData={safetyFood}
      />
    </div>
  );
};
