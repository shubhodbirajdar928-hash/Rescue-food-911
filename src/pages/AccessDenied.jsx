import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ShieldOff, ArrowLeft, LogOut } from 'lucide-react';

const AccessDenied = () => {
  const { user, role, logout, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const roleName = role === 'FOOD_RESCUER' ? 'Food Rescuer' : role === 'KITCHEN_DISPATCH' ? 'Kitchen Dispatch' : 'Unknown';

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-md rounded-3xl border border-red-500/30 p-8 text-center space-y-6 shadow-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red-950/50 border border-red-500/40 mx-auto">
          <ShieldOff className="w-10 h-10 text-red-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white">🚫 ACCESS RESTRICTED</h1>
          <p className="text-sm text-slate-400">This area is not available for your current role.</p>
        </div>
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2">
          <div className="text-xs text-slate-500 uppercase font-mono font-bold">Your current role:</div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm ${role === 'FOOD_RESCUER' ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'}`}>
            <span>{user?.avatar || '👤'}</span><span>{roleName}</span>
          </div>
          <div className="text-xs text-slate-500 font-mono">{user?.name} • {user?.email}</div>
        </div>
        <div className="space-y-3">
          <button onClick={() => navigate(getDashboardPath())}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${role === 'FOOD_RESCUER' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30' : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-orange-600/30'}`}>
            <ArrowLeft className="w-4 h-4" /><span>Return to My Dashboard</span>
          </button>
          <button onClick={() => { logout(); navigate('/login'); }}
            className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-400 bg-slate-950 border border-slate-800 hover:text-white hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors">
            <LogOut className="w-3.5 h-3.5" /><span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
