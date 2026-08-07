import { Search, Compass, Rocket, LineChart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Analyse",
    description:
      "Wir verschaffen uns ein klares Bild von deinem Unternehmen, deiner Zielgruppe und deinem Wettbewerb.",
  },
  {
    icon: Compass,
    step: "02",
    title: "Strategie",
    description:
      "Daraus entwickeln wir eine individuelle Strategie über Social Media, Website, Ads und Automatisierung.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Umsetzung",
    description:
      "Content, Website und Kampagnen werden professionell produziert und live geschaltet.",
  },
  {
    icon: LineChart,
    step: "04",
    title: "Wachstum",
    description:
      "Wir optimieren laufend anhand der Ergebnisse – für nachhaltiges, planbares Wachstum.",
  },
];

export function Process() {
  return (
    <section id="ablauf" className="bg-background-alt py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Ablauf"
          title="So arbeiten wir zusammen"
          description="Ein klarer, strukturierter Prozess von der ersten Analyse bis zum messbaren Wachstum."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, step, title, description }, i) => (
            <div key={step} className="relative flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  {step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-6 left-[calc(100%_+_1rem)] hidden h-px w-8 bg-border lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
