import { motion } from "framer-motion";
import { Target, Code, Shield, Globe, Users, Zap } from "lucide-react";

const values = [
  { icon: Target, title: "Mission-Driven", desc: "Every system solves a real business problem at scale." },
  { icon: Code, title: "Engineering First", desc: "Production AI systems, not proofs of concept." },
  { icon: Shield, title: "Enterprise-Grade", desc: "Security, compliance, and reliability baked in." },
  { icon: Globe, title: "End-to-End", desc: "From strategy to deployment to optimization." },
  { icon: Users, title: "Embedded Teams", desc: "We integrate with your workflows and scale." },
  { icon: Zap, title: "Competitive Edge", desc: "Infrastructure your competitors can't match." },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AI Systems & <span className="gradient-text">Infrastructure Partner</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We build systems. We optimize continuously. We own the infrastructure. We become mission-critical.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-card-hover p-6 text-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <item.icon size={18} className="text-primary" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
