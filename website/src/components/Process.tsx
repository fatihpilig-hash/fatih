"use client";

import { useRef } from "react";
import { Search, Compass, Rocket, LineChart, LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";
import { useInView } from "@/lib/useInView";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Analyse",
    description:
      "Wir verschaffen uns ein klares Bild von eurem Unternehmen, eurer Zielgruppe und eurem Wettbewerb.",
  },
  {
    icon: Compass,
    step: "02",
    title: "Strategie",
    description:
      "Daraus entwickeln wir eine individuelle Strategie über Social Media, Website, Ads und Automatisierung.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Umsetzung",
    description:
      "Content, Website und Kampagnen werden professionell produziert und live geschaltet.",
  },
  {
    icon: LineChart,
    step: "04",
    title: "Wachstum",
    description:
      "Wir optimieren laufend anhand der Ergebnisse – für nachhaltiges, planbares Wachstum.",
  },
];

// Matches the easing already used for scroll-reveal (see useReveal.ts /
// globals.css .reveal) so the new motion feels like the same system.
const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

function ProcessStep({
  icon: Icon,
  step,
  title,
  description,
  index,
  isLast,
}: {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref, index * 110);
  const active = useInView(ref);

  return (
    <div ref={ref} style={reveal.style} className={`relative ${reveal.className}`}>
      {!isLast && (
        <>
          {/* Mobile: vertical connector, runs behind the next icon so a
              few extra pixels of overshoot are never visible. */}
          <span
            aria-hidden
            className="absolute left-12 top-[72px] -bottom-16 w-px bg-border lg:hidden"
          >
            <span
              className={`block h-full w-full origin-top bg-accent transition-transform duration-700 ${EASE} ${
                active ? "scale-y-100" : "scale-y-0"
              }`}
            />
          </span>

          {/* Desktop: short horizontal connector bridging the column gap. */}
          <span
            aria-hidden
            className="absolute left-full top-12 hidden h-px w-8 bg-border lg:block"
          >
            <span
              className={`block h-full w-full origin-left bg-accent transition-transform duration-700 ${EASE} ${
                active ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </span>
        </>
      )}

      <div
        className={`group flex w-full items-start gap-5 rounded-2xl border bg-background p-6 transition-all duration-500 ${EASE} hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg lg:flex-col lg:gap-4 ${
          active ? "-translate-y-1 border-accent/40 shadow-lg" : "border-border"
        }`}
      >
        <span
          className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${EASE} group-hover:scale-110 ${
            active
              ? "bg-accent text-accent-foreground shadow-[0_0_0_8px_rgba(79,70,229,0.12)]"
              : "bg-primary text-primary-foreground"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <div className="flex flex-col gap-2">
          <span
            className={`text-sm font-bold transition-colors duration-500 ${
              active ? "text-accent" : "text-muted-foreground"
            }`}
          >
            {step}
          </span>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Process() {
  return (
    <section
      id="ablauf"
      className="relative overflow-hidden bg-background-alt py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[420px] bg-[radial-gradient(45%_70%_at_50%_50%,rgba(79,70,229,0.06)_0%,transparent_70%)]"
      />
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Ablauf"
          title="So arbeiten wir zusammen"
          description="Ein klarer, strukturierter Prozess von der ersten Analyse bis zum messbaren Wachstum."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.step}
              {...step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
