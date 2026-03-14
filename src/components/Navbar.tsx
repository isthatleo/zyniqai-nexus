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

      { label: "Web Design", href: "/web-design" },
      { label: "Hospitality OS", href: "/hospitality-os" },
      { label: "Education OS", href: "/education-os" },

      { label: "Logistics OS", href: "/logistics-os" },
      { label: "Fintech OS", href: "/fintech-os" },
      { label: "Enterprise SaaS", href: "/enterprise-saas" },
      { label: "Healthcare OS", href: "/healthcare-os" },
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
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
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
      {/* Floating Glassmorphic Pill Navbar */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-50 flex justify-center pointer-events-none"
      >
        <nav
          className="pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-500"
          style={{
            background: scrolled
              ? "hsl(var(--background) / 0.82)"
              : "hsl(0 0% 100% / 0.04)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            border: scrolled
              ? "1px solid hsl(0 0% 100% / 0.13)"
              : "1px solid hsl(0 0% 100% / 0.08)",
            boxShadow: scrolled
              ? "0 8px 40px hsl(0 0% 0% / 0.28), 0 2px 8px hsl(0 0% 0% / 0.14), inset 0 1px 0 hsl(0 0% 100% / 0.08)"
              : "0 4px 24px hsl(0 0% 0% / 0.18), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
          }}
        >
          {/* Inner glass sheen */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          <div className="relative px-4 sm:px-5 h-13 flex items-center justify-between" style={{ height: "52px" }}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <motion.img
                src={logo}
                alt="ZyniqAI"
                className="h-7 w-7 object-contain rounded-md"
                whileHover={{ scale: 1.08, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
              <span className="text-sm font-bold tracking-tight">
                Zyniq<span className="text-primary">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
{navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setDropdownOpen(link.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <Link
                    to={link.href}
                    className={`relative text-[13px] font-medium flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all duration-200 group ${
                      location.pathname === link.href
                        ? "text-foreground bg-white/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.07]"
                    }`}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={11}
                        className={`opacity-50 transition-transform duration-200 ${
                          dropdownOpen === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                  <AnimatePresence>
                    {link.children && dropdownOpen === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" as const }}
                        className="absolute top-full left-0 mt-2 w-52 py-1.5 rounded-2xl overflow-hidden"
                        style={{
                          background: "hsl(var(--card) / 0.92)",
                          backdropFilter: "blur(24px)",
                          border: "1px solid hsl(var(--border) / 0.5)",
                          boxShadow: "0 20px 60px hsl(0 0% 0% / 0.22)",
                        }}
                      >
                        {link.children.map((child, ci) => (
                          <motion.div
                            key={child.label}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: ci * 0.04 }}
                          >
                            <Link
                              to={child.href}
                              className="flex items-center justify-between px-3.5 py-2 text-[13px] text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all duration-150 group"
                            >
                              {child.label}
                              <ChevronRight size={10} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                            </Link>
                          </motion.div>
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
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-all px-3 py-1.5 rounded-full hover:bg-white/[0.07]"
              >
                Portal
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="text-[13px] font-medium px-4 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-sm shadow-primary/30"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>

            {/* Mobile Right */}
            <div className="flex lg:hidden items-center gap-1">
              <ThemeToggle />
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-foreground hover:bg-white/[0.07] transition-colors"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.92 }}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={19} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={19} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.div>

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
            />
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
            />
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.28, delay: 0.05 }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 pt-20 pb-8"
            >
              <nav className="w-full max-w-xs space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: -24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  >
                    {link.children ? (
                      <div>
                        <button
                          onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                          className="w-full flex items-center justify-between py-3 text-lg font-semibold text-foreground hover:text-primary transition-colors"
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
                <motion.div initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                  <Link to="/about" className="block py-3 text-lg font-semibold text-foreground hover:text-primary transition-colors">About</Link>
                </motion.div>
              </nav>
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.48, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="mt-10 w-full max-w-xs space-y-3"
              >
                <Link to="/auth" className="block text-center text-sm font-medium px-6 py-3 rounded-full border border-border/50 text-foreground hover:border-primary/40 hover:text-primary transition-all duration-300">
                  Client Portal
                </Link>
                <Link to="/contact" className="block text-center text-sm font-medium px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25">
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
