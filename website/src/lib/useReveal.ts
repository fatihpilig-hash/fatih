"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Fades + rises an element into place the first time it scrolls into
 * view. Fires once. For prefers-reduced-motion, the global CSS rule in
 * globals.css already collapses the transition duration to ~0, so the
 * element still needs no separate reduced-motion branch here (which
 * would otherwise render differently on the server vs. the client and
 * break hydration).
 *
 * Usage: create the ref locally with useRef in your component, pass it
 * in here, and spread the returned className/style onto that element.
 */
export function useReveal(ref: RefObject<HTMLElement | null>, delayMs = 0) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return {
    className: `reveal${visible ? " reveal-visible" : ""}`,
    style: { transitionDelay: `${delayMs}ms` },
  };
}
