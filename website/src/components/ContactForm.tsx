"use client";

import { FormEvent, useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

const inputClasses =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Nachricht konnte nicht gesendet werden.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Nachricht konnte nicht gesendet werden."
      );
    }
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
          noValidate
          className="flex flex-col gap-5 rounded-3xl border border-border bg-background-alt p-8"
        >
          {status === "success" && (
            <p
              role="status"
              className="rounded-xl bg-accent-soft px-4 py-3 text-sm font-medium text-accent"
            >
              Danke für deine Anfrage! Wir melden uns innerhalb von 1–2
              Werktagen bei dir.
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
            >
              {errorMessage}
            </p>
          )}

          {/* Honeypot field: hidden from real users, left empty by them. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

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
            disabled={status === "loading"}
            className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Wird gesendet …
              </>
            ) : (
              <>
                Anfrage senden
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </Container>
    </section>
  );
}
