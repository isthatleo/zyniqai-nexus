import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Hotel, GraduationCap, Truck, Landmark, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import HoverSplitText from "./HoverSplitText";

const modules = [
  {
    icon: Hotel,
    title: "Hospitality OS",
    desc: "Booking engines, revenue analytics, and AI forecasting for modern hotels.",
    href: "/hospitality-os",
    color: "hsl(var(--primary))",
    colorRaw: "hsl(0, 72%, 63%)",
  },
  {
    icon: GraduationCap,
    title: "Education OS",
    desc: "Student management, automated attendance, fee tracking, and enrollment AI.",
    href: "/education-os",
    color: "hsl(var(--green-accent))",
    colorRaw: "hsl(145, 63%, 49%)",
  },
  {
    icon: Truck,
    title: "Logistics OS",
    desc: "Fleet tracking, route optimization, inventory management, and predictive maintenance.",
    href: "/logistics-os",
    color: "hsl(var(--blue-accent))",
    colorRaw: "hsl(217, 91%, 60%)",
  },
  {
    icon: Landmark,
    title: "Fintech OS",
    desc: "Real-time fraud detection, compliance automation, and AI-driven risk assessment.",
    href: "/fintech-os",
    color: "hsl(var(--yellow-accent))",
    colorRaw: "hsl(45, 93%, 58%)",
  },
  {
    icon: Building2,
    title: "Enterprise SaaS",
    desc: "Multi-tenant architecture, usage analytics, churn prediction, and onboarding flows.",
    href: "/enterprise-saas",
    color: "hsl(var(--cyan-accent))",
    colorRaw: "hsl(187, 72%, 55%)",
  },
  {
    icon: Building2,
    title: "Healthcare OS",
    desc: "Patient management, clinical workflows, AI diagnostics, and compliance tools.",
    href: "/healthcare-os",
    color: "hsl(var(--purple-accent))",
    colorRaw: "hsl(265, 83%, 68%)",
  },
];

const IndustryOSSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".os-card");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(cards, {
            opacity: [0, 1],
            translateY: [44, 0],
            rotateX: [12, 0],
            duration: 1000,
            delay: stagger(110),
            ease: "outExpo",
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding relative section-glow-blue">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-muted/20 text-[11px] font-mono text-muted-foreground tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-accent" style={{ backgroundColor: "hsl(var(--blue-accent))" }} />
            Industry Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="gradient-text" style={{
              background: "linear-gradient(90deg, hsl(40,72%,63%), hsl(0,72%,63%), hsl(280,83%,68%))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text !important",
              WebkitTextFillColor: "transparent !important",
            }}>Operations Systems</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Modular enterprise OS platforms built for your industry. Each one integrates AI as independent microservices.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <Link
              key={m.title}
              to={m.href}
              className="os-card glass-card-hover p-6 group flex flex-col h-full opacity-0 text-center relative overflow-hidden transition-all duration-400"
            >
              {/* Gradient wash on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ backgroundColor: m.colorRaw }}
              />
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-16 h-px transition-all duration-500 rounded-full"
                style={{ backgroundColor: m.colorRaw }}
              />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 mx-auto transition-all duration-400 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  backgroundColor: `${m.colorRaw}18`,
                  border: `1px solid ${m.colorRaw}35`,
                  boxShadow: `0 0 0 0 ${m.colorRaw}`,
                }}
              >
                <m.icon size={19} style={{ color: m.colorRaw }} />
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-foreground transition-colors">{m.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">{m.desc}</p>

              <span
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold group-hover:gap-3 transition-all duration-300"
                style={{ color: m.colorRaw }}
              >
                Learn More
                <motion.span
                  className="inline-flex"
                  animate={{ x: [0, 0] }}
                  whileHover={{ x: 4 }}
                >
                  <ArrowRight size={13} />
                </motion.span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryOSSection;
