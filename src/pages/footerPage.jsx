import React, { useState } from "react";
import { SOCIAL_LINKS } from "./data/links";
import {
  InstagramIcon,
  LinkedInIcon,
  FacebookIcon,
  XIcon,
} from "./components/Icons";
import confetti from "canvas-confetti";
import { Check, Copy, Navigation, ExternalLink } from "lucide-react";

export default function FooterPage() {
  const [toastMessage, setToastMessage] = useState("");

  const handleCopyEmail = (e) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText(SOCIAL_LINKS.email.address);
    setToastMessage("Copied " + SOCIAL_LINKS.email.address);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  return (
    <div className="landing-page min-h-screen w-full relative bg-[#e5e5e5] text-neutral-900 flex flex-col justify-between overflow-x-hidden selection:bg-red-600 selection:text-white">
      {/* Background Comic Texture across whole page */}
      <div
        className="comic-background fixed inset-0 opacity-40 mix-blend-multiply pointer-events-none z-0"
        style={{
          backgroundImage: `url('/assets/bg_comic_tile.png')`,
          backgroundRepeat: "repeat",
          backgroundSize: "620px auto",
        }}
      />

      {/* Halftone Dot Texture Overlay */}
      <div className="halftone-background fixed inset-0 halftone-overlay opacity-25 pointer-events-none z-0" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-950 border-2 border-red-500 text-white px-5 py-2.5 rounded-xl shadow-[0_4px_25px_rgba(239,68,68,0.5)] flex items-center gap-2 text-sm font-bold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Webpage Content Area */}
      <main className="landing-main relative z-10 w-full max-w-none mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-14 pb-4 flex-1 flex flex-col justify-between">
        {/* Top / Main 3-Column Grid */}
        <div className="top-grid grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* ================= LEFT COLUMN ================= */}
          <div className="contact-column md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            {/* VISIT TECHNOESIS Button */}
            <a
              href={SOCIAL_LINKS.technoesis.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Technoesis Website"
              className="technoesis-button inline-flex items-center gap-2.5 bg-gradient-to-r from-[#ff3838] to-[#e61212] hover:from-[#ff2424] hover:to-[#cc0000] text-white pl-2 pr-5 py-1.5 sm:py-2 rounded-full border-2 border-black font-['Anton',sans-serif] tracking-wider text-base sm:text-lg italic uppercase shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 group"
            >
              <img
                src="/assets/technoesis_icon.png"
                alt="Tecnoesis Logo"
                className="technoesis-icon w-7 h-7 sm:w-8 sm:h-8 object-contain -rotate-6 group-hover:scale-110 transition-transform"
              />
              <span>VISIT TECHNOESIS</span>
            </a>

            {/* CONTACT US Heading */}
            <h3 className="contact-heading font-['Anton',sans-serif] text-2xl sm:text-3xl italic tracking-wider text-neutral-900 uppercase transform -rotate-1 drop-shadow-sm mt-6 mb-3">
              CONTACT US
            </h3>

            {/* Social Media Icons (Clean Row) */}
            <div className="social-links flex items-center gap-4 sm:gap-5 py-1">
              {/* Instagram */}
              <a
                href={SOCIAL_LINKS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow GDGC NITS on Instagram (@gdgc_nits)"
                aria-label="Instagram"
                className="group relative text-neutral-900 hover:text-[#E1306C] transition-all transform hover:scale-120 hover:-translate-y-1 p-0.5"
              >
                <InstagramIcon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.4]" />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-30">
                  @gdgc_nits
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                title="DSC / GDGC NIT Silchar on LinkedIn"
                aria-label="LinkedIn"
                className="group relative text-neutral-900 hover:text-[#0A66C2] transition-all transform hover:scale-120 hover:-translate-y-1 p-0.5"
              >
                <LinkedInIcon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.4]" />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-30">
                  LinkedIn
                </span>
              </a>

              {/* Facebook */}
              <a
                href={SOCIAL_LINKS.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                title="GDG On Campus NIT Silchar on Facebook"
                aria-label="Facebook"
                className="group relative text-neutral-900 hover:text-[#1877F2] transition-all transform hover:scale-120 hover:-translate-y-1 p-0.5"
              >
                <FacebookIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-30">
                  Facebook
                </span>
              </a>

              {/* X (Twitter) */}
              <a
                href={SOCIAL_LINKS.x.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow @gdgcnits on X"
                aria-label="X (Twitter)"
                className="group relative text-neutral-900 hover:text-black transition-all transform hover:scale-120 hover:-translate-y-1 p-0.5"
              >
                <XIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-30">
                  @gdgcnits
                </span>
              </a>
            </div>

            {/* Email Address */}
            <div className="mt-3 flex items-center gap-1.5 group">
              <a
                href={SOCIAL_LINKS.email.mailto}
                onClick={(e) => {
                  handleCopyEmail(e);
                  window.location.href = SOCIAL_LINKS.email.mailto;
                }}
                title="Click to Email / Copy"
                className="email-link font-['Montserrat',sans-serif] font-black text-sm sm:text-base text-neutral-900 hover:text-red-600 transition-colors cursor-pointer tracking-tight"
              >
                {SOCIAL_LINKS.email.address}
              </a>
              <button
                onClick={handleCopyEmail}
                title="Copy email address"
                className="p-1 rounded text-neutral-700 hover:text-red-600 hover:bg-neutral-900/10 transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ================= CENTER COLUMN ================= */}
          <div className="brand-column md:col-span-4 flex flex-col items-center justify-center my-6 md:my-0">
            {/* Circular H Logo Emblem */}
            <div className="brand-emblem relative mb-3 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div className="brand-emblem-inner w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center p-1 drop-shadow-md">
                <img
                  src="/assets/logo_circle.png"
                  alt="NITSHACKS 9.0 Emblem"
                  className="w-full h-full object-contain filter contrast-125"
                />
              </div>
            </div>

            {/* NITSHACKS 9.0 Title Banner */}
            <div className="brand-wordmark flex items-center justify-center gap-2 sm:gap-2.5">
              {/* Red Rectangle with NITSHACKS */}
              <div className="brand-title bg-[#e62020] text-white px-3 sm:px-5 py-1 sm:py-1.5 font-['Anton',sans-serif] tracking-wider text-3xl sm:text-4xl md:text-5xl shadow-[3px_3px_0px_#000] border-2 border-black uppercase transform -rotate-1">
                NITSHACKS
              </div>

              {/* 9.0 Comic outlined font */}
              <div
                className="brand-version font-['Anton',sans-serif] text-4xl sm:text-5xl md:text-6xl tracking-tight text-white font-black"
                style={{
                  textShadow:
                    "3px 3px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 3px 0 #000",
                  WebkitTextStroke: "2.5px black",
                }}
              >
                9.0
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="map-column md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right">
            {/* How to Reach? Heading */}
            <h3 className="map-heading font-['Anton',sans-serif] text-xl sm:text-2xl text-neutral-900 tracking-wide mb-2">
              How to Reach?
            </h3>

            {/* Dark Styled Map Card */}
            <a
              href={SOCIAL_LINKS.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Click to Open Google Maps Directions to NIT Silchar"
              className="map-card relative block w-60 sm:w-68 md:w-76 h-34 sm:h-38 md:h-42 rounded-xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_#000] group cursor-pointer"
            >
              <img
                src="/assets/map_preview.png"
                alt="National Institute of Technology Silchar Map"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-neutral-950/75 opacity-0 group-hover:opacity-100 backdrop-blur-[1px] transition-opacity flex flex-col items-center justify-center text-white gap-1.5 p-2 text-center">
                <Navigation className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="font-['Anton',sans-serif] text-xs uppercase tracking-wider bg-red-600 px-3 py-1 rounded shadow">
                  Get Directions
                </span>
                <span className="text-[10px] text-neutral-300 font-sans">
                  NIT Silchar, Assam 788010 ↗
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Credits Text */}
        <div className="footer-credits mt-8 mb-4 text-center space-y-1 relative z-20">
          <p className="credit-title font-['Montserrat',sans-serif] font-black text-sm sm:text-base tracking-wider text-neutral-900 uppercase">
            Made By{" "}
            <span className="text-red-600">GDG On Campus NIT SILCHAR</span>
          </p>
          <p className="copyright-line font-['Montserrat',sans-serif] font-bold text-xs sm:text-sm text-neutral-800 tracking-tight">
            Copyright 2026, Nits Hacks 9.0, National Institute of Technology,
            Silchar
          </p>
        </div>
      </main>

      {/* ================= FULL-WIDTH BOTTOM CITY SKYLINE ================= */}
      <footer className="skyline-footer w-full relative z-10 leading-none overflow-hidden select-none pointer-events-none mt-auto">
        <img
          src="/assets/skyline.png"
          alt="Silchar City Skyline"
          className="skyline-image w-full h-auto min-h-[75px] max-h-[140px] object-cover object-bottom block"
        />
      </footer>
    </div>
  );
}
