import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Brain, Code2, Server, GraduationCap, RefreshCw, Palette } from "lucide-react";
import { animate, stagger } from "animejs";
import WavyText from "./WavyText";

const pillars = [
  {
    title: "AI Systems & Intelligence",
    subtitle: "Custom AI for real-world operations",
    icon: Brain,
    colorRaw: "hsl(0,72%,63%)",
    services: [
      "Custom AI model development",
      "Predictive analytics systems",
      "Anomaly detection & forecasting",
      "NLP integrations & AI assistants",
      "AI data pipelines (ETL + serving)",
      "Intelligent decision engines",
    ],
  },
  {
    title: "Web Design & Development",
    subtitle: "Premium sites for startups & brands",
    icon: Palette,
    colorRaw: "hsl(265,83%,68%)",
    services: [
      "Startup landing pages & MVPs",
      "Brand identity & UI/UX design",
      "Responsive web applications",
      "E-commerce platforms",
      "Portfolio & corporate sites",
      "CMS integration & maintenance",
    ],
  },
  {
    title: "Software Engineering",
    subtitle: "Enterprise platforms built from zero",
    icon: Code2,
    colorRaw: "hsl(145,63%,49%)",
    services: [
      "Enterprise web platforms (React/Next.js)",
      "SaaS products & admin systems",
      "API development & backends",
      "Database architecture",
      "DevOps & CI/CD automation",
      "Legacy system refactoring",
    ],
  },
  {
    title: "Systems Architecture",
    subtitle: "Infrastructure that scales",
    icon: Server,
    colorRaw: "hsl(217,91%,60%)",
    services: [
      "System audits & infrastructure design",
      "Cloud migration & scaling",
      "Data warehouse setup",
      "Monitoring & observability",
      "Security hardening",
      "Performance tuning",
    ],
  },
  {
    title: "AI Onboarding",
    subtitle: "Your AI transformation partner",
    icon: GraduationCap,
    colorRaw: "hsl(45,93%,58%)",
    services: [
      "Current system audits",
      "Automation opportunity mapping",
      "AI roadmap & phased rollout",
      "Internal team training",
      "AI governance structure",
      "Continuous optimization",
    ],
  },
  {
    title: "Ongoing Optimization",
    subtitle: "Recurring value, not just support",
    icon: RefreshCw,
    colorRaw: "hsl(187,72%,55%)",
    services: [
      "System monitoring & tuning",
      "AI model retraining",
      "Infrastructure management",
      "Security patches & updates",
      "Strategic advisory",
      "Monthly data insights reports",
    ],
  },
];

const ServicesSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".service-card");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(cards, {
            opacity: [0, 1],
            translateY: [32, 0],
            duration: 850,
            delay: stagger(90),
            ease: "outExpo",
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.addEventListener("mouseenter", () => {
        const items = card.querySelectorAll(".service-item");
        animate(items, {
          opacity: [0.55, 1],
          translateX: [6, 0],
          duration: 350,
          delay: stagger(28),
          ease: "outQuad",
        });
      });
    });
  }, []);

  return (
    <section id="services" className="section-padding relative section-glow-primary">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-muted/20 text-[11px] font-mono text-muted-foreground tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Six Core Pillars
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Full Stack. <span className="gradient-text cursor-pointer hover:[transform:translateY(-1px)] transition-transform duration-300 inline-block" style={{
              background: "linear-gradient(90deg, hsl(40,72%,63%), hsl(0,72%,63%), hsl(280,83%,68%))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text !important",
              WebkitTextFillColor: "transparent !important",
            }}>Enterprise Ready.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Six core pillars powering everything from web design to AI development and ongoing infrastructure optimization.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="service-card glass-card-hover p-6 group text-left opacity-0 relative overflow-hidden"
            >
              {/* Hover color wash */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ backgroundColor: pillar.colorRaw }}
              />
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-4 bottom-4 w-0 group-hover:w-0.5 transition-all duration-500 rounded-full"
                style={{ backgroundColor: pillar.colorRaw }}
              />

              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    backgroundColor: `${pillar.colorRaw}18`,
                    border: `1px solid ${pillar.colorRaw}35`,
                  }}
                >
                  <pillar.icon size={17} style={{ color: pillar.colorRaw }} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold leading-tight">{pillar.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{pillar.subtitle}</p>
                </div>
              </div>

              <ul className="grid gap-1.5">
                {pillar.services.map((s) => (
                  <li
                    key={s}
                    className="service-item flex items-center gap-2.5 text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-150"
                      style={{ backgroundColor: pillar.colorRaw }}
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
