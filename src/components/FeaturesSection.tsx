import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Brain, BarChart3, Cpu, LayoutDashboard, Zap, Database, Server, Workflow, Shield, Globe } from "lucide-react";
import { animate, stagger } from "animejs";

const pills = [
  { label: "AI Models", color: "hsl(0, 72%, 63%)" },
  { label: "Analytics", color: "hsl(145, 63%, 49%)" },
  { label: "Dashboards", color: "hsl(217, 91%, 60%)" },
  { label: "Automation", color: "hsl(45, 93%, 58%)" },
  { label: "Pipelines", color: "hsl(187, 72%, 55%)" },
  { label: "DevOps", color: "hsl(265, 83%, 68%)" },
  { label: "Platforms", color: "hsl(0, 72%, 63%)" },
  { label: "Security", color: "hsl(145, 63%, 49%)" },
  { label: "NLP", color: "hsl(217, 91%, 60%)" },
  { label: "Forecasting", color: "hsl(45, 93%, 58%)" },
  { label: "APIs", color: "hsl(187, 72%, 55%)" },
];

const features = [
  {
    icon: Brain,
    title: "Custom AI Models",
    description: "Bespoke machine learning models trained on your data — from NLP to forecasting engines.",
    bullets: ["Per-industry model tuning", "Flexible training pipelines", "Production-ready deployment"],
    accentColor: "hsl(0, 72%, 63%)",
  },
  {
    icon: Cpu,
    title: "Predictive Analytics",
    description: "Anticipate challenges before they arise with AI-driven forecasts and scenario simulations.",
    bullets: ["Real-time anomaly detection", "Time-series forecasting", "Scenario simulation engine"],
    accentColor: "hsl(145, 63%, 49%)",
  },
  {
    icon: LayoutDashboard,
    title: "Data Dashboards",
    description: "Interactive, modular dashboards visualizing KPIs, metrics, and predictive models.",
    bullets: ["Real-time data streaming", "Custom widget builder", "Multi-tenant views"],
    accentColor: "hsl(217, 91%, 60%)",
  },
  {
    icon: Zap,
    title: "Intelligent Automation",
    description: "Translate insights into automated workflows, real-time alerts, and autonomous actions.",
    bullets: ["Event-driven triggers", "Multi-step workflows", "Smart alert routing"],
    accentColor: "hsl(45, 93%, 58%)",
  },
  {
    icon: Server,
    title: "Enterprise Platforms",
    description: "Full-stack web platforms, SaaS products, admin systems, and secure backend architecture.",
    bullets: ["Multi-tenant architecture", "Role-based access control", "API-first design"],
    accentColor: "hsl(187, 72%, 55%)",
  },
  {
    icon: Database,
    title: "Data Pipelines",
    description: "End-to-end ETL, data warehousing, and model serving infrastructure.",
    bullets: ["Stream & batch processing", "Data lake architecture", "Model serving at scale"],
    accentColor: "hsl(265, 83%, 68%)",
  },
];

const FeaturesSection = () => {
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pillsRef.current) return;
    const pills = pillsRef.current.querySelectorAll(".pill-item");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(pills, {
            opacity: [0, 1],
            scale: [0.8, 1],
            translateY: [15, 0],
            duration: 600,
            delay: stagger(50, { start: 100 }),
            ease: "outExpo",
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(pillsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="section-padding relative">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The complete <br className="sm:hidden" />
            <span className="gradient-text">AI toolbox</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Break free from limitations and build anything with a single platform.
          </p>
        </motion.div>

        {/* Feature Pills with anime.js stagger */}
        <div
          ref={pillsRef}
          className="flex flex-wrap items-center justify-center gap-2 mb-20"
        >
          {pills.map((pill) => (
            <span
              key={pill.label}
              className="pill-item feature-pill opacity-0"
              style={{
                borderColor: `${pill.color}40`,
                color: pill.color,
                backgroundColor: `${pill.color}08`,
              }}
            >
              {pill.label}
            </span>
          ))}
        </div>

        {/* Feature Sections */}
        <div className="space-y-24">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                i % 2 === 1 ? "md:direction-rtl" : ""
              }`}
            >
              {/* Text side */}
              <div className={`text-center md:text-left ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: feature.accentColor }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual side */}
              <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="glass-card p-8 flex items-center justify-center aspect-[4/3]">
                  <div className="relative">
                    <div
                      className="w-32 h-32 rounded-full opacity-10 animate-ring-pulse"
                      style={{ backgroundColor: feature.accentColor }}
                    />
                    <div
                      className="absolute inset-4 rounded-full opacity-20 animate-ring-pulse"
                      style={{ backgroundColor: feature.accentColor, animationDelay: "0.5s" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <feature.icon size={40} style={{ color: feature.accentColor }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
