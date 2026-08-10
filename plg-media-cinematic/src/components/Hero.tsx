"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import RevealText from "@/components/RevealText";
import SmoothLink from "@/components/SmoothLink";
import { heroImage } from "@/lib/site-config";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const visual = visualRef.current;
    const overlay = overlayRef.current;
    if (!section || !frame || !visual || !overlay) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
        },
      });

      tl.to(
        frame,
        { padding: 0, duration: 1, ease: "none" },
        0
      )
        .to(visual, { borderRadius: 0, scale: 1.08, duration: 1, ease: "none" }, 0)
        .to(overlay, { opacity: 0, y: -60, duration: 0.6, ease: "power1.out" }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-paper"
    >
      <div
        ref={frameRef}
        className="h-full w-full"
        style={{ padding: "clamp(0.75rem, 2.4vw, 2.5rem)" }}
      >
        <div
          ref={visualRef}
          className="grain relative h-full w-full overflow-hidden rounded-[28px] bg-anthracite"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(12,11,10,0.55) 0%, rgba(12,11,10,0.72) 55%, rgba(12,11,10,0.9) 100%)",
            }}
          />

          {/* glass navbar spacer content lives in Navbar component, positioned globally */}

          <div
            ref={overlayRef}
            className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
              Social Media &amp; KI-Automatisierung
            </span>

            <RevealText
              as="h1"
              className="font-display max-w-4xl text-[13vw] font-medium leading-[0.95] text-white sm:text-[9vw] lg:text-[6.4vw]"
            >
              Sichtbarkeit, die Ihr Handwerk verdient.
            </RevealText>

            <p className="mt-8 max-w-xl text-balance text-base text-white/70 sm:text-lg">
              PLG Media macht aus operativer Stärke digitale Präsenz —
              Kampagnen, Content und Automatisierung für Bau- und
              Gebäudereinigungsunternehmen, die wachsen wollen.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <SmoothLink
                href="#kontakt"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.04]"
              >
                Erstgespräch buchen
              </SmoothLink>
              <SmoothLink
                href="#leistungen"
                className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10"
              >
                Leistungen ansehen
              </SmoothLink>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50">
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Scrollen
            </span>
            <span className="h-8 w-px bg-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
