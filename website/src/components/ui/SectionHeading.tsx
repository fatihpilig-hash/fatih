"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref);

  return (
    <div
      ref={ref}
      style={reveal.style}
      className={`flex flex-col ${alignment} max-w-2xl gap-4 ${reveal.className}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full bg-accent-soft px-4 py-1.5 text-sm font-semibold text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
