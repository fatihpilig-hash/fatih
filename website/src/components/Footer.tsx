import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import {
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
} from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/site-config";

const socials = [
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt">
      <Container className="flex flex-col gap-10 py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Link
              href="#top"
              className="flex items-center gap-3 font-serif text-lg font-bold text-foreground"
            >
              <Logo className="h-10 w-10" />
              {siteConfig.name}
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline} für Bauunternehmen, Handwerksbetriebe,
              Gebäudereiniger, Industrie- und Dienstleistungsunternehmen.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:flex sm:flex-col">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground/70 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-sm text-foreground/70">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="hover:text-accent"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte
            vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-accent">
              Impressum
            </a>
            <a href="#" className="hover:text-accent">
              Datenschutz
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
