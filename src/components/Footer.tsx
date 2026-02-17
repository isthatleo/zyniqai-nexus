import { Link } from "react-router-dom";
import { Linkedin, Github } from "lucide-react";
import logo from "@/assets/lion-logo-front.png";

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { icon: XIcon, label: "X", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

const footerColumns = [
  {
    title: "Solutions",
    links: [
      { label: "AI Modules", to: "/products" },
      { label: "Hospitality OS", to: "/hospitality-os" },
      { label: "Education OS", to: "/education-os" },
      { label: "Logistics OS", to: "/logistics-os" },
      { label: "Fintech OS", to: "/fintech-os" },
      { label: "Enterprise SaaS", to: "/enterprise-saas" },
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
    <footer className="w-full border-t border-border/50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Mobile: single column centered. Desktop: grid */}
        <div className="flex flex-col items-center text-center gap-10 sm:text-left sm:items-start sm:grid sm:grid-cols-2 md:grid-cols-5 sm:gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start sm:col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="ZyniqAI" className="h-12 w-auto object-contain drop-shadow-[0_0_8px_hsl(var(--gold)/0.3)]" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-[260px]">
              Turning Data Into Action. AI-first systems engineering for the modern enterprise.
            </p>
            <p className="text-xs text-muted-foreground">Cape Town, South Africa</p>
            <p className="text-xs text-muted-foreground">+27 70 773 1490</p>
          </div>

          {/* Columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col items-center sm:items-start">
              <h4 className="text-sm font-display font-semibold mb-4 text-foreground">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label} className="text-center sm:text-left">
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">© 2026 ZyniqAI. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 rounded-xl border border-border/50 bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300">
                <s.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
