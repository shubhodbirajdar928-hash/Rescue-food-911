import React from 'react';
import { STATUS_LEVELS } from '../../data/mockEmergencies';
import { Siren, HeartPulse } from 'lucide-react';

export const StatusBadge = ({ condition = 'STABLE', size = 'md', showVibe = false }) => {
  const status = STATUS_LEVELS[condition] || STATUS_LEVELS.STABLE;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs sm:text-sm px-2.5 py-1',
    lg: 'text-sm sm:text-base px-3.5 py-1.5 font-bold'
  };

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wider border ${status.badgeClass} ${sizeClasses[size]}`}
      >
        <span className="text-sm leading-none">{status.indicator}</span>
        {condition === 'CRITICAL' || condition === 'LAST_CALL' ? (
          <Siren className="w-3.5 h-3.5 animate-siren-wiggle" />
        ) : (
          <HeartPulse className="w-3.5 h-3.5" />
        )}
        <span>{status.label}</span>
      </span>

      {showVibe && (
        <span className="text-xs text-slate-300 italic font-mono pl-1">
          "{status.vibe}"
        </span>
      )}
    </div>
  );
};
