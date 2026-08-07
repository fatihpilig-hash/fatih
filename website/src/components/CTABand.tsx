import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export function CTABand() {
  return (
    <section className="py-6">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(79,70,229,0.35)_0%,transparent_70%)]"
          />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
              Bereit für planbares digitales Wachstum?
            </h2>
            <p className="max-w-xl text-lg text-primary-foreground/70">
              Lasst uns in einem kostenlosen Erstgespräch besprechen, wie ihr
              mehr Sichtbarkeit, Anfragen und Mitarbeiter gewinnt.
            </p>
            <LinkButton href="#kontakt" size="lg">
              Jetzt Erstgespräch sichern
              <ArrowUpRight className="h-5 w-5" />
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
