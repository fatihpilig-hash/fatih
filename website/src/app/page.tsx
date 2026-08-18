import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { WhyUs } from "@/components/WhyUs";
import { Reviews } from "@/components/Reviews";
import { CTABand } from "@/components/CTABand";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
      <Services />
      <Process />
      <WhyUs />
      <Reviews />
      <CTABand />
      <ContactForm />
    </main>
  );
}
