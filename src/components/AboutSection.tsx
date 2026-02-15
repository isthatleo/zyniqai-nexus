import { motion } from "framer-motion";
import { Target, Lightbulb, Shield, Users, Code, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">
              About ZyniqAI
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              An AI-First
              <br />
              <span className="gradient-text">Engineering Firm</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ZyniqAI is a software engineering and AI company building the next generation of intelligent enterprise systems. We combine deep expertise in machine learning, data engineering, and modern software architecture to deliver platforms that don't just analyze data — they act on it.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From predictive analytics platforms to fully automated decision engines, our team designs and deploys AI systems that solve real business problems at scale. We partner with enterprises across industries to architect, build, and maintain mission-critical AI infrastructure.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Target, label: "Mission-Driven" },
                { icon: Lightbulb, label: "Innovation-Led" },
                { icon: Shield, label: "Enterprise-Grade" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-2">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-lg font-display font-semibold mb-2">Why ZyniqAI?</h3>
              {[
                { icon: Code, title: "Engineering Excellence", desc: "World-class engineers building production AI systems — not proofs of concept." },
                { icon: Users, title: "Enterprise Partnerships", desc: "We embed with your teams to deliver solutions that fit your workflows and scale." },
                { icon: Globe, title: "End-to-End Delivery", desc: "From data strategy and architecture to deployment and monitoring — we handle it all." },
              ].map((step) => (
                <div key={step.title} className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <step.icon size={18} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display font-semibold mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-2xl bg-primary/5 blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
