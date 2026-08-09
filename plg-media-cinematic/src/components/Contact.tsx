"use client";

import { contact } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";

export default function Contact() {
  return (
    <section id="kontakt" className="relative bg-paper py-28 sm:py-40">
      <div className="container-edge">
        <div className="grain relative overflow-hidden rounded-[32px] bg-ink px-8 py-20 text-center sm:px-16 sm:py-28">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(90% 70% at 50% 0%, #2a2724 0%, #0c0b0a 70%)",
            }}
          />
          <div className="relative z-10">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.25em] text-white/50">
                {contact.eyebrow}
              </span>
            </Reveal>
            <RevealText
              as="h2"
              className="font-display mx-auto mt-6 max-w-3xl text-[9vw] font-medium leading-[1.05] text-white sm:text-[4.4vw]"
            >
              {contact.headline}
            </RevealText>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-8 max-w-md text-sm text-white/60 sm:text-base">
                {contact.body}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href={`mailto:${contact.email}`}
                  className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.04]"
                >
                  {contact.ctaLabel}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
