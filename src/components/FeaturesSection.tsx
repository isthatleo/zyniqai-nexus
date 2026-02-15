import { motion } from "framer-motion";
import { Brain, BarChart3, Cpu, LayoutDashboard } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Fleet & Operations Intelligence",
    description: "Real-time monitoring and optimization of fleet operations with AI-driven route planning and resource allocation.",
    color: "neon-blue" as const,
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Forecast demand, maintenance needs, and market trends with precision using advanced machine learning models.",
    color: "neon-green" as const,
  },
  {
    icon: Brain,
    title: "AI Insights & Recommendations",
    description: "Actionable intelligence generated from your data, delivering automated recommendations to drive business outcomes.",
    color: "neon-purple" as const,
  },
  {
    icon: LayoutDashboard,
    title: "Interactive Dashboards",
    description: "Beautiful, real-time dashboards with KPIs, heatmaps, and charts that bring your data to life at a glance.",
    color: "neon-blue" as const,
  },
];

const colorMap = {
  "neon-blue": "text-neon-blue bg-neon-blue/10 border-neon-blue/20",
  "neon-green": "text-neon-green bg-neon-green/10 border-neon-green/20",
  "neon-purple": "text-neon-purple bg-neon-purple/10 border-neon-purple/20",
};

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">
            AI Modules
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Intelligent by <span className="gradient-text">Design</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Purpose-built AI modules that integrate seamlessly into your operations workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-8 group"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${colorMap[feature.color]} transition-all group-hover:scale-110`}>
                <feature.icon size={22} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
