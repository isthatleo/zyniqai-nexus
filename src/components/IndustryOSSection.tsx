import { motion } from "framer-motion";
import { Hotel, GraduationCap, Truck, Landmark, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    icon: Hotel,
    title: "Hospitality OS",
    desc: "Booking engines, revenue analytics, and AI forecasting for modern hotels.",
    href: "/hospitality-os",
    color: "hsl(0, 72%, 63%)",
  },
  {
    icon: GraduationCap,
    title: "Education OS",
    desc: "Student management, automated attendance, fee tracking, and enrollment AI.",
    href: "/education-os",
    color: "hsl(145, 63%, 49%)",
  },
  {
    icon: Truck,
    title: "Logistics OS",
    desc: "Fleet tracking, route optimization, inventory management, and predictive maintenance.",
    href: "/logistics-os",
    color: "hsl(217, 91%, 60%)",
  },
  {
    icon: Landmark,
    title: "Fintech OS",
    desc: "Real-time fraud detection, compliance automation, and AI-driven risk assessment.",
    href: "/fintech-os",
    color: "hsl(45, 93%, 58%)",
  },
  {
    icon: Building2,
    title: "Enterprise SaaS",
    desc: "Multi-tenant architecture, usage analytics, churn prediction, and onboarding flows.",
    href: "/enterprise-saas",
    color: "hsl(187, 72%, 55%)",
  },
];

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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Intelligent <span className="gradient-text">Operations Systems</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Modular enterprise OS platforms built for your industry. Each one integrates AI as independent microservices.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={m.href} className="glass-card-hover p-6 group flex flex-col h-full block">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${m.color}15`, border: `1px solid ${m.color}30` }}
                >
                  <m.icon size={18} style={{ color: m.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{m.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: m.color }}>
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryOSSection;
