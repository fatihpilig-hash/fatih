"use client";

import { useRef } from "react";
import { ArrowUpRight, PlayCircle, TrendingUp, Users, Eye } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { PlatformIcons } from "@/components/ui/PlatformIcons";
import { useReveal } from "@/lib/useReveal";

const floatingCards = [
  { icon: Eye, label: "Sichtbarkeit", trend: "steigend" },
  { icon: TrendingUp, label: "Anfragen", trend: "steigend" },
  { icon: Users, label: "Mitarbeiter", trend: "gewinnen" },
];

export function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const textReveal = useReveal(textRef);
  const visualRef = useRef<HTMLDivElement>(null);
  const visualReveal = useReveal(visualRef, 150);

  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,var(--color-accent-soft)_0%,transparent_70%)]"
      />
      <div className="absolute inset-x-0 top-3 flex justify-center lg:hidden">
        <PlatformIcons />
      </div>
      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          ref={textRef}
          style={textReveal.style}
          className={`flex flex-col items-start gap-7 ${textReveal.className}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background-alt px-4 py-1.5 text-sm font-semibold text-foreground/80">
            Social Media für dein Unternehmen
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Mehr Sichtbarkeit.
            <br />
            Mehr Anfragen.
            <br />
            <span className="text-accent">Mehr Wachstum.</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Wir helfen Unternehmen dabei, mehr Neukunden zu gewinnen,
            qualifizierte Mitarbeiter zu finden und ihre Reichweite zu
            steigern – mit Social Media, modernen Websites,
            KI-Automatisierung und gezielten Werbeanzeigen. Professionell,
            ergebnisorientiert und aus einer Hand.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <LinkButton href="#kontakt" size="lg">
              Kostenloses Erstgespräch
              <ArrowUpRight className="h-5 w-5" />
            </LinkButton>
            <LinkButton href="#leistungen" size="lg" variant="ghost">
              <PlayCircle className="h-5 w-5" />
              Leistungen ansehen
            </LinkButton>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Für jede Branche
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Alles aus einer Hand
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Persönliche Betreuung
            </span>
          </div>
        </div>

        <div
          ref={visualRef}
          style={visualReveal.style}
          className={`relative mx-auto w-full max-w-md lg:max-w-none ${visualReveal.className}`}
        >
          <div className="absolute inset-x-0 bottom-full mb-4 hidden justify-center lg:flex">
            <PlatformIcons />
          </div>

          <div className="relative aspect-[4/5] w-full rounded-[2rem] bg-primary p-8 shadow-2xl shadow-primary/20 sm:p-10">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-sm font-medium text-primary-foreground/60">
                  Digitales Wachstum
                </p>
                <p className="mt-1 text-2xl font-bold text-primary-foreground">
                  Für euer Unternehmen
                </p>
              </div>

              <div
                aria-hidden
                className="relative h-40 w-full overflow-hidden rounded-2xl bg-white/5"
              >
                <svg
                  viewBox="0 0 200 100"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points="0,85 30,70 60,75 90,45 120,50 150,20 200,10"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-3">
                {floatingCards.map(({ icon: Icon, label, trend }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 backdrop-blur"
                  >
                    <span className="flex items-center gap-3 text-sm font-medium text-primary-foreground">
                      <Icon className="h-4 w-4 text-accent" />
                      {label}
                    </span>
                    <span className="text-xs font-semibold text-accent">
                      {trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
