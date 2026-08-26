"use client";

import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from "react";
import { Container } from "@/components/ui/Container";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";

type NodeKey = "center" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

// Center = the overall outcome metric; the four platform facts sit
// around it grouped by platform (TikTok on top, Instagram on bottom)
// so the layout reads as a hierarchy instead of an arbitrary order.
const nodes: { key: NodeKey; target: number; decimals: number; suffix: string; label: string; x: number; y: number }[] = [
  { key: "center", target: 40, decimals: 0, suffix: " Tsd.+", label: "Abonnenten generiert", x: 50, y: 50 },
  { key: "topLeft", target: 500, decimals: 0, suffix: "+", label: "TikTok-Kurzvideos produziert", x: 22, y: 20 },
  { key: "topRight", target: 20, decimals: 0, suffix: " Mio.+", label: "Aufrufe auf TikTok", x: 78, y: 20 },
  { key: "bottomLeft", target: 500, decimals: 0, suffix: "+", label: "Instagram-Kurzvideos produziert", x: 22, y: 80 },
  { key: "bottomRight", target: 22, decimals: 0, suffix: " Mio.+", label: "Aufrufe auf Instagram", x: 78, y: 80 },
];

// Distinct, fixed durations/delays per edge (not randomized at runtime)
// so the data pulses drift in and out of sync instead of looping in
// lockstep, without depending on client-only randomness.
const edges: { from: NodeKey; to: NodeKey; duration: number; delay: number }[] = [
  { from: "center", to: "topLeft", duration: 4.5, delay: 0 },
  { from: "center", to: "topRight", duration: 5.2, delay: 0.9 },
  { from: "center", to: "bottomLeft", duration: 5.8, delay: 1.8 },
  { from: "center", to: "bottomRight", duration: 6.4, delay: 2.7 },
];

// Fixed positions (not random) so server and client render identically.
const bgDots = [
  { left: "8%", top: "18%", delay: 0 },
  { left: "88%", top: "22%", delay: 0.7 },
  { left: "14%", top: "82%", delay: 1.3 },
  { left: "70%", top: "88%", delay: 0.4 },
  { left: "92%", top: "58%", delay: 1.8 },
  { left: "30%", top: "8%", delay: 1.0 },
];

// Matches the easing already used for scroll-reveal (see useReveal.ts /
// globals.css .reveal) so this motion feels like the same system.
const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

function findNode(key: NodeKey) {
  return nodes.find((n) => n.key === key)!;
}

function edgeState(edge: (typeof edges)[number], hovered: NodeKey | null): "default" | "active" | "dim" {
  if (!hovered) return "default";
  if (hovered === "center") return "active";
  if (edge.to === hovered || edge.from === hovered) return "active";
  return "dim";
}

function nodeState(key: NodeKey, hovered: NodeKey | null): "default" | "active" | "dim" {
  if (!hovered) return "default";
  if (hovered === "center" || key === "center" || key === hovered) return "active";
  return "dim";
}

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function OuterNode({
  node,
  index,
  state,
  revealed,
  onHoverStart,
  onHoverEnd,
}: {
  node: (typeof nodes)[number];
  index: number;
  state: "default" | "active" | "dim";
  revealed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const countRef = useRef<HTMLSpanElement>(null);
  const count = useCountUp(countRef, node.target);

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <span
        className={`rounded-full bg-accent transition-all duration-500 ${EASE} ${
          revealed ? "h-2.5 w-2.5 opacity-100" : "h-2.5 w-2.5 scale-0 opacity-0"
        } ${state === "active" ? "scale-125 shadow-[0_0_0_8px_rgba(139,92,246,0.25)]" : ""} ${
          state === "dim" ? "opacity-30" : ""
        }`}
        style={{ transitionDelay: revealed ? `${index * 100}ms` : "0ms" }}
      />
      <div
        className={`flex flex-col items-center gap-1 transition-all duration-500 ${EASE} ${
          revealed ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-90 opacity-0"
        } ${state === "dim" ? "opacity-40" : ""}`}
        style={{ transitionDelay: revealed ? `${500 + index * 80}ms` : "0ms" }}
      >
        <span
          ref={countRef}
          className="text-xl font-extrabold tracking-tight text-primary-foreground tabular-nums sm:text-2xl lg:text-4xl"
        >
          {formatNumber(count, node.decimals)}
          {node.suffix}
        </span>
        <span className="max-w-[6.5rem] text-[11px] leading-snug text-primary-foreground/60 sm:max-w-[8rem] sm:text-xs lg:max-w-[10rem] lg:text-sm">
          {node.label}
        </span>
      </div>
    </div>
  );
}

