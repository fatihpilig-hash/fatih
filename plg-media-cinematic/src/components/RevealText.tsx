"use client";

import { useEffect, useRef, type ElementType } from "react";
import SplitType from "split-type";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  start?: string;
};

export default function RevealText({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  start = "top 85%",
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const split = new SplitType(el, { types: "lines", lineClass: "split-line" });
    const lines = split.lines ?? [];

    if (prefersReduced || lines.length === 0) {
      gsap.set(lines, { opacity: 1, y: 0 });
      return () => split.revert();
    }

    gsap.set(lines, { yPercent: 110, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () =>
        gsap.to(lines, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          delay,
          ease: "power4.out",
        }),
      once: true,
    });

    return () => {
      trigger.kill();
      split.revert();
    };
  }, [children, delay, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
