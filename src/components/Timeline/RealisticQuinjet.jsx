import React from 'react';

/**
 * SVG Quinjet matching the reference image:
 * A small sleek swept-delta-wing stealth jet flying right,
 * with visible twin nacelle engines underneath and white/silver coloring.
 */
export default function RealisticQuinjet({ className = '' }) {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      {/* Engine afterburner glow behind */}
      <div className="absolute top-1/2 -left-4 -translate-y-1/2 flex flex-col gap-1 opacity-80 pointer-events-none">
        <div className="w-6 h-1 bg-gradient-to-l from-sky-200 via-sky-400 to-transparent rounded-full blur-[1px]" />
        <div className="w-6 h-1 bg-gradient-to-l from-sky-200 via-sky-400 to-transparent rounded-full blur-[1px]" />
      </div>

      <svg
        viewBox="0 0 180 80"
        className="w-full h-auto overflow-visible"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.9)) drop-shadow(0 0 8px rgba(180,220,255,0.4))' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="qjBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#94a3b8" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="qjWingTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="qjWingBot" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="qjCockpit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
          </linearGradient>
          <filter id="qjEngGlow">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Main swept delta wing (upper surface) ── */}
        <path
          d="M 50 38 L 5 12 L 40 40 L 5 68 L 50 42 Z"
          fill="url(#qjWingTop)"
          stroke="#64748b"
          strokeWidth="0.8"
        />
        {/* Wing underside shadow */}
        <path
          d="M 50 40 L 5 68 L 40 44 Z"
          fill="url(#qjWingBot)"
        />

        {/* ── Wing leading-edge detail lines ── */}
        <line x1="50" y1="39" x2="18" y2="22" stroke="#94a3b8" strokeWidth="0.7" opacity="0.7" />
        <line x1="50" y1="41" x2="18" y2="58" stroke="#334155" strokeWidth="0.7" opacity="0.7" />

        {/* ── Fuselage center body ── */}
        <path
          d="M 30 34 L 50 32 L 140 35 L 175 40 L 140 45 L 50 48 L 30 46 Z"
          fill="url(#qjBody)"
          stroke="#94a3b8"
          strokeWidth="0.8"
        />

        {/* ── Fuselage dorsal spine highlight ── */}
        <path
          d="M 52 35 L 138 37 L 165 40 L 138 43 L 52 45 Z"
          fill="#e2e8f0"
          opacity="0.35"
        />

        {/* ── Twin sub-wing engine nacelles ── */}
        {/* Upper nacelle */}
        <rect x="22" y="31" width="18" height="5" rx="2.5" fill="#64748b" stroke="#94a3b8" strokeWidth="0.6" />
        {/* Lower nacelle */}
        <rect x="22" y="44" width="18" height="5" rx="2.5" fill="#475569" stroke="#64748b" strokeWidth="0.6" />

        {/* Engine nozzle openings (left faces) */}
        <ellipse cx="23" cy="33.5" rx="2" ry="2.5" fill="#38bdf8" filter="url(#qjEngGlow)" opacity="0.9" />
        <ellipse cx="23" cy="46.5" rx="2" ry="2.5" fill="#38bdf8" filter="url(#qjEngGlow)" opacity="0.9" />

        {/* ── Cockpit canopy ── */}
        <path
          d="M 136 36 L 170 40 L 136 44 L 124 40 Z"
          fill="url(#qjCockpit)"
          stroke="#7dd3fc"
          strokeWidth="0.8"
        />
        {/* Canopy glint */}
        <line x1="130" y1="38" x2="156" y2="39.5" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />

        {/* ── Tail vertical fin ── */}
        <path d="M 48 32 L 60 16 L 75 33 Z" fill="#64748b" stroke="#475569" strokeWidth="0.6" />
        <path d="M 48 48 L 60 65 L 75 47 Z" fill="#475569" stroke="#334155" strokeWidth="0.6" />
      </svg>
    </div>
  );
}