function CenterNode({
  center,
  state,
  revealed,
  onHoverStart,
  onHoverEnd,
}: {
  center: (typeof nodes)[number];
  state: "default" | "active" | "dim";
  revealed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const countRef = useRef<HTMLSpanElement>(null);
  const count = useCountUp(countRef, center.target);

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center"
      style={{ left: `${center.x}%`, top: `${center.y}%` }}
    >
      <div
        className={`flex flex-col items-center gap-2 transition-all duration-700 ${EASE} ${
          revealed ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-90 opacity-0"
        }`}
        style={{ transitionDelay: revealed ? "600ms" : "0ms" }}
      >
        <span
          ref={countRef}
          className={`text-4xl font-extrabold tracking-tight text-primary-foreground tabular-nums transition-all duration-500 sm:text-6xl lg:text-7xl ${
            state === "active" ? "drop-shadow-[0_0_18px_rgba(139,92,246,0.45)]" : ""
          }`}
        >
          {formatNumber(count, center.decimals)}
          {center.suffix}
        </span>
        <span className="text-sm text-primary-foreground/60 sm:text-base">{center.label}</span>
      </div>
    </div>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const revealed = useInView(revealRef, 0.3);

  const bgRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const [hovered, setHovered] = useState<NodeKey | null>(null);

  // Soft, lagging parallax: each frame eases the applied position a
  // little closer to the raw cursor position instead of snapping to it,
  // so the layers visibly trail the mouse rather than sticking to it.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function tick() {
      const t = targetRef.current;
      const c = currentRef.current;
      c.x += (t.x - c.x) * 0.06;
      c.y += (t.y - c.y) * 0.06;

      if (bgRef.current) bgRef.current.style.transform = `translate3d(${c.x * 26}px, ${c.y * 16}px, 0)`;
      if (wavesRef.current) wavesRef.current.style.transform = `translate3d(${c.x * -16}px, ${c.y * -9}px, 0)`;
      if (linesRef.current) linesRef.current.style.transform = `translate3d(${c.x * 6}px, ${c.y * 4}px, 0)`;
      if (outerRef.current) outerRef.current.style.transform = `translate3d(${c.x * 4}px, ${c.y * 3}px, 0)`;
      if (centerRef.current) centerRef.current.style.transform = `translate3d(${c.x * 2}px, ${c.y * 1.5}px, 0)`;
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--mx", `${((c.x + 1) / 2) * 100}%`);
        spotlightRef.current.style.setProperty("--my", `${((c.y + 1) / 2) * 100}%`);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function handleMouseMove(e: ReactMouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  }

  function handleMouseLeave() {
    targetRef.current = { x: 0, y: 0 };
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group/stats relative overflow-hidden bg-primary py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#140f22_50%,#0a0a0a_100%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div ref={bgRef} aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[8%] h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-24 right-[6%] h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div ref={wavesRef} aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
        <svg viewBox="0 0 1000 400" className="h-full w-full" preserveAspectRatio="none">
          <path
            d="M0,260 C 220,190 320,300 520,240 S 820,150 1000,210"
            fill="none"
            stroke="white"
            strokeOpacity={0.05}
            strokeWidth={1.5}
          />
          <path
            d="M0,120 C 240,180 340,80 540,130 S 800,60 1000,100"
            fill="none"
            stroke="white"
            strokeOpacity={0.04}
            strokeWidth={1.5}
          />
        </svg>
        {bgDots.map((dot, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 animate-pulse rounded-full bg-accent/50"
            style={{ left: dot.left, top: dot.top, animationDelay: `${dot.delay}s`, animationDuration: "3.4s" }}
          />
        ))}
      </div>

      <div
        ref={spotlightRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/stats:opacity-100"
        style={{
          background:
            "radial-gradient(560px circle at var(--mx, 50%) var(--my, 50%), rgba(139,92,246,0.14), transparent 70%)",
        }}
      />

      <Container className="relative">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-primary-foreground/50">
          Unsere Reichweite in Zahlen
        </p>

        <div
          ref={revealRef}
          className="relative mx-auto mt-10 min-h-[420px] w-full max-w-4xl sm:min-h-[460px] lg:min-h-[560px]"
        >
          <div ref={linesRef} className="pointer-events-none absolute inset-0">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
              {edges.map((edge, i) => {
                const from = findNode(edge.from);
                const to = findNode(edge.to);
                const state = edgeState(edge, hovered);
                return (
                  <g key={i}>
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      vectorEffect="non-scaling-stroke"
                      stroke="var(--color-accent)"
                      strokeOpacity={state === "active" ? 0.85 : state === "dim" ? 0.08 : 0.28}
                      strokeWidth={state === "active" ? 1.6 : 1}
                      pathLength={100}
                      strokeDasharray={100}
                      strokeDashoffset={revealed ? 0 : 100}
                      className={`transition-all duration-[900ms] ${EASE}`}
                      style={{ transitionDelay: revealed ? "250ms" : "0ms" }}
                    />
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      vectorEffect="non-scaling-stroke"
                      stroke="white"
                      strokeOpacity={state === "dim" ? 0.12 : 0.55}
                      strokeWidth={1}
                      pathLength={100}
                      strokeDasharray="5 400"
                      style={{
                        animation: revealed
                          ? `hero-curve-travel ${edge.duration}s linear ${1.8 + edge.delay}s infinite`
                          : "none",
                      }}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div ref={outerRef} className="pointer-events-none absolute inset-0">
            {nodes
              .filter((n) => n.key !== "center")
              .map((node, i) => (
                <OuterNode
                  key={node.key}
                  node={node}
                  index={i}
                  state={nodeState(node.key, hovered)}
                  revealed={revealed}
                  onHoverStart={() => setHovered(node.key)}
                  onHoverEnd={() => setHovered(null)}
                />
              ))}
          </div>

          <div ref={centerRef} className="pointer-events-none absolute inset-0">
            <CenterNode
              center={findNode("center")}
              state={nodeState("center", hovered)}
              revealed={revealed}
              onHoverStart={() => setHovered("center")}
              onHoverEnd={() => setHovered(null)}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
