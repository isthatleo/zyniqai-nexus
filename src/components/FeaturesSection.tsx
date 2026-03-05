import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Brain, BarChart3, Cpu, LayoutDashboard, Zap, Database, Server, Workflow, Shield, Globe, Palette } from "lucide-react";
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
  { label: "Web Design", color: "hsl(45, 93%, 58%)" },
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
    icon: Palette,
    title: "Web Design & Development",
    description: "Premium websites for startups and brands — from landing pages to full digital platforms.",
    bullets: ["Responsive design systems", "Brand identity & UX", "Launch-ready in weeks"],
    accentColor: "hsl(265, 83%, 68%)",
  },
];

/* ---- Animated grid stagger canvas ---- */
const GridStaggerCanvas = ({ color }: { color: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 280;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const rows = 12;
    const cols = 12;
    const dotSize = 3;
    const gap = size / (rows + 1);
    let time = 0;
    let fromIndex = Math.floor(Math.random() * rows * cols);
    let targetIndex = fromIndex;
    let transitionProgress = 1;
    let animId: number;

    const getPos = (i: number) => ({
      x: (i % cols + 1) * gap,
      y: (Math.floor(i / cols) + 1) * gap,
    });

    const dist = (i: number, from: number) => {
      const a = getPos(i);
      const b = getPos(from);
      return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      time += 0.02;

      if (transitionProgress >= 1) {
        fromIndex = targetIndex;
        targetIndex = Math.floor(Math.random() * rows * cols);
        transitionProgress = 0;
      }
      transitionProgress += 0.005;

      const maxDist = size * 0.7;

      for (let i = 0; i < rows * cols; i++) {
        const pos = getPos(i);
        const d = dist(i, fromIndex);
        const normalizedDist = d / maxDist;
        const wave = Math.sin(time * 2 - normalizedDist * 6);
        const scale = 1 + wave * 0.8;
        const alpha = 0.3 + wave * 0.4;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, dotSize * Math.max(0.3, scale), 0, Math.PI * 2);
        ctx.fillStyle = color.replace(")", ` / ${Math.max(0.1, alpha)})`).replace("hsl(", "hsla(");
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);

  return <canvas ref={canvasRef} className="mx-auto" />;
};

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

              {/* Visual side - Animated Grid */}
              <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="glass-card p-8 flex items-center justify-center aspect-[4/3]">
                  <GridStaggerCanvas color={feature.accentColor} />
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
