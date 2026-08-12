"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; vx: number; vy: number };

const MAX_DISTANCE = 150;
const MAX_SPEED = 0.15;
const FALLBACK_RGB = "79, 70, 229";

function hexToRgb(hex: string): string | null {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!match) return null;
  return `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}`;
}

/**
 * Very dim, slowly drifting dot-and-line network behind the hero —
 * the site's signature nod to "social media / digital". Skipped
 * entirely for prefers-reduced-motion, and pauses whenever the tab or
 * the canvas itself isn't visible, so it never costs anything the
 * user can't see.
 */
export function NetworkBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvasEl.getContext("2d");
    if (!context) return;

    // Narrow, stable aliases: TS can't see that the nested functions
    // below only run after these null-checks, so bind them locally.
    const canvas = canvasEl;
    const ctx = context;

    const accentRgb =
      hexToRgb(
        getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()
      ) ?? FALLBACK_RGB;

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let frameId = 0;
    let inView = true;
    let tabActive = document.visibilityState === "visible";
    let running = true;

    function updateRunning() {
      running = inView && tabActive;
    }

    function createPoints() {
      const isMobile = width < 640;
      const density = Math.round((width * height) / 26000);
      const count = isMobile ? 16 : Math.min(46, density);
      points = Array.from({ length: Math.max(count, 10) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
      }));
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createPoints();
    }

    function step() {
      if (!running) {
        frameId = requestAnimationFrame(step);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DISTANCE) {
            ctx.strokeStyle = `rgba(${accentRgb}, ${0.14 * (1 - dist / MAX_DISTANCE)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = `rgba(${accentRgb}, 0.35)`;
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      frameId = requestAnimationFrame(step);
    }

    resize();
    frameId = requestAnimationFrame(step);

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    const handleVisibility = () => {
      tabActive = document.visibilityState === "visible";
      updateRunning();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        updateRunning();
      },
      { threshold: 0 }
    );
    sectionObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
