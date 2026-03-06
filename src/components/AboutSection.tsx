import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Target, Code, Shield, Globe, Users, Zap } from "lucide-react";
import { animate, stagger } from "animejs";
import CharacterReveal from "./CharacterReveal";

const values = [
  { icon: Target, title: "Mission-Driven", desc: "Every system solves a real business problem at scale." },
  { icon: Code, title: "Engineering First", desc: "Production AI systems, not proofs of concept." },
  { icon: Shield, title: "Enterprise-Grade", desc: "Security, compliance, and reliability baked in." },
  { icon: Globe, title: "End-to-End", desc: "From strategy to deployment to optimization." },
  { icon: Users, title: "Embedded Teams", desc: "We integrate with your workflows and scale." },
  { icon: Zap, title: "Competitive Edge", desc: "Infrastructure your competitors can't match." },
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
            translateY: [30, 0],
            scale: [0.95, 1],
            duration: 800,
            delay: stagger(80),
            ease: "outExpo",
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AI Systems & <CharacterReveal text="Infrastructure Partner" className="gradient-text" staggerDelay={25} />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We build systems. We optimize continuously. We own the infrastructure. We become mission-critical.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((item) => (
            <div
              key={item.title}
              className="about-card glass-card-hover p-6 text-center group opacity-0"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <item.icon size={18} className="text-primary" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
