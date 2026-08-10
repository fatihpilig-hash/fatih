"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TypeformPopupButton } from "@/components/ui/TypeformButton";
import { siteConfig } from "@/lib/site-config";

const inputClasses =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const FRIENDLY_FALLBACK_ERROR =
  "Eure Nachricht konnte nicht gesendet werden. Bitte versucht es später erneut oder schreibt uns direkt an info@plgmedia.de.";

const PRIVACY_REQUIRED_ERROR =
  "Bitte bestätigt, dass ihr die Datenschutzerklärung gelesen habt.";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!data.get("privacy")) {
      setStatus("error");
      setErrorMessage(PRIVACY_REQUIRED_ERROR);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          typeof result.error === "string" ? result.error : FRIENDLY_FALLBACK_ERROR
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(FRIENDLY_FALLBACK_ERROR);
    }
  }

  return (
    <section id="kontakt" className="py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            align="left"
            eyebrow="Kontakt"
            title="Lasst uns über euer Wachstum sprechen"
            description="Erzählt uns kurz von eurem Unternehmen – wir melden uns innerhalb von 1–2 Werktagen für ein kostenloses Erstgespräch."
          />

          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background-alt p-6">
            <p className="text-sm font-semibold text-foreground">
              Lieber direkt loslegen?
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Beantwortet ein paar kurze Fragen zu eurem Unternehmen – dauert
              nur 2 Minuten, wir melden uns danach persönlich bei euch.
            </p>
            <TypeformPopupButton className="self-start">
              Fragebogen starten
              <ArrowUpRight className="h-4 w-4" />
            </TypeformPopupButton>
          </div>

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
              className="flex items-start gap-3 rounded-xl bg-accent-soft px-4 py-3 text-sm font-medium text-accent"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              Danke für eure Anfrage! Wir melden uns innerhalb von 1–2
              Werktagen bei euch.
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="flex items-start gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
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
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                Telefonnummer
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+49 176 12345678"
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
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Nachricht
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Erzählt uns kurz von eurem Unternehmen und euren Zielen."
              className={`${inputClasses} resize-none`}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-border text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            <label
              htmlFor="privacy"
              className="text-sm leading-relaxed text-foreground/80"
            >
              Ich habe die{" "}
              <Link
                href="/datenschutz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2 hover:text-accent-hover"
              >
                Datenschutzerklärung
              </Link>{" "}
              gelesen und stimme der Verarbeitung meiner Daten gemäß dieser
              zu.
            </label>
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
