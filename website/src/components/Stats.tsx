"use client";

import { ComponentType, SVGProps, useRef } from "react";
import { Film, Eye } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TiktokIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { useReveal } from "@/lib/useReveal";
import { useCountUp } from "@/lib/useCountUp";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const stats = [
  {
    icon: TiktokIcon,
    target: 500,
    decimals: 0,
    suffix: "+",
    label: "TikTok-Kurzvideos produziert",
  },
  {
    icon: Eye,
    target: 20,
    decimals: 0,
    suffix: " Mio.+",
    label: "Aufrufe auf TikTok",
  },
  {
    icon: InstagramIcon,
    target: 500,
    decimals: 0,
    suffix: "+",
    label: "Instagram-Kurzvideos produziert",
  },
  {
    icon: Film,
    target: 22,
    decimals: 0,
    suffix: " Mio.+",
    label: "Aufrufe auf Instagram",
  },
];

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatItem({
  icon: Icon,
  target,
  decimals,
  suffix,
  label,
  index,
}: {
  icon: IconComponent;
  target: number;
  decimals: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref, index * 90);
  const count = useCountUp(ref, target);

  return (
    <div
      ref={ref}
      style={reveal.style}
      className={`flex flex-col items-center gap-3 text-center ${reveal.className}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-3xl font-extrabold tracking-tight text-primary-foreground tabular-nums sm:text-4xl">
        {formatNumber(count, decimals)}
        {suffix}
      </span>
      <span className="text-sm text-primary-foreground/60">{label}</span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <Container>
        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-wide text-primary-foreground/50">
          Unsere Reichweite in Zahlen
        </p>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
