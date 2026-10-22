import React, { useEffect } from 'react';
import popupFrameImg from '../../assets/popup_day1_transparent.png';

/**
 * ComicDay1Modal
 * Renders the exact Figma comic frame for Day 1 (Ultron) with:
 * - Comic pop-in entrance animation
 * - Interactive NEXT and PREVIOUS buttons
 * - Keyboard (Esc) & Backdrop click to dismiss
 * - Close button with comic styling
 */
export default function ComicDay1Modal({ isOpen, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 m-0 overflow-hidden pointer-events-none">
      {/* ── 1. FROSTED BLURRED BACKDROP (Blurs background when popup opens) ── */}
      <div
        className="fixed inset-0 backdrop-blur-md bg-black/20 transition-all duration-300 animate-in fade-in pointer-events-auto cursor-pointer"
        onClick={onClose}
      />

      {/* ── 2. COMIC POPUP FRAME (Flush against bottom of the screen with 0 margin) ── */}
      <div
        className="relative z-10 w-full max-w-[1024px] aspect-[932/396] animate-comic-pop select-none flex items-end justify-center pointer-events-auto mb-0 pb-0"
        style={{
          filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.45))',
        }}
      >
        {/* Figma Comic Artwork Layer (Anchored to bottom edge) */}
        <img
          src={popupFrameImg}
          alt="Day 1 - Ultron Timeline"
          className="w-full h-full object-contain object-bottom pointer-events-none"
        />

        {/* ── 3. PERFECTLY CENTERED, NON-DULL CRISP TEXT INSIDE THOUGHTBOX ── */}
        <svg
          viewBox="0 0 932 396"
          className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible"
        >
          {/* DAY 1 Title - Centered, vibrant, bold comic header */}
          <text
            x="622"
            y="44"
            textAnchor="middle"
            fill="#050505"
            fontSize="21"
            fontFamily="'Bangers', 'Impact', sans-serif"
            fontStyle="italic"
            fontWeight="900"
            letterSpacing="1"
          >
            DAY 1
          </text>

          {/* Description Text - Center-aligned, rich high-contrast ink black, crisp & legible */}
          <text
            x="622"
            y="64"
            textAnchor="middle"
            fill="#050505"
            fontSize="10"
            fontFamily="'Comic Neue', 'Comic Sans MS', sans-serif"
            fontWeight="800"
            letterSpacing="0.15"
          >
            <tspan x="622" dy="0">Explore our coding track to</tspan>
            <tspan x="622" dy="12.5">build your programming skills</tspan>
            <tspan x="622" dy="12.5">from the ground up. Whether</tspan>
            <tspan x="622" dy="12.5">you&apos;re a beginner or looking</tspan>
            <tspan x="622" dy="12.5">to sharpen your expertise,</tspan>
            <tspan x="622" dy="12.5">this track offers hands-on</tspan>
            <tspan x="622" dy="12.5">projects and expert guidance</tspan>
            <tspan x="622" dy="12.5">to help you succeed.</tspan>
          </text>
        </svg>

        {/* ── CLOSE BUTTON (Top Right) ── */}
        <button
          onClick={onClose}
          className="absolute -top-3 right-1 sm:-top-5 sm:right-3 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-red-600 hover:bg-red-500 active:scale-90 text-white font-black text-xl sm:text-2xl border-2 sm:border-3 border-white flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.8)] transition-all duration-200 hover:rotate-90 hover:scale-110 cursor-pointer"
          title="Close (Esc)"
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* ── DISABLED PREVIOUS BUTTON (Ultron is Day 1, no previous day) ── */}
        <button
          disabled
          className="absolute z-20 cursor-not-allowed focus:outline-none"
          style={{
            left: '6.55%',
            top: '74.0%',
            width: '13.52%',
            height: '10.1%',
            transform: 'rotate(-1.8deg)',
          }}
          title="No previous day (Day 1)"
          aria-label="Previous day (Disabled)"
          aria-disabled="true"
        >
          <span className="sr-only">Previous (Disabled)</span>
          {/* Subtle dimming overlay indicating disabled state */}
          <span className="absolute inset-0 rounded-sm bg-black/30 pointer-events-none" />
        </button>

        {/* ── INTERACTIVE NEXT BUTTON HOTSPOT (Clean clickable area, no hover effect) ── */}
        <button
          onClick={() => {
            onClose();
            if (onNext) onNext();
          }}
          className="absolute z-20 cursor-pointer focus:outline-none"
          style={{
            left: '77.04%',
            top: '70.96%',
            width: '13.95%',
            height: '14.39%',
            transform: 'rotate(-1.5deg)',
          }}
          title="Next: Fly to Thanos (Day 2)"
          aria-label="Next day"
        >
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}
