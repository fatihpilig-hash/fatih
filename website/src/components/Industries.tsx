import { HardHat, Sparkles, Factory, Hammer, Briefcase } from "lucide-react";
import { Container } from "@/components/ui/Container";

const industries = [
  { icon: HardHat, label: "Bauunternehmen" },
  { icon: Sparkles, label: "Gebäudereinigung" },
  { icon: Factory, label: "Industrieunternehmen" },
  { icon: Hammer, label: "Handwerksbetriebe" },
  { icon: Briefcase, label: "Dienstleistungsunternehmen" },
];

export function Industries() {
  return (
    <section id="zielgruppe" className="border-y border-border bg-background-alt py-14">
      <Container>
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Vertrauen von B2B-Unternehmen aus diesen Branchen
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-background px-4 py-6 text-center transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
