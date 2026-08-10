import { Film, Eye } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TiktokIcon, InstagramIcon } from "@/components/ui/SocialIcons";

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

export function Stats() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <Container>
        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-wide text-primary-foreground/50">
          Unsere Reichweite in Zahlen
        </p>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
                {value}
              </span>
              <span className="text-sm text-primary-foreground/60">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
