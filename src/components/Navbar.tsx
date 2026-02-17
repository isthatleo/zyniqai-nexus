import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/zyniqai-logo.png";
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
    ],
  },
  { label: "Platform", href: "/dashboard" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <img
            src={logo}
            alt="ZyniqAI"
            className="h-9 sm:h-10 md:h-11 w-auto object-contain drop-shadow-[0_0_8px_hsl(var(--neon-blue)/0.4)] group-hover:drop-shadow-[0_0_16px_hsl(var(--neon-blue)/0.6)] transition-all duration-300"
            style={{ mixBlendMode: "screen" }}
          />
          <span className="text-lg font-display font-bold tracking-tight hidden sm:inline">
            Zyniq<span className="text-primary">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <div key={link.label} className="relative" onMouseEnter={() => link.children && setDropdownOpen(link.label)} onMouseLeave={() => setDropdownOpen(null)}>
              <Link
                to={link.href}
                className={`text-sm transition-colors relative flex items-center gap-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all hover:after:w-full ${
                  location.pathname === link.href
                    ? "text-foreground after:w-full"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {link.children && <ChevronDown size={12} />}
              </Link>
              {link.children && dropdownOpen === link.label && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-48 glass-card py-2 rounded-lg"
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/contact"
            className="text-sm font-medium px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.3)]"
          >
            Request Demo
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground p-1">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 px-4 pb-6"
        >
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                to={link.href}
                className={`block py-3 transition-colors ${
                  location.pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="pl-4 border-l border-border/30">
                  {link.children.map((child) => (
                    <Link key={child.label} to={child.href} className="block py-2 text-sm text-muted-foreground hover:text-foreground">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to="/contact"
            className="mt-3 block text-center text-sm font-medium px-5 py-2.5 rounded-lg bg-primary text-primary-foreground"
          >
            Request Demo
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
