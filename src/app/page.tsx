import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealScript from "@/components/RevealScript";
import Hero from "@/components/home/Hero";
import Band from "@/components/home/Band";
import About from "@/components/home/About";
import HowItWorks from "@/components/home/HowItWorks";
import Packages from "@/components/home/Packages";
import HostFamily from "@/components/home/HostFamily";
import Includes from "@/components/home/Includes";
import Payment from "@/components/home/Payment";
import Cancellation from "@/components/home/Cancellation";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <RevealScript />
      <main>
        <Hero />
        <Band />
        <About />
        <hr className="border-none border-t border-rule mx-6 lg:mx-14" />
        <HowItWorks />
        <Packages />
        <HostFamily />
        <Includes />
        <Payment />
        <Cancellation />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}