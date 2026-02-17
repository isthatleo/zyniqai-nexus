import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/lion-logo-front.png";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "/about" },
  {
    label: "Solutions",
    href: "/products",
    children: [
      { label: "AI Modules", href: "/products" },
      { label: "Hospitality OS", href: "/hospitality-os" },
      { label: "Education OS", href: "/education-os" },
      { label: "Logistics OS", href: "/logistics-os" },
      { label: "Fintech OS", href: "/fintech-os" },
      { label: "Enterprise SaaS", href: "/enterprise-saas" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
    setMobileDropdownOpen(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl ${
          scrolled
            ? "bg-card/60 backdrop-blur-2xl border border-border/40 shadow-[0_8px_40px_hsl(var(--gold)/0.08)]"
            : "bg-card/30 backdrop-blur-xl border border-border/20"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <img src={logo} alt="ZyniqAI" className="h-8 sm:h-9 md:h-10 w-auto object-contain drop-shadow-[0_0_12px_hsl(var(--gold)/0.3)] group-hover:drop-shadow-[0_0_20px_hsl(var(--gold)/0.5)] transition-all duration-300" />
            <span className="text-lg font-display font-bold tracking-tight">
              Zyniq<span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <div key={link.label} className="relative" onMouseEnter={() => link.children && setDropdownOpen(link.label)} onMouseLeave={() => setDropdownOpen(null)}>
                <Link
                  to={link.href}
                  className={`text-sm font-medium transition-colors relative flex items-center gap-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all hover:after:w-full ${
                    location.pathname === link.href ? "text-primary after:w-full" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown size={12} />}
                </Link>
                <AnimatePresence>
                  {link.children && dropdownOpen === link.label && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-3 w-52 bg-card/95 backdrop-blur-2xl border border-border/50 py-2 rounded-xl shadow-[0_8px_30px_hsl(var(--gold)/0.1)]"
                    >
                      {link.children.map((child) => (
                        <Link key={child.label} to={child.href} className="flex items-center justify-between px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
                          {child.label}
                          <ChevronRight size={12} className="opacity-0 group-hover:opacity-100" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <Link to="/auth" className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/40 transition-all">
              <User size={14} /> Portal
            </Link>
            <Link to="/contact" className="text-sm font-medium px-5 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_hsl(var(--gold)/0.3)]">
              Request Demo
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-border/50 bg-muted/30 backdrop-blur-sm" aria-label="Toggle menu">
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={20} className="text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} className="text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-background/98 backdrop-blur-2xl" />
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-8 overflow-y-auto"
            >
              <nav className="w-full max-w-sm space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div key={link.label} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.05 }}>
                    {link.children ? (
                      <div>
                        <button onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                          className={`w-full flex items-center justify-between py-3.5 px-4 rounded-xl text-lg font-display font-semibold transition-colors ${
                            location.pathname === link.href ? "text-primary bg-primary/5" : "text-foreground hover:text-primary hover:bg-primary/5"
                          }`}
                        >
                          {link.label}
                          <ChevronDown size={16} className={`transition-transform duration-300 ${mobileDropdownOpen === link.label ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileDropdownOpen === link.label && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                              <div className="pl-4 pb-2 space-y-1">
                                {link.children.map((child) => (
                                  <Link key={child.label} to={child.href} className="block py-2.5 px-4 text-sm text-muted-foreground hover:text-primary rounded-xl hover:bg-primary/5 transition-colors">
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link to={link.href} className={`block py-3.5 px-4 rounded-xl text-lg font-display font-semibold transition-colors ${
                        location.pathname === link.href ? "text-primary bg-primary/5" : "text-foreground hover:text-primary hover:bg-primary/5"
                      }`}>
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 w-full max-w-sm space-y-3">
                <Link to="/auth" className="block text-center text-sm font-medium px-6 py-3.5 rounded-xl border border-border/50 text-foreground hover:border-primary/40 transition-all">
                  Client Portal
                </Link>
                <Link to="/contact" className="block text-center text-sm font-medium px-6 py-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                  Request Demo
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
