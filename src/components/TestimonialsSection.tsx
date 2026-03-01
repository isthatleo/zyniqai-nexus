import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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
  return (
    <section id="testimonials" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Trusted by <span className="gradient-text">industry leaders</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enterprises across industries rely on ZyniqAI for intelligent systems at scale.
          </p>
        </motion.div>

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {clientLogos.map((name) => (
            <div
              key={name}
              className="px-5 py-2.5 rounded-lg border border-border/30 bg-muted/20 text-muted-foreground font-mono text-xs tracking-wider opacity-50 hover:opacity-100 hover:border-primary/30 transition-all duration-300"
            >
              {name}
            </div>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6 flex flex-col"
            >
              <Quote size={20} className="text-primary/30 mb-3" />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">"{t.quote}"</p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.title}, {t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
