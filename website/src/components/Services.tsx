import {
  Smartphone,
  Camera,
  Globe,
  Bot,
  Megaphone,
  Target,
  UserPlus,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    icon: Smartphone,
    title: "Social Media Management",
    description:
      "Instagram, TikTok, LinkedIn & Facebook professionell betreut – von der Strategie bis zur Community.",
    points: [
      "Content-Strategie",
      "Reels & Kurzvideos",
      "Posting & Betreuung",
      "Community-Aufbau",
    ],
  },
  {
    icon: Camera,
    title: "Content-Produktion",
    description:
      "Hochwertiges Bild- und Videomaterial, das dein Unternehmen authentisch zeigt.",
    points: [
      "Professionelle Fotos",
      "Imagevideos",
      "Reels",
      "Drohnenaufnahmen",
      "Baustellen- & Unternehmenscontent",
    ],
  },
  {
    icon: Globe,
    title: "Websites",
    description:
      "Moderne, conversion-optimierte Websites, die aus Besuchern Anfragen machen.",
    points: [
      "Moderne Unternehmenswebsites",
      "Landingpages",
      "Conversion-optimierter Aufbau",
      "Kontaktformulare & Terminbuchung",
    ],
  },
  {
    icon: Bot,
    title: "KI-Automatisierungen",
    description:
      "Digitale Workflows, die Anfragen automatisch erfassen und bearbeiten.",
    points: [
      "Automatische Lead-Erfassung",
      "KI-gestützte Kundenkommunikation",
      "Automatisierte Prozesse",
      "Digitale Workflows",
    ],
  },
  {
    icon: Megaphone,
    title: "Werbeanzeigen",
    description:
      "Zielgerichtete Meta-Ads-Kampagnen für Reichweite, Leads und Bewerbungen.",
    points: [
      "Meta Ads (Facebook & Instagram)",
      "Leadgenerierung",
      "Recruiting-Kampagnen",
      "Reichweitenkampagnen",
    ],
  },
  {
    icon: Target,
    title: "Leadgenerierung",
    description: "Planbar mehr qualifizierte Anfragen für dein Unternehmen.",
    points: [
      "Mehr Anfragen",
      "Mehr Kunden",
      "Qualifizierte Leads",
      "Funnel & Landingpages",
    ],
  },
  {
    icon: UserPlus,
    title: "Recruiting",
    description:
      "Neue Mitarbeiter über Social Media gewinnen – von der Kampagne bis zur Bewerbung.",
    points: [
      "Mitarbeitergewinnung über Social Media",
      "Bewerberkampagnen",
      "Optimierte Bewerbungsprozesse",
    ],
  },
];

export function Services() {
  return (
    <section id="leistungen" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Leistungen"
          title="Alles, was ihr für digitales Wachstum braucht"
          description="Von Social Media über Websites bis zu KI-Automatisierung und Werbeanzeigen – aus einer Hand geplant und umgesetzt."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description, points }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-accent">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <ul className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
