import React, { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Star generator
    const starCount = Math.floor((width * height) / 3800);
    let stars = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.4 + 0.3,
          baseAlpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          color:
            Math.random() > 0.85
              ? '#93c5fd' // faint blue
              : Math.random() > 0.75
              ? '#fde68a' // faint warm yellow
              : '#ffffff',
        });
      }
    };

    initStars();

    // Shooting stars
    const shootingStars = [];
    const createShootingStar = () => {
      if (Math.random() < 0.015 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          len: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          alpha: 1,
        });
      }
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Render static & twinkling stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const alpha =
          star.baseAlpha + Math.sin(tick * star.twinkleSpeed + star.twinkleOffset) * 0.25;
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render shooting stars
      createShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        );
        ctx.stroke();
        ctx.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.02;

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#02050f]">
      {/* Subtle Cosmic Nebula Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(88,28,135,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_65%,rgba(15,23,42,0.6),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(20,83,45,0.12),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(2,132,199,0.12),transparent_50%)]" />

      {/* Dynamic Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
