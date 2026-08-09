import type { Metadata } from "next";
import { Bodoni_Moda, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PLG Media — Social Media & KI-Automatisierung für ambitionierte Marken",
  description:
    "PLG Media ist eine Premium-Agentur für Social Media Management, Meta Ads, KI-Automatisierungen und Webseiten — für Unternehmen aus Bau und Gebäudereinigung, die sichtbar werden wollen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${bodoni.variable} ${schibsted.variable} antialiased`}
    >
      <body className="bg-paper text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
