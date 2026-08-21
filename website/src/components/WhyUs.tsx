"use client";

import { useRef, RefObject } from "react";
import { ArrowUpRight, Eye, Hammer, LucideIcon, Target, Workflow } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { useReveal } from "@/lib/useReveal";
import { useInView } from "@/lib/useInView";

const reasons = [
  {
    icon: Target,
    step: "01",
    title: "Wir denken in Ergebnissen",
    description:
      "Reichweite ist schön. Aber entscheidend sind Sichtbarkeit, Anfragen, Bewerbungen und Kunden.",
  },
  {
    icon: Hammer,
    step: "02",
    title: "Wir machen nicht nur Konzepte",
    description:
      "Keine 40-seitigen Strategien, die anschließend in einer Schublade verschwinden. Wir entwickeln, produzieren, veröffentlichen und optimieren.",
  },
  {
    icon: Workflow,
    step: "03",
    title: "Wir verbinden Marketing mit Technologie",
    description:
      "Social Media, Website, Ads und KI-Automatisierung werden nicht einzeln gedacht. Wir verbinden sie zu einem System, das für dein Unternehmen arbeitet.",
  },
  {
    icon: Eye,
    step: "04",
    title: "Wir machen dein Unternehmen sichtbar",
    description:
      "Wir zeigen nicht irgendeine Marke. Wir zeigen, warum Kunden und Mitarbeiter gerade mit deinem Unternehmen arbeiten sollten.",
  },
];

const outcomes = [
  "Mehr Sichtbarkeit",
  "Mehr Anfragen",
  "Mehr Bewerber",
  "Mehr Effizienz",
  "Mehr Wachstum",
];

const flowPoints: [number, number][] = [
  [20, 112],
  [155, 82],
  [300, 94],
  [445, 42],
  [580, 16],
];

// Matches the easing already used for scroll-reveal (see useReveal.ts /
// globals.css .reveal) so the new motion feels like the same system.
const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

type RowState = "done" | "active" | "upcoming";

