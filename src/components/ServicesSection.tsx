import { motion } from "framer-motion";
import { Brain, Code2, Server, GraduationCap, RefreshCw } from "lucide-react";

const pillars = [
  {
    title: "AI Systems & Intelligence",
    subtitle: "Custom AI for real-world operations",
    icon: Brain,
    color: "hsl(0, 72%, 63%)",
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
    color: "hsl(145, 63%, 49%)",
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
    color: "hsl(217, 91%, 60%)",
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
    title: "AI Onboarding",
    subtitle: "Your AI transformation partner",
    icon: GraduationCap,
    color: "hsl(45, 93%, 58%)",
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
    color: "hsl(187, 72%, 55%)",
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Full Stack. <span className="gradient-text">Enterprise Ready.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Five core pillars powering everything from AI development to ongoing infrastructure optimization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card-hover p-6 group ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${pillar.color}15`, border: `1px solid ${pillar.color}30` }}
                >
                  <pillar.icon size={18} style={{ color: pillar.color }} />
                </div>
                <div>
                  <h3 className="text-base font-bold">{pillar.title}</h3>
                  <p className="text-xs text-muted-foreground">{pillar.subtitle}</p>
                </div>
              </div>
              <ul className={`grid gap-1.5 ${i === 0 ? "sm:grid-cols-2" : ""}`}>
                {pillar.services.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: pillar.color }} />
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
