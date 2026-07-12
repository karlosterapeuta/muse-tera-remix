import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    type Star = { x: number; y: number; r: number; a: number; tw: number; to: number };
    let stars: Star[] = [];

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(220, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.4,
        a: Math.random() * 0.5 + 0.3,
        tw: Math.random() * 0.02 + 0.008,
        to: Math.random() * Math.PI * 2,
      }));
    };

    let rafId = 0;
    let last = 0;
    const frameInterval = 1000 / 30; // cap at 30fps
    let t = 0;

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);
      if (document.hidden) return;
      if (now - last < frameInterval) return;
      last = now;
      t += 1;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const tw = Math.sin(t * s.tw + s.to) * 0.4 + 0.6;
        ctx.fillStyle = `rgba(245,232,200,${s.a * tw})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();

    if (!reduceMotion) {
      rafId = requestAnimationFrame(draw);
    } else {
      // Render once
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        ctx.fillStyle = `rgba(245,232,200,${s.a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="space-bg-wrapper">
      <div className="space-gradient" />
      <canvas ref={canvasRef} className="space-stars-canvas" />
    </div>
  );
};

export default SpaceBackground;
