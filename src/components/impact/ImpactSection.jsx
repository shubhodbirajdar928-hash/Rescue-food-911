import React from 'react';
import { useRescue } from '../../context/RescueContext';
import { Leaf, IndianRupee, Heart, Utensils, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const ImpactSection = () => {
  const { totalRescuedCount, totalMoneySaved, totalRevenueRecovered, totalWasteAvoidedKg, role } = useRescue();
  const isRestaurant = role === 'restaurant';

  // Water conserved and CO2 estimated
  const waterConservedLiters = Math.round(totalWasteAvoidedKg * 250);
  const co2AvoidedKg = Math.round(totalWasteAvoidedKg * 2.5 * 10) / 10;

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 text-left font-mono shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>🔥 ASLI DUNIYA KA DHAMAKA & HISAB-KITAB TELEMETRY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white m-0">
            🌱 NAAM MEIN DRAMA, PAR KAAM MEIN ASLI ROKDA!
          </h2>

          <p className="text-xs sm:text-sm mt-1 max-w-2xl text-slate-300 leading-relaxed">
            Vada pav, biryani aur pattice ko "911 ICU trauma patient" bolke hasna toh easy hai babu moshai... par dukan band hone par taaza khana dustbin ke kabristan mein jaana aur dukaandar ka nuksaan hona 100% kadva sach hai! Yahan pet bhi bharega aur jeb bhi! 💰🤤
          </p>
        </div>

        <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl border bg-slate-950 text-amber-300 border-amber-500/30">
          🏆 HACKATHON MVP: 100% JUGAAD & VALUE
        </span>
      </div>

      {/* 4 Core Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="p-5 rounded-2xl border bg-slate-950/80 border-slate-800 shadow-md hover:border-emerald-500/40 transition-colors">
          <div className="text-xs font-bold uppercase mb-1 flex items-center gap-1.5 text-emerald-400">
            <Utensils className="w-4 h-4 text-emerald-400" />
            <span>🍽️ Pet Mein Swaaha (Rescued)</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">
            {totalRescuedCount} items
          </div>
          <div className="text-xs mt-2 text-slate-400">
            Bhookhe peton ne shaan se chabaya, dustbin ki aatma tarsegi! Zero casualties!
          </div>
        </div>

        <div className="p-5 rounded-2xl border bg-slate-950/80 border-slate-800 shadow-md hover:border-amber-500/40 transition-colors">
          <div className="text-xs font-bold uppercase mb-1 flex items-center gap-1.5 text-amber-400">
            <IndianRupee className="w-4 h-4 text-amber-400" />
            <span>💰 Dukaandar Ka Rokda (Recovered)</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-amber-300">
            ₹{totalRevenueRecovered.toLocaleString()}
          </div>
          <div className="text-xs mt-2 text-slate-400">
            Koyla nahi seedha Lakshmi! Restaurant walo ki jeb mein wapas aaya paisa!
          </div>
        </div>

        <div className="p-5 rounded-2xl border bg-slate-950/80 border-slate-800 shadow-md hover:border-rose-500/40 transition-colors">
          <div className="text-xs font-bold uppercase mb-1 flex items-center gap-1.5 text-rose-400">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>🤑 Hero Ki Bachat (Savings)</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-rose-300">
            ₹{totalMoneySaved.toLocaleString()}
          </div>
          <div className="text-xs mt-2 text-slate-400">
            50%–70% ki chhappar-phaad loot! Itne mein toh doston ko party bhi de di!
          </div>
        </div>

        <div className="p-5 rounded-2xl border bg-slate-950/80 border-slate-800 shadow-md hover:border-teal-500/40 transition-colors">
          <div className="text-xs font-bold uppercase mb-1 flex items-center gap-1.5 text-teal-400">
            <Leaf className="w-4 h-4 text-teal-400" />
            <span>🌍 Dharti Maa Ki Dua (Food Saved)</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-teal-300">
            ~{totalWasteAvoidedKg} kg
          </div>
          <div className="text-xs mt-2 text-slate-400">
            ~{co2AvoidedKg} kg dhuaan (CO₂) bacha & {waterConservedLiters}L paani bacha ke paap dhul gaye!
          </div>
        </div>
      </div>

      {/* The 10-Second Judge Chain */}
      <div className="rounded-2xl p-6 border border-slate-800 mt-6 bg-slate-950/90 shadow-lg">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-center text-slate-300">
          ⚡ 10-SECOND KA JADOO (JUDGES KO IMPRESS KARNE KA SECRET FORMULA)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900">
            <div className="text-3xl mb-1">👨‍🍳</div>
            <div className="font-bold text-white mb-0.5">1. Dukaan Band, Maal Mast</div>
            <div className="text-[11px] text-slate-400">Shaam ko bacha 100% safe garam khana</div>
          </div>

          <div className="hidden md:flex items-center justify-center font-black">
            <ArrowRight className="w-5 h-5 text-red-500" />
          </div>

          <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/20">
            <div className="text-3xl mb-1">🚨</div>
            <div className="font-bold text-red-400 mb-0.5">2. 911 Trauma Drama</div>
            <div className="text-[11px] text-slate-400">ICU Siren bajao, countdown chalao!</div>
          </div>

          <div className="hidden md:flex items-center justify-center font-black">
            <ArrowRight className="w-5 h-5 text-red-500" />
          </div>

          <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
            <div className="text-3xl mb-1">🦸</div>
            <div className="font-bold text-emerald-400 mb-0.5">3. Hero Aaya, Khaaya, Bachaya!</div>
            <div className="text-[11px] text-slate-400">70% discount paao + Zero kachra karo!</div>
          </div>
        </div>
      </div>
    </div>
  );
};
