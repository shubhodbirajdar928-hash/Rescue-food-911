import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../auth/AuthContext';
import { ChefHat, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle, Terminal } from 'lucide-react';

const KitchenLogin = () => {
  const { login, register, isAuthenticated, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={getDashboardPath()} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 600));

    if (isRegister) {
      if (!name.trim()) { setError('Kitchen name is required'); setLoading(false); return; }
      const result = register({ name: name.trim(), email, password, role: ROLES.KITCHEN_DISPATCH });
      if (result.success) {
        navigate('/kitchen/dashboard');
      } else {
        setError(result.error);
      }
    } else {
      const result = login(email, password, ROLES.KITCHEN_DISPATCH);
      if (result.success) {
        navigate('/kitchen/dashboard');
      } else {
        setError(result.error);
      }
    }
    setLoading(false);
  };

  const fillDemo = () => {
    setEmail('kitchen@food911.com');
    setPassword('kitchen123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-amber-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-mono mb-6 transition-colors no-underline">
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to role selection</span>
        </Link>

        <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl border border-amber-500/40 shadow-2xl shadow-amber-950/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 p-6 text-center">
            <div className="text-5xl mb-2 flex items-center justify-center gap-2">
              <span>👨‍🍳</span>
              <span className="text-3xl animate-bounce">🔥</span>
              <span className="text-4xl animate-pulse">🥘</span>
              <span className="text-3xl">💸</span>
            </div>
            <h2 className="text-xl font-black text-white tracking-wide">
              {isRegister ? 'REGISTER BAWARCHI KHANA 👨‍🍳' : 'DHABE KA GABBAR LOGIN 🤠'}
            </h2>
            <p className="text-amber-100 text-xs font-mono mt-1.5 flex items-center justify-center gap-2 flex-wrap">
              <span>🍲 Khana Bachao</span>
              <span>•</span>
              <span>💸 Rokda Banao</span>
              <span>•</span>
              <span>🗑️❌ Bin Upvaas</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="flex items-start gap-2 bg-red-950/50 border border-red-500/40 rounded-xl p-3 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 font-mono">Kitchen / Brand Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sharma Ji Ka Bakery"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 font-mono">Kitchen ID / Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kitchen@food911.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 font-mono">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-12 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-black text-sm tracking-wider text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-orange-600/30 border border-amber-400/40 flex items-center justify-center gap-2 transition-all disabled:opacity-60 active:scale-98"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ChefHat className="w-4 h-4" />
                  <span>{isRegister ? 'REGISTER KITCHEN' : 'LOGIN'}</span>
                </>
              )}
            </button>

            <div className="text-center text-xs text-slate-400">
              {isRegister ? (
                <span>Already have a kitchen account? <button type="button" onClick={() => { setIsRegister(false); setError(''); }} className="text-amber-400 hover:text-amber-300 font-bold underline">Login</button></span>
              ) : (
                <span>Don't have a kitchen account? <button type="button" onClick={() => { setIsRegister(true); setError(''); }} className="text-amber-400 hover:text-amber-300 font-bold underline">Register Kitchen</button></span>
              )}
            </div>
          </form>

          {!isRegister && (
            <div className="border-t border-slate-800 p-4 bg-slate-950/50">
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  👨‍🍳 1-TAP DEMO CHEF ACCESS (NO TYPING)
                </span>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="mt-2 w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 rounded-xl p-3 text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono">
                      <div className="text-slate-400">📧 <span className="text-white font-bold">kitchen@food911.com</span></div>
                      <div className="text-slate-400">🔑 <span className="text-white font-bold">kitchen123</span></div>
                    </div>
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/40 group-hover:bg-amber-500 group-hover:text-black transition-all flex items-center gap-1">
                      <span>AUTO FILL</span>
                      <span>⚡</span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KitchenLogin;
