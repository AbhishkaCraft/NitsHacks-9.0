// HeroSection.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  IRONMAN_PATH,
  TOWER_PATH,
  FLIGHT_CONFIG,
  SKYLINE,
  BOOT,
} from "./HeroVectors";

const SPEED_LINES_DATA = [
  {
    id: 1,
    x1: 230,
    y1: 108,
    strokeWidth: 1.2,
    dash: "70 6 130 10 380",
    speed: "2.4s",
  },
  {
    id: 2,
    x1: 270,
    y1: 111,
    strokeWidth: 2.0,
    dash: "150 8 280 12 480",
    speed: "1.9s",
  },
  {
    id: 3,
    x1: 240,
    y1: 114,
    strokeWidth: 1.8,
    dash: "100 8 220 8 580",
    speed: "2.2s",
  },
  {
    id: 4,
    x1: 290,
    y1: 117,
    strokeWidth: 2.2,
    dash: "210 6 180 10 490",
    speed: "1.7s",
  },
  {
    id: 5,
    x1: 250,
    y1: 120,
    strokeWidth: 1.5,
    dash: "110 8 240 14 390",
    speed: "2.0s",
  },
  {
    id: 6,
    x1: 280,
    y1: 123,
    strokeWidth: 1.0,
    dash: "90 10 160 8 680",
    speed: "2.6s",
  },
];

