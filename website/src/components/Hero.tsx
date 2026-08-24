"use client";

import { useRef } from "react";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { PlatformIcons } from "@/components/ui/PlatformIcons";
import { HeroVisual } from "@/components/HeroVisual";
import { useReveal } from "@/lib/useReveal";

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
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background-alt px-4 py-1.5 text-sm font-semibold text-foreground/80 lg:mt-0">
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
        </div>

        <div
          ref={visualRef}
          style={visualReveal.style}
          className={`relative mx-auto w-full max-w-md lg:max-w-none ${visualReveal.className}`}
        >
          <div className="absolute inset-x-0 bottom-full mb-4 hidden justify-center lg:flex">
            <PlatformIcons />
          </div>

          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
