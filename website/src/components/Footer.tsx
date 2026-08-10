"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import {
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  TiktokIcon,
} from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/site-config";

const socials = [
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/plg_media",
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com/plgmedia1",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fatihpilig/",
  },
  {
    icon: TiktokIcon,
    label: "TikTok",
    href: "https://www.tiktok.com/@plg_media",
  },
];

export function Footer() {
  const pathname = usePathname();
  const homePrefix = pathname === "/" ? "" : "/";

  return (
    <footer className="border-t border-border bg-background-alt">
      <Container className="flex flex-col gap-10 py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo variant="schwarz" className="h-9 w-auto" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline} in jeder Branche.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
                href={`${homePrefix}${item.href}`}
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
            <Link href="/impressum" className="hover:text-accent">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-accent">
              Datenschutz
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
