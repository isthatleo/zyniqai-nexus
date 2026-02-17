import { motion } from "framer-motion";
import { Target, Code, Shield, Globe, Users, Zap, Brain } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">
            About ZyniqAI
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            An AI Systems & <span className="gradient-text">Infrastructure Partner</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We build systems. We optimize continuously. We own the infrastructure. We become mission-critical.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:col-span-2"
          >
            <h3 className="text-xl font-display font-semibold mb-4">Who We Are</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ZyniqAI is a software engineering and AI company building the next generation of intelligent enterprise systems. We combine deep expertise in machine learning, data engineering, and modern software architecture to deliver platforms that don't just analyze data — they act on it.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From predictive analytics to fully automated decision engines, we architect, build, and maintain mission-critical AI infrastructure for enterprises across industries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 flex flex-col justify-between"
          >
            <div>
              <Brain size={24} className="text-primary mb-4" />
              <h3 className="text-lg font-display font-semibold mb-3">What We're Not</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-destructive">✕</span> A freelancer</li>
                <li className="flex items-center gap-2"><span className="text-destructive">✕</span> A dev shop</li>
                <li className="flex items-center gap-2"><span className="text-destructive">✕</span> A chatbot agency</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-border/30">
              <p className="text-xs text-primary font-medium uppercase tracking-wider">We are your AI infrastructure partner</p>
            </div>
          </motion.div>

          {[
            { icon: Target, title: "Mission-Driven", desc: "Every system we build solves a real business problem at scale." },
            { icon: Code, title: "Engineering First", desc: "Production AI systems, not proofs of concept." },
            { icon: Shield, title: "Enterprise-Grade", desc: "Security, compliance, and reliability baked in." },
            { icon: Globe, title: "End-to-End", desc: "From strategy to deployment to ongoing optimization." },
            { icon: Users, title: "Embedded Teams", desc: "We integrate with your workflows and scale with you." },
            { icon: Zap, title: "Competitive Edge", desc: "We make it risky for your competitors to not have what you have." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-card-hover p-6 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <item.icon size={18} className="text-primary" />
              </div>
              <h4 className="font-display font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
