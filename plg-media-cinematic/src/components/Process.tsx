"use client";

import { process } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";

export default function Process() {
  return (
    <section id="prozess" className="relative bg-paper py-28 sm:py-36">
      <div className="container-edge">
        <RevealText
          as="h2"
          className="font-display mb-16 max-w-xl text-[8vw] font-medium leading-[1.02] text-ink sm:mb-24 sm:text-[3.4vw]"
        >
          Arbeitsweise.
        </RevealText>

        <div className="grid grid-cols-1 gap-10 border-t border-line pt-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-16 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.06}>
              <span className="font-display block text-sm text-warm-gray">
                {step.index}
              </span>
              <h3 className="font-display mt-4 text-2xl text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/55">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
