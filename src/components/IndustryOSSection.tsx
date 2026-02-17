import { motion } from "framer-motion";
import { Hotel, GraduationCap, Truck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    icon: Hotel,
    title: "Hospitality OS",
    desc: "Transform your hotel into a fully digital ecosystem with booking engines, revenue analytics, and AI forecasting.",
    href: "/hospitality-os",
    color: "neon-blue" as const,
  },
  {
    icon: GraduationCap,
    title: "Education OS",
    desc: "Manage your school efficiently with student management, automated attendance, fee tracking, and AI enrollment forecasting.",
    href: "/education-os",
    color: "neon-green" as const,
  },
  {
    icon: Truck,
    title: "Logistics OS",
    desc: "Optimize your supply chain with fleet tracking, route optimization, inventory management, and predictive maintenance.",
    href: "/logistics-os",
    color: "neon-purple" as const,
  },
];

const colorMap = {
  "neon-blue": "text-neon-blue bg-neon-blue/10 border-neon-blue/20",
  "neon-green": "text-neon-green bg-neon-green/10 border-neon-green/20",
  "neon-purple": "text-neon-purple bg-neon-purple/10 border-neon-purple/20",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const IndustryOSSection = () => {
  return (
    <section className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">
            Industry Solutions
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Intelligent Operations <span className="gradient-text">Systems</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Automate, analyze, optimize, and grow with modular enterprise OS platforms built for your industry.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-5"
        >
          {modules.map((m) => (
            <motion.div key={m.title} variants={item}>
              <Link to={m.href} className="glass-card-hover p-8 group flex flex-col h-full block">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${colorMap[m.color]} transition-transform group-hover:scale-110`}>
                  <m.icon size={22} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">{m.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">AI Integration Note:</span> All OS platforms launch as v1 without AI microservice. AI modules (predictive analytics, automated follow-ups, revenue forecasting) integrate independently as microservices in v2/v3 phases.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryOSSection;
