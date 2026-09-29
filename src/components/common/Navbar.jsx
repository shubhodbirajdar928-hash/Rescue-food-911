import React from 'react';
import { useRescue } from '../../context/RescueContext';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Siren, Volume2, VolumeX, Award, ChefHat, Radio, RotateCcw, LogOut, User } from 'lucide-react';

export const Navbar = () => {
  const { role, soundEnabled, setSoundEnabled, totalHeroPoints, reservations, resetToZero } = useRescue();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const activeReservationsCount = reservations.filter(r => r.status === 'RESERVED' || r.status === 'ON_THE_WAY').length;
  const isRestaurant = role === 'restaurant';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl sticky top-0 z-30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-lg shadow-red-600/30 border border-red-500/40 animate-siren-glow">
              <Siren className="w-6 h-6 animate-siren-wiggle" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-slate-950"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white m-0 flex items-center gap-1.5">
                  <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">FOOD RESCUE</span>
                  <span className="bg-red-600 text-white px-2 py-0.5 rounded-lg text-lg sm:text-xl font-mono tracking-wider shadow">
                    911
                  </span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono bg-red-500/10 text-red-400 border border-red-500/30">
                  <Radio className="w-3 h-3 text-red-400 animate-pulse" />
                  <span>EMERGENCY DISPATCH</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium tracking-wide hidden sm:block">
                "Not all heroes wear capes. Some rescue vadapav, biryani & kachori."
              </p>
            </div>
          </div>

          {/* Role Badge (no switching) */}
          <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 font-bold text-xs sm:text-sm ${
            isRestaurant
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-orange-600/30 border-amber-400/40'
              : 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 border-red-400/40'
          }`}>
            <span className="text-base sm:text-lg">{isRestaurant ? '👨‍🍳' : '🦸'}</span>
            <span className="tracking-wide">{isRestaurant ? 'KITCHEN DISPATCH' : 'FOOD RESCUER'}</span>
            {isRestaurant && activeReservationsCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold animate-bounce shadow">
                {activeReservationsCount}
              </span>
            )}
          </div>

          {/* User Info, Sound & Logout */}
          <div className="flex items-center gap-3 font-mono">
            {!isRestaurant ? (
              <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-xl">
                <Award className="w-4 h-4 text-amber-400" />
                <div className="text-left text-xs">
                  <div className="font-bold text-amber-300">{user?.name || 'FOOD GUARDIAN'} 🦸</div>
                  <div className="text-[10px] text-slate-400">{totalHeroPoints} Rescue Pts</div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-xl">
                <ChefHat className="w-4 h-4 text-orange-400" />
                <div className="text-left text-xs">
                  <div className="font-bold text-orange-300">{user?.name || 'DISPATCH CONTROL'}</div>
                  <div className="text-[10px] text-slate-400">{user?.stationId || 'Station #04'} Online</div>
                </div>
              </div>
            )}

            <button
              onClick={resetToZero}
              className="p-2.5 rounded-xl border bg-slate-900 text-slate-400 border-slate-800 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
              title="Reset All Data to 0"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2.5 rounded-xl border transition-colors ${
                soundEnabled
                  ? 'bg-slate-900 text-amber-400 border-amber-500/30 hover:bg-slate-800'
                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-400'
              }`}
              title={soundEnabled ? 'Emergency Siren Sound ON' : 'Sound Muted'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl border bg-slate-900 text-slate-400 border-slate-800 hover:text-red-400 hover:border-red-500/40 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
