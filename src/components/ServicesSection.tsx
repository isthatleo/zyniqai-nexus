import { motion } from "framer-motion";
import { Layers, Plug, Headphones, Rocket, Settings, LineChart } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Custom AI Development",
    description: "Bespoke machine learning models and AI systems designed, trained, and deployed for your specific business challenges.",
  },
  {
    icon: Plug,
    title: "API & System Integration",
    description: "Seamless integration of AI capabilities into your existing tech stack via REST APIs, WebSockets, and enterprise connectors.",
  },
  {
    icon: LineChart,
    title: "Data Strategy & Architecture",
    description: "End-to-end data pipeline design — from collection and storage to processing and real-time analytics infrastructure.",
  },
  {
    icon: Settings,
    title: "Enterprise SaaS Modules",
    description: "Pre-built, configurable AI modules for common enterprise needs — plug into your operations and start generating insights immediately.",
  },
  {
    icon: Headphones,
    title: "Managed AI Operations",
    description: "24/7 monitoring, model retraining, performance optimization, and dedicated support for your AI infrastructure.",
  },
  {
    icon: Rocket,
    title: "AI Consulting & Strategy",
    description: "Expert advisory services to help you identify AI opportunities, build roadmaps, and execute on your intelligent automation vision.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">
            Services
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            How We <span className="gradient-text-green">Partner</span> With You
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From strategy to deployment, ZyniqAI provides end-to-end AI and software engineering services for enterprise teams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-hover p-8 group"
            >
              <div className="w-12 h-12 rounded-xl border border-primary/20 bg-primary/10 flex items-center justify-center mb-5 text-primary transition-all group-hover:scale-110">
                <service.icon size={22} />
              </div>
              <h3 className="text-lg font-display font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