// Seeded, so the city is identical on every render. Widths sum to exactly
// `width`, which guarantees a seamless loop when the strip is drawn twice.
function makeCity(seed, width, minW, maxW, minH, maxH) {
  let s = seed;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const out = [];
  let x = 0;
  while (x < width) {
    let w = minW + rnd() * (maxW - minW);
    if (width - (x + w) < minW) w = width - x; // last building fills the gap
    const h = minH + rnd() * (maxH - minH);
    const spire = rnd() > 0.8 ? 10 + rnd() * 22 : 0;
    out.push({ x, w, h, spire });
    x += w;
  }
  return out;
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const [flightState, setFlightState] = useState({ x: 0, y: 0, rot: 0 });
  const animFrameId = useRef(null);

  const farCity = useMemo(
    () => makeCity(7, SKYLINE.width, 30, 70, 60, 150),
    [],
  );
  const nearCity = useMemo(
    () => makeCity(21, SKYLINE.width, 24, 56, 40, 120),
    [],
  );

  const mobileFarCity = useMemo(() => makeCity(7, 430, 20, 50, 70, 160), []);
  const mobileNearCity = useMemo(() => makeCity(21, 430, 16, 42, 50, 130), []);

  useEffect(() => {
    const startTime = performance.now();
    const { bobAmplitude, bobSpeed, baseOffsetY } = FLIGHT_CONFIG;

    const updateFlight = (now) => {
      const t = (now - startTime) * 0.001;
      // Pure vertical hover: no x movement, no rotation
      setFlightState({
        x: 0,
        y: baseOffsetY + Math.sin(t * bobSpeed) * bobAmplitude,
        rot: 0,
      });
      animFrameId.current = requestAnimationFrame(updateFlight);
    };

    animFrameId.current = requestAnimationFrame(updateFlight);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const renderStrip = (city, fill) =>
    [0, 1].map((k) => (
      <g key={k} transform={`translate(${k * SKYLINE.width} 0)`}>
        {city.map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={SKYLINE.bottom - b.h}
              width={b.w + 0.6}
              height={b.h + 1}
              fill={fill}
            />
            {b.spire > 0 && (
              <rect
                x={b.x + b.w / 2 - 1}
                y={SKYLINE.bottom - b.h - b.spire}
                width="2"
                height={b.spire}
                fill={fill}
              />
            )}
          </g>
        ))}
      </g>
    ));

  const renderMobileStrip = (city, fill) =>
    [0, 1].map((k) => (
      <g key={k} transform={`translate(${k * 430} 0)`}>
        {city.map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={930 - b.h}
              width={b.w + 0.6}
              height={b.h + 1}
              fill={fill}
            />
            {b.spire > 0 && (
              <rect
                x={b.x + b.w / 2 - 1}
                y={930 - b.h - b.spire}
                width="2"
                height={b.spire}
                fill={fill}
              />
            )}
          </g>
        ))}
      </g>
    ));

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[520px] overflow-hidden bg-[#1a0002] flex flex-col justify-between select-none"
      style={{
        backgroundImage: "url('/hero/hero_gradient_bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style>{`
        @keyframes thrusterPropulsion {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -600; }
        }
        .stream-thrust {
          animation: thrusterPropulsion 2.2s linear infinite;
        }
        @keyframes thrusterPulse {
          0%, 100% { opacity: 0.95; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.85, 1.15); }
        }
        .animate-flame {
          animation: thrusterPulse 0.18s ease-in-out infinite alternate;
          transform-origin: 236px 116px;
        }
        /* Skyline strips are exactly one viewBox wide and drawn twice,
           so scrolling by one width loops with no seam. */
        @keyframes skylineScroll {
          from { transform: translateX(0px); }
          to { transform: translateX(-${SKYLINE.width}px); }
        }
        .skyline-far {
          animation: skylineScroll ${SKYLINE.seconds * SKYLINE.farFactor}s linear infinite;
          will-change: transform;
        }
        .skyline-near {
          animation: skylineScroll ${SKYLINE.seconds}s linear infinite;
          will-change: transform;
        }

        /* Mobile skyline scrolling */
        @keyframes mobileSkylineScroll {
          from { transform: translateX(0px); }
          to { transform: translateX(-430px); }
        }
        .mobile-skyline-far {
          animation: mobileSkylineScroll ${SKYLINE.seconds * SKYLINE.farFactor}s linear infinite;
          will-change: transform;
        }
        .mobile-skyline-near {
          animation: mobileSkylineScroll ${SKYLINE.seconds}s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .skyline-far, .skyline-near, .mobile-skyline-far, .mobile-skyline-near, .stream-thrust, .animate-flame { animation: none; }
        }

        /* Default (desktop): hide mobile art, show desktop art */
        .hero-mobile-art { display: none; }
        .hero-desktop-art { display: block; }

        @media (max-width: 768px) {
          /* Full-screen portrait composition on mobile */
          .hero-nav-header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding-top: max(10px, env(safe-area-inset-top));
            z-index: 40;
          }
          .hero-art-wrap {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            max-width: none;
            margin: 0;
            display: block;
          }
          .hero-art-wrap > div {
            width: 100%;
            height: 100%;
            max-height: none;
            max-width: none;
            aspect-ratio: auto;
          }
          .hero-desktop-art { display: none !important; }
          .hero-mobile-art {
            display: block !important;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>

      <div className="hero-nav-header relative z-10 w-full shrink-0 pt-3 sm:pt-4 md:pt-6 h-[76px] sm:h-[92px] md:h-[108px] pointer-events-none" aria-hidden="true" />

      <div className="hero-art-wrap relative z-10 flex-1 w-full max-w-[1920px] mx-auto flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full max-h-[100svh] aspect-[1024/539] flex items-center justify-center">
          {/* ================= DESKTOP ARTWORK (VIEWBOX 1024 x 539) ================= */}
          <svg
            viewBox="0 0 1024 539"
            className="hero-desktop-art w-full h-full object-contain pointer-events-auto"
            preserveAspectRatio="xMidYMid slice"
            aria-label="NITS HACKS 9.0 Hero Section"
          >
            <defs>
              <filter
                id="flame-glow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="city-far" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7a0206" />
                <stop offset="1" stopColor="#2a0002" />
              </linearGradient>
              <linearGradient id="city-near" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e11d1d" />
                <stop offset="0.5" stopColor="#8c0003" />
                <stop offset="1" stopColor="#1a0000" />
              </linearGradient>
            </defs>

            {/* A. Procedural skyline: two parallax layers, seamless loop */}
            <g className="skyline-far">
              {renderStrip(farCity, "url(#city-far)")}
            </g>
            <g className="skyline-near">
              {renderStrip(nearCity, "url(#city-near)")}
            </g>

            {/* B. Spotlight beam & title (static: does NOT move) */}
            <image
              href="/hero/smooth_beam_title.png"
              x="388"
              y="145"
              width="636"
              height="346"
              preserveAspectRatio="none"
              className="pointer-events-none"
            />

            {/* C. Stark / Avengers Tower on the Left (static) */}
            <g className="avengers-tower">
              <path d={TOWER_PATH} fill="#0d0d0d" />
              <line
                x1="125"
                y1="280"
                x2="185"
                y2="538"
                stroke="#2a2a2a"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.7"
              />
              <polygon
                points="120,250 240,250 270,256 120,256"
                fill="#080808"
              />
              <line
                x1="120"
                y1="256"
                x2="270"
                y2="256"
                stroke="#222222"
                strokeWidth="1.5"
              />

              <g className="avengers-logo-complete" fill="#ffffff">
                <circle
                  cx="105.5"
                  cy="273.5"
                  r="18.75"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4.5"
                />
                <polygon
                  points="107,248 111,248 99,292 94,292"
                  fill="#ffffff"
                />
                <polygon
                  points="107,248 111,248 122,289 126,293.5 120,293.5 114,289 110,270"
                  fill="#ffffff"
                />
                <polygon
                  points="96,275.5 124,275.5 124,273.5 129,277 124,280.5 124,278.5 96,278.5"
                  fill="#ffffff"
                />
                <line
                  x1="127"
                  y1="277"
                  x2="202"
                  y2="277"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <line
                  x1="106"
                  y1="292.5"
                  x2="166"
                  y2="292.5"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </g>
            </g>

            {/* D. Iron Man flight unit (bobs up and down over the static beam) */}
            <g
              className="ironman-flying-unit pointer-events-none"
              style={{
                transform: `translate(${(flightState.x + BOOT.offsetX).toFixed(2)}px, ${flightState.y.toFixed(2)}px) rotate(${flightState.rot.toFixed(2)}deg)`,
                transformOrigin: "280px 145px",
                willChange: "transform",
              }}
            >
              <g className="animate-flame" filter="url(#flame-glow)">
                <ellipse
                  cx="236"
                  cy="116"
                  rx="8"
                  ry="3.5"
                  fill="#ffffff"
                  opacity="0.95"
                />
                <ellipse
                  cx="232"
                  cy="116"
                  rx="14"
                  ry="5"
                  fill="#38bdf8"
                  opacity="0.35"
                />
              </g>

              <g className="speed-lines opacity-95">
                {SPEED_LINES_DATA.map((line) => (
                  <line
                    key={line.id}
                    x1={line.x1}
                    y1={line.y1}
                    x2="1024"
                    y2={line.y1}
                    stroke="#ffffff"
                    strokeWidth={line.strokeWidth}
                    strokeDasharray={line.dash}
                    strokeLinecap="round"
                    className="stream-thrust"
                    style={{
                      animationDuration: line.speed,
                      filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))",
                    }}
                  />
                ))}
              </g>

              <g className="ironman-body">
                <path d={IRONMAN_PATH} fill="#0d0d0d" />
                {BOOT.footPatch && (
                  <polygon points={BOOT.footPatch} fill="#0d0d0d" />
                )}
                <polygon
                  points="171,136 175,138 173,139 170,137"
                  fill="#ffffff"
                />
                <circle cx="211" cy="166" r="3.2" fill="#ffffff" />
              </g>
            </g>
          </svg>

          {/* ================= MOBILE ARTWORK (VIEWBOX 430 x 930) ================= */}
          <svg
            viewBox="0 0 430 930"
            className="hero-mobile-art absolute inset-0"
            preserveAspectRatio="xMidYBottom slice"
            aria-label="NITS HACKS 9.0 mobile hero"
          >
            <defs>
              <linearGradient id="mobile-city-far" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7a0206" />
                <stop offset="1" stopColor="#2a0002" />
              </linearGradient>
              <linearGradient id="mobile-city-near" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e11d1d" />
                <stop offset="0.5" stopColor="#8c0003" />
                <stop offset="1" stopColor="#1a0000" />
              </linearGradient>
              <linearGradient
                id="mobile-bottom-vignette"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
              </linearGradient>
              <filter
                id="mobile-flame-glow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* A. Procedural Skyline at the bottom edge */}
            <g className="mobile-skyline-far">
              {renderMobileStrip(mobileFarCity, "url(#mobile-city-far)")}
            </g>
            <g className="mobile-skyline-near">
              {renderMobileStrip(mobileNearCity, "url(#mobile-city-near)")}
            </g>

            {/* B. Spotlight Beam & Iron Man in rotated group (Extended to reach bottom y=930) */}
            <g transform="translate(484, 29) scale(0.755) rotate(90)">
              {/* Beam image reaches bottom edge y=930 */}
              <image
                href="/hero/smooth_beam_title.png"
                x="388"
                y="145"
                width="790"
                height="346"
                preserveAspectRatio="none"
                className="pointer-events-none"
              />

              {/* Iron Man flight unit (bobs vertically along flight line) */}
              <g
                className="ironman-flying-unit pointer-events-none"
                style={{
                  transform: `translate(${(13 + (flightState.y - FLIGHT_CONFIG.baseOffsetY)).toFixed(2)}px, -1px)`,
                  willChange: "transform",
                }}
              >
                <g className="animate-flame" filter="url(#mobile-flame-glow)">
                  <ellipse
                    cx="236"
                    cy="116"
                    rx="8"
                    ry="3.5"
                    fill="#ffffff"
                    opacity="0.95"
                  />
                  <ellipse
                    cx="232"
                    cy="116"
                    rx="14"
                    ry="5"
                    fill="#38bdf8"
                    opacity="0.35"
                  />
                </g>

                <g className="speed-lines opacity-95">
                  {SPEED_LINES_DATA.map((line) => (
                    <line
                      key={line.id}
                      x1={line.x1}
                      y1={line.y1}
                      x2="1190"
                      y2={line.y1}
                      stroke="#ffffff"
                      strokeWidth={line.strokeWidth}
                      strokeDasharray={line.dash}
                      strokeLinecap="round"
                      className="stream-thrust"
                      style={{
                        animationDuration: line.speed,
                        filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))",
                      }}
                    />
                  ))}
                </g>

                <g className="ironman-body">
                  <path d={IRONMAN_PATH} fill="#0d0d0d" />
                  {BOOT.footPatch && (
                    <polygon points={BOOT.footPatch} fill="#0d0d0d" />
                  )}
                  <polygon
                    points="171,136 175,138 173,139 170,137"
                    fill="#ffffff"
                  />
                  <circle cx="211" cy="166" r="3.2" fill="#ffffff" />
                </g>
              </g>
            </g>

            {/* C. Avengers Tower on the Left (Extended down to y=930 to joint with buildings) */}
            <g transform="translate(-49, -10) scale(1.15 1.75)">
              <path d={TOWER_PATH} fill="#0d0d0d" />
              <line
                x1="125"
                y1="280"
                x2="185"
                y2="538"
                stroke="#2a2a2a"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.7"
              />
              <polygon
                points="120,250 240,250 270,256 120,256"
                fill="#080808"
              />
              <line
                x1="120"
                y1="256"
                x2="270"
                y2="256"
                stroke="#222222"
                strokeWidth="1.5"
              />

              {/* Horizontal bridge joint extending from cantilever platform directly into the beam */}
              <polygon
                points="204,295 335,295 335,302 204,302"
                fill="#0d0d0d"
              />
              <line
                x1="200"
                y1="298.5"
                x2="335"
                y2="298.5"
                stroke="#222222"
                strokeWidth="1.2"
              />

              <g className="avengers-logo-complete" fill="#ffffff">
                <circle
                  cx="105.5"
                  cy="273.5"
                  r="18.75"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4.5"
                />
                <polygon
                  points="107,248 111,248 99,292 94,292"
                  fill="#ffffff"
                />
                <polygon
                  points="107,248 111,248 122,289 126,293.5 120,293.5 114,289 110,270"
                  fill="#ffffff"
                />
                <polygon
                  points="96,275.5 124,275.5 124,273.5 129,277 124,280.5 124,278.5 96,278.5"
                  fill="#ffffff"
                />
                <line
                  x1="127"
                  y1="277"
                  x2="202"
                  y2="277"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <line
                  x1="106"
                  y1="292.5"
                  x2="250"
                  y2="292.5"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </g>
            </g>

            {/* Grounding vignette at bottom */}
            <rect
              x="0"
              y="870"
              width="430"
              height="60"
              fill="url(#mobile-bottom-vignette)"
              className="pointer-events-none"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
