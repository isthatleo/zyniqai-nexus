const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-display font-bold text-primary text-sm">Z</span>
              </div>
              <span className="font-display font-semibold">
                Zyniq<span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Turning Data Into Action. AI-powered intelligence for enterprise operations.
            </p>
          </div>

          {[
            { title: "Product", links: ["Features", "Dashboard", "Pricing", "API Docs"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
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
