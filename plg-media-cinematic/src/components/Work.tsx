"use client";

import { useEffect, useRef } from "react";
import { work } from "@/lib/site-config";
import { gsap } from "@/lib/gsap";
import RevealText from "@/components/RevealText";

export default function Work() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => track.scrollWidth - section.clientWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".work-card");
      cards.forEach((card) => {
        const visual = card.querySelector(".work-visual");
        if (!visual) return;
        gsap.fromTo(
          visual,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="arbeiten"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-paper py-28 sm:h-screen sm:overflow-hidden sm:py-0"
    >
      <div className="container-edge mb-12 sm:absolute sm:top-16 sm:z-10 sm:mb-0 sm:w-full">
        <RevealText
          as="h2"
          className="font-display max-w-2xl text-[8vw] font-medium leading-[1.02] text-ink sm:text-[3.4vw]"
        >
          Ausgewählte Arbeiten.
        </RevealText>
      </div>

      <div
        ref={trackRef}
        className="container-edge flex flex-col gap-6 sm:absolute sm:inset-0 sm:flex-row sm:items-center sm:gap-10 sm:pl-[10vw] sm:pr-[20vw]"
      >
        {work.map((project) => (
          <div
            key={project.index}
            className="work-card flex w-full shrink-0 flex-col gap-5 sm:w-[70vw] sm:max-w-xl lg:w-[46vw]"
          >
            <div className="work-visual grain relative aspect-[4/3] overflow-hidden rounded-2xl bg-anthracite">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(12,11,10,0) 40%, rgba(12,11,10,0.75) 100%)",
                }}
              />
              <span className="font-display absolute bottom-6 left-6 text-6xl text-white/25">
                {project.index}
              </span>
            </div>
            <div>
              <h3 className="font-display text-2xl text-ink sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-ink/50">{project.category}</p>
              <p className="mt-3 text-sm font-medium text-ink/80">
                {project.result}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
