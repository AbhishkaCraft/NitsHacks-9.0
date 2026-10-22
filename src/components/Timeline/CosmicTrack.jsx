import React, { useState } from 'react';
import TimelineNode from './TimelineNode';
import helicarrierImg from '../../assets/helicarrier.png';
import quinjetImg from '../../assets/quinjet.png';
import { Sparkles, Info } from 'lucide-react';

export default function CosmicTrack({ stages, onSelectStage }) {
  const [hoveredVehicle, setHoveredVehicle] = useState(null);

  // Map stages by ID for easy lookup
  const stageMap = {};
  stages.forEach((s) => {
    stageMap[s.id] = s;
  });

  return (
    <div className="relative w-full max-w-[1240px] mx-auto px-2 sm:px-4 py-8 select-none">
      {/* Container maintaining proportional aspect ratio */}
      <div className="relative w-full aspect-[1100/580] min-h-[460px] max-h-[700px] flex items-center justify-center">
        
        {/* SVG Yellow Energy Pipeline Track */}
        <svg
          viewBox="0 0 1100 580"
          className="w-full h-full absolute inset-0 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glowing filter */}
            <filter id="trackGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur1" />
              <feGaussianBlur stdDeviation="16" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient for electric energy pulse */}
            <linearGradient id="electricGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>

          {/* Master Track Path Definition:
              Starts at (130, 160)
              Right to (910, 160)
              Clockwise 180° arc to (910, 320) [radius 80]
              Left to (170, 320)
              Counter-clockwise 180° arc to (170, 480) [radius 80]
              Right to (930, 480)
          */}

          {/* 1. Broad Neon Ambient Glow */}
          <path
            d="M 130 160 L 910 160 A 80 80 0 0 1 910 320 L 170 320 A 80 80 0 0 0 170 480 L 930 480"
            stroke="#eab308"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            filter="url(#trackGlow)"
          />

          {/* 2. Outer Solid Yellow Highway Border */}
          <path
            d="M 130 160 L 910 160 A 80 80 0 0 1 910 320 L 170 320 A 80 80 0 0 0 170 480 L 930 480"
            stroke="#facc15"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3. Inner Dark Channel (Creating the double-rail look matching reference) */}
          <path
            d="M 130 160 L 910 160 A 80 80 0 0 1 910 320 L 170 320 A 80 80 0 0 0 170 480 L 930 480"
            stroke="#030712"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 4. Animated Electric Energy Current Runner */}
          <path
            d="M 130 160 L 910 160 A 80 80 0 0 1 910 320 L 170 320 A 80 80 0 0 0 170 480 L 930 480"
            stroke="url(#electricGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-dash"
            opacity="0.9"
          />
        </svg>

        {/* ----------------- S.H.I.E.L.D. HELICARRIER (Top Left) ----------------- */}
        <div
          className="absolute z-20 cursor-pointer transition-transform duration-300 animate-float-slow hover:scale-105"
          style={{
            left: '3.5%',
            top: '13%',
            width: '18%',
          }}
          onClick={() => stageMap['helicarrier'] && onSelectStage(stageMap['helicarrier'])}
          onMouseEnter={() => setHoveredVehicle('helicarrier')}
          onMouseLeave={() => setHoveredVehicle(null)}
        >
          {/* Blue thruster flare effect */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-16 h-8 bg-sky-400/30 blur-xl pointer-events-none rounded-full" />
          
          <img
            src={helicarrierImg}
            alt="S.H.I.E.L.D. Helicarrier"
            className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] filter drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
          />

          {/* Hover Vehicle Tag */}
          <div
            className={`absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-sky-500/50 text-[10px] font-tech text-sky-300 px-2.5 py-0.5 rounded shadow-lg backdrop-blur whitespace-nowrap transition-opacity duration-200 ${
              hoveredVehicle === 'helicarrier' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            S.H.I.E.L.D. Helicarrier // Assemble
          </div>
        </div>

        {/* ----------------- QUINJET (Top Track towards Ultron) ----------------- */}
        <div
          className="absolute z-20 cursor-pointer transition-transform duration-200 animate-float-fast hover:scale-115"
          style={{
            left: '56%',
            top: '23%',
            width: '8%',
          }}
          onClick={() => stageMap['helicarrier'] && onSelectStage(stageMap['helicarrier'])}
          onMouseEnter={() => setHoveredVehicle('quinjet')}
          onMouseLeave={() => setHoveredVehicle(null)}
        >
          {/* Blue engine flame trail */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-3 bg-sky-400 blur-sm rounded-full pointer-events-none" />

          <img
            src={quinjetImg}
            alt="Quinjet Escort"
            className="w-full h-auto drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] filter drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]"
          />

          <div
            className={`absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-sky-500/50 text-[9px] font-tech text-sky-300 px-2 py-0.5 rounded shadow-lg backdrop-blur whitespace-nowrap transition-opacity duration-200 ${
              hoveredVehicle === 'quinjet' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Quinjet Recon Escort
          </div>
        </div>

        {/* ----------------- ULTRON BADGE (Top Right Node) ----------------- */}
        {stageMap['ultron'] && (
          <div
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: '73.5%',
              top: '27.5%',
            }}
          >
            <TimelineNode
              stage={stageMap['ultron']}
              onSelect={onSelectStage}
            />
          </div>
        )}

        {/* ----------------- THANOS BADGE (Middle Left Node) ----------------- */}
        {stageMap['thanos'] && (
          <div
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: '26.5%',
              top: '55%',
            }}
          >
            <TimelineNode
              stage={stageMap['thanos']}
              onSelect={onSelectStage}
            />
          </div>
        )}

        {/* ----------------- DOCTOR DOOM BADGE (Bottom Right Node) ----------------- */}
        {stageMap['doom'] && (
          <div
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: '86.5%',
              top: '82.5%',
            }}
          >
            <TimelineNode
              stage={stageMap['doom']}
              onSelect={onSelectStage}
            />
          </div>
        )}

      </div>

      {/* Interactive Helper Hint */}
      <div className="flex items-center justify-center gap-2 text-xs font-tech uppercase text-slate-400 tracking-wider mt-4">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Click any Boss Node or Helicarrier to reveal Classified Mission Intel</span>
      </div>
    </div>
  );
}
