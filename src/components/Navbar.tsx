import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/zyniq-logo-mark.png";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/30 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <img
              src={logo}
              alt="ZyniqAI"
              className="h-8 w-8 object-contain rounded-md"
            />
            <span className="text-base font-bold tracking-tight">
              Zyniq<span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setDropdownOpen(link.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  to={link.href}
                  className={`text-[13px] font-medium flex items-center gap-1 transition-colors ${
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown size={11} className="opacity-50" />}
                </Link>
                <AnimatePresence>
                  {link.children && dropdownOpen === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-card/95 backdrop-blur-xl border border-border/50 py-1.5 rounded-lg shadow-xl"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="flex items-center justify-between px-3 py-2 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          {child.label}
                          <ChevronRight size={10} className="opacity-30" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/auth"
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              Portal
            </Link>
            <Link
              to="/contact"
              className="text-[13px] font-medium px-4 py-1.5 rounded-full border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Right */}
          <div className="flex lg:hidden items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-foreground"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={20} />
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/98 backdrop-blur-2xl" />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 pt-20 pb-8"
            >
              <nav className="w-full max-w-xs space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    {link.children ? (
                      <div>
                        <button
                          onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                          className="w-full flex items-center justify-between py-3 text-lg font-semibold text-foreground"
                        >
                          {link.label}
                          <ChevronDown
                            size={16}
                            className={`text-muted-foreground transition-transform duration-200 ${
                              mobileDropdownOpen === link.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileDropdownOpen === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-3 pb-2 space-y-1 border-l-2 border-primary/20 ml-1">
                                {link.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    to={child.href}
                                    className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.href}
                        className="block py-3 text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
                  <Link to="/about" className="block py-3 text-lg font-semibold text-foreground hover:text-primary transition-colors">About</Link>
                </motion.div>
              </nav>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-10 w-full max-w-xs space-y-3"
              >
                <Link to="/auth" className="block text-center text-sm font-medium px-6 py-3 rounded-full border border-border/50 text-foreground hover:border-primary/40 transition-all">
                  Client Portal
                </Link>
                <Link to="/contact" className="block text-center text-sm font-medium px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                  Get Started
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
