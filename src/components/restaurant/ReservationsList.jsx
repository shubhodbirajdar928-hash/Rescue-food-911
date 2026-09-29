import React, { useState } from 'react';
import { useRescue } from '../../context/RescueContext';
import { CheckCircle2, Clock, User, Check, PackageCheck } from 'lucide-react';

export const ReservationsList = () => {
  const { reservations, markAsRescued, playAudio } = useRescue();
  const [packedTickets, setPackedTickets] = useState({});

  const activeReservations = reservations.filter(r => r.status !== 'COMPLETED');
  const completedReservations = reservations.filter(r => r.status === 'COMPLETED');

  const togglePacked = (id) => {
    setPackedTickets(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    playAudio('dispatch');
  };

  return (
    <div className="space-y-8 text-left font-mono">
      {/* Sleek Ticket Rack Container */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Sleek Rail */}
        <div className="relative mb-6">
          <div className="w-full h-3 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 rounded-full shadow border-b border-slate-950 flex items-center justify-around px-8">
            <div className="w-3 h-4 bg-slate-400 rounded-sm shadow -mt-1" />
            <div className="w-3 h-4 bg-slate-400 rounded-sm shadow -mt-1" />
            <div className="w-3 h-4 bg-slate-400 rounded-sm shadow -mt-1" />
            <div className="w-3 h-4 bg-slate-400 rounded-sm shadow -mt-1" />
          </div>

          <div className="flex items-center justify-between mt-3">
            <div>
              <h3 className="text-lg font-black text-white m-0 tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span>KDS LIVE ORDER TICKET RACK ({activeReservations.length} ACTIVE)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Thermal dispatch tickets for food rescuers arriving at counter
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              COUNTER PICKUP STATION
            </span>
          </div>
        </div>

        {activeReservations.length === 0 ? (
          <div className="bg-slate-950/60 rounded-2xl p-10 border border-slate-800 text-center space-y-2">
            <span className="text-4xl block">🧾</span>
            <h4 className="text-base font-bold text-white">Ticket Rack Is Empty</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No active customer rescue orders right now. Switch to [🦸 FOOD RESCUER] to test adopting a surplus meal!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeReservations.map((res) => {
              const isOnTheWay = res.status === 'ON_THE_WAY';
              const isPacked = packedTickets[res.id];

              return (
                <div
                  key={res.id}
                  className={`bg-slate-950 rounded-2xl border transition-all flex flex-col justify-between shadow-xl relative overflow-hidden ${
                    isOnTheWay
                      ? 'border-amber-400/80 shadow-amber-950/40 ring-1 ring-amber-400/40'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Top Ticket Header */}
                  <div className="bg-slate-900 p-3.5 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {res.missionCode || `TICKET #${res.id}`}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                        isOnTheWay
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      }`}
                    >
                      {isOnTheWay ? '🏃 RESCUER EN ROUTE' : 'RESERVED'}
                    </span>
                  </div>

                  {/* Ticket Content */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                    <div>
                      {/* Food & Quantity */}
                      <div className="flex items-start gap-3 pb-3 border-b border-slate-800">
                        <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                          {res.foodEmoji || '🍔'}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-amber-300 uppercase block">
                            [{res.quantity}X ORDER]
                          </span>
                          <h4 className="text-base font-bold text-white leading-tight font-sans">
                            {res.foodName}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {res.foodCode}
                          </span>
                        </div>
                      </div>

                      {/* Customer Info & Deadline */}
                      <div className="space-y-1.5 pt-2 text-[11px] text-slate-300">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">RESCUER:</span>
                          <span className="font-bold text-white flex items-center gap-1">
                            <User className="w-3 h-3 text-amber-400" />
                            <span>{res.customerName}</span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">PICKUP BY:</span>
                          <span className="font-bold text-red-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{res.pickupDeadline}</span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-xs">
                          <span className="text-slate-400">COLLECT AT COUNTER:</span>
                          <span className="text-emerald-400 font-black text-sm">
                            ₹{res.rescuePrice * res.quantity}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-800 space-y-2">
                      <button
                        onClick={() => togglePacked(res.id)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
                          isPacked
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                            : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800'
                        }`}
                      >
                        <PackageCheck className="w-4 h-4 text-emerald-400" />
                        <span>{isPacked ? '✓ PACKED & READY AT COUNTER' : 'MARK PACKED IN KITCHEN'}</span>
                      </button>

                      <button
                        onClick={() => markAsRescued(res.id)}
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-black text-white bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 hover:from-amber-500 hover:to-orange-500 shadow-md shadow-orange-600/30 flex items-center justify-center gap-1.5 transform active:scale-95 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>HAND OVER MEAL (MARK AS RESCUED)</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed Archive */}
      {completedReservations.length > 0 && (
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>COMPLETED TICKET ARCHIVE TODAY ({completedReservations.length})</span>
            </h4>
            <span className="text-[11px] text-emerald-400 font-bold">
              +₹{completedReservations.reduce((sum, r) => sum + (r.rescuePrice * r.quantity), 0)} Recovered
            </span>
          </div>

          <div className="space-y-2">
            {completedReservations.map((res) => (
              <div
                key={res.id}
                className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs text-slate-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{res.foodEmoji || '🍔'}</span>
                  <div>
                    <span className="font-bold text-white">{res.foodName}</span>
                    <span className="text-slate-500 text-[11px] ml-2">({res.quantity}x) • Rescued by {res.customerName}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-emerald-400 font-bold">
                    +₹{res.rescuePrice * res.quantity}
                  </span>
                  <span className="text-[10px] text-slate-500 block">REVENUE CLOSED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
