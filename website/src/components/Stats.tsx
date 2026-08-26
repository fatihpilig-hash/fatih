"use client";

import {
  ComponentType,
  SVGProps,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Film, Eye } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TiktokIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { useReveal } from "@/lib/useReveal";
import { useCountUp } from "@/lib/useCountUp";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const stats = [
  {
    icon: TiktokIcon,
    target: 500,
    decimals: 0,
    suffix: "+",
    label: "TikTok-Kurzvideos produziert",
  },
  {
    icon: Eye,
    target: 20,
    decimals: 0,
    suffix: " Mio.+",
    label: "Aufrufe auf TikTok",
  },
  {
    icon: InstagramIcon,
    target: 500,
    decimals: 0,
    suffix: "+",
    label: "Instagram-Kurzvideos produziert",
  },
  {
    icon: Film,
    target: 22,
    decimals: 0,
    suffix: " Mio.+",
    label: "Aufrufe auf Instagram",
  },
];

// Fixed positions (not random) so server and client render identically.
const bgDots = [
  { left: "10%", top: "22%", delay: 0 },
  { left: "80%", top: "16%", delay: 0.6 },
  { left: "32%", top: "72%", delay: 1.2 },
  { left: "64%", top: "78%", delay: 0.3 },
  { left: "90%", top: "52%", delay: 0.9 },
  { left: "18%", top: "48%", delay: 1.5 },
];

// Matches the easing already used for scroll-reveal (see useReveal.ts /
// globals.css .reveal) so this motion feels like the same system.
const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatCard({
  icon: Icon,
  target,
  decimals,
  suffix,
  label,
  index,
  pulse,
}: {
  icon: IconComponent;
  target: number;
  decimals: number;
  suffix: string;
  label: string;
  index: number;
  pulse: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reveal = useReveal(wrapRef, index * 90);
  const count = useCountUp(wrapRef, target);

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  function handleMove(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - relY) * 5, y: (relX - 0.5) * 5 });
    setGlow({ x: relX * 100, y: relY * 100 });
  }

  function handleLeave() {
    setTilt({ x: 0, y: 0 });
    setHovering(false);
  }

  return (
    <div ref={wrapRef} style={reveal.style} className={`relative ${reveal.className}`}>
      <div style={{ perspective: "900px" }}>
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={handleLeave}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovering ? 1.02 : 1})`,
          }}
          className={`group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-sm transition-all duration-300 ${EASE} hover:border-white/20 ${
            pulse ? "border-accent/30" : ""
          }`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
            style={{
              background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, rgba(79,70,229,0.28), transparent 70%)`,
              opacity: hovering ? 1 : 0,
            }}
          />

          <span
            className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-accent transition-all duration-300 ${EASE} group-hover:scale-110 group-hover:bg-accent/20 ${
              pulse ? "shadow-[0_0_0_6px_rgba(79,70,229,0.15)]" : ""
            }`}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span className="relative z-10 text-3xl font-extrabold tracking-tight text-primary-foreground tabular-nums sm:text-4xl">
            {formatNumber(count, decimals)}
            {suffix}
          </span>
          <span className="relative z-10 text-sm text-primary-foreground/60">{label}</span>

          <svg
            aria-hidden
            viewBox="0 0 60 20"
            className={`absolute bottom-3 left-1/2 h-3 w-12 -translate-x-1/2 opacity-0 transition-opacity duration-300 ${EASE} group-hover:opacity-60`}
          >
            <polyline
              points="0,16 12,10 24,13 36,4 48,8 60,2"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const reducedMotionRef = useRef(false);

  const [pulseIndex, setPulseIndex] = useState(-1);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPulseIndex((i) => (i + 1) % stats.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function applyPointer() {
    rafRef.current = null;
    const { x, y } = pointerRef.current;

    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty("--mx", `${((x + 1) / 2) * 100}%`);
      spotlightRef.current.style.setProperty("--my", `${((y + 1) / 2) * 100}%`);
    }

    if (!reducedMotionRef.current) {
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${x * 22}px, ${y * 14}px, 0)`;
      if (waveRef.current) waveRef.current.style.transform = `translate3d(${x * -12}px, ${y * -6}px, 0)`;
      if (dotsRef.current) dotsRef.current.style.transform = `translate3d(${x * 8}px, ${y * 10}px, 0)`;
    }
  }

  function scheduleUpdate() {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(applyPointer);
    }
  }

  function handleMouseMove(e: ReactMouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
    scheduleUpdate();
  }

  function handleMouseLeave() {
    pointerRef.current = { x: 0, y: 0 };
    scheduleUpdate();
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group/stats relative overflow-hidden bg-primary py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#130f20_55%,#0a0a0a_100%)]"
      />

      <div
        ref={glowRef}
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-transform duration-500 ${EASE}`}
      >
        <div className="absolute -top-24 left-[10%] h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -bottom-24 right-[8%] h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div
        ref={waveRef}
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-40 transition-transform duration-500 ${EASE}`}
      >
        <svg viewBox="0 0 1000 300" className="h-full w-full" preserveAspectRatio="none">
          <path
            d="M0,180 C 200,120 300,220 500,160 S 800,100 1000,150"
            fill="none"
            stroke="white"
            strokeOpacity={0.06}
            strokeWidth={1.5}
          />
          <path
            d="M0,220 C 220,260 320,180 520,210 S 820,260 1000,200"
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            pathLength={100}
            strokeDasharray="10 400"
            className="[animation:hero-curve-travel_7s_linear_infinite]"
          />
        </svg>
      </div>

      <div
        ref={dotsRef}
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-transform duration-500 ${EASE}`}
      >
        {bgDots.map((dot, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 animate-pulse rounded-full bg-accent/50"
            style={{ left: dot.left, top: dot.top, animationDelay: `${dot.delay}s`, animationDuration: "3s" }}
          />
        ))}
      </div>

      <div
        ref={spotlightRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/stats:opacity-100"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(124,58,237,0.16), transparent 70%)",
        }}
      />

      <Container className="relative">
        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-wide text-primary-foreground/50">
          Unsere Reichweite in Zahlen
        </p>
        <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} pulse={pulseIndex === index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
