import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { IndustryShowcase } from "@/components/sections/IndustryShowcase";
import { Devices } from "@/components/sections/Devices";
import { Comparison } from "@/components/sections/Comparison";
import { Stats } from "@/components/sections/Stats";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Integrations } from "@/components/sections/Integrations";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MobileCTA } from "@/components/MobileCTA";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <HowItWorks />
        <IndustryShowcase />
        <Devices />
        <Comparison />
        <Stats />
        <Pricing />
        <Testimonials />
        <Integrations />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
