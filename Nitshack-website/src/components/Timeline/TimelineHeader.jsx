import React from 'react';
import { Shield, Flame, Skull, Crown } from 'lucide-react';

export default function TimelineHeader({ stages, onSelectStage }) {
  return (
    <div className="relative text-center pt-8 pb-4 px-4 z-10">
      
      {/* Top Pre-badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-amber-400 mb-3 shadow-sm backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        <span className="uppercase tracking-widest font-tech">NITSHACKS 9.0 MISSION CONTROL</span>
      </div>

      {/* Main Stylized TIMELINE Title (Exact Marvel / Comic heavy italic typography) */}
      <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading uppercase italic tracking-wider text-white drop-shadow-[0_4px_16px_rgba(255,255,255,0.25)] select-none">
        TIMELINE
      </h1>

      {/* Subtitle / Mission Tag */}
      <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-normal tracking-wide mt-2">
        From Vanguard Assembly to Doomsday Judgment. Follow the orbital trajectory of India’s premier collegiate hackathon.
      </p>

      {/* Quick Access Character Badges */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mt-6">
        {stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => onSelectStage(stage)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 hover:border-slate-600 transition-all duration-200 hover:scale-105 active:scale-95 text-xs font-tech text-slate-300 hover:text-white"
            style={{
              boxShadow: `0 0 10px ${stage.accentColor}22`,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: stage.accentColor }}
            />
            <span className="uppercase tracking-wider">{stage.character}</span>
            {stage.status === 'ACTIVE' && (
              <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.2 rounded font-mono font-bold animate-pulse">
                LIVE
              </span>
            )}
          </button>
        ))}
      </div>

    </div>
  );
}
