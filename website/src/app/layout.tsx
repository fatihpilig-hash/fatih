import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "PLG Media – Marketing für B2B-Unternehmen",
  description:
    "PLG Media hilft B2B-Unternehmen wie Bauunternehmen, Handwerksbetrieben und Dienstleistern durch Social Media, Websites, KI-Automatisierung und Werbeanzeigen zu mehr Sichtbarkeit, Anfragen und Mitarbeitern.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
