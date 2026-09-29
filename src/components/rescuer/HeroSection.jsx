import React, { useState, useEffect } from 'react';
import { useRescue } from '../../context/RescueContext';
import { Siren, ArrowDown, ChefHat, Activity, Sparkles } from 'lucide-react';
import { EcgLine } from '../common/EcgLine';

const TRAUMA_PATIENTS = [
  {
    id: 'vadapav',
    emoji: '🥔',
    name: 'ACP Pradyuman Vada Pav (Kuch Toh Gadbad Hai!)',
    bay: 'TRAUMA BAY #01: CID VADA PAV ICU',
    condition: 'CRITICAL (14 min bache hain!)',
    prescription: 'Daya se darwaza tudwao aur Teekhi Laal Lasun Chutney ka CPR do!',
    quote: '“Aata maajhi satakli! Itna hot aur kadak vada dekh ke bhi Daya tumhara dil nahi pighla? Utha le re baba! 🥔🌶️”',
    temp: '62°C',
    pulse: '142 BPM (Garlic Panic & Daya Tod Do)',
    color: '#ef4444',
    badge: 'CODE RED',
    badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40'
  },
  {
    id: 'biryani',
    emoji: '🍗',
    name: 'Nawab Majnu Dum Biryani (Zafrani Aansoo)',
    bay: 'TRAUMA BAY #02: NAWAB MAJNU DUM HANDI',
    condition: 'URGENT (27 min bache hain)',
    prescription: 'Garma-garam Mirchi Ka Salan & Raat ki Shahi adoption',
    quote: '“Babu Moshai... Biryani aur Ishq dono garma-garam hi acche lagte hain! Ek baar khaaoge toh saat janam tak yaad rakhoge! 😉🍗🔥”',
    temp: '74°C',
    pulse: '110 BPM (Dum Khushboo Wave)',
    color: '#f59e0b',
    badge: 'URGENT',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  },
  {
    id: 'bhaji',
    emoji: '🍲',
    name: 'Makhan Tadpa Pav Bhaji (Amul Overdose ICU)',
    bay: 'TRAUMA BAY #03: SARDAR JI TAWA BHAJI',
    condition: 'CRITICAL (19 min bache hain)',
    prescription: 'Kadhai se pighalta hua Amul Makkhan aur Kadak Butter Pav',
    quote: '“Tawa par itna saara Amul butter pighal gaya majnu... par tumhara dil kab pighlega? Jaldi bacha lo varna thandi pad jaungi! 🍲🧈😘”',
    temp: '70°C',
    pulse: '138 BPM (Tawa Sizzle & Butter Dhadkan)',
    color: '#f97316',
    badge: 'CODE RED',
    badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40'
  },
  {
    id: 'patties',
    emoji: '🥐',
    name: 'Miss 64-Layers Shahi Veg Pattice',
    bay: 'TRAUMA BAY #04: MISS 64-LAYERS PUFF',
    condition: 'URGENT (31 min bache hain)',
    prescription: 'Thoda tomato ketchup drip aur crispy hot bite treatment',
    quote: '“Haye meri 64 crispy layers! Sirf tumhare romantic hot bites ke liye sharma rahi hoon... aao na hero! 🥐🔥”',
    temp: '56°C',
    pulse: '98 BPM (Flaky Dhadkan & Ketchup Pyar)',
    color: '#eab308',
    badge: 'URGENT',
    badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
  },
  {
    id: 'kachorii',
    emoji: '🍘',
    name: 'Gabbar Ki Khasta Kachori (Kitne Aloo The?)',
    bay: 'TRAUMA BAY #05: GABBAR KI KHASTA KACHORI',
    condition: 'CRITICAL (12 min bache hain)',
    prescription: 'Kitne aadmi the? Meethi sonth chutney aur dahi injection!',
    quote: '“Arre oh Sambha, kitne rescuer the re? Aisi khasta kachori chhod ke kaun jaata hai be kaaliya! 🍘🤠”',
    temp: '54°C',
    pulse: '130 BPM (Khasta Shock & Sholay Anger)',
    color: '#10b981',
    badge: 'CRITICAL',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  },
  {
    id: 'sweets',
    emoji: '🍯',
    name: 'Rasbhara Romeo Gulab Jamun (Chashni Me Dooba)',
    bay: 'TRAUMA BAY #06: RASBHARA ROMEO SWEETS',
    condition: 'LAST_CALL (5 min bache hain)',
    prescription: 'Do boond meetha resuscitation & pet mein permanent jagah',
    quote: '“Haye mar jawaan! Itni gulabi aur meethi chashni mein dooba hoon... aao meri rasmalai, gale se laga lo! 🍯🍮❤️”',
    temp: '48°C',
    pulse: '175 BPM (Syrup Dhadkan & Romantic Arrest)',
    color: '#ec4899',
    badge: 'LAST CALL',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
  }
];

