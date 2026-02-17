import { motion } from "framer-motion";
import { Brain, Code2, Server, GraduationCap, RefreshCw } from "lucide-react";

const pillars = [
  {
    title: "AI Systems & Intelligence",
    subtitle: "Custom AI for real-world operations",
    icon: Brain,
    services: [
      "Custom AI model development",
      "Predictive analytics systems",
      "Anomaly detection & forecasting",
      "NLP integrations & AI assistants",
      "AI data pipelines (ETL + serving)",
      "Intelligent decision engines",
    ],
  },
  {
    title: "Software Engineering",
    subtitle: "Enterprise platforms built from zero",
    icon: Code2,
    services: [
      "Enterprise web platforms (React/Next.js)",
      "SaaS products & admin systems",
      "API development & backends",
      "Database architecture",
      "DevOps & CI/CD automation",
      "Legacy system refactoring",
    ],
  },
  {
    title: "Systems Architecture",
    subtitle: "Infrastructure that scales",
    icon: Server,
    services: [
      "System audits & infrastructure design",
      "Cloud migration & scaling",
      "Data warehouse setup",
      "Monitoring & observability",
      "Security hardening",
      "Performance tuning",
    ],
  },
  {
    title: "AI Onboarding & Integration",
    subtitle: "Your AI transformation partner",
    icon: GraduationCap,
    services: [
      "Current system audits",
      "Automation opportunity mapping",
      "AI roadmap & phased rollout",
      "Internal team training",
      "AI governance structure",
      "Continuous optimization",
    ],
  },
  {
    title: "Ongoing Optimization",
    subtitle: "Recurring value, not just support",
    icon: RefreshCw,
    services: [
      "System monitoring & tuning",
      "AI model retraining",
      "Infrastructure management",
      "Security patches & updates",
      "Strategic advisory",
      "Monthly data insights reports",
    ],
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
            What We Build
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Full Stack. <span className="gradient-text">Enterprise Ready.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Five core pillars powering everything from AI model development to ongoing infrastructure optimization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glass-card-hover p-6 group ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl border border-primary/20 bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary transition-transform group-hover:scale-110">
                  <pillar.icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold">{pillar.title}</h3>
                  <p className="text-xs text-muted-foreground">{pillar.subtitle}</p>
                </div>
              </div>
              <ul className={`grid gap-2 ${i === 0 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                {pillar.services.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
