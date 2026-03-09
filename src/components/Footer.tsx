import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import logo from "@/assets/zyniq-logo-mark.png";

const footerColumns = [
  {
    title: "Solutions",
    links: [
      { label: "AI Modules", to: "/products" },
      { label: "Web Design", to: "/services" },
      { label: "Hospitality OS", to: "/hospitality-os" },
      { label: "Education OS", to: "/education-os" },
      { label: "Logistics OS", to: "/logistics-os" },
      { label: "Fintech OS", to: "/fintech-os" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Pricing", to: "/pricing" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Client Portal", to: "/auth" },
      { label: "Dashboard", to: "/dashboard" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Security", to: "/security" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full relative overflow-hidden">
      {/* Top gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), hsl(var(--blue-accent) / 0.3), transparent)",
        }}
      />
      {/* Subtle background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-32 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, hsl(var(--primary) / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="border-t border-border/20 py-14 sm:py-18 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center gap-10 sm:grid sm:grid-cols-2 md:grid-cols-5 sm:text-left sm:items-start sm:gap-8 mb-12">
            {/* Brand */}
            <div className="flex flex-col items-center sm:items-start sm:col-span-2 md:col-span-1">
              <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
                <motion.img
                  src={logo}
                  alt="ZyniqAI"
                  className="h-8 w-8 object-contain rounded-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />
                <span className="text-sm font-bold">
                  Zyniq<span className="text-primary">AI</span>
                </span>
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5 max-w-[210px]">
                AI-first systems engineering &amp; web design for the modern enterprise.
              </p>
              <div className="space-y-1.5">
                <a
                  href="tel:+27707731490"
                  className="flex items-center gap-2 text-[11px] text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <Phone size={10} className="text-primary/60 group-hover:text-primary transition-colors" />
                  +27 70 773 1490
                </a>
                <a
                  href="mailto:hello@zyniqai.com"
                  className="flex items-center gap-2 text-[11px] text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <Mail size={10} className="text-primary/60 group-hover:text-primary transition-colors" />
                  hello@zyniqai.com
                </a>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <MapPin size={10} className="text-primary/60" />
                  Cape Town, South Africa
                </div>
              </div>
            </div>

            {/* Columns */}
            {footerColumns.map((col, ci) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
                className="flex flex-col items-center sm:items-start"
              >
                <h4 className="text-[10px] font-semibold uppercase tracking-widest mb-4 text-foreground/60">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label} className="text-center sm:text-left">
                      <Link
                        to={link.to}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 group inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={9}
                          className="opacity-0 group-hover:opacity-50 transition-opacity -translate-y-px"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-border/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-muted-foreground/60">
              © 2026 ZyniqAI. All rights reserved.
            </p>
            <p className="text-[11px] text-muted-foreground/40 font-mono">
              Architected Intelligence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
