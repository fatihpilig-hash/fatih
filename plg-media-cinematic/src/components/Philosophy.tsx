"use client";

import { philosophy } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";

export default function Philosophy() {
  return (
    <section id="agentur" className="relative bg-paper pb-28 sm:pb-36">
      <div className="container-edge">
        <div className="mx-auto max-w-3xl border-t border-line pt-16 text-center sm:pt-24">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-warm-gray">
              {philosophy.eyebrow}
            </span>
          </Reveal>
          <RevealText
            as="h2"
            className="font-display mx-auto mt-6 max-w-2xl text-[7vw] font-medium leading-[1.08] text-ink sm:text-[3.2vw]"
          >
            {philosophy.headline}
          </RevealText>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base">
              {philosophy.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
