"use client";

import { FormEvent, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

const inputClasses =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const company = String(form.get("company") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = `Erstgespräch-Anfrage von ${name || "Website"}`;
    const body = [
      `Name: ${name}`,
      `Unternehmen: ${company}`,
      `E-Mail: ${email}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <section id="kontakt" className="py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            align="left"
            eyebrow="Kontakt"
            title="Lass uns über euer Wachstum sprechen"
            description="Erzähl uns kurz von deinem Unternehmen – wir melden uns innerhalb von 1–2 Werktagen für ein kostenloses Erstgespräch."
          />

          <div className="flex flex-col gap-5 text-sm">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-foreground/80 hover:text-accent"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-alt text-accent">
                <Mail className="h-4 w-4" />
              </span>
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 text-foreground/80 hover:text-accent"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-alt text-accent">
                <Phone className="h-4 w-4" />
              </span>
              {siteConfig.phone}
            </a>
            <span className="flex items-center gap-3 text-foreground/80">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-alt text-accent">
                <MapPin className="h-4 w-4" />
              </span>
              Deutschlandweit tätig
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-3xl border border-border bg-background-alt p-8"
        >
          {sent && (
            <p
              role="status"
              className="rounded-xl bg-accent-soft px-4 py-3 text-sm font-medium text-accent"
            >
              Dein E-Mail-Programm öffnet sich mit deiner Anfrage – vielen
              Dank!
            </p>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Max Mustermann"
                className={inputClasses}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-sm font-medium text-foreground">
                Unternehmen
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Mustermann GmbH"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="max@unternehmen.de"
              className={inputClasses}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Nachricht
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Erzähl uns kurz von deinem Unternehmen und deinen Zielen."
              className={`${inputClasses} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Anfrage senden
            <Send className="h-4 w-4" />
          </button>
        </form>
      </Container>
    </section>
  );
}
