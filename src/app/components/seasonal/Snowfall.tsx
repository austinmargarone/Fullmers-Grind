"use client";

import { useEffect, useRef } from "react";

type Flake = { x: number; y: number; r: number; vy: number; drift: number; phase: number; alpha: number };

/**
 * Light snowfall drawn on one fixed canvas behind nothing interactive
 * (pointer-events: none). Pauses when the tab is hidden and does not run
 * for visitors with "reduce motion" turned on.
 */
export default function Snowfall() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let flakes: Flake[] = [];
    let raf = 0;
    let last = performance.now();

    const makeFlake = (anywhere: boolean): Flake => {
      const r = Math.random() * 2.8 + 1.2;
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : -10,
        r,
        vy: 25 + r * 18 + Math.random() * 15, // px per second; bigger flakes fall faster
        drift: Math.random() * 20 + 10,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.4 + 0.55,
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Fewer flakes on small screens
      const target = Math.round(Math.min(150, Math.max(50, (w * h) / 9000)));
      if (flakes.length > target) flakes = flakes.slice(0, target);
      while (flakes.length < target) flakes.push(makeFlake(true));
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(255,255,255,0.8)";
      for (const f of flakes) {
        f.phase += dt * 0.8;
        f.y += f.vy * dt;
        f.x += Math.sin(f.phase) * f.drift * dt;
        if (f.y - f.r > h) Object.assign(f, makeFlake(false));
        if (f.x < -10) f.x = w + 10;
        else if (f.x > w + 10) f.x = -10;
        ctx.globalAlpha = f.alpha;
        ctx.shadowBlur = f.r * 2;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[45] motion-reduce:hidden"
    />
  );
}
