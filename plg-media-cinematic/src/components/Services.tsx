"use client";

import { useRef } from "react";
import { services } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";

export default function Services() {
  const listRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="leistungen"
      className="grain relative bg-anthracite py-28 sm:py-36"
    >
      <div className="container-edge">
        <div className="mb-16 flex flex-col gap-6 sm:mb-24 sm:flex-row sm:items-end sm:justify-between">
          <RevealText
            as="h2"
            className="font-display max-w-xl text-[9vw] font-medium leading-[1.02] text-white sm:text-[3.6vw]"
          >
            Leistungen, die zusammenwirken.
          </RevealText>
          <Reveal>
            <p className="max-w-sm text-sm text-white/60 sm:text-base">
              Sieben Disziplinen, ein System. Jede Leistung steht für sich —
              gemeinsam ergeben sie eine Marke, die konstant sichtbar ist.
            </p>
          </Reveal>
        </div>

        <div ref={listRef} className="divide-y divide-white/10 border-t border-white/10">
          {services.map((service, i) => (
            <Reveal key={service.index} delay={i * 0.04} y={20}>
              <div className="group grid grid-cols-1 gap-4 py-8 transition-colors duration-500 sm:grid-cols-12 sm:items-center sm:gap-6 sm:py-10">
                <span className="font-display text-sm text-white/40 sm:col-span-1 sm:text-base">
                  {service.index}
                </span>
                <h3 className="font-display text-2xl text-white transition-transform duration-500 group-hover:translate-x-2 sm:col-span-5 sm:text-3xl lg:text-4xl">
                  {service.title}
                </h3>
                <div className="sm:col-span-5">
                  <p className="text-sm leading-relaxed text-white/55 sm:text-base">
                    {service.description}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.1em] text-white/30">
                    {service.tags.join(" · ")}
                  </p>
                </div>
                <span className="hidden text-white/30 transition-all duration-500 group-hover:translate-x-2 group-hover:text-white sm:col-span-1 sm:block sm:text-right">
                  →
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
