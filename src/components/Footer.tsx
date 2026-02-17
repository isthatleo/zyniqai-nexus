import { Link } from "react-router-dom";
import { Linkedin, Github } from "lucide-react";
import logo from "@/assets/zyniqai-logo.png";

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

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src={logo}
                alt="ZyniqAI"
                className="h-10 w-auto object-contain drop-shadow-[0_0_8px_hsl(var(--neon-blue)/0.4)]"
                style={{ mixBlendMode: "screen" }}
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Turning Data Into Action. AI-first systems engineering for the modern enterprise.
            </p>
            <p className="text-xs text-muted-foreground">Cape Town, South Africa</p>
            <p className="text-xs text-muted-foreground">+27 70 773 1490</p>
          </div>

          {[
            {
              title: "Solutions",
              links: [
                { label: "AI Modules", to: "/products" },
                { label: "Hospitality OS", to: "/hospitality-os" },
                { label: "Education OS", to: "/education-os" },
                { label: "Logistics OS", to: "/logistics-os" },
                { label: "Platform Preview", to: "/dashboard" },
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
              title: "Industries",
              links: [
                { label: "Hospitality", to: "/hospitality-os" },
                { label: "Education", to: "/education-os" },
                { label: "Logistics", to: "/logistics-os" },
                { label: "Fintech", to: "/products" },
                { label: "Enterprise SaaS", to: "/products" },
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
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 ZyniqAI. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-300"
              >
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
