"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { useReveal } from "@/lib/useReveal";

const points = [
  {
    step: "01",
    title: "Design & Branding",
    description:
      "Ein professioneller erster Eindruck entscheidet. Wir gestalten euren Online-Shop passend zu eurer Marke – inklusive Logo, Farben, Produktdarstellung und einem einheitlichen Erscheinungsbild.",
  },
  {
    step: "02",
    title: "Produkte & Shop-Einrichtung",
    description:
      "Wir übernehmen die Einrichtung eurer Produkte, Produktbilder, Beschreibungen, Kategorien, Preise und Varianten. Euer Shop wird übersichtlich strukturiert und verkaufsbereit eingerichtet.",
  },
  {
    step: "03",
    title: "Online-Marketing & Werbekampagnen",
    description:
      "Wir bringen potenzielle Käufer direkt zu eurem Online-Shop. Durch professionelle Werbekampagnen auf Meta (Facebook & Instagram), TikTok und weiteren Plattformen steigern wir eure Reichweite und generieren Verkäufe.",
  },
  {
    step: "04",
    title: "Laufende Shop-Betreuung",
    description:
      "Wir lassen euch nach dem Launch nicht allein. Wir kümmern uns um Aktualisierungen, neue Produkte, Anpassungen, technische Betreuung und die kontinuierliche Optimierung eures Online-Shops.",
  },
  {
    step: "05",
    title: "Optimierung & Wachstum",
    description:
      "Wir analysieren die Performance eures Shops, optimieren Conversion-Raten, verbessern die Customer Journey und entwickeln Strategien, um langfristig mehr aus eurem Online-Shop herauszuholen.",
  },
];

function PointCard({
  step,
  title,
  description,
  index,
}: {
  step: string;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref, (index % 3) * 90);

  return (
    <div
      ref={ref}
      style={reveal.style}
      className={`flex flex-col gap-3 rounded-2xl border border-border bg-background-alt p-6 ${reveal.className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-sm font-bold text-accent">
        {step}
      </span>
      <h3 className="font-bold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function Ecommerce() {
  return (
    <section id="online-shops" className="py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          title="E-Commerce & Online-Shops"
          titleExtra={
            <Image
              src="/platform-icons/icon-shopify.png"
              alt="Shopify"
              width={128}
              height={128}
              className="inline-block h-[1.875rem] w-auto align-middle object-contain sm:h-9 lg:h-11"
            />
          }
          description="Wir erstellen professionelle und verkaufsoptimierte Online-Shops, die Besucher in Kunden verwandeln. Individuelles Design, benutzerfreundliche Navigation und eine optimale technische Einrichtung."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point, index) => (
            <PointCard key={point.step} {...point} index={index} />
          ))}
        </div>

        <div className="flex justify-center">
          <LinkButton href="#kontakt" size="lg">
            Kostenloses Erstgespräch
            <ArrowUpRight className="h-5 w-5" />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
