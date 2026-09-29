import React from 'react';
import { Siren, AlertCircle, Heart, Terminal } from 'lucide-react';
import { useRescue } from '../../context/RescueContext';

export const EmergencyTicker = () => {
  const { emergencies, reservations, role } = useRescue();
  const isRestaurant = role === 'restaurant';

  const criticalItems = emergencies.filter(e => e.condition === 'CRITICAL' || e.condition === 'LAST_CALL');
  const activePickups = reservations.filter(r => r.status !== 'COMPLETED').length;

  return (
    <div className="bg-slate-950 border-y border-red-900/30 py-2 px-4 text-xs font-mono text-slate-300 overflow-hidden relative shadow-inner">
      <div className="flex items-center gap-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded-lg shrink-0 border border-red-500/40 animate-pulse">
          {isRestaurant ? (
            <>
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>KITCHEN DISPATCH:</span>
            </>
          ) : (
            <>
              <Siren className="w-3.5 h-3.5 animate-siren-wiggle text-red-400" />
              <span>911 DISPATCH:</span>
            </>
          )}
        </div>

        <div className="overflow-hidden whitespace-nowrap flex-1 relative">
          <div className="inline-block animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
            <span className="inline-flex items-center gap-6">
              {isRestaurant ? (
                <>
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    LIVE TELEMETRY: {activePickups} RESCUER ORDERS AWAITING COUNTER PICKUP
                  </span>
                  <span className="text-slate-700">•</span>
                  <span className="text-slate-300">
                    {emergencies.length} ACTIVE SURPLUS FOOD BATCHES BROADCASTED TO NEIGHBORHOOD HEROES
                  </span>
                  <span className="text-slate-700">•</span>
                  <span className="text-emerald-400 font-bold">
                    100% EDIBLE SURPLUS GUARANTEE • ZERO TRASH PROTOCOL
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    ⚠️ TRAUMA ALERT: {emergencies.length} FOOD PATIENTS REQUIRE IMMEDIATE RESCUE INGESTION
                  </span>
                  <span className="text-slate-700">•</span>
                  {criticalItems.map((item) => (
                    <span key={item.id} className="flex items-center gap-1.5 text-red-300">
                      <span className="text-base">{item.emoji}</span>
                      <strong className="text-white">{item.name}</strong> is in <strong className="text-red-400 font-bold">{item.condition}</strong> condition!
                      <span className="text-slate-400">({Math.ceil(item.secondsLeft / 60)}m left)</span>
                    </span>
                  ))}
                  <span className="text-slate-700">•</span>
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                    "Not all heroes wear capes. Some rescue vadapav, biryani & kachori."
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
