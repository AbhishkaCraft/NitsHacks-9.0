import React, { useEffect } from 'react';

/**
 * ComicDayModal
 * Shared comic popup for Day 1, Day 2 and Day 3.
 *
 * config:
 *  - frameImg, alt
 *  - width, height    -> real pixel size of the PNG
 *  - cropHeight       -> optional: show only the top N px of the PNG
 *  - title / body     -> text drawn on top of the artwork
 *  - prev / next      -> { left, top, width, height, rotate, disabled, label }
 *  - visibleButtons   -> optional: draw real PREVIOUS / NEXT buttons
 *  - hideText         -> optional: skip the SVG text (use if the PNG already has the words)
 */
export default function ComicDayModal({ isOpen, onClose, onNext, onPrev, config }) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !config) return null;

  const {
    frameImg,
    alt = 'Comic frame',
    width = 1000,
    height = 1000,
    cropHeight,
    title,
    body,
    prev,
    next,
    visibleButtons,
    hideText,
  } = config;

  const visibleHeight = cropHeight || height;
  const ratio = width / visibleHeight;

  const renderHotspot = (btn, handler, name) => {
    if (!btn) return null;

    const style = {
      left: btn.left,
      top: btn.top,
      width: btn.width,
      height: btn.height,
      transform: `rotate(${btn.rotate ?? 0}deg)`,
    };

    if (btn.disabled) {
      return (
        <button
          type="button"
          disabled
          className="absolute z-20 cursor-not-allowed focus:outline-none"
          style={style}
          title={btn.label}
          aria-label={`${name} day (Disabled)`}
          aria-disabled="true"
        >
          <span className="sr-only">{name} (Disabled)</span>
          <span className="absolute inset-0 rounded-sm bg-black/30 pointer-events-none" />
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => {
          if (handler) handler();
        }}
        className="absolute z-20 cursor-pointer focus:outline-none"
        style={style}
        title={btn.label}
        aria-label={`${name} day`}
      >
        <span className="sr-only">{name}</span>
      </button>
    );
  };

  const renderVisibleButton = (btn, handler, text, isNext = false) => {
    if (!btn) return null;

    const tiltClass = isNext ? 'rotate-[2.5deg]' : '-rotate-[2deg]';

    return (
      <button
        type="button"
        disabled={btn.disabled}
        onClick={() => {
          if (handler) handler();
        }}
        title={btn.label}
        aria-label={btn.label}
        className={`relative group inline-block focus:outline-none transition-transform duration-150 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer ${tiltClass}`}
      >
        {/* Outer offset white background frame */}
        <span
          className="absolute inset-0 bg-white border-2 border-black translate-x-1 translate-y-1 rounded-[2px]"
          aria-hidden="true"
        />

        {/* Inner red comic panel with halftone dot pattern */}
        <span
          className="relative block px-5 sm:px-8 py-2 sm:py-2.5 bg-[#e51b24] border-2 border-black rounded-[2px] transition-transform duration-100 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0"
          style={{
            backgroundImage: 'radial-gradient(#111111 18%, transparent 19%)',
            backgroundSize: '6px 6px',
            backgroundPosition: '0 0',
          }}
        >
          {/* Outlined Comic Font Text */}
          <span
            className="block select-none text-white font-black italic tracking-wider uppercase text-2xl sm:text-3xl leading-none"
            style={{
              fontFamily: "'Bangers', 'Impact', sans-serif",
              letterSpacing: '1.5px',
              WebkitTextStroke: '1.5px black',
              textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
            }}
          >
            {text}
          </span>
        </span>
      </button>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title?.text || 'Comic Day Modal'}
      className="fixed inset-0 z-50 flex items-end justify-center p-0 m-0 overflow-hidden pointer-events-none"
    >
      {/* Frosted blurred backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-md bg-black/40 transition-all duration-300 animate-in fade-in pointer-events-auto cursor-pointer"
        onClick={onClose}
      />

      {/* Main modal container */}
      <div
        className="relative z-10 animate-comic-pop select-none flex items-end justify-center pointer-events-auto mb-0 pb-0"
        style={{
          width: `min(100%, 1024px, calc(92vh * ${ratio}))`,
          aspectRatio: `${width} / ${visibleHeight}`,
        }}
      >
        {/* Artwork layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={frameImg}
            alt={alt}
            draggable={false}
            decoding="sync"
            loading="eager"
            className="absolute top-0 left-0 w-full h-auto max-w-none pointer-events-none"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />
        </div>

        {/* Text overlay layer */}
        {!hideText && (
          <svg
            viewBox={`0 0 ${width} ${visibleHeight}`}
            className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible"
            textRendering="geometricPrecision"
          >
            {title && (
              <text
                x={title.x}
                y={title.y}
                textAnchor="start"
                fill="#050505"
                fontSize={title.size}
                fontFamily="'Bangers', 'Impact', sans-serif"
                fontStyle="italic"
                letterSpacing="1"
              >
                {title.text}
              </text>
            )}

            {body && (
              <text
                x={body.x}
                y={body.y}
                textAnchor="start"
                fill="#050505"
                fontSize={body.size}
                fontFamily="'Comic Neue', 'Comic Sans MS', sans-serif"
                fontWeight="700"
              >
                {body.lines?.map((line, i) => (
                  <tspan key={i} x={body.x} dy={i === 0 ? 0 : body.lineHeight}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}
          </svg>
        )}

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 right-1 sm:-top-5 sm:right-3 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-red-600 hover:bg-red-500 active:scale-90 text-white font-black text-xl sm:text-2xl border-2 border-white flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.8)] transition-all duration-200 hover:rotate-90 hover:scale-110 cursor-pointer"
          title="Close (Esc)"
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* PREVIOUS / NEXT buttons */}
        {visibleButtons ? (
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-10 pointer-events-auto">
            {renderVisibleButton(prev, onPrev, 'PREVIOUS', false)}
            {renderVisibleButton(next, onNext, 'NEXT', true)}
          </div>
        ) : (
          <>
            {renderHotspot(prev, onPrev, 'Previous')}
            {renderHotspot(next, onNext, 'Next')}
          </>
        )}
      </div>
    </div>
  );
}