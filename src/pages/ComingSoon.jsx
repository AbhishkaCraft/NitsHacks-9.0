import { useCallback, useEffect, useRef, useState } from "react";

// Where the Gemini sparkle sits inside the background video (as fractions of
// the video frame), so the button can be placed exactly over it.
const LOGO = { x: 1160 / 1280, y: 600 / 720, radius: 26 / 1280 };

export default function ComingSoon() {
  const audioRef = useRef(null);
  const buttonRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [spot, setSpot] = useState(null);

  // Work out where the sparkle lands on screen (the video is scaled with
  // object-fit: cover) and sit the button on top of it. If the sparkle is
  // cropped out of view (tall/narrow screens), the button stays in the corner.
  const placeOnLogo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const cw = video.clientWidth;
    const ch = video.clientHeight;
    if (!cw || !ch) return;

    const nw = video.videoWidth || 1280;
    const nh = video.videoHeight || 720;
    const scale = Math.max(cw / nw, ch / nh);

    const [fx = 0.5, fy = 0.5] = getComputedStyle(video)
      .objectPosition.split(" ")
      .map((v) => parseFloat(v) / 100)
      .map((v) => (Number.isFinite(v) ? v : 0.5));

    const cx = (cw - nw * scale) * fx + LOGO.x * nw * scale;
    const cy = (ch - nh * scale) * fy + LOGO.y * nh * scale;
    const radius = LOGO.radius * nw * scale;

    const visible =
      cx + radius > 0 &&
      cx - radius < cw &&
      cy + radius > 0 &&
      cy - radius < ch;
    if (!visible) {
      setSpot(null);
      return;
    }

    const cover = 2 * radius + 14;
    const isPhone = window.matchMedia("(max-width: 640px)").matches;
    const base = isPhone ? 58 : Math.min(76, Math.max(54, cw * 0.052));
    const size = Math.max(base, cover);
    const pad = 8;

    setSpot({
      x: Math.min(Math.max(cx, size / 2 + pad), cw - size / 2 - pad),
      y: Math.min(Math.max(cy, size / 2 + pad), ch - size / 2 - pad),
      cover,
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    placeOnLogo();
    window.addEventListener("resize", placeOnLogo);
    video?.addEventListener("loadedmetadata", placeOnLogo);
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(placeOnLogo)
        : null;
    if (observer && video) observer.observe(video);
    return () => {
      window.removeEventListener("resize", placeOnLogo);
      video?.removeEventListener("loadedmetadata", placeOnLogo);
      observer?.disconnect();
    };
  }, [placeOnLogo]);

  // Keep the icon in sync with what the audio element is actually doing.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Try to start the song right away. Browsers often block sound until the
    // visitor interacts, so if that happens, start on their first tap/key press.
    audio.play().catch(() => {
      const startOnFirstInteraction = (event) => {
        if (buttonRef.current && buttonRef.current.contains(event.target))
          return;
        audio.play().catch(() => {});
        cleanup();
      };
      const cleanup = () => {
        window.removeEventListener("pointerdown", startOnFirstInteraction);
        window.removeEventListener("keydown", startOnFirstInteraction);
      };
      window.addEventListener("pointerdown", startOnFirstInteraction);
      window.addEventListener("keydown", startOnFirstInteraction);
    });

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const toggleSong = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <main className="coming-page">
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Animated sunset bridge background"
      >
        <source src="/assets/coming-soon-background.mp4" type="video/mp4" />
      </video>

      <audio ref={audioRef} loop preload="auto">
        <source src="/assets/background-song.m4a" type="audio/mp4" />
        <source src="/assets/background-song.mp3" type="audio/mpeg" />
      </audio>

      <div className="image-vignette" aria-hidden="true" />
      <header className="top-brand" aria-label="NITS Hacks 9.0">
        <img src="/assets/nitshacks-logo.png" alt="NITS HACKS 9.0" />
      </header>

      <button
        ref={buttonRef}
        className={`play-button${spot ? " on-logo" : ""}`}
        style={
          spot
            ? {
                "--cx": `${spot.x}px`,
                "--cy": `${spot.y}px`,
                "--cover": `${spot.cover}px`,
              }
            : undefined
        }
        type="button"
        onClick={toggleSong}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause" : "Play"}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="6.1" y="5.5" width="3.8" height="13" rx=".5" />
            <rect x="14.1" y="5.5" width="3.8" height="13" rx=".5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5.5v13L19 12 8 5.5Z" />
          </svg>
        )}
      </button>

      <div className="corner-label">
        NATIONAL INSTITUTE OF TECHNOLOGY SILCHAR
      </div>
    </main>
  );
}
