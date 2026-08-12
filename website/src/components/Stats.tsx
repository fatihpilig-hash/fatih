"use client";

import { ComponentType, SVGProps, useRef } from "react";
import { Film, Eye } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TiktokIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { useReveal } from "@/lib/useReveal";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const stats = [
  {
    icon: TiktokIcon,
    value: "344",
    label: "TikTok-Kurzvideos produziert",
  },
  {
    icon: Eye,
    value: "16,8 Mio.",
    label: "Aufrufe auf TikTok",
  },
  {
    icon: InstagramIcon,
    value: "347",
    label: "Instagram-Kurzvideos produziert",
  },
  {
    icon: Film,
    value: "16,4 Mio.",
    label: "Aufrufe auf Instagram",
  },
];

function StatItem({
  icon: Icon,
  value,
  label,
  index,
}: {
  icon: IconComponent;
  value: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref, index * 90);

  return (
    <div
      ref={ref}
      style={reveal.style}
      className={`flex flex-col items-center gap-3 text-center ${reveal.className}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
        {value}
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
