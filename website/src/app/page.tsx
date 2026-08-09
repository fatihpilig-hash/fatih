import { Hero } from "@/components/Hero";
import { Industries } from "@/components/Industries";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { WhyUs } from "@/components/WhyUs";
import { CTABand } from "@/components/CTABand";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Industries />
      <Services />
      <Process />
      <WhyUs />
      <CTABand />
      <ContactForm />
    </main>
  );
}