export const HeroSection = ({ onScrollToGrid }) => {
  const { emergencies } = useRescue();
  const [selectedPatientIdx, setSelectedPatientIdx] = useState(0);

  const currentPatient = TRAUMA_PATIENTS[selectedPatientIdx];
  const criticalCount = emergencies.filter(e => e.condition === 'CRITICAL' || e.condition === 'LAST_CALL').length;

  // Auto-cycle through different food patients every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedPatientIdx((prev) => (prev + 1) % TRAUMA_PATIENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
      {/* Subtle Emergency Ambience Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-bold tracking-wide font-mono">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span>🚨 ALL-INDIA FOOD ICU & DILJALA KHANA RESCUE CELL</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-300 font-bold">{criticalCount} Tadpate Hue Mareez Ready!</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
                🚨 <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 bg-clip-text text-transparent">FOOD RESCUE</span> 911
              </h1>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300 tracking-tight leading-snug">
                "Asli Hero wahi... jo dustbin se pehle<br className="hidden sm:inline" /> Biryani aur Vada Pav bacha le! 🦸‍♂️🍛"
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Dukaan band hone wali hai! Taaza khana dustbin mein royega, isse achha aapke pet mein hasega! Seedha <strong className="text-amber-300 font-bold">50%–70% OFF</strong> pe lapeto aur hero bano! 🤤🍛🔥
            </p>

            {/* Hospital ECG Pulse Monitor Widget (Linked to Active Food Patient) */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl max-w-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                <span className="flex items-center gap-1.5 font-bold" style={{ color: currentPatient.color }}>
                  <Activity className="w-4 h-4 animate-pulse" />
                  💓 LIVE DIL KI DHADKAN: {currentPatient.name.toUpperCase()}
                </span>
                <span className="text-emerald-400 font-bold">🔥 100% TAZA & MAKKHAN SURPLUS</span>
              </div>
              <EcgLine className="h-7" color={currentPatient.color} />
            </div>

            {/* Glowing CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScrollToGrid}
                className="flex items-center gap-2.5 px-7 py-4 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white shadow-xl shadow-red-600/30 border border-red-400/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Siren className="w-5 h-5 animate-siren-wiggle" />
                <span>🚨 CHALO KHANA BACHANE! (DISPATCH)</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-xl text-left font-mono">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">50–70% OFF</div>
                <div className="text-xs text-slate-400 mt-0.5">Loot Lo Offer (Discounts)</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">100% Garam</div>
                <div className="text-xs text-slate-400 mt-0.5">Kasam Se Fresh & Safe</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">0% Kachra</div>
                <div className="text-xs text-slate-400 mt-0.5">Dustbin Mein Zero Daana!</div>
              </div>
            </div>
          </div>

          {/* Right Sleek Emergency Trauma Card Graphic with Interactive Patient Switcher */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-red-500/40 shadow-2xl shadow-red-950/50">
              {/* Emergency Banner Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-red-900/40 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    {currentPatient.bay}
                  </span>
                </div>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-bold animate-pulse ${currentPatient.badgeBg}`}>
                  {currentPatient.badge}
                </span>
              </div>

              {/* Interactive Patient Selectors */}
              <div className="flex items-center justify-between gap-1.5 mb-3 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
                {TRAUMA_PATIENTS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatientIdx(idx)}
                    className={`flex-1 py-1 px-1.5 rounded-lg text-sm sm:text-base transition-all flex flex-col items-center gap-0.5 ${
                      selectedPatientIdx === idx
                        ? 'bg-slate-800 border border-slate-600 scale-105 shadow-md'
                        : 'opacity-60 hover:opacity-100 hover:bg-slate-900'
                    }`}
                    title={p.name}
                  >
                    <span>{p.emoji}</span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase hidden sm:block">
                      {p.id}
                    </span>
                  </button>
                ))}
              </div>

              {/* Graphic Scene */}
              <div className="relative bg-slate-950/90 rounded-2xl p-6 border border-slate-800/80 flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
                <div className="absolute top-3 left-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                </div>
                <div className="text-[11px] font-mono text-slate-500 absolute top-3 right-4">
                  🚑 911 BOLLYWOOD FOOD ICU
                </div>

                {/* Stretcher & Active Food Patient Graphic */}
                <div className="relative my-4 flex flex-col items-center">
                  <div className="text-7xl sm:text-8xl select-none filter drop-shadow-[0_10px_25px_rgba(239,68,68,0.35)] animate-pulse transition-transform duration-300">
                    {currentPatient.emoji}
                  </div>
                  <span className="absolute -top-1 -right-2 text-2xl select-none rotate-12">
                    🩹
                  </span>
                  <span className="absolute bottom-2 -left-3 text-2xl select-none">
                    🩺
                  </span>

                  {/* Stretcher Bed */}
                  <div className="w-40 h-2 bg-slate-700 rounded-full mt-2 border-t border-slate-500 shadow" />
                  <div className="flex justify-between w-32 mt-0.5">
                    <div className="w-1.5 h-4 bg-slate-600 rounded" />
                    <div className="w-1.5 h-4 bg-slate-600 rounded" />
                  </div>
                </div>

                {/* Patient Monitor Vitals */}
                <div className="w-full bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 font-mono text-xs space-y-1.5 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">MAREEZ:</span>
                    <span className="font-bold text-amber-300 truncate max-w-[200px]">
                      {currentPatient.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">HALAT:</span>
                    <span className="text-red-400 font-bold animate-pulse">
                      {currentPatient.condition}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">DHADKAN & HEAT:</span>
                    <span className="text-cyan-400 font-bold">
                      {currentPatient.temp} • {currentPatient.pulse}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">DAKTAR KI DAWAI:</span>
                    <span className="text-emerald-400 font-bold truncate max-w-[190px]">
                      {currentPatient.prescription}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-amber-200/90 italic font-mono">
                  {currentPatient.quote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
