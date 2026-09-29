import React, { useState } from 'react';
import { useRescue } from '../../context/RescueContext';
import { Radio, Siren } from 'lucide-react';
import { CountdownTimer } from '../common/CountdownTimer';

export const RadarMap = () => {
  const { emergencies, setSelectedEmergency, playAudio } = useRescue();
  const [activeHoverPin, setActiveHoverPin] = useState(null);

  const mapEmergencies = emergencies.slice(0, 8);

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-2xl relative overflow-hidden font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h3 className="text-lg font-black text-white m-0 tracking-wider flex items-center gap-2">
              <span>911 FOOD RADAR DISPATCH MAP</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time geospatial tracking of high-risk calories in your sector
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>RADAR ACTIVE (2.5 KM RADIUS)</span>
          </span>
        </div>
      </div>

      {/* The Radar Map Canvas */}
      <div className="relative w-full h-[380px] sm:h-[440px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Radar Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

        {/* Concentric Radar Rings */}
        <div className="absolute w-[180px] h-[180px] rounded-full border border-red-500/20 pointer-events-none flex items-center justify-center">
          <span className="text-[10px] text-red-500/40 font-mono absolute top-1 font-bold">500m</span>
        </div>
        <div className="absolute w-[300px] h-[300px] rounded-full border border-red-500/20 pointer-events-none flex items-center justify-center">
          <span className="text-[10px] text-red-500/40 font-mono absolute top-1 font-bold">1.2km</span>
        </div>
        <div className="absolute w-[440px] h-[440px] rounded-full border border-red-500/10 pointer-events-none flex items-center justify-center">
          <span className="text-[10px] text-red-500/30 font-mono absolute top-1 font-bold">2.5km</span>
        </div>

        {/* Crosshair Lines */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-red-500/20 pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-red-500/20 pointer-events-none" />

        {/* Sweeping Beam */}
        <div className="absolute w-full h-full rounded-full pointer-events-none overflow-hidden opacity-25">
          <div className="w-1/2 h-1/2 absolute top-0 right-0 origin-bottom-left bg-gradient-to-tr from-transparent via-red-500/20 to-red-500/40 animate-[spin_5s_linear_infinite]" />
        </div>

        {/* Center User Marker */}
        <div className="absolute z-20 flex flex-col items-center pointer-events-none transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
            </div>
            <div className="absolute -inset-1 rounded-full border border-blue-400/50 animate-ping" />
          </div>
          <span className="mt-1 font-mono text-[10px] font-bold bg-slate-900/90 text-blue-300 px-2 py-0.5 rounded border border-blue-500/40 whitespace-nowrap shadow">
            📍 YOU (HERO ON DUTY)
          </span>
        </div>

        {/* Emergency Food Pins */}
        {mapEmergencies.map((item, index) => {
          const leftPercent = item.mapCoords?.x || (25 + (index * 14) % 65);
          const topPercent = item.mapCoords?.y || (20 + (index * 17) % 65);
          const isCritical = item.condition === 'CRITICAL' || item.condition === 'LAST_CALL';

          return (
            <div
              key={item.id}
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              onClick={() => {
                setSelectedEmergency(item);
                playAudio('ecg');
              }}
              onMouseEnter={() => setActiveHoverPin(item.id)}
              onMouseLeave={() => setActiveHoverPin(null)}
            >
              {/* Pulse ripple */}
              <div className="relative flex items-center justify-center">
                <span
                  className={`animate-ping absolute inline-flex h-10 w-10 rounded-full opacity-70 ${
                    isCritical ? 'bg-red-500' : 'bg-amber-400'
                  }`}
                />

                <div
                  className={`relative w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-lg border-2 transition-transform transform group-hover:scale-125 ${
                    isCritical
                      ? 'bg-red-950 border-red-500 shadow-red-500/50'
                      : 'bg-amber-950 border-amber-500 shadow-amber-500/40'
                  }`}
                >
                  <span>{item.emoji}</span>
                </div>
              </div>

              {/* Pin Tag */}
              <div className="mt-1 flex flex-col items-center">
                <span
                  className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border whitespace-nowrap shadow-md ${
                    isCritical
                      ? 'bg-red-900/90 text-red-200 border-red-500/60'
                      : 'bg-amber-900/90 text-amber-200 border-amber-500/60'
                  }`}
                >
                  {item.name.split(' ')[0]} • ₹{item.rescuePrice}
                </span>

                <div className="mt-0.5">
                  <CountdownTimer secondsLeft={item.secondsLeft} size="sm" showIcon={false} />
                </div>
              </div>

              {/* Hover Tooltip Card */}
              {activeHoverPin === item.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3.5 bg-slate-900 border border-red-500/50 rounded-2xl shadow-2xl z-40 text-left pointer-events-none animate-in fade-in">
                  <div className="font-bold text-white text-xs truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-amber-300 font-mono mt-0.5">
                    {item.restaurant} ({item.distance} km)
                  </div>
                  <div className="text-[10px] text-slate-300 italic mt-1 line-clamp-2">
                    "{item.doctorNotes}"
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-800 text-[11px] font-mono">
                    <span className="text-slate-400 line-through">₹{item.originalPrice}</span>
                    <span className="text-emerald-400 font-bold">
                      ₹{item.rescuePrice} (Save ₹{item.originalPrice - item.rescuePrice})
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Map Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span>Rescuer Location</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>Critical / Last Call</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Urgent / Observation</span>
          </span>
        </div>

        <span className="text-[11px] text-slate-500 italic">
          💡 Click any radar pin to dispatch rescue unit
        </span>
      </div>
    </div>
  );
};
