import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EditorialStatement from "@/components/EditorialStatement";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Philosophy from "@/components/Philosophy";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EditorialStatement />
        <Services />
        <Work />
        <Process />
        <Philosophy />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
