import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Target, Code, Shield, Globe, Users, Zap } from "lucide-react";
import { animate, stagger } from "animejs";
import CharacterReveal from "./CharacterReveal";

const values = [
  { icon: Target, title: "Mission-Driven", desc: "Every system solves a real business problem at scale.", color: "hsl(var(--primary))" },
  { icon: Code, title: "Engineering First", desc: "Production AI systems, not proofs of concept.", color: "hsl(var(--blue-accent))" },
  { icon: Shield, title: "Enterprise-Grade", desc: "Security, compliance, and reliability baked in.", color: "hsl(var(--green-accent))" },
  { icon: Globe, title: "End-to-End", desc: "From strategy to deployment to optimization.", color: "hsl(var(--cyan-accent))" },
  { icon: Users, title: "Embedded Teams", desc: "We integrate with your workflows and scale.", color: "hsl(var(--yellow-accent))" },
  { icon: Zap, title: "Competitive Edge", desc: "Infrastructure your competitors can't match.", color: "hsl(var(--purple-accent))" },
];

const AboutSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".about-card");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(cards, {
            opacity: [0, 1],
            translateY: [28, 0],
            scale: [0.96, 1],
            duration: 900,
            delay: stagger(90),
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
    <section id="about" className="section-padding relative section-glow-primary">
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
            Core Values
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AI Systems & <span className="gradient-text" style={{
              background: "linear-gradient(90deg, hsl(40,72%,63%), hsl(0,72%,63%), hsl(280,83%,68%))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text !important",
              WebkitTextFillColor: "transparent !important",
            }}>Infrastructure Partner</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We build systems. We optimize continuously. We own the infrastructure. We become mission-critical.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((item) => (
            <div
              key={item.title}
              className="about-card glass-card-hover p-6 text-center group opacity-0 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ backgroundColor: item.color }}
              />
              <div
                className="icon-box mx-auto mb-4 group-hover:shadow-lg transition-all duration-400"
                style={{
                  backgroundColor: `${item.color}18`,
                  border: `1px solid ${item.color}30`,
                }}
              >
                <item.icon size={18} style={{ color: item.color }} className="transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h4 className="font-semibold text-sm mb-1.5 group-hover:text-foreground transition-colors">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-px transition-all duration-500 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
