import { motion } from "framer-motion";
import { Brain, BarChart3, Cpu, LayoutDashboard, Zap, Database, Server, Workflow } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Custom AI Models",
    description: "Bespoke machine learning models trained on your data — from NLP to forecasting engines.",
    color: "neon-blue" as const,
    size: "large" as const,
  },
  {
    icon: Cpu,
    title: "Predictive Analytics",
    description: "Anticipate challenges before they arise with AI-driven forecasts and scenario simulations.",
    color: "neon-green" as const,
    size: "normal" as const,
  },
  {
    icon: BarChart3,
    title: "Operational Intelligence",
    description: "Monitor processes, logistics, and resources in real-time to maximize efficiency.",
    color: "neon-purple" as const,
    size: "normal" as const,
  },
  {
    icon: LayoutDashboard,
    title: "Data Dashboards",
    description: "Interactive, modular dashboards visualizing KPIs, metrics, and predictive models.",
    color: "neon-blue" as const,
    size: "normal" as const,
  },
  {
    icon: Zap,
    title: "Intelligent Automation",
    description: "Translate insights into automated workflows, real-time alerts, and autonomous actions.",
    color: "neon-green" as const,
    size: "normal" as const,
  },
  {
    icon: Server,
    title: "Enterprise Platforms",
    description: "Full-stack web platforms, SaaS products, admin systems, and secure backend architecture.",
    color: "neon-purple" as const,
    size: "large" as const,
  },
  {
    icon: Database,
    title: "Data Pipelines",
    description: "End-to-end ETL, data warehousing, and model serving infrastructure.",
    color: "neon-blue" as const,
    size: "normal" as const,
  },
  {
    icon: Workflow,
    title: "DevOps & CI/CD",
    description: "Cloud infrastructure, automated deployments, monitoring, and observability systems.",
    color: "neon-green" as const,
    size: "normal" as const,
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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Modular, production-ready systems that integrate into your existing infrastructure and scale with your business.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`glass-card-hover p-6 group ${
                feature.size === "large" ? "sm:col-span-2" : ""
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${colorMap[feature.color]} transition-all group-hover:scale-110`}
              >
                <feature.icon size={20} />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
