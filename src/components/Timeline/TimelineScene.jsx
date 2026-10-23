import React, { useState, useRef, useEffect, useCallback } from 'react';
import ComicDay1Modal from './ComicDay1Modal';
import ComicDay2Modal from './ComicDay2Modal';
import ComicDay3Modal from './ComicDay3Modal';
import helicarrierImg from '../../assets/helicarrier_final.png';
import quinjetImg from '../../assets/quinjet_final_clean.png';
import ultronImg from '../../assets/ultron_perfect.png';
import thanosImg from '../../assets/thanos_perfect.png';
import doomImg from '../../assets/doom_perfect.png';

// Path definition in 1024x575 coordinate frame
const TRACK_PATH_DATA =
  'M 195 178 L 874.5 178 A 39.5 39.5 0 0 1 874.5 257 L 185.75 257 A 44.75 44.75 0 0 0 185.75 346 L 845 346';

// Target distances along the SVG path for each node
const TARGET_DISTANCES = {
  home: 100,    // Initial starting position on top rail (x ~ 295, y ~ 178)
  ultron: 465,  // Just before Ultron badge on top rail (x ~ 660, y ~ 178)
  thanos: 1290, // Just before Thanos badge on middle rail (x ~ 380, y ~ 257)
  doom: 2240,   // Just before Doctor Doom badge on bottom rail (x ~ 800, y ~ 346)
};

// Which comic popup belongs to which character
const DAY_FOR_TARGET = {
  ultron: 1,
  thanos: 2,
  doom: 3,
};

