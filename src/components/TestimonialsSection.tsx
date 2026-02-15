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
    quote: "The AI dashboards ZyniqAI built gave us visibility we never had. We're making data-driven decisions in real-time now, not quarterly.",
    name: "Marcus Williams",
    title: "Chief Data Officer",
    company: "NovaTech Industries",
  },
  {
    quote: "From architecture to deployment, ZyniqAI delivered enterprise-grade AI systems on time and on budget. They're the real deal.",
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
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">
            Client Success
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enterprises across industries rely on ZyniqAI to build and deploy intelligent systems at scale.
          </p>
        </motion.div>

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 mb-16"
        >
          {clientLogos.map((name) => (
            <div key={name} className="px-6 py-3 rounded-lg border border-border/30 bg-muted/20 text-muted-foreground font-display font-semibold text-sm tracking-wider opacity-60 hover:opacity-100 hover:border-primary/30 transition-all duration-300">
              {name}
            </div>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-8 flex flex-col"
            >
              <Quote size={24} className="text-primary/40 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">"{t.quote}"</p>
              <div>
                <p className="text-sm font-display font-semibold">{t.name}</p>
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
