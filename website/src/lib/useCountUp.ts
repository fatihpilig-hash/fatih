"use client";

import { RefObject, useEffect, useState } from "react";

const DURATION_MS = 5000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Counts a number up from 0 to `target` over ~5s, once, the first time
 * the given element scrolls into view. Jumps straight to the final
 * value for prefers-reduced-motion.
 */
export function useCountUp(ref: RefObject<HTMLElement | null>, target: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frameId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValue(target);
          return;
        }

        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          setValue(target * easeOutCubic(progress));
          if (progress < 1) {
            frameId = requestAnimationFrame(tick);
          }
        }

        frameId = requestAnimationFrame(tick);
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [ref, target]);

  return value;
}
