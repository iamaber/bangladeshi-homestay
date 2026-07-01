import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Band from "@/components/home/Band";
import About from "@/components/home/About";
import HowItWorks from "@/components/home/HowItWorks";
import HostFamily from "@/components/home/HostFamily";
import Gallery from "@/components/home/Gallery";
import Payment from "@/components/home/Payment";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Band />
        <About />
        <hr className="border-none border-t border-rule mx-6 lg:mx-14" />
        <HowItWorks />
        <HostFamily />
        <Gallery />
        <Payment />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
