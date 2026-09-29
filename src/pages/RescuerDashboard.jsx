import React, { useState, useRef } from 'react';
import { useRescue } from '../context/RescueContext';
import { Navbar } from '../components/common/Navbar';
import { EmergencyTicker } from '../components/common/EmergencyTicker';
import { HeroSection } from '../components/rescuer/HeroSection';
import { EmergencyCard } from '../components/rescuer/EmergencyCard';
import { FoodDetailsModal } from '../components/rescuer/FoodDetailsModal';
import { RescueMissionModal } from '../components/rescuer/RescueMissionModal';
import { RescueSuccessModal } from '../components/rescuer/RescueSuccessModal';
import { RadarMap } from '../components/rescuer/RadarMap';
import { RescuerProfile } from '../components/rescuer/RescuerProfile';
import { ExpiredMemorialWard } from '../components/rescuer/ExpiredMemorialWard';
import { FeedbackSection } from '../components/rescuer/FeedbackSection';
import { ImpactSection } from '../components/impact/ImpactSection';
import { RoboticVoiceRoaster } from '../components/common/RoboticVoiceRoaster';
import { Grid, Map, Trophy, Filter, HeartCrack, MessageSquareQuote } from 'lucide-react';

const RescuerDashboard = () => {
  const { emergencies, expiredEmergencies } = useRescue();
  const gridRef = useRef(null);
  const [activeTab, setActiveTab] = useState('grid');
  const [conditionFilter, setConditionFilter] = useState('ALL');

  const filteredEmergencies = emergencies.filter(item => {
    if (conditionFilter === 'ALL') return true;
    return item.condition === conditionFilter;
  });

  return (
    <main className="min-h-screen pb-16 bg-slate-950 text-slate-100 selection:bg-red-500 selection:text-white relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <Navbar />
      <EmergencyTicker />
      <RoboticVoiceRoaster />

      <div className="space-y-10">
        <HeroSection onScrollToGrid={() => { gridRef.current?.scrollIntoView({ behavior: 'smooth' }); }} />

        <div ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 w-full sm:w-auto">
              {[
                { id: 'grid', icon: <Grid className="w-4 h-4" />, label: '🏥 Mareez Ward', active: 'bg-red-600 text-white shadow-lg shadow-red-900/40' },
                { id: 'map', icon: <Map className="w-4 h-4" />, label: '📡 Khana Radar', active: 'bg-red-600 text-white shadow-lg shadow-red-900/40' },
                { id: 'profile', icon: <Trophy className="w-4 h-4" />, label: '🏆 Mera Score', active: 'bg-amber-500 text-black font-black shadow-lg shadow-amber-900/30' },
                { id: 'expired', icon: <HeartCrack className="w-4 h-4 text-rose-400" />, label: `🪦 RIP Khana (${expiredEmergencies?.length || 0})`, active: 'bg-rose-700 text-white shadow-lg shadow-rose-900/40' },
                { id: 'feedback', icon: <MessageSquareQuote className="w-4 h-4 text-purple-400" />, label: '📢 Shikayat & Feedback', active: 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${activeTab === tab.id ? tab.active : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}>
                  {tab.icon}<span>{tab.label}</span>
                </button>
              ))}
            </div>

            {activeTab === 'grid' && (
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 font-mono text-xs">
                <span className="text-slate-400 font-bold text-xs hidden lg:inline mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-red-500" /> Condition:
                </span>
                {[
                  { key: 'ALL', label: 'All Patients' }, { key: 'CRITICAL', label: '🔴 Critical' },
                  { key: 'URGENT', label: '🟠 Urgent' }, { key: 'OBSERVATION', label: '🟡 Observation' },
                  { key: 'STABLE', label: '🟢 Stable' }
                ].map(item => (
                  <button key={item.key} onClick={() => setConditionFilter(item.key)}
                    className={`px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap transition-all font-bold ${conditionFilter === item.key ? 'bg-red-600/20 text-red-400 border-red-500/50 shadow-sm' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'}`}>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {activeTab === 'grid' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <h2 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight flex items-center gap-2">
                    <span>🚨 ACTIVE FOOD PATIENTS IN CRITICAL CONDITION</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Showing {filteredEmergencies.length} delicious surplus meals waiting for an adoptive hero!
                  </p>
                </div>
              </div>
              {filteredEmergencies.length === 0 ? (
                <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-12 border border-slate-800 text-center font-mono space-y-3 shadow-xl">
                  <span className="text-6xl block">🎉</span>
                  <h3 className="text-2xl font-black text-white">
                    {emergencies.length === 0 ? "Zero Active Food Emergencies" : "All food patients in this condition were devoured!"}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                    {emergencies.length === 0 ? "Currently 0 food emergencies on your radar." : "Zero food casualties."}
                  </p>
                  {conditionFilter !== 'ALL' && (
                    <div className="pt-2">
                      <button onClick={() => setConditionFilter('ALL')} className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-lg shadow-red-900/30 transition-all">Show All Patients</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEmergencies.map((item) => (<EmergencyCard key={item.id} emergency={item} />))}
                </div>
              )}
            </div>
          )}
          {activeTab === 'map' && <RadarMap />}
          {activeTab === 'profile' && <RescuerProfile />}
          {activeTab === 'expired' && <ExpiredMemorialWard />}
          {activeTab === 'feedback' && <FeedbackSection />}
          <div className="pt-6"><ImpactSection /></div>
        </div>
      </div>

      <FoodDetailsModal />
      <RescueMissionModal />
      <RescueSuccessModal />

      <footer className="mt-20 py-10 px-4 text-center font-mono text-xs border-t border-slate-800 bg-slate-950/80 text-slate-400">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 font-black text-sm">
            <span className="text-white">🚨 FOOD RESCUE 911</span><span>•</span>
            <span className="text-red-500">"Not all heroes wear capes. Some rescue vadapav, biryani & kachori."</span>
          </div>
          <p className="max-w-xl mx-auto text-slate-400 leading-relaxed">Built for the <strong>Build Something Stupid</strong> Hackathon.</p>
        </div>
      </footer>
    </main>
  );
};

export default RescuerDashboard;
