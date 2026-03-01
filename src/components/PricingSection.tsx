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

const pricingData: Record<Region, { impl: string; implRange: string; t1: string; t2: string; t3: string }> = {
  za: { impl: "R45k – R180k", implRange: "once-off", t1: "R 8,000", t2: "R 15,000", t3: "R 35,000+" },
  uk: { impl: "£4k – £15k", implRange: "once-off", t1: "£ 900", t2: "£ 2,000", t3: "£ 5,000+" },
  us: { impl: "$5k – $20k+", implRange: "once-off", t1: "$ 1,200", t2: "$ 3,000", t3: "$ 8,000+" },
};

const PricingSection = () => {
  const [region, setRegion] = useState<Region>("za");
  const p = pricingData[region];

  const tiers = [
    {
      name: "Maintenance",
      price: p.t1,
      period: "/mo",
      desc: "Keep systems healthy with monitoring and quick fixes.",
      features: ["Bug fixes & improvements", "Performance monitoring", "Monthly check-in", "48h response SLA", "Health reports"],
      highlighted: false,
    },
    {
      name: "Growth",
      price: p.t2,
      period: "/mo",
      desc: "Scale with new features, AI retraining, and insights.",
      features: ["Everything in Maintenance", "Feature additions", "AI model retraining", "Infrastructure scaling", "Analytics report", "24h response SLA"],
      highlighted: true,
    },
    {
      name: "Strategic Partner",
      price: p.t3,
      period: "/mo",
      desc: "Dedicated engineering with quarterly innovation planning.",
      features: ["Everything in Growth", "Dedicated engineer hours", "AI roadmap updates", "Innovation planning", "Direct Slack access", "12h priority SLA"],
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Infrastructure-Grade <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            We price like infrastructure, not freelancers. Implementation projects plus ongoing retainer plans.
          </p>

          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted/50 border border-border/50">
            {(Object.keys(regionLabels) as Region[]).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  region === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {regionLabels[r]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Implementation price */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-5 mb-6 text-center"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">AI Implementation</p>
          <p className="text-2xl font-bold text-primary">{p.impl}</p>
          <p className="text-xs text-muted-foreground">{p.implRange} · scoped per project</p>
        </motion.div>

        {/* Tiers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiers.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card-hover p-6 flex flex-col ${
                plan.highlighted ? "border-primary/40" : ""
              }`}
            >
              {plan.highlighted && (
                <span className="text-[10px] font-medium uppercase text-primary-foreground bg-primary px-2.5 py-0.5 rounded-full self-start mb-3">
                  Popular
                </span>
              )}
              <h3 className="text-base font-bold">{plan.name}</h3>
              <div className="mt-3 mb-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-5">{plan.desc}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={13} className="text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`block text-center text-sm font-medium py-2.5 rounded-full transition-all ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border/60 text-foreground hover:border-primary/40"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
