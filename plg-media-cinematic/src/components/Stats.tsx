"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/lib/site-config";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";

export default function Stats() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const numbers = section.querySelectorAll<HTMLElement>("[data-stat-value]");
    const format = (value: number, decimals: number, suffix: string) =>
      `${value.toLocaleString("de-DE", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    if (prefersReduced) {
      numbers.forEach((el) => {
        const target = Number(el.dataset.statValue ?? 0);
        const decimals = Number(el.dataset.statDecimals ?? 0);
        const suffix = el.dataset.statSuffix ?? "";
        el.textContent = format(target, decimals, suffix);
      });
      return;
    }

    const ctx = gsap.context(() => {
      numbers.forEach((el) => {
        const target = Number(el.dataset.statValue ?? 0);
        const decimals = Number(el.dataset.statDecimals ?? 0);
        const suffix = el.dataset.statSuffix ?? "";
        const counter = { value: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(counter, {
              value: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = format(counter.value, decimals, suffix);
              },
            }),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="grain relative bg-anthracite py-24 sm:py-32"
    >
      <div className="container-edge grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.05}>
            <p className="font-display text-[15vw] font-medium leading-none text-white sm:text-[7vw] lg:text-[4vw]">
              <span
                data-stat-value={stat.value}
                data-stat-decimals={stat.decimals}
                data-stat-suffix={stat.suffix}
              >
                0{stat.suffix}
              </span>
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.15em] text-white/50 sm:text-sm">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
