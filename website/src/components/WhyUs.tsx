"use client";

import { useRef } from "react";
import { Layers, Handshake, Gauge, ShieldCheck, LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";

const reasons = [
  {
    icon: Layers,
    title: "Alles aus einer Hand",
    description:
      "Social Media, Content, Website, Ads und KI-Automatisierung greifen bei uns ineinander – statt fünf Agenturen zu koordinieren.",
  },
  {
    icon: Handshake,
    title: "Erfahrung in jeder Branche",
    description:
      "Egal in welcher Branche ihr unterwegs seid – wir kennen die Herausforderungen mittelständischer Unternehmen und sprechen eure Sprache.",
  },
  {
    icon: Gauge,
    title: "Ergebnisorientierter Ansatz",
    description:
      "Jede Maßnahme zahlt auf ein klares Ziel ein: mehr Sichtbarkeit, mehr Anfragen oder mehr Mitarbeiter.",
  },
  {
    icon: ShieldCheck,
    title: "Persönlich & transparent",
    description:
      "Feste Ansprechpartner, klare Kommunikation und volle Transparenz über alle laufenden Maßnahmen.",
  },
];

function ReasonCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref, (index % 2) * 100);

  return (
    <div
      ref={ref}
      style={reveal.style}
      className={`flex flex-col gap-3 rounded-2xl border border-border bg-background-alt p-6 ${reveal.className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-bold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function WhyUs() {
  return (
    <section id="warum-wir" className="py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Warum wir"
          title="Ein Partner für euer digitales Wachstum"
          description="Statt Einzelmaßnahmen bekommt ihr eine aufeinander abgestimmte Wachstumsstrategie – gebaut für mittelständische Unternehmen, die planbar wachsen wollen."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <ReasonCard key={reason.title} {...reason} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
