import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Siren, Shield, ChefHat, Heart, Zap, Radio, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { isAuthenticated, getDashboardPath, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-5xl animate-pulse">🚨</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={getDashboardPath()} replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden flex flex-col">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        {/* Logo */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-2xl shadow-red-600/40 border border-red-500/40 animate-siren-glow mx-auto">
            <Siren className="w-10 h-10 animate-siren-wiggle" />
          </div>
          
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight flex items-center justify-center gap-2">
              <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">FOOD RESCUE</span>
              <span className="bg-red-600 text-white px-3 py-1 rounded-xl text-3xl sm:text-4xl font-mono tracking-wider shadow-lg">911</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base font-medium mt-2 max-w-md mx-auto">
              Save Food. Save Money. Save the Planet.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>EMERGENCY DISPATCH ACTIVE</span>
          </div>
        </div>

        {/* Choose Access Header */}
        <div className="text-center mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-1">
            <span>🎭 BOLLYWOOD FOOD TRIAGE SELECTION</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-red-500 font-mono uppercase tracking-wider flex items-center justify-center gap-2">
            <span>BATAO BABUMOSHAI... KAUN HO TUM?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-mono">
            "Zindagi lambi nahi babu... Biryani aur samosa garam hona chahiye!" 🤤🔥
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
          {/* Food Rescuer Card */}
          <Link
            to="/login/rescuer"
            className="group relative bg-slate-900/90 backdrop-blur-md rounded-3xl border-2 border-red-500/40 hover:border-red-500 p-6 sm:p-7 text-center hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-900/50 transition-all duration-300 cursor-pointer no-underline flex flex-col justify-between"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none" />
            <div className="relative space-y-3.5">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[11px] font-mono font-bold uppercase">
                <span>🦸 PET PUJA SPECIAL FORCES 🍔</span>
              </div>

              {/* Big Emojis */}
              <div className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2">
                <span>🦸‍♂️</span>
                <span className="text-4xl animate-bounce">🍕</span>
                <span className="text-4xl animate-pulse">🤤</span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white tracking-wide group-hover:text-red-400 transition-colors flex items-center justify-center gap-1.5">
                  <span>FOOD RESCUER</span>
                  <span>🍛</span>
                </h3>
                <div className="text-xs text-amber-300 font-bold font-mono">
                  (Khana Khau Hero 🦸)
                </div>
                
                <p className="text-xs text-rose-300/90 italic font-mono mt-1 bg-red-950/40 py-1.5 px-2 rounded-lg border border-red-500/20">
                  "Tumhara pyaar mile na mile... Biryani nahi chhodenge!" 😉
                </p>

                {/* Emojis replacing heavy text */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs font-mono">
                  <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-red-300 flex items-center justify-center gap-1.5">
                    <span>🍛🤤</span>
                    <span className="font-bold">Biryani Bachao</span>
                  </div>
                  <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-emerald-400 flex items-center justify-center gap-1.5">
                    <span>🏷️📉</span>
                    <span className="font-bold">70% Sasta</span>
                  </div>
                  <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-amber-300 flex items-center justify-center gap-1.5">
                    <span>😋🍕</span>
                    <span className="font-bold">Pet Khush</span>
                  </div>
                  <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-purple-300 flex items-center justify-center gap-1.5">
                    <span>🏆⚡</span>
                    <span className="font-bold">Hero Points</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3.5 rounded-xl font-black text-xs sm:text-sm tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/40 border border-red-400/50 flex items-center justify-center gap-2 transition-all group-hover:shadow-red-600/60 active:scale-95 mt-2">
                <Siren className="w-4 h-4 animate-siren-wiggle" />
                <span>🚨 AMBULANCE CHALAO! 🚑</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </Link>

          {/* Kitchen Dispatch Card */}
          <Link
            to="/login/kitchen"
            className="group relative bg-slate-900/90 backdrop-blur-md rounded-3xl border-2 border-amber-500/40 hover:border-amber-400 p-6 sm:p-7 text-center hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-900/50 transition-all duration-300 cursor-pointer no-underline flex flex-col justify-between"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-600/10 to-transparent pointer-events-none" />
            <div className="relative space-y-3.5">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold uppercase">
                <span>👨‍🍳 DHABE KA GABBAR HQ 🔥</span>
              </div>

              {/* Big Emojis */}
              <div className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2">
                <span>👨‍🍳</span>
                <span className="text-4xl animate-bounce">🥘</span>
                <span className="text-4xl animate-pulse">💸</span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white tracking-wide group-hover:text-amber-400 transition-colors flex items-center justify-center gap-1.5">
                  <span>KITCHEN DISPATCH</span>
                  <span>🔥</span>
                </h3>
                <div className="text-xs text-amber-300 font-bold font-mono">
                  (Bawarchi Control 🤠)
                </div>
                
                <p className="text-xs text-amber-200/90 italic font-mono mt-1 bg-amber-950/40 py-1.5 px-2 rounded-lg border border-amber-500/20">
                  "Surplus khana dustbin ko mat do Thakur! 💸🤤"
                </p>

                {/* Emojis replacing heavy text */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs font-mono">
                  <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-amber-300 flex items-center justify-center gap-1.5">
                    <span>🍲🔥</span>
                    <span className="font-bold">Garam Khana</span>
                  </div>
                  <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-emerald-400 flex items-center justify-center gap-1.5">
                    <span>💵⚡</span>
                    <span className="font-bold">Rokda Recover</span>
                  </div>
                  <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-rose-400 flex items-center justify-center gap-1.5">
                    <span>🗑️❌</span>
                    <span className="font-bold">Dustbin Block</span>
                  </div>
                  <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-blue-300 flex items-center justify-center gap-1.5">
                    <span>🚨🚑</span>
                    <span className="font-bold">1-Tap 911</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3.5 rounded-xl font-black text-xs sm:text-sm tracking-wider text-white bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-orange-600/40 border border-amber-400/50 flex items-center justify-center gap-2 transition-all group-hover:shadow-amber-600/60 active:scale-95 mt-2">
                <ChefHat className="w-4 h-4" />
                <span>👨‍🍳 TANDOOR KHOLO! 🔥</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-slate-500 font-mono space-y-1">
          <p>🚨 FOOD RESCUE 911 • "Not all heroes wear capes. Some rescue vadapav, biryani & kachori."</p>
          <p>Built for the <strong>Build Something Stupid</strong> Hackathon</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
