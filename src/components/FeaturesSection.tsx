import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, LayoutDashboard, Zap, Server, Palette } from "lucide-react";
import { animate, stagger } from "animejs";
import CharacterReveal from "./CharacterReveal";
import TypewriterEffect from "./TypewriterEffect";
import SVGLineAccent from "./SVGLineAccent";
import RotatingBurst from "./RotatingBurst";
import ScalingPulse from "./ScalingPulse";

const pills = [
  { label: "AI Models",    color: "hsl(var(--primary))",       raw: "hsl(0,72%,63%)" },
  { label: "Analytics",   color: "hsl(var(--green-accent))",   raw: "hsl(145,63%,49%)" },
  { label: "Dashboards",  color: "hsl(var(--blue-accent))",    raw: "hsl(217,91%,60%)" },
  { label: "Automation",  color: "hsl(var(--yellow-accent))",  raw: "hsl(45,93%,58%)" },
  { label: "Pipelines",   color: "hsl(var(--cyan-accent))",    raw: "hsl(187,72%,55%)" },
  { label: "DevOps",      color: "hsl(var(--purple-accent))",  raw: "hsl(265,83%,68%)" },
  { label: "Platforms",   color: "hsl(var(--primary))",        raw: "hsl(0,72%,63%)" },
  { label: "Security",    color: "hsl(var(--green-accent))",   raw: "hsl(145,63%,49%)" },
  { label: "Web Design",  color: "hsl(var(--yellow-accent))",  raw: "hsl(45,93%,58%)" },
  { label: "NLP",         color: "hsl(var(--blue-accent))",    raw: "hsl(217,91%,60%)" },
  { label: "Forecasting", color: "hsl(var(--yellow-accent))",  raw: "hsl(45,93%,58%)" },
  { label: "APIs",        color: "hsl(var(--cyan-accent))",    raw: "hsl(187,72%,55%)" },
];

const features = [
  {
    icon: Brain,
    title: "Custom AI Models",
    description: "Bespoke machine learning models trained on your data — from NLP to forecasting engines.",
    bullets: ["Per-industry model tuning", "Flexible training pipelines", "Production-ready deployment"],
    accentColor: "hsl(var(--primary))",
    accentRaw: "hsl(0,72%,63%)",
  },
  {
    icon: Cpu,
    title: "Predictive Analytics",
    description: "Anticipate challenges before they arise with AI-driven forecasts and scenario simulations.",
    bullets: ["Real-time anomaly detection", "Time-series forecasting", "Scenario simulation engine"],
    accentColor: "hsl(var(--green-accent))",
    accentRaw: "hsl(145,63%,49%)",
  },
  {
    icon: LayoutDashboard,
    title: "Data Dashboards",
    description: "Interactive, modular dashboards visualizing KPIs, metrics, and predictive models.",
    bullets: ["Real-time data streaming", "Custom widget builder", "Multi-tenant views"],
    accentColor: "hsl(var(--blue-accent))",
    accentRaw: "hsl(217,91%,60%)",
  },
  {
    icon: Zap,
    title: "Intelligent Automation",
    description: "Translate insights into automated workflows, real-time alerts, and autonomous actions.",
    bullets: ["Event-driven triggers", "Multi-step workflows", "Smart alert routing"],
    accentColor: "hsl(var(--yellow-accent))",
    accentRaw: "hsl(45,93%,58%)",
  },
  {
    icon: Server,
    title: "Enterprise Platforms",
    description: "Full-stack web platforms, SaaS products, admin systems, and secure backend architecture.",
    bullets: ["Multi-tenant architecture", "Role-based access control", "API-first design"],
    accentColor: "hsl(var(--cyan-accent))",
    accentRaw: "hsl(187,72%,55%)",
  },
  {
    icon: Palette,
    title: "Web Design & Development",
    description: "Premium websites for startups and brands — from landing pages to full digital platforms.",
    bullets: ["Responsive design systems", "Brand identity & UX", "Launch-ready in weeks"],
    accentColor: "hsl(var(--purple-accent))",
    accentRaw: "hsl(265,83%,68%)",
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
            scale: [0.78, 1],
            translateY: [14, 0],
            duration: 650,
            delay: stagger(45, { start: 100 }),
            ease: "outExpo",
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(pillsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="section-padding relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-muted/20 text-[11px] font-mono text-muted-foreground tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Platform Capabilities
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The complete <br className="sm:hidden" />
            <span className="gradient-text" style={{
              background: "linear-gradient(90deg, hsl(40,72%,63%), hsl(0,72%,63%), hsl(280,83%,68%))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text !important",
              WebkitTextFillColor: "transparent !important",
            }}>AI toolbox</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Break free from limitations and build anything with a single platform.
          </p>
        </motion.div>

        <div ref={pillsRef} className="flex flex-wrap items-center justify-center gap-2 mb-20">
          {pills.map((pill, i) => (
            <span
              key={`${pill.label}-${i}`}
              className="pill-item feature-pill opacity-0 cursor-default select-none"
              style={{
                borderColor: `${pill.raw}45`,
                color: pill.raw,
                backgroundColor: `${pill.raw}0a`,
              }}
            >
              {pill.label}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const animIdx = i % 4;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: i * 0.09 }}
                whileHover={{ y: -5 }}
                className="group glass-card-hover p-6 relative overflow-hidden text-left"
              >
                <div
                  className="absolute top-0 left-0 w-0 group-hover:w-full h-px transition-all duration-700 rounded-full"
                  style={{ backgroundColor: feature.accentRaw }}
                />
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${feature.accentRaw}20 0%, transparent 70%)`,
                  }}
                />
                <div className="mb-5 flex justify-start">
                  {animIdx === 0 ? (
                    <TypewriterEffect text={feature.title.charAt(0).toUpperCase()} className="text-4xl font-bold" />
                  ) : animIdx === 1 ? (
                    <SVGLineAccent color={feature.accentRaw} />
                  ) : animIdx === 2 ? (
                    <RotatingBurst color={feature.accentRaw} />
                  ) : (
                    <ScalingPulse color={feature.accentRaw} />
                  )}
                </div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${feature.accentRaw}18`, border: `1px solid ${feature.accentRaw}30` }}
                  >
                    <feature.icon size={15} style={{ color: feature.accentRaw }} />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-foreground transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{feature.description}</p>
                <ul className="space-y-1.5">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: feature.accentRaw }}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

