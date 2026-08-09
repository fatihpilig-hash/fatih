"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLenis } from "@/lib/lenis-context";

export default function SmoothLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  const lenisRef = useLenis();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (href?.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            if (lenisRef?.current) {
              lenisRef.current.scrollTo(target as HTMLElement, { duration: 1.2 });
            } else {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
