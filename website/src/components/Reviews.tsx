import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reviews = [
  {
    name: "S. Koc",
    reviewCount: "3 Rezensionen",
    timeAgo: "vor einem Monat",
    text: "Wir sind mit der Betreuung unserer Social-Media-Kanäle auf Facebook, Instagram und TikTok durch PLG Media sehr zufrieden. Die Zusammenarbeit ist professionell, zuverlässig und unkompliziert. Kreative Inhalte, schnelle Kommunikation und eine tolle Umsetzung.\n\nUnsere Auftritte auf den Sozialen Plattformen wirken heute deutlich moderner und professioneller, was wir auch durch positives Feedback von Kunden und Geschäftspartnern merken.\n\nAbsolut empfehlenswert. Vielen Dank für die gute Zusammenarbeit!",
  },
  {
    name: "Lorik Berisha",
    reviewCount: null,
    timeAgo: null,
    text: "Eine sehr gute Empfehlung. Hab mir aus Interesse halber mehrere Unternehmen dieser Branchen angehört und muss mit Abstand sagen dass dieses Unternehmen mich am meisten überzeugt hat.",
  },
  {
    name: "Se Ko",
    reviewCount: "2 Rezensionen",
    timeAgo: "vor einem Monat",
    text: "Professionelle Unterstützung. Top Beratung. Nichts zu meckern!",
  },
];

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18A13.98 13.98 0 0 1 10.9 24c0-1.45.25-2.86.7-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

export function Reviews() {
  return (
    <section id="bewertungen" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Bewertungen"
          title="Das sagen unsere Kunden"
          description="Echte Google-Rezensionen von Unternehmen, die wir betreuen."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {reviews.map(({ name, reviewCount, timeAgo, text }) => (
            <div
              key={name}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-background-alt p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {name.charAt(0)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {[reviewCount, timeAgo].filter(Boolean).join(" · ")}
                    </span>
                  </div>
                </div>
                <GoogleLogo className="h-5 w-5 shrink-0" />
              </div>

              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