function ReasonRow({
  icon: Icon,
  step,
  title,
  description,
  rowRef,
  state,
  isLast,
}: {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  rowRef: RefObject<HTMLDivElement | null>;
  state: RowState;
  isLast: boolean;
}) {
  const active = state === "active";
  const lit = state !== "upcoming";

  return (
    <div
      ref={rowRef}
      className={`group relative flex gap-5 ${isLast ? "" : "pb-10"}`}
    >
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-6 top-12 bottom-0 w-px bg-border"
        >
          <span
            className={`block h-full w-full origin-top bg-accent transition-transform duration-700 ${EASE} ${
              lit ? "scale-y-100" : "scale-y-0"
            }`}
          />
        </span>
      )}

      <span
        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${EASE} group-hover:scale-105 ${
          active
            ? "scale-110 bg-accent text-accent-foreground shadow-[0_0_0_8px_rgba(79,70,229,0.12)]"
            : lit
              ? "bg-primary text-primary-foreground"
              : "bg-background-alt text-muted-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>

      <div
        className={`flex flex-col gap-1.5 pt-1 transition-transform duration-500 ${EASE} ${
          active ? "translate-x-1" : ""
        }`}
      >
        <span
          className={`text-sm font-bold transition-colors duration-500 ${
            active ? "text-accent" : "text-muted-foreground"
          }`}
        >
          {step}
        </span>
        <h3
          className={`text-lg font-bold text-foreground transition-opacity duration-500 ${
            lit ? "opacity-100" : "opacity-60 group-hover:opacity-100"
          }`}
        >
          {title}
        </h3>
        <p
          className={`max-w-md text-sm leading-relaxed text-muted-foreground transition-opacity duration-500 ${
            lit ? "opacity-100" : "opacity-55 group-hover:opacity-90"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function OutcomeFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.4);
  const pathD = `M ${flowPoints.map(([x, y]) => `${x} ${y}`).join(" L ")}`;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-border bg-background-alt p-8 sm:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(79,70,229,0.12)_0%,transparent_70%)]"
      />
      <p className="text-sm font-semibold text-muted-foreground">
        Ein System, kein Zufall
      </p>

      <svg
        viewBox="0 0 600 140"
        preserveAspectRatio="none"
        className="mt-6 h-28 w-full sm:h-32"
        aria-hidden
      >
        <path d={pathD} fill="none" stroke="var(--color-border)" strokeWidth={2} />
        <path
          d={pathD}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={inView ? 0 : 100}
          className={`transition-[stroke-dashoffset] duration-[1400ms] ${EASE}`}
        />
        {flowPoints.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i === flowPoints.length - 1 ? 7 : 5}
            fill={i === flowPoints.length - 1 ? "var(--color-accent)" : "var(--color-background)"}
            stroke="var(--color-accent)"
            strokeWidth={2}
            className={`origin-center transition-all duration-500 ${EASE}`}
            style={{
              transitionDelay: `${i * 110}ms`,
              opacity: inView ? 1 : 0,
              transform: inView ? "scale(1)" : "scale(0)",
              transformBox: "fill-box",
            }}
          />
        ))}
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-5">
        {outcomes.map((label, i) => (
          <span
            key={label}
            className={`text-sm transition-all duration-500 ${EASE} sm:text-center ${
              i === outcomes.length - 1
                ? "font-bold text-accent"
                : "font-medium text-muted-foreground"
            }`}
            style={{
              transitionDelay: `${i * 110}ms`,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(8px)",
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function WhyUs() {
  const introRef = useRef<HTMLDivElement>(null);
  const introReveal = useReveal(introRef);

  const row0 = useRef<HTMLDivElement>(null);
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);
  const row3 = useRef<HTMLDivElement>(null);
  const centerBand = "-45% 0px -45% 0px";
  const in0 = useInView(row0, 0, centerBand);
  const in1 = useInView(row1, 0, centerBand);
  const in2 = useInView(row2, 0, centerBand);
  const in3 = useInView(row3, 0, centerBand);

  const flags = [in0, in1, in2, in3];
  const rowRefs = [row0, row1, row2, row3];
  const activeIndex = flags.reduce((last, isIn, i) => (isIn ? i : last), -1);

  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaReveal = useReveal(ctaRef);

  return (
    <section id="warum-wir" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-16">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
          <div
            ref={introRef}
            style={introReveal.style}
            className={`flex flex-col gap-5 lg:sticky lg:top-32 ${introReveal.className}`}
          >
            <span className="inline-flex w-fit items-center rounded-full bg-accent-soft px-4 py-1.5 text-sm font-semibold text-accent">
              Warum wir
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              Nicht mehr Marketing.
              <br />
              <span className="text-accent">Mehr Wirkung.</span>
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Viele Unternehmen machen Marketing. Wir wollen wissen, was es am
              Ende bringt.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            <div className="flex flex-col">
              {reasons.map((reason, i) => (
                <ReasonRow
                  key={reason.step}
                  {...reason}
                  rowRef={rowRefs[i]}
                  isLast={i === reasons.length - 1}
                  state={
                    i < activeIndex ? "done" : i === activeIndex ? "active" : "upcoming"
                  }
                />
              ))}
            </div>

            <OutcomeFlow />
          </div>
        </div>

        <div
          ref={ctaRef}
          style={ctaReveal.style}
          className={`flex flex-col items-center gap-6 border-t border-border pt-14 text-center ${ctaReveal.className}`}
        >
          <p className="max-w-xl text-2xl font-bold tracking-tight text-foreground">
            Bereit, aus Marketing ein System für Wachstum zu machen?
          </p>
          <LinkButton href="#kontakt" size="lg">
            Jetzt Erstgespräch sichern
            <ArrowUpRight className="h-5 w-5" />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
