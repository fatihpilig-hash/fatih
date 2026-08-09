"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
};

export default function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  duration = 0.7,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [y, delay, duration, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
