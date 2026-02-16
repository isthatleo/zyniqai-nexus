import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/zyniqai-logo.png";

const socialLinks = [
  { icon: Twitter, label: "X", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
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
                { label: "AI Systems", to: "/products" },
                { label: "Software Engineering", to: "/products" },
                { label: "Platform Preview", to: "/dashboard" },
                { label: "Infrastructure", to: "/products" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Pricing", to: "/pricing" },
                { label: "Contact", to: "/contact" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Privacy", to: "#" },
                { label: "Terms", to: "#" },
                { label: "Security", to: "#" },
                { label: "GDPR", to: "#" },
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
                <s.icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
