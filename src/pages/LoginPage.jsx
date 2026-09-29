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
        <div className="text-center mb-6 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-1">
            <span>🚨 SELECT IDENTITY PROTOCOL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-red-500 font-mono uppercase tracking-wider flex items-center justify-center gap-2">
            <span>KAUN HO TUM? CHOOSE YOUR ROLE</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Khaane wale ho ya khilaane wale? Jaldi chuno, Biryani thandi ho rahi hai! 😉
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
          {/* Food Rescuer Card */}
          <Link
            to="/login/rescuer"
            className="group relative bg-slate-900/80 backdrop-blur-md rounded-3xl border border-red-500/30 p-7 text-center hover:border-red-500/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/60 transition-all duration-300 cursor-pointer no-underline flex flex-col justify-between"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none" />
            <div className="relative space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[10px] font-mono font-bold uppercase">
                <span>🦸 PET PUJA SPECIAL FORCES</span>
              </div>

              <div className="text-6xl group-hover:scale-110 transition-transform">🦸‍♂️🍔</div>

              <div>
                <h3 className="text-xl font-black text-white tracking-wide group-hover:text-red-400 transition-colors">
                  FOOD RESCUER
                </h3>
                <p className="text-xs text-red-300/80 italic font-mono mt-0.5">
                  "Bin-bulaye baraat ke asli hero!"
                </p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Tadapte hue Biryani, Pizza aur Vada Pav ko dustbin se bacha ke pet mein daalo! <span className="text-amber-300 font-bold font-mono">(50-70% OFF)</span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-red-300"><Shield className="w-3 h-3 text-red-400" /> Bachaao</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-300"><Heart className="w-3 h-3 text-emerald-400" /> Bachat</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-300"><Zap className="w-3 h-3 text-amber-400" /> Dabao</span>
              </div>

              <button className="w-full py-3 rounded-xl font-black text-xs tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 border border-red-400/40 flex items-center justify-center gap-2 transition-all group-hover:shadow-xl active:scale-95">
                <Siren className="w-4 h-4 animate-siren-wiggle" />
                <span>🚨 AMBULANCE CHALAO (RESCUER)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Link>

          {/* Kitchen Dispatch Card */}
          <Link
            to="/login/kitchen"
            className="group relative bg-slate-900/80 backdrop-blur-md rounded-3xl border border-amber-500/30 p-7 text-center hover:border-amber-500/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-950/60 transition-all duration-300 cursor-pointer no-underline flex flex-col justify-between"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-600/10 to-transparent pointer-events-none" />
            <div className="relative space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase">
                <span>👨‍🍳 BAWARCHI CONTROL ROOM</span>
              </div>

              <div className="text-6xl group-hover:scale-110 transition-transform">👨‍🍳🔥</div>

              <div>
                <h3 className="text-xl font-black text-white tracking-wide group-hover:text-amber-400 transition-colors">
                  KITCHEN DISPATCH
                </h3>
                <p className="text-xs text-amber-300/80 italic font-mono mt-0.5">
                  "Khana phenkna paap hai babumoshai!"
                </p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Surplus batch dustbin bhejke rona band karo! 1-click broadcast karo aur maal ka <span className="text-emerald-300 font-bold font-mono">Cash Recover</span> karo!
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-amber-300"><ChefHat className="w-3 h-3 text-amber-400" /> Tandoor</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-300"><Zap className="w-3 h-3 text-emerald-400" /> Cash Back</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-blue-300"><Shield className="w-3 h-3 text-blue-400" /> No Waste</span>
              </div>

              <button className="w-full py-3 rounded-xl font-black text-xs tracking-wider text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-orange-600/30 border border-amber-400/40 flex items-center justify-center gap-2 transition-all group-hover:shadow-xl active:scale-95">
                <ChefHat className="w-4 h-4" />
                <span>👨‍🍳 TANDOOR KHOLO (KITCHEN)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
