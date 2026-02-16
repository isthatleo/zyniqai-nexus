import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

type Region = "za" | "uk" | "us";

const regionLabels: Record<Region, string> = {
  za: "🇿🇦 South Africa",
  uk: "🇬🇧 United Kingdom",
  us: "🇺🇸 United States",
};

const pricingData: Record<
  Region,
  { impl: string; implRange: string; t1: string; t2: string; t3: string; currency: string }
> = {
  za: {
    impl: "R45k – R180k",
    implRange: "once-off",
    t1: "R 8,000",
    t2: "R 15,000",
    t3: "R 35,000+",
    currency: "ZAR",
  },
  uk: {
    impl: "£4k – £15k",
    implRange: "once-off",
    t1: "£ 900",
    t2: "£ 2,000",
    t3: "£ 5,000+",
    currency: "GBP",
  },
  us: {
    impl: "$5k – $20k+",
    implRange: "once-off",
    t1: "$ 1,200",
    t2: "$ 3,000",
    t3: "$ 8,000+",
    currency: "USD",
  },
};

const PricingSection = () => {
  const [region, setRegion] = useState<Region>("za");
  const p = pricingData[region];

  const retainerTiers = [
    {
      name: "Maintenance",
      price: p.t1,
      period: "/mo",
      description: "Keep systems healthy with ongoing monitoring and quick fixes.",
      features: [
        "Bug fixes & minor improvements",
        "Performance monitoring",
        "Monthly check-in call",
        "Response within 48h",
        "System health reports",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Growth",
      price: p.t2,
      period: "/mo",
      description: "Scale your systems with new features, AI retraining, and insights.",
      features: [
        "Everything in Maintenance",
        "Feature additions",
        "AI model retraining",
        "Infrastructure scaling",
        "Monthly analytics report",
        "24h response SLA",
      ],
      cta: "Start Growing",
      highlighted: true,
    },
    {
      name: "Strategic AI Partner",
      price: p.t3,
      period: "/mo",
      description: "Dedicated engineering hours with quarterly innovation planning.",
      features: [
        "Everything in Growth",
        "Dedicated engineer hours",
        "AI roadmap updates",
        "Quarterly innovation planning",
        "Direct Slack access",
        "12h response | System priority",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Infrastructure-Grade <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            We price like infrastructure, not freelancers. AI implementation projects plus ongoing retainer plans.
          </p>

          {/* Region selector */}
          <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border/50">
            {(Object.keys(regionLabels) as Region[]).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  region === r
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {regionLabels[r]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Implementation banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 mb-8 text-center"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
            AI Implementation Projects
          </p>
          <p className="text-2xl sm:text-3xl font-display font-bold text-primary">
            {p.impl}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{p.implRange} · scoped per project</p>
        </motion.div>

        {/* Retainer tiers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {retainerTiers.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card-hover p-6 sm:p-8 flex flex-col ${
                plan.highlighted
                  ? "border-primary/40 shadow-[0_0_40px_hsl(var(--neon-blue)/0.1)]"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <span className="text-[10px] font-medium tracking-widest uppercase text-primary-foreground bg-primary px-3 py-1 rounded-full self-start mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-display font-semibold">{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="text-3xl sm:text-4xl font-display font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`block text-center text-sm font-medium py-3 rounded-lg transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.3)]"
                    : "border border-border/60 text-foreground hover:border-primary/40 hover:bg-muted/30"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
