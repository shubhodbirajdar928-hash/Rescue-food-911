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

        {/* Choose Access */}
        <h2 className="text-lg font-bold text-slate-300 mb-6 font-mono uppercase tracking-wider">
          Choose your access
        </h2>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
          {/* Food Rescuer Card */}
          <Link
            to="/login/rescuer"
            className="group relative bg-slate-900/80 backdrop-blur-md rounded-3xl border border-red-500/30 p-8 text-center hover:border-red-500/70 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/50 transition-all duration-300 cursor-pointer no-underline"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none" />
            <div className="relative space-y-4">
              <div className="text-6xl">🦸</div>
              <div>
                <h3 className="text-xl font-black text-white tracking-wide">FOOD RESCUER</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Rescue surplus food near you at 50-70% off
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-red-400" /> Rescue</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-400" /> Save</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-red-400" /> Earn</span>
              </div>
              <button className="w-full py-3 rounded-xl font-black text-sm tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 border border-red-400/40 flex items-center justify-center gap-2 transition-all group-hover:shadow-xl">
                <Siren className="w-4 h-4 animate-siren-wiggle" />
                <span>LOGIN AS RESCUER</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Link>

          {/* Kitchen Dispatch Card */}
          <Link
            to="/login/kitchen"
            className="group relative bg-slate-900/80 backdrop-blur-md rounded-3xl border border-amber-500/30 p-8 text-center hover:border-amber-500/70 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-950/50 transition-all duration-300 cursor-pointer no-underline"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-600/5 to-transparent pointer-events-none" />
            <div className="relative space-y-4">
              <div className="text-6xl">👨‍🍳</div>
              <div>
                <h3 className="text-xl font-black text-white tracking-wide">KITCHEN DISPATCH</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Manage surplus food from your kitchen
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1"><ChefHat className="w-3 h-3 text-amber-400" /> Deploy</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> Recover</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-amber-400" /> Manage</span>
              </div>
              <button className="w-full py-3 rounded-xl font-black text-sm tracking-wider text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-orange-600/30 border border-amber-400/40 flex items-center justify-center gap-2 transition-all group-hover:shadow-xl">
                <ChefHat className="w-4 h-4" />
                <span>LOGIN AS KITCHEN</span>
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
