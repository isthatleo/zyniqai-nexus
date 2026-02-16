import { Link } from "react-router-dom";
import logo from "@/assets/zyniqai-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/">
              <img
                src={logo}
                alt="ZyniqAI"
                className="h-8 sm:h-10 w-auto mb-4 object-contain drop-shadow-[0_0_6px_hsl(var(--neon-blue)/0.3)]"
                style={{ mixBlendMode: "screen" }}
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Turning Data Into Action. AI-first software engineering for the modern enterprise.
            </p>
          </div>

          {[
            { title: "Solutions", links: [{ label: "Predictive Analytics", to: "/products" }, { label: "Operations AI", to: "/products" }, { label: "Dashboards", to: "/dashboard" }, { label: "Automation", to: "/products" }] },
            { title: "Company", links: [{ label: "About", to: "/about" }, { label: "Services", to: "/services" }, { label: "Pricing", to: "/pricing" }, { label: "Contact", to: "/contact" }] },
            { title: "Legal", links: [{ label: "Privacy", to: "#" }, { label: "Terms", to: "#" }, { label: "Security", to: "#" }, { label: "GDPR", to: "#" }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
          <div className="flex items-center gap-4">
            {["Twitter", "LinkedIn", "GitHub"].map((s) => (
              <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
