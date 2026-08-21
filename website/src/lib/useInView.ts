"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Tracks whether an element has scrolled into view, once. Unlike
 * useReveal (which only returns fade-in style props), this exposes the
 * raw boolean so a component can drive several dependent visual states
 * (icon color, connecting lines, etc.) off the same trigger.
 */
export function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.35) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}
