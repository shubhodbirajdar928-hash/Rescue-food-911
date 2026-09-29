import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { EmergencyTicker } from '../components/common/EmergencyTicker';
import { RestaurantDashboard } from '../components/restaurant/RestaurantDashboard';
import { ImpactSection } from '../components/impact/ImpactSection';

const KitchenDashboard = () => {
  return (
    <main className="min-h-screen pb-16 bg-slate-950 text-slate-100 selection:bg-red-500 selection:text-white relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <Navbar />
      <EmergencyTicker />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <RestaurantDashboard />
        <ImpactSection />
      </div>
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

export default KitchenDashboard;
