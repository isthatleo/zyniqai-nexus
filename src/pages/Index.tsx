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
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <IndustryOSSection />
      <DashboardSection />
      <ServicesSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
