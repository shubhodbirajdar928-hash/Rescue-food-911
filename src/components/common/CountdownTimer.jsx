import React from 'react';
import { Clock, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

export const CountdownTimer = ({
  secondsLeft = 0,
  size = 'md',
  showIcon = true,
  showStateLabel = false
}) => {
  // Ensure non-negative countdown value
  const safeSeconds = Math.max(0, Math.floor(secondsLeft || 0));

  const isExpired = safeSeconds === 0;
  const isLowTime = !isExpired && safeSeconds <= 300; // < 5 mins
  const isActive = !isExpired && !isLowTime;

  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return '00:00';
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formattedTime = formatTime(safeSeconds);

  const sizeClasses = {
    sm: 'text-xs font-mono px-2 py-0.5',
    md: 'text-sm font-mono px-2.5 py-1',
    lg: 'text-2xl font-mono px-4 py-2 font-bold tracking-wider',
    xl: 'text-4xl sm:text-5xl font-mono px-6 py-3 font-extrabold tracking-widest'
  };

  // State colors
  let colorClasses = '';
  let stateLabel = '';
  let stateIcon = null;

  if (isExpired) {
    colorClasses = 'bg-slate-900/90 text-rose-500 border-rose-500/40 opacity-80';
    stateLabel = 'RESCUE WINDOW CLOSED';
    stateIcon = <AlertCircle className={size === 'xl' ? 'w-8 h-8' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'} />;
  } else if (isLowTime) {
    // LOW TIME: Less than 5 mins remain (Visually urgent)
    colorClasses = 'bg-orange-500/20 text-orange-400 border-orange-500/60 shadow-lg shadow-orange-500/20 animate-pulse';
    stateLabel = 'TIME RUNNING OUT!';
    stateIcon = <AlertTriangle className={`${size === 'xl' ? 'w-8 h-8' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'} text-orange-400 animate-bounce`} />;
  } else {
    // ACTIVE: While time remains
    colorClasses = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40';
    stateLabel = 'RESCUE MISSION ACTIVE';
    stateIcon = <Clock className={size === 'xl' ? 'w-8 h-8' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'} />;
  }

  return (
    <div className="inline-flex flex-col items-center">
      {showStateLabel && (
        <span
          className={`text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider mb-1 px-2 py-0.5 rounded-full border ${
            isExpired
              ? 'bg-rose-950/60 text-rose-400 border-rose-500/40'
              : isLowTime
              ? 'bg-orange-950/80 text-orange-300 border-orange-500/60 animate-pulse'
              : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
          }`}
        >
          {isExpired ? '🚨 ' : isLowTime ? '🟠 ' : '🟢 '}
          {stateLabel}
        </span>
      )}

      <div
        className={`inline-flex items-center gap-2 rounded-xl border backdrop-blur-sm ${sizeClasses[size]} ${colorClasses}`}
      >
        {showIcon && stateIcon}
        <span>{formattedTime}</span>
        {size === 'xl' && !isExpired && (
          <span className="text-xs uppercase tracking-normal text-slate-400 block -mt-1 font-sans">
            RESCUE WINDOW
          </span>
        )}
        {size === 'xl' && isExpired && (
          <span className="text-xs uppercase tracking-normal text-rose-400 block -mt-1 font-sans">
            EXPIRED
          </span>
        )}
      </div>
    </div>
  );
};
