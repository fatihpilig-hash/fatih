import { nav, contact } from "@/lib/site-config";
import SmoothLink from "@/components/SmoothLink";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper py-14">
      <div className="container-edge flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/plg-logo-black.png" alt="PLG Media" className="h-12 w-12" />
          <p className="mt-3 max-w-xs text-sm text-ink/50">
            Social Media, Meta Ads, KI-Automatisierung und Websites für
            Unternehmen, die sichtbar werden wollen.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-warm-gray">
              Navigation
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <SmoothLink
                    href={item.href}
                    className="text-sm text-ink/60 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-warm-gray">
              Kontakt
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-ink/60 transition-colors hover:text-ink"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-edge mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink/40 sm:flex-row sm:justify-between">
        <p>© {year} PLG Media. Alle Rechte vorbehalten.</p>
        <p>Konzept &amp; Umsetzung — PLG Media</p>
      </div>
    </footer>
  );
}
