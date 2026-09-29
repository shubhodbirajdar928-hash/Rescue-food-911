import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../auth/AuthContext';
import { Siren, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, UserPlus, AlertCircle } from 'lucide-react';

const RescuerLogin = () => {
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

    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));

    if (isRegister) {
      if (!name.trim()) { setError('Name is required'); setLoading(false); return; }
      const result = register({ name: name.trim(), email, password, role: ROLES.FOOD_RESCUER });
      if (result.success) {
        navigate('/rescuer/dashboard');
      } else {
        setError(result.error);
      }
    } else {
      const result = login(email, password, ROLES.FOOD_RESCUER);
      if (result.success) {
        navigate('/rescuer/dashboard');
      } else {
        setError(result.error);
      }
    }
    setLoading(false);
  };

  const fillDemo = () => {
    setEmail('rescuer@food911.com');
    setPassword('rescuer123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-red-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back */}
        <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-mono mb-6 transition-colors no-underline">
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to role selection</span>
        </Link>

        {/* Card */}
        <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl border border-red-500/40 shadow-2xl shadow-red-950/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 p-6 text-center">
            <div className="text-5xl mb-2">🦸</div>
            <h2 className="text-xl font-black text-white tracking-wide">
              {isRegister ? 'CREATE RESCUER ACCOUNT' : 'FOOD RESCUER LOGIN'}
            </h2>
            <p className="text-red-100/80 text-xs font-mono mt-1">
              {isRegister ? 'Join the rescue squad' : 'Access your rescue dashboard'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="flex items-start gap-2 bg-red-950/50 border border-red-500/40 rounded-xl p-3 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 font-mono">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your hero name"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors font-mono"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 font-mono">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rescuer@food911.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors font-mono"
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
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-12 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors font-mono"
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
              className="w-full py-3.5 rounded-xl font-black text-sm tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 border border-red-400/40 flex items-center justify-center gap-2 transition-all disabled:opacity-60 active:scale-98"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Siren className="w-4 h-4 animate-siren-wiggle" />
                  <span>{isRegister ? 'CREATE ACCOUNT' : 'LOGIN'}</span>
                </>
              )}
            </button>

            <div className="text-center text-xs text-slate-400">
              {isRegister ? (
                <span>Already have an account? <button type="button" onClick={() => { setIsRegister(false); setError(''); }} className="text-red-400 hover:text-red-300 font-bold underline">Login</button></span>
              ) : (
                <span>Don't have an account? <button type="button" onClick={() => { setIsRegister(true); setError(''); }} className="text-red-400 hover:text-red-300 font-bold underline">Create Rescuer Account</button></span>
              )}
            </div>
          </form>

          {/* Demo Credentials */}
          {!isRegister && (
            <div className="border-t border-slate-800 p-4 bg-slate-950/50">
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Demo Access</span>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="mt-2 w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl p-3 text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono">
                      <div className="text-slate-400">Email: <span className="text-white font-bold">rescuer@food911.com</span></div>
                      <div className="text-slate-400">Pass: <span className="text-white font-bold">rescuer123</span></div>
                    </div>
                    <span className="text-[10px] font-bold text-red-400 bg-red-950/50 px-2 py-1 rounded border border-red-500/30 group-hover:bg-red-900/50 transition-colors">FILL</span>
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

export default RescuerLogin;
