import { motion } from "framer-motion";
import { Target, Lightbulb, Shield } from "lucide-react";

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
              Built for the
              <br />
              <span className="gradient-text">AI-First Era</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ZyniqAI was founded on a simple belief: enterprise operations shouldn't rely on guesswork. 
              Our platform combines cutting-edge machine learning with real-time data processing to deliver 
              intelligence that actually drives decisions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From fleet optimization to predictive maintenance, we build AI that understands your business 
              context and delivers actionable insights — not just dashboards.
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
              {[
                { number: "01", title: "Collect", desc: "Ingest data from every touchpoint in your operations pipeline." },
                { number: "02", title: "Analyze", desc: "Our AI models process and identify patterns in real-time." },
                { number: "03", title: "Act", desc: "Receive actionable recommendations with measurable outcomes." },
              ].map((step, i) => (
                <div key={step.number} className="flex gap-5">
                  <div className="flex-shrink-0">
                    <span className="text-2xl font-display font-bold text-primary/30">{step.number}</span>
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
