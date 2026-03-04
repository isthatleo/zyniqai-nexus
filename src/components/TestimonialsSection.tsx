import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { animate, stagger } from "animejs";

const testimonials = [
  {
    quote: "ZyniqAI transformed our operations. Their predictive models cut our downtime by 40% and their team integrated seamlessly with ours.",
    name: "Sarah Chen",
    title: "VP of Engineering",
    company: "Meridian Logistics",
  },
  {
    quote: "The AI dashboards gave us visibility we never had. We're making data-driven decisions in real-time now, not quarterly.",
    name: "Marcus Williams",
    title: "Chief Data Officer",
    company: "NovaTech Industries",
  },
  {
    quote: "From architecture to deployment, ZyniqAI delivered enterprise-grade AI systems on time and on budget.",
    name: "Elena Rodriguez",
    title: "CTO",
    company: "Apex Financial Group",
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
            opacity: [0, 0.5],
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
            translateX: [-30, 0],
            duration: 900,
            delay: stagger(150),
            ease: "outExpo",
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Trusted by <span className="gradient-text">industry leaders</span>
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
              className="logo-pill px-5 py-2.5 rounded-lg border border-border/30 bg-muted/20 text-muted-foreground font-mono text-xs tracking-wider opacity-0 hover:opacity-100 hover:border-primary/30 transition-all duration-300"
            >
              {name}
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card glass-card-hover p-6 flex flex-col text-center opacity-0"
            >
              <Quote size={20} className="text-primary/30 mb-3 mx-auto" />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">"{t.quote}"</p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.title}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
