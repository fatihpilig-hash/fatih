"use client";

import { useId } from "react";

export function Logo({ className = "h-11 w-11" }: { className?: string }) {
  const id = useId();
  const topPathId = `${id}-top`;
  const bottomPathId = `${id}-bottom`;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="PLG Media Logo"
    >
      <circle cx="50" cy="50" r="48" fill="var(--color-primary)" />
      <path
        id={topPathId}
        d="M 15,50 A 35,35 0 0 1 85,50"
        fill="none"
      />
      <path
        id={bottomPathId}
        d="M 15,52 A 35,35 0 0 0 62,83"
        fill="none"
      />
      <text
        fill="var(--color-primary-foreground)"
        fontSize="7.5"
        letterSpacing="2.5"
        fontFamily="var(--font-sans), sans-serif"
        fontWeight="600"
      >
        <textPath href={`#${topPathId}`} startOffset="50%" textAnchor="middle">
          MARKETING
        </textPath>
      </text>
      <text
        fill="var(--color-primary-foreground)"
        fontSize="7"
        letterSpacing="2"
        fontFamily="var(--font-sans), sans-serif"
        fontWeight="600"
      >
        <textPath href={`#${bottomPathId}`} startOffset="50%" textAnchor="middle">
          PLG MEDIA
        </textPath>
      </text>
      <text
        x="50"
        y="59"
        fill="var(--color-primary-foreground)"
        fontSize="30"
        fontFamily="var(--font-serif), serif"
        textAnchor="middle"
      >
        PLG
      </text>
    </svg>
  );
}
