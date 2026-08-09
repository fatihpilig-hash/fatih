"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import RevealText from "@/components/RevealText";

export default function EditorialStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const mask = maskRef.current;
    if (!section || !text || !mask) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.set(mask, { clipPath: "circle(0% at 50% 50%)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=90%",
          scrub: 0.8,
          pin: true,
        },
      });

      tl.to(text, { scale: 0.92, opacity: 0, duration: 0.6, ease: "power1.out" }, 0.1)
        .to(
          mask,
          { clipPath: "circle(75% at 50% 50%)", duration: 0.6, ease: "power2.inOut" },
          0.35
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-paper"
    >
      <div ref={textRef} className="container-edge max-w-4xl text-center">
        <RevealText
          as="p"
          className="font-display text-balance text-[8vw] font-medium leading-[1.05] text-ink sm:text-[4.4vw]"
        >
          Wir verwandeln handwerkliche Exzellenz in eine Marke, die man nicht übersieht.
        </RevealText>
      </div>

      <div
        ref={maskRef}
        className="absolute inset-0 z-[1] bg-anthracite"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />
    </section>
  );
}
