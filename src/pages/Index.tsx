import { useRef } from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import DashboardSection from "@/components/DashboardSection";
import ServicesSection from "@/components/ServicesSection";
import IndustryOSSection from "@/components/IndustryOSSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";


const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  return (
    <Layout>
      <div ref={pageRef} className="w-full relative min-h-screen">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <IndustryOSSection />
        <DashboardSection />
        <ServicesSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />


      </div>

    </Layout>
  );
};

export default Index;
