"use client";

import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from "react";
import { Eye, TrendingUp, Users, LucideIcon } from "lucide-react";
import { useCountUp } from "@/lib/useCountUp";

const curvePoints: [number, number][] = [
  [0, 85],
  [30, 70],
  [60, 75],
  [90, 45],
  [120, 50],
  [150, 20],
  [200, 10],
];

const curvePath = `M ${curvePoints.map(([x, y]) => `${x} ${y}`).join(" L ")}`;
const CURVE_TOP = 10;
const CURVE_BOTTOM = 85;

const kpis: { icon: LucideIcon; label: string; trend: string; value: number; suffix: string }[] = [
  { icon: Eye, label: "Sichtbarkeit", trend: "steigend", value: 48, suffix: "%" },
  { icon: TrendingUp, label: "Anfragen", trend: "steigend", value: 84, suffix: "" },
  { icon: Users, label: "Mitarbeiter", trend: "gewinnen", value: 12, suffix: "" },
];

// Matches the easing already used for scroll-reveal (see useReveal.ts /
// globals.css .reveal) so this motion feels like the same system.
const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

function interpolateY(x: number) {
  for (let i = 0; i < curvePoints.length - 1; i++) {
    const [x1, y1] = curvePoints[i];
    const [x2, y2] = curvePoints[i + 1];
    if (x >= x1 && x <= x2) {
      const t = (x - x1) / (x2 - x1);
      return y1 + (y2 - y1) * t;
    }
  }
  return curvePoints[curvePoints.length - 1][1];
}

function KpiRow({
  icon: Icon,
  label,
  pulse,
}: {
  icon: LucideIcon;
  label: string;
  pulse: boolean;
}) {
  return (
    <div
      className={`group flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 backdrop-blur transition-all duration-300 ${EASE} hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-[0_0_0_1px_rgba(79,70,229,0.4),0_8px_20px_-8px_rgba(79,70,229,0.6)] ${
        pulse ? "bg-white/15" : ""
      }`}
    >
      <span className="flex items-center gap-3 text-sm font-medium text-primary-foreground">
        <Icon
          className={`h-4 w-4 text-accent transition-transform duration-300 ${EASE} group-hover:scale-110 ${
            pulse ? "scale-110" : ""
          }`}
        />
        {label}
      </span>
    </div>
  );
}

export function HeroVisual() {
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);
  const [cursorPoint, setCursorPoint] = useState<{ x: number; y: number; percent: number } | null>(
    null
  );
  const [pulseIndex, setPulseIndex] = useState(-1);

  const cardRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLSpanElement>(null);
  const headlineCount = useCountUp(headlineRef, 127);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPulseIndex((i) => (i + 1) % kpis.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  function handleCardMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - relY) * 6, y: (relX - 0.5) * 6 });
    setGlow({ x: relX * 100, y: relY * 100 });
  }

  function handleCardMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setHovering(false);
    setCursorPoint(null);
  }

  function handleCurveMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = curveRef.current?.getBoundingClientRect();
    if (!rect) return;
    const localX = Math.min(200, Math.max(0, ((e.clientX - rect.left) / rect.width) * 200));
    const localY = interpolateY(localX);
    const percent = Math.max(
      0,
      Math.round(((CURVE_BOTTOM - localY) / (CURVE_BOTTOM - CURVE_TOP)) * 127)
    );
    setCursorPoint({ x: localX, y: localY, percent });
  }

  return (
    <div style={{ perspective: "1200px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleCardMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleCardMouseLeave}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        className={`relative aspect-[4/5] w-full rounded-[2rem] bg-primary p-8 shadow-2xl shadow-primary/20 transition-transform duration-300 ${EASE} sm:p-10`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2rem] transition-opacity duration-500"
          style={{
            background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(79,70,229,0.28), transparent 70%)`,
            opacity: hovering ? 1 : 0,
          }}
        />

        <div className="relative flex h-full flex-col justify-between">
          <div
            className={`transition-transform duration-300 ${EASE}`}
            style={{ transform: `translate3d(${tilt.y * -0.6}px, ${tilt.x * -0.6}px, 0)` }}
          >
            <p className="text-sm font-medium text-primary-foreground/60">
              Digitales Wachstum
            </p>
            <p className="mt-1 text-2xl font-bold text-primary-foreground">
              Für euer Unternehmen
            </p>
          </div>

          <div
            className={`relative transition-transform duration-300 ${EASE}`}
            style={{ transform: `translate3d(${tilt.y * -1.2}px, ${tilt.x * -1.2}px, 0)` }}
          >
            <div
              ref={curveRef}
              onMouseMove={handleCurveMouseMove}
              onMouseLeave={() => setCursorPoint(null)}
              aria-hidden
              className="relative h-40 w-full overflow-hidden rounded-2xl bg-white/5"
            >
              <span
                ref={headlineRef}
                className={`absolute left-4 top-3 z-10 text-sm font-bold text-accent transition-all duration-500 ${EASE} ${
                  mounted ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
              >
                +{Math.round(headlineCount)}%
              </span>

              <svg
                viewBox="0 0 200 100"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <path d={curvePath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={3} />
                <path
                  d={curvePath}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={100}
                  strokeDasharray={100}
                  strokeDashoffset={mounted ? 0 : 100}
                  className={`transition-[stroke-dashoffset] duration-[1600ms] ${EASE}`}
                />
                <path
                  d={curvePath}
                  fill="none"
                  stroke="white"
                  strokeOpacity={0.65}
                  strokeWidth={2}
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray="6 400"
                  className="[animation:hero-curve-travel_5s_linear_infinite]"
                  style={{ animationDelay: "1.8s" }}
                />
                {cursorPoint && (
                  <circle
                    cx={cursorPoint.x}
                    cy={cursorPoint.y}
                    r={4}
                    fill="var(--color-accent)"
                    stroke="white"
                    strokeWidth={1.5}
                  />
                )}
              </svg>
            </div>

            {cursorPoint && (
              <div
                aria-hidden
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-background px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-foreground shadow-lg"
                style={{
                  left: `${(cursorPoint.x / 200) * 100}%`,
                  top: `calc(${(cursorPoint.y / 100) * 100}% - 10px)`,
                }}
              >
                +{cursorPoint.percent}% Neukunden
              </div>
            )}
          </div>

          <div
            className={`flex flex-col gap-3 transition-transform duration-300 ${EASE}`}
            style={{ transform: `translate3d(${tilt.y * -0.3}px, ${tilt.x * -0.3}px, 0)` }}
          >
            {kpis.map((kpi, i) => (
              <KpiRow key={kpi.label} {...kpi} pulse={pulseIndex === i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
