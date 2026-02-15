import logo from "@/assets/zyniqai-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <img src={logo} alt="ZyniqAI" className="h-10 w-auto mb-4 object-contain" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Turning Data Into Action. AI-first software engineering for the modern enterprise.
            </p>
          </div>

          {[
            { title: "Solutions", links: ["Predictive Analytics", "Operations AI", "Dashboards", "Automation"] },
            { title: "Company", links: ["About", "Services", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
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
