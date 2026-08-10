"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/site-config";
import SmoothLink from "@/components/SmoothLink";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container-edge">
        <nav
          className={`flex items-center justify-between rounded-full border transition-all duration-500 ${
            scrolled
              ? "border-line bg-paper/70 px-5 py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl"
              : "border-transparent bg-transparent px-2 py-2"
          }`}
        >
          <SmoothLink href="#top" aria-label="PLG Media — Startseite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dark ? "/brand/plg-logo-black.png" : "/brand/plg-logo-white.png"}
              alt="PLG Media"
              className="h-10 w-10 transition-opacity duration-500 sm:h-11 sm:w-11"
            />
          </SmoothLink>

          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <SmoothLink
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled
                      ? "text-ink/70 hover:text-ink"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {item.label}
                </SmoothLink>
              </li>
            ))}
          </ul>

          <SmoothLink
            href="#kontakt"
            className={`hidden rounded-full px-5 py-2 text-sm font-medium transition-all duration-500 hover:scale-[1.03] md:inline-block ${
              scrolled ? "bg-ink text-paper" : "bg-white text-ink"
            }`}
          >
            Erstgespräch buchen
          </SmoothLink>

          <button
            aria-label="Menü öffnen"
            aria-expanded={open}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-500 md:hidden ${
              dark ? "border-line" : "border-white/30"
            }`}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 transition-all duration-300 ${
                  dark ? "bg-ink" : "bg-white"
                } ${open ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-4 transition-all duration-300 ${
                  dark ? "bg-ink" : "bg-white"
                } ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </nav>

        {open && (
          <div className="mt-2 rounded-3xl border border-line bg-paper/95 p-6 backdrop-blur-xl md:hidden">
            <ul className="flex flex-col gap-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <SmoothLink
                    href={item.href}
                    className="text-base font-medium text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </SmoothLink>
                </li>
              ))}
              <li>
                <SmoothLink
                  href="#kontakt"
                  className="mt-2 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper"
                  onClick={() => setOpen(false)}
                >
                  Erstgespräch buchen
                </SmoothLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
