import { Link } from "react-router-dom";
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
    <footer className="w-full border-t border-border/30 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-8 sm:grid sm:grid-cols-2 md:grid-cols-5 sm:text-center sm:items-start sm:gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col items-center sm:col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <img src={logo} alt="ZyniqAI" className="h-8 w-8 object-contain rounded-md" />
              <span className="text-sm font-bold">Zyniq<span className="text-primary">AI</span></span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3 max-w-[220px]">
              AI-first systems engineering & web design for the modern enterprise.
            </p>
            <p className="text-[11px] text-muted-foreground">Cape Town, South Africa</p>
            <p className="text-[11px] text-muted-foreground">+27 70 773 1490</p>
          </div>

          {/* Columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col items-center sm:items-start">
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-foreground">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label} className="text-center sm:text-left">
                    <Link to={link.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border/30 pt-5 text-center">
          <p className="text-[11px] text-muted-foreground">© 2026 ZyniqAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
