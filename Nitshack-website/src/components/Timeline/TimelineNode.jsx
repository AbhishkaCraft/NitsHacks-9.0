import React from 'react';

export default function TimelineNode({ stage, isSelected, onSelect }) {
  const { name, character, accentColor, glowColor, avatar, statusBadge, date, status } = stage;

  return (
    <div className="relative group cursor-pointer" onClick={() => onSelect(stage)}>
      {/* Outer Radar Ping Animation */}
      <div
        className="absolute -inset-3 rounded-full opacity-60 animate-radar pointer-events-none"
        style={{
          border: `2px solid ${accentColor}`,
          boxShadow: `0 0 20px ${accentColor}`,
        }}
      />

      {/* Second Subtle Pulse Aura */}
      <div
        className="absolute -inset-1 rounded-full animate-pulse-glow opacity-80 pointer-events-none"
        style={{
          boxShadow: `0 0 25px ${glowColor}, inset 0 0 15px ${glowColor}`,
        }}
      />

      {/* Main Circular Node Badge matching reference image */}
      <div
        className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white transition-all duration-300 ease-out transform group-hover:scale-110 group-hover:-translate-y-1 ${
          isSelected ? 'ring-4 ring-amber-400 scale-105' : ''
        }`}
        style={{
          boxShadow: `0 0 30px ${glowColor}, 0 0 60px ${glowColor}66`,
        }}
      >
        <img
          src={avatar}
          alt={character}
          className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gloss / sheen reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
      </div>

      {/* Stage Floating Callout / Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-40 sm:w-48 text-center pointer-events-none transition-all duration-300 transform group-hover:translate-y-1">
        <div className="bg-slate-950/90 border border-slate-800 rounded-lg p-2 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span
              className="text-[10px] font-tech uppercase tracking-wider font-bold"
              style={{ color: accentColor }}
            >
              {character}
            </span>
            <span className="text-[9px] px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded font-mono">
              {statusBadge}
            </span>
          </div>

          <div className="text-xs font-heading tracking-wide uppercase text-white truncate">
            {name}
          </div>

          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            {date}
          </div>
        </div>

        <div className="text-[9px] text-amber-400/80 font-mono tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Click for Mission Briefing ↵
        </div>
      </div>
    </div>
  );
}
