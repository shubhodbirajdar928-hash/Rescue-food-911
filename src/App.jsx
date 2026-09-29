import React, { useState, useRef } from 'react';
import { RescueProvider, useRescue } from './context/RescueContext';
import { Navbar } from './components/common/Navbar';
import { EmergencyTicker } from './components/common/EmergencyTicker';
import { HeroSection } from './components/rescuer/HeroSection';
import { EmergencyCard } from './components/rescuer/EmergencyCard';
import { FoodDetailsModal } from './components/rescuer/FoodDetailsModal';
import { RescueMissionModal } from './components/rescuer/RescueMissionModal';
import { RescueSuccessModal } from './components/rescuer/RescueSuccessModal';
import { RadarMap } from './components/rescuer/RadarMap';
import { RescuerProfile } from './components/rescuer/RescuerProfile';
import { ExpiredMemorialWard } from './components/rescuer/ExpiredMemorialWard';
import { FeedbackSection } from './components/rescuer/FeedbackSection';
import { RestaurantDashboard } from './components/restaurant/RestaurantDashboard';
import { ImpactSection } from './components/impact/ImpactSection';
import { Grid, Map, Trophy, Filter, HeartCrack, MessageSquareQuote } from 'lucide-react';

const RescuerView = ({ gridRef }) => {
  const { emergencies, expiredEmergencies } = useRescue();
  const [activeTab, setActiveTab] = useState('grid'); // 'grid' | 'map' | 'profile' | 'expired'
  const [conditionFilter, setConditionFilter] = useState('ALL');

  const filteredEmergencies = emergencies.filter(item => {
    if (conditionFilter === 'ALL') return true;
    return item.condition === conditionFilter;
  });

  return (
    <div className="space-y-10">
      {/* 911 Trauma Emergency Hero Section */}
      <HeroSection
        onScrollToGrid={() => {
          gridRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <div ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation & Controls Bar (Sleek Dark Glassmorphism) */}
        <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('grid')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                activeTab === 'grid'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>🏥 Mareez Ward</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                activeTab === 'map'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>📡 Khana Radar</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                activeTab === 'profile'
                  ? 'bg-amber-500 text-black font-black shadow-lg shadow-amber-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>🏆 Mera Score</span>
            </button>

            <button
              onClick={() => setActiveTab('expired')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all relative ${
                activeTab === 'expired'
                  ? 'bg-rose-700 text-white shadow-lg shadow-rose-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <HeartCrack className="w-4 h-4 text-rose-400" />
              <span>🪦 RIP Khana ({expiredEmergencies?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('feedback')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all relative ${
                activeTab === 'feedback'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MessageSquareQuote className="w-4 h-4 text-purple-400" />
              <span>📢 Shikayat & Feedback</span>
            </button>
          </div>

          {/* Condition Filter Tabs */}
          {activeTab === 'grid' && (
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 font-mono text-xs">
              <span className="text-slate-400 font-bold text-xs hidden lg:inline mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-red-500" /> Halat:
              </span>
              {[
                { key: 'ALL', label: 'Sabhi Mareez' },
                { key: 'CRITICAL', label: '🔴 ICU Critical' },
                { key: 'URGENT', label: '🟠 Tadap Raha Hai' },
                { key: 'OBSERVATION', label: '🟡 Observation' },
                { key: 'STABLE', label: '🟢 Mast Taza' }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setConditionFilter(item.key)}
                  className={`px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap transition-all font-bold ${
                    conditionFilter === item.key
                      ? 'bg-red-600/20 text-red-400 border-red-500/50 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab Content Display */}
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
                  {emergencies.length === 0
                    ? "Currently 0 food emergencies on your radar. All meals in your sector are safe and sound! Stay tuned for new restaurant surplus broadcasts."
                    : "Zero food casualties. Click below to view all hungry surplus patients across your neighborhood."}
                </p>
                {conditionFilter !== 'ALL' && (
                  <div className="pt-2">
                    <button
                      onClick={() => setConditionFilter('ALL')}
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-lg shadow-red-900/30 transition-all"
                    >
                      Show All Patients
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmergencies.map((item) => (
                  <EmergencyCard key={item.id} emergency={item} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'map' && <RadarMap />}

        {activeTab === 'profile' && <RescuerProfile />}

        {activeTab === 'expired' && <ExpiredMemorialWard />}

        {activeTab === 'feedback' && <FeedbackSection />}

        {/* Impact Section */}
        <div className="pt-6">
          <ImpactSection />
        </div>
      </div>
    </div>
  );
};

const MainContent = () => {
  const { role } = useRescue();
  const gridRef = useRef(null);

  return (
    <main className="min-h-screen pb-16 bg-slate-950 text-slate-100 selection:bg-red-500 selection:text-white relative">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Navbar & Live Ticker */}
      <Navbar />
      <EmergencyTicker />

      {/* Main View Area */}
      {role === 'rescuer' ? (
        <RescuerView gridRef={gridRef} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          <RestaurantDashboard />
          <ImpactSection />
        </div>
      )}

      {/* Global Interactive Modals */}
      <FoodDetailsModal />
      <RescueMissionModal />
      <RescueSuccessModal />

      {/* Footer */}
      <footer className="mt-20 py-10 px-4 text-center font-mono text-xs border-t border-slate-800 bg-slate-950/80 text-slate-400">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 font-black text-sm">
            <span className="text-white">🚨 FOOD RESCUE 911</span>
            <span>•</span>
            <span className="text-amber-400">"Asli Hero wahi... jo dustbin se pehle Biryani aur Vada Pav bacha le! 🦸‍♂️🍛"</span>
          </div>
          <p className="max-w-xl mx-auto text-slate-300 leading-relaxed">
            Vada pav aur pizza ko CPR dena full comedy lag sakta hai... par dukan band hone ke baad taaza khana bachana aur pet bharna 100% real impact hai!
          </p>
          <div className="text-[11px] text-emerald-400 font-bold">
            100% Safe, Edible Surplus Food Marketplace • Built with React, Vite & Tailwind CSS
          </div>
        </div>
      </footer>
    </main>
  );
};

function App() {
  return (
    <RescueProvider>
      <MainContent />
    </RescueProvider>
  );
}

export default App;
