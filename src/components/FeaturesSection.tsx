import { motion } from "framer-motion";
import { Brain, BarChart3, Cpu, LayoutDashboard, Zap, Database } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Predictive Analytics",
    description: "Leverage machine learning models to forecast trends, demand, and risks before they materialize — giving your business a decisive edge.",
    color: "neon-blue" as const,
  },
  {
    icon: Cpu,
    title: "Operations Optimization",
    description: "AI-driven systems that streamline workflows, automate processes, and maximize resource utilization across your entire operation.",
    color: "neon-green" as const,
  },
  {
    icon: BarChart3,
    title: "AI Insights & Recommendations",
    description: "Actionable intelligence generated from your data in real-time, powering smarter decisions at every organizational level.",
    color: "neon-purple" as const,
  },
  {
    icon: LayoutDashboard,
    title: "Data Dashboards & Visualization",
    description: "Beautiful, interactive dashboards with live KPIs, heatmaps, and charts that transform complex data into clear business narratives.",
    color: "neon-blue" as const,
  },
  {
    icon: Zap,
    title: "Intelligent Automation",
    description: "End-to-end automation pipelines powered by AI — from data ingestion and processing to alerts, reporting, and autonomous actions.",
    color: "neon-green" as const,
  },
  {
    icon: Database,
    title: "Enterprise Data Platform",
    description: "Scalable, secure data infrastructure that unifies disparate sources into a single intelligent layer for your organization.",
    color: "neon-purple" as const,
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
            Solutions
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            AI Modules Built for <span className="gradient-text">Enterprise</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Modular, production-ready AI systems that integrate into your existing infrastructure and scale with your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
