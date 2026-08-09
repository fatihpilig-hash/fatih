"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between py-4">
        <Logo
          variant="schwarz"
          className="h-10 w-auto sm:h-12"
          priority
          onClick={() => setOpen(false)}
        />

        <nav className="hidden items-center gap-8 lg:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton href="#kontakt" size="md">
            Kostenloses Erstgespräch
            <ArrowUpRight className="h-4 w-4" />
          </LinkButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-background-alt"
              >
                {item.label}
              </a>
            ))}
            <LinkButton href="#kontakt" size="md" className="mt-3 w-full">
              Kostenloses Erstgespräch
              <ArrowUpRight className="h-4 w-4" />
            </LinkButton>
          </Container>
        </div>
      )}
    </header>
  );
}
