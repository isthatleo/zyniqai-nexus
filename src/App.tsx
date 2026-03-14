import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import HospitalityOS from "./pages/HospitalityOS";
import EducationOS from "./pages/EducationOS";
import LogisticsOS from "./pages/LogisticsOS";
import FintechOS from "./pages/FintechOS";
import WebDesign from "./pages/WebDesign";
import EnterpriseSaaS from "./pages/EnterpriseSaaS";
import HealthcareOS from "./pages/HealthcareOS";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import Auth from "./pages/Auth";
import ClientPortal from "./pages/ClientPortal";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import AIChatWidget from "./components/AIChatWidget";
import ScrollProgress from "./components/ScrollProgress";

const queryClient = new QueryClient();

const pageVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.26, ease: "easeIn" as const } },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/hospitality-os" element={<HospitalityOS />} />
          <Route path="/education-os" element={<EducationOS />} />
          <Route path="/logistics-os" element={<LogisticsOS />} />
          <Route path="/fintech-os" element={<FintechOS />} />
          <Route path="/web-design" element={<WebDesign />} />
<Route path="/enterprise-saas" element={<EnterpriseSaaS />} />
          <Route path="/healthcare-os" element={<HealthcareOS />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/security" element={<Security />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/client-portal" element={<ClientPortal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <ScrollProgress />
            <AnimatedRoutes />
            <AIChatWidget />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
