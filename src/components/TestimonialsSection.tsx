import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { animate, stagger } from "animejs";
import HoverSplitText from "./HoverSplitText";

const testimonials = [
  {
    quote: "ZyniqAI transformed our operations. Their predictive models cut our downtime by 40% and their team integrated seamlessly with ours.",
    name: "Sarah Chen",
    title: "VP of Engineering",
    company: "Meridian Logistics",
    accent: "hsl(var(--primary))",
  },
  {
    quote: "The AI dashboards gave us visibility we never had. We're making data-driven decisions in real-time now, not quarterly.",
    name: "Marcus Williams",
    title: "Chief Data Officer",
    company: "NovaTech Industries",
    accent: "hsl(var(--blue-accent))",
  },
  {
    quote: "From architecture to deployment, ZyniqAI delivered enterprise-grade AI systems on time and on budget.",
    name: "Elena Rodriguez",
    title: "CTO",
    company: "Apex Financial Group",
    accent: "hsl(var(--green-accent))",
  },
];

const clientLogos = ["NovaTech", "Meridian", "Apex", "Quantum", "Helix", "Stratos"];

const TestimonialsSection = () => {
  const logosRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logosRef.current) return;
    const logos = logosRef.current.querySelectorAll(".logo-pill");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(logos, {
            opacity: [0, 0.55],
            scale: [0.8, 1],
            duration: 600,
            delay: stagger(80, { start: 200 }),
            ease: "outExpo",
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(logosRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll(".testimonial-card");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(cards, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 900,
            delay: stagger(140),
            ease: "outExpo",
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="section-padding relative section-glow-purple">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-muted/20 text-[11px] font-mono text-muted-foreground tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "hsl(var(--purple-accent))" }} />
            Client Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Trusted by <HoverSplitText text="industry leaders" className="gradient-text" />
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enterprises across industries rely on ZyniqAI for intelligent systems at scale.
          </p>
        </motion.div>

        {/* Client logos */}
        <div ref={logosRef} className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {clientLogos.map((name) => (
            <div
              key={name}
              className="logo-pill px-5 py-2.5 rounded-lg border border-border/25 bg-muted/15 text-muted-foreground font-mono text-xs tracking-wider opacity-0 hover:opacity-100 hover:border-primary/30 hover:text-foreground hover:bg-muted/30 transition-all duration-300 cursor-default"
            >
              {name}
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="testimonial-card glass-card-hover p-6 flex flex-col text-center opacity-0 group relative overflow-hidden"
            >
              {/* Accent top border */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
                }}
              />
              {/* Color wash */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ backgroundColor: t.accent }}
              />

              {/* Stars */}
              <div className="flex justify-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className="fill-yellow-accent text-yellow-accent opacity-70"
                    style={{ color: "hsl(var(--yellow-accent))" }}
                  />
                ))}
              </div>

              <Quote
                size={18}
                className="mb-3 mx-auto transition-colors duration-300"
                style={{ color: t.accent, opacity: 0.35 }}
              />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">"{t.quote}"</p>
              <div className="relative z-10 border-t border-border/20 pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.title}, {t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
