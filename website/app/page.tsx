import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueBar from "@/components/ValueBar";
import HowItWorks from "@/components/HowItWorks";
import FeatureShowcase from "@/components/FeatureShowcase";
import AppPreview from "@/components/AppPreview";
import AudienceSection from "@/components/AudienceSection";
import AboutSection from "@/components/AboutSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";

export default function Home() {
  return (
    <ScrollAnimationProvider>
      <Navbar />
      <main>
        <Hero />
        <ValueBar />
        <HowItWorks />
        <FeatureShowcase />
        <AppPreview />
        <AudienceSection />
        <AboutSection />
        <FinalCTA />
      </main>
      <Footer />
    </ScrollAnimationProvider>
  );
}