export default function TimelineScene() {
  const pathRef = useRef(null);
  const animFrameRef = useRef(null);
  const currentDistRef = useRef(TARGET_DISTANCES.home);
  // null = no popup, otherwise 1 | 2 | 3
  const [openDay, setOpenDay] = useState(null);

  const [ship, setShip] = useState({
    x: 295,
    y: 178,
    angle: 0,
    flipY: false,
    isMoving: false,
    activeTarget: null,
  });

  // Calculate coordinates, tangent angle and vertical flip at distance s along the path
  const getShipTransform = useCallback((s, isForward = true) => {
    if (!pathRef.current) return null;
    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    const clampedS = Math.max(0, Math.min(totalLength, s));

    const pt = path.getPointAtLength(clampedS);

    // Calculate tangent vector for rotation
    const delta = 2;
    const s1 = Math.max(0, clampedS - delta);
    const s2 = Math.min(totalLength, clampedS + delta);
    const p1 = path.getPointAtLength(s1);
    const p2 = path.getPointAtLength(s2);

    // If moving forward, vector is p1 -> p2; if backward, reverse it so nose always leads
    const dx = isForward ? p2.x - p1.x : p1.x - p2.x;
    const dy = isForward ? p2.y - p1.y : p1.y - p2.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // When the ship faces leftwards (|angle| > 90), flip Y so the cockpit canopy stays upright
    const flipY = Math.abs(angle) > 90;

    return { x: pt.x, y: pt.y, angle, flipY };
  }, []);

  // Initialize ship position once path is mounted
  useEffect(() => {
    if (pathRef.current) {
      const transform = getShipTransform(TARGET_DISTANCES.home, true);
      if (transform) {
        setShip((prev) => ({
          ...prev,
          x: transform.x,
          y: transform.y,
          angle: transform.angle,
          flipY: transform.flipY,
        }));
      }
    }
  }, [getShipTransform]);

  // Clean up any running animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Animate spacecraft smoothly along path to clicked character
  const moveToCharacter = useCallback(
    (targetKey) => {
      if (!pathRef.current) return;
      const targetDist = TARGET_DISTANCES[targetKey];
      if (targetDist === undefined) return;

      const startDist = currentDistRef.current;
      const distanceDiff = targetDist - startDist;

      // Already at this destination
      if (Math.abs(distanceDiff) < 2) {
        if (DAY_FOR_TARGET[targetKey]) {
          setOpenDay(DAY_FOR_TARGET[targetKey]);
        }
        return;
      }

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      const isForward = distanceDiff >= 0;
      // Duration scaled by distance: smooth cinematic pace (0.9s to 2.2s)
      const duration = Math.min(2200, Math.max(900, Math.abs(distanceDiff) * 0.95));
      const startTime = performance.now();

      setShip((prev) => ({
        ...prev,
        isMoving: true,
        activeTarget: targetKey,
      }));

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth easeInOutCubic curve
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const currentS = startDist + distanceDiff * ease;
        currentDistRef.current = currentS;

        if (progress < 1) {
          const transform = getShipTransform(currentS, isForward);
          if (transform) {
            setShip({
              x: transform.x,
              y: transform.y,
              angle: transform.angle,
              flipY: transform.flipY,
              isMoving: true,
              activeTarget: targetKey,
            });
          }
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          // Settled at destination: ALWAYS face forward along natural track direction
          // At origin/home: faces 0deg (pointing away from Helicarrier toward mission path)
          const restTransform = getShipTransform(targetDist, true);
          if (restTransform) {
            setShip({
              x: restTransform.x,
              y: restTransform.y,
              angle: restTransform.angle,
              flipY: restTransform.flipY,
              isMoving: false,
              activeTarget: targetKey === 'home' ? null : targetKey,
            });
          }

          // Open the matching comic popup on arrival (Day 1 Ultron, Day 2 Thanos, Day 3 Doom)
          if (DAY_FOR_TARGET[targetKey]) {
            setOpenDay(DAY_FOR_TARGET[targetKey]);
          }
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    },
    [getShipTransform]
  );

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between px-3 sm:px-6 py-6 md:py-10 select-none overflow-hidden">

      {/* ── 1. TOP HEADING ── */}
      <div className="w-full text-center z-20 pt-2 sm:pt-4">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic tracking-widest text-white uppercase inline-block cursor-default"
          style={{
            fontFamily: "'Bangers', 'Impact', sans-serif",
            letterSpacing: '0.08em',
            textShadow:
              '0 3px 12px rgba(0, 0, 0, 0.9), 0 0 24px rgba(255, 255, 255, 0.25)',
          }}
        >
          TIMELINE
        </h1>
      </div>

      {/* ── 2. TRACK + CHARACTERS (1024x575 coordinate frame matching reference image) ── */}
      <div className="relative w-full max-w-[1100px] aspect-[1024/575] flex items-center justify-center my-auto">

        {/* SVG Yellow Track */}
        <svg
          viewBox="0 0 1024 575"
          className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle warm underglow */}
          <path
            d={TRACK_PATH_DATA}
            stroke="#eab308"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            style={{ filter: 'blur(3px)' }}
          />
          {/* Solid bright yellow track matching reference image */}
          <path
            ref={pathRef}
            d={TRACK_PATH_DATA}
            stroke="#ffd000"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* ── HELICARRIER (Top Left, clickable to send ship back home) ── */}
        <div
          onClick={() => moveToCharacter('home')}
          className="absolute z-20 cursor-pointer animate-float-slow group transition-transform duration-300 hover:scale-105"
          title="Return spacecraft to launch dock"
          style={{
            left: '5.8%',
            top: '17.4%',
            width: '15.6%',
            aspectRatio: '160/145',
          }}
        >
          <img
            src={helicarrierImg}
            alt="Helicarrier"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)] group-hover:brightness-110"
          />
        </div>

        {/* ── ANIMATED QUINJET SPACECRAFT (Locked to yellow rail at rest and in motion) ── */}
        <div
          className="absolute z-[25] pointer-events-none"
          style={{
            left: `${(ship.x / 1024) * 100}%`,
            top: `${(ship.y / 575) * 100}%`,
            width: '8.4%',
            aspectRatio: '100/70',
            transform: `translate(-50%, -68%) rotate(${ship.angle}deg) ${
              ship.flipY ? 'scaleY(-1)' : ''
            }`,
            transformOrigin: '50% 68%',
            transition: ship.isMoving ? 'none' : 'transform 0.4s ease-out',
          }}
        >
          {/* Engine thruster glow when moving */}
          {ship.isMoving && (
            <div
              className="absolute -left-3 top-[68%] -translate-y-1/2 w-6 h-3 bg-sky-400 rounded-full blur-[3px] opacity-80 pointer-events-none"
              style={{
                boxShadow: '0 0 12px 4px rgba(56,189,248,0.9), 0 0 20px rgba(14,165,233,0.6)',
              }}
            />
          )}
          <img
            src={quinjetImg}
            alt="Quinjet Spacecraft"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* ── ULTRON BADGE (Top Right curve) ── */}
        <div
          onClick={() => moveToCharacter('ultron')}
          className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
            ship.activeTarget === 'ultron' ? 'scale-105' : ''
          }`}
          title="Fly to Ultron"
          style={{
            left: '74.37%',
            top: '30.87%',
            width: '10.84%',
            aspectRatio: '1/1',
          }}
        >
          <img
            src={ultronImg}
            alt="Ultron"
            className={`w-full h-full object-contain rounded-full transition-all duration-300 ${
              ship.activeTarget === 'ultron'
                ? 'drop-shadow-[0_0_22px_rgba(239,68,68,0.95)]'
                : 'group-hover:drop-shadow-[0_0_16px_rgba(239,68,68,0.7)]'
            }`}
          />
        </div>

        {/* ── THANOS BADGE (Middle Track, perfectly centered) ── */}
        <div
          onClick={() => moveToCharacter('thanos')}
          className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
            ship.activeTarget === 'thanos' ? 'scale-105' : ''
          }`}
          title="Fly to Thanos"
          style={{
            left: '28.56%',
            top: '44.96%',
            width: '10.84%',
            aspectRatio: '1/1',
          }}
        >
          <img
            src={thanosImg}
            alt="Thanos"
            className={`w-full h-full object-contain rounded-full transition-all duration-300 ${
              ship.activeTarget === 'thanos'
                ? 'drop-shadow-[0_0_22px_rgba(168,85,247,0.95)]'
                : 'group-hover:drop-shadow-[0_0_16px_rgba(168,85,247,0.7)]'
            }`}
          />
        </div>

        {/* ── DOCTOR DOOM BADGE (Bottom Right terminal) ── */}
        <div
          onClick={() => moveToCharacter('doom')}
          className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
            ship.activeTarget === 'doom' ? 'scale-105' : ''
          }`}
          title="Fly to Doctor Doom"
          style={{
            left: '87.74%',
            top: '59.74%',
            width: '10.84%',
            aspectRatio: '1/1',
          }}
        >
          <img
            src={doomImg}
            alt="Doctor Doom"
            className={`w-full h-full object-contain rounded-full transition-all duration-300 ${
              ship.activeTarget === 'doom'
                ? 'drop-shadow-[0_0_22px_rgba(34,197,94,0.95)]'
                : 'group-hover:drop-shadow-[0_0_16px_rgba(34,197,94,0.7)]'
            }`}
          />
        </div>

      </div>

      {/* ── 3. BOTTOM FOOTER TEXT ── */}
      <div className="w-full text-center z-20 pb-2 sm:pb-4">
        <p
          className="text-lg sm:text-xl md:text-2xl font-bold italic tracking-wider text-white uppercase inline-block cursor-default"
          style={{
            fontFamily: "'Bangers', 'Impact', sans-serif",
            letterSpacing: '0.06em',
            textShadow:
              '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 16px rgba(255, 255, 255, 0.2)',
          }}
        >
          CLICK ON THE ICONS TO START
        </p>
      </div>

      {/* ── 4. COMIC POPUP MODALS ── */}
      {/* Day 1 - Ultron */}
      <ComicDay1Modal
        isOpen={openDay === 1}
        onClose={() => setOpenDay(null)}
        onNext={() => moveToCharacter('thanos')}
        onPrev={() => moveToCharacter('home')}
      />

      {/* Day 2 - Thanos */}
      <ComicDay2Modal
        isOpen={openDay === 2}
        onClose={() => setOpenDay(null)}
        onNext={() => moveToCharacter('doom')}
        onPrev={() => moveToCharacter('ultron')}
      />

      {/* Day 3 - Doctor Doom */}
      <ComicDay3Modal
        isOpen={openDay === 3}
        onClose={() => setOpenDay(null)}
        onPrev={() => moveToCharacter('thanos')}
      />

    </div>
  );
}
