import React from 'react';

/**
 * SVG Helicarrier matching the reference image exactly:
 * - Flat rectangular main deck with panel detail
 * - 4 large circular rotor pods on diagonal struts (top-left, top-right, bottom-left, bottom-right)
 * - Visible rotating fan blades inside each pod
 * - Central blue tinted shield insignia / reactor on deck
 * - Underside engines / hull detail
 * Viewed from a slightly above-front-left angle, flying right.
 */
export default function RealisticHelicarrier({ className = '' }) {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      {/* Thruster ambient glow behind ship */}
      <div className="absolute top-2/3 left-1/4 w-24 h-8 bg-sky-400/20 blur-2xl rounded-full pointer-events-none" />

      <svg
        viewBox="0 0 300 220"
        className="w-full h-auto overflow-visible"
        style={{
          filter:
            'drop-shadow(0 8px 20px rgba(0,0,0,0.95)) drop-shadow(0 0 16px rgba(56,189,248,0.3))',
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main hull metallic gradient */}
          <linearGradient id="hcHull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>

          {/* Deck top surface */}
          <linearGradient id="hcDeck" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b0bec5" />
            <stop offset="60%" stopColor="#78909c" />
            <stop offset="100%" stopColor="#546e7a" />
          </linearGradient>

          {/* Underside / shadow */}
          <linearGradient id="hcUnder" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Rotor pod ring */}
          <linearGradient id="hcPod" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#90a4ae" />
            <stop offset="100%" stopColor="#546e7a" />
          </linearGradient>

          {/* Fan blade gradient */}
          <linearGradient id="hcFan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cfd8dc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#78909c" stopOpacity="0.7" />
          </linearGradient>

          {/* Blue thruster glow */}
          <radialGradient id="hcGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
          </radialGradient>

          <filter id="hcEngGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="hcSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <clipPath id="podClip1"><circle cx="57" cy="52" r="24"/></clipPath>
          <clipPath id="podClip2"><circle cx="243" cy="52" r="24"/></clipPath>
          <clipPath id="podClip3"><circle cx="57" cy="168" r="24"/></clipPath>
          <clipPath id="podClip4"><circle cx="243" cy="168" r="24"/></clipPath>
        </defs>

        {/* ══ DIAGONAL STRUTS connecting hull to rotor pods ══ */}
        {/* Top-left strut */}
        <line x1="100" y1="92" x2="64" y2="62" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
        {/* Top-right strut */}
        <line x1="200" y1="92" x2="236" y2="62" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
        {/* Bottom-left strut */}
        <line x1="100" y1="138" x2="64" y2="158" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        {/* Bottom-right strut */}
        <line x1="200" y1="138" x2="236" y2="158" stroke="#475569" strokeWidth="5" strokeLinecap="round" />

        {/* ══ ROTOR POD HELPER: reusable via group + translate ══ */}
        {/* --- TOP LEFT ROTOR POD --- */}
        <g>
          {/* Outer ring housing */}
          <circle cx="57" cy="52" r="26" fill="url(#hcPod)" stroke="#90a4ae" strokeWidth="2.5" />
          {/* Inner dark pod center */}
          <circle cx="57" cy="52" r="20" fill="#1e2d3d" stroke="#546e7a" strokeWidth="1.5" />
          {/* Fan blades — 4 blades angled */}
          <g clipPath="url(#podClip1)">
            <path d="M57 52 L48 32 Q57 38 66 32 Z" fill="url(#hcFan)" opacity="0.85"/>
            <path d="M57 52 L77 43 Q71 52 77 61 Z" fill="url(#hcFan)" opacity="0.75"/>
            <path d="M57 52 L66 72 Q57 66 48 72 Z" fill="url(#hcFan)" opacity="0.85"/>
            <path d="M57 52 L37 61 Q43 52 37 43 Z" fill="url(#hcFan)" opacity="0.75"/>
          </g>
          {/* Hub center bolt */}
          <circle cx="57" cy="52" r="5" fill="#94a3b8" stroke="#b0bec5" strokeWidth="1.5" />
          <circle cx="57" cy="52" r="2" fill="#e2e8f0" />
          {/* Cyan rotation glow ring */}
          <circle cx="57" cy="52" r="19" stroke="#38bdf8" strokeWidth="1" opacity="0.5" filter="url(#hcSoftGlow)" />
        </g>

        {/* --- TOP RIGHT ROTOR POD --- */}
        <g>
          <circle cx="243" cy="52" r="26" fill="url(#hcPod)" stroke="#90a4ae" strokeWidth="2.5" />
          <circle cx="243" cy="52" r="20" fill="#1e2d3d" stroke="#546e7a" strokeWidth="1.5" />
          <g clipPath="url(#podClip2)">
            <path d="M243 52 L234 32 Q243 38 252 32 Z" fill="url(#hcFan)" opacity="0.85"/>
            <path d="M243 52 L263 43 Q257 52 263 61 Z" fill="url(#hcFan)" opacity="0.75"/>
            <path d="M243 52 L252 72 Q243 66 234 72 Z" fill="url(#hcFan)" opacity="0.85"/>
            <path d="M243 52 L223 61 Q229 52 223 43 Z" fill="url(#hcFan)" opacity="0.75"/>
          </g>
          <circle cx="243" cy="52" r="5" fill="#94a3b8" stroke="#b0bec5" strokeWidth="1.5" />
          <circle cx="243" cy="52" r="2" fill="#e2e8f0" />
          <circle cx="243" cy="52" r="19" stroke="#38bdf8" strokeWidth="1" opacity="0.5" filter="url(#hcSoftGlow)" />
        </g>

        {/* ══ MAIN DECK (central flat body) ══ */}
        {/* Top face of deck — trapezoid isometric look */}
        <path
          d="M 90 88 L 210 88 L 218 100 L 82 100 Z"
          fill="url(#hcDeck)"
          stroke="#90a4ae"
          strokeWidth="1.2"
        />
        {/* Front face */}
        <path
          d="M 90 88 L 82 100 L 82 145 L 90 133 Z"
          fill="#546e7a"
          stroke="#607d8b"
          strokeWidth="1"
        />
        {/* Deck main face (front-facing) */}
        <path
          d="M 90 88 L 210 88 L 210 133 L 90 133 Z"
          fill="url(#hcHull)"
          stroke="#78909c"
          strokeWidth="1.2"
        />
        {/* Underside */}
        <path
          d="M 82 100 L 218 100 L 218 145 L 82 145 Z"
          fill="url(#hcUnder)"
          stroke="#37474f"
          strokeWidth="1"
        />
        {/* Right face */}
        <path
          d="M 210 88 L 218 100 L 218 145 L 210 133 Z"
          fill="#546e7a"
          stroke="#607d8b"
          strokeWidth="1"
        />

        {/* Panel lines on deck */}
        <line x1="90" y1="100" x2="210" y2="100" stroke="#b0bec5" strokeWidth="0.6" opacity="0.5"/>
        <line x1="90" y1="112" x2="210" y2="112" stroke="#78909c" strokeWidth="0.5" opacity="0.4"/>
        <line x1="90" y1="121" x2="210" y2="121" stroke="#78909c" strokeWidth="0.5" opacity="0.4"/>
        <line x1="120" y1="88" x2="120" y2="133" stroke="#78909c" strokeWidth="0.5" opacity="0.4"/>
        <line x1="150" y1="88" x2="150" y2="133" stroke="#78909c" strokeWidth="0.5" opacity="0.5"/>
        <line x1="180" y1="88" x2="180" y2="133" stroke="#78909c" strokeWidth="0.5" opacity="0.4"/>

        {/* Central blue shield reactor / insignia */}
        <ellipse cx="150" cy="110" rx="20" ry="12" fill="#0284c7" opacity="0.35" filter="url(#hcSoftGlow)" />
        <ellipse cx="150" cy="110" rx="10" ry="6" fill="#38bdf8" opacity="0.5" filter="url(#hcEngGlow)" />
        <ellipse cx="150" cy="110" rx="4" ry="2.5" fill="#bae6fd" />

        {/* Superstructure / command tower on deck */}
        <rect x="148" y="78" width="22" height="15" rx="2" fill="#546e7a" stroke="#78909c" strokeWidth="1" />
        <rect x="151" y="73" width="16" height="9" rx="1.5" fill="#607d8b" stroke="#90a4ae" strokeWidth="0.8" />
        <rect x="154" y="70" width="10" height="6" rx="1" fill="#78909c" stroke="#b0bec5" strokeWidth="0.5" />
        {/* Radar mast */}
        <line x1="159" y1="70" x2="159" y2="62" stroke="#b0bec5" strokeWidth="1" />
        <ellipse cx="159" cy="61" rx="5" ry="2" fill="#90a4ae" stroke="#b0bec5" strokeWidth="0.6" />

        {/* ══ UNDERSIDE ENGINE PODS ══ */}
        {/* Engine nacelle left */}
        <rect x="98" y="144" width="38" height="12" rx="6" fill="#263238" stroke="#546e7a" strokeWidth="1.2" />
        {/* Engine nacelle right */}
        <rect x="164" y="144" width="38" height="12" rx="6" fill="#263238" stroke="#546e7a" strokeWidth="1.2" />
        {/* Engine glow left */}
        <ellipse cx="100" cy="150" rx="4" ry="6" fill="url(#hcGlow)" filter="url(#hcEngGlow)" opacity="0.8" />
        {/* Engine glow right */}
        <ellipse cx="166" cy="150" rx="4" ry="6" fill="url(#hcGlow)" filter="url(#hcEngGlow)" opacity="0.8" />

        {/* ══ BOTTOM ROTOR PODS ══ */}
        {/* --- BOTTOM LEFT ROTOR POD --- */}
        <g>
          <circle cx="57" cy="168" r="26" fill="url(#hcPod)" stroke="#90a4ae" strokeWidth="2.5" />
          <circle cx="57" cy="168" r="20" fill="#1e2d3d" stroke="#546e7a" strokeWidth="1.5" />
          <g clipPath="url(#podClip3)">
            <path d="M57 168 L48 148 Q57 154 66 148 Z" fill="url(#hcFan)" opacity="0.85"/>
            <path d="M57 168 L77 159 Q71 168 77 177 Z" fill="url(#hcFan)" opacity="0.75"/>
            <path d="M57 168 L66 188 Q57 182 48 188 Z" fill="url(#hcFan)" opacity="0.85"/>
            <path d="M57 168 L37 177 Q43 168 37 159 Z" fill="url(#hcFan)" opacity="0.75"/>
          </g>
          <circle cx="57" cy="168" r="5" fill="#94a3b8" stroke="#b0bec5" strokeWidth="1.5" />
          <circle cx="57" cy="168" r="2" fill="#e2e8f0" />
          <circle cx="57" cy="168" r="19" stroke="#38bdf8" strokeWidth="1" opacity="0.5" filter="url(#hcSoftGlow)" />
        </g>

        {/* --- BOTTOM RIGHT ROTOR POD --- */}
        <g>
          <circle cx="243" cy="168" r="26" fill="url(#hcPod)" stroke="#90a4ae" strokeWidth="2.5" />
          <circle cx="243" cy="168" r="20" fill="#1e2d3d" stroke="#546e7a" strokeWidth="1.5" />
          <g clipPath="url(#podClip4)">
            <path d="M243 168 L234 148 Q243 154 252 148 Z" fill="url(#hcFan)" opacity="0.85"/>
            <path d="M243 168 L263 159 Q257 168 263 177 Z" fill="url(#hcFan)" opacity="0.75"/>
            <path d="M243 168 L252 188 Q243 182 234 188 Z" fill="url(#hcFan)" opacity="0.85"/>
            <path d="M243 168 L223 177 Q229 168 223 159 Z" fill="url(#hcFan)" opacity="0.75"/>
          </g>
          <circle cx="243" cy="168" r="5" fill="#94a3b8" stroke="#b0bec5" strokeWidth="1.5" />
          <circle cx="243" cy="168" r="2" fill="#e2e8f0" />
          <circle cx="243" cy="168" r="19" stroke="#38bdf8" strokeWidth="1" opacity="0.5" filter="url(#hcSoftGlow)" />
        </g>

      </svg>
    </div>
  );
}
