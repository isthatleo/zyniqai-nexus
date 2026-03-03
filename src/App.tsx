import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
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
import EnterpriseSaaS from "./pages/EnterpriseSaaS";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import Auth from "./pages/Auth";
import ClientPortal from "./pages/ClientPortal";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import AIChatWidget from "./components/AIChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
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
              <Route path="/enterprise-saas" element={<EnterpriseSaaS />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/security" element={<Security />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/client-portal" element={<ClientPortal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AIChatWidget />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
