import React from 'react';

export const EcgLine = ({ className = 'h-8 text-red-500', color = '#ef4444' }) => {
  return (
    <div className={`relative overflow-hidden w-full ${className}`}>
      <svg
        className="w-full h-full stroke-current"
        viewBox="0 0 400 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 20 L50 20 L60 12 L70 28 L80 20 L110 20 L120 4 L130 36 L140 10 L150 24 L160 20 L210 20 L220 14 L230 26 L240 20 L270 20 L280 2 L290 38 L300 12 L310 24 L320 20 L400 20"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Glow sweep effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse" />
    </div>
  );
};
