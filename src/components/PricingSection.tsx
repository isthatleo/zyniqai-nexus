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

const pricingData: Record<Region, { starter: string; pro: string; currency: string }> = {
  za: { starter: "R 45,000", pro: "R 150,000", currency: "ZAR" },
  uk: { starter: "£ 2,000", pro: "£ 6,500", currency: "GBP" },
  us: { starter: "$ 2,500", pro: "$ 8,000", currency: "USD" },
};

const PricingSection = () => {
  const [region, setRegion] = useState<Region>("us");
  const pricing = pricingData[region];

  const plans = [
    {
      name: "Starter",
      price: pricing.starter,
      period: "/mo",
      description: "For growing teams adopting AI-driven workflows.",
      features: [
        "Up to 10 users",
        "Core analytics dashboard",
        "2 AI modules",
        "Standard API access",
        "Email & chat support",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Professional",
      price: pricing.pro,
      period: "/mo",
      description: "For organizations scaling intelligent operations.",
      features: [
        "Up to 50 users",
        "Full predictive analytics",
        "All AI modules",
        "Priority API + WebSocket",
        "Dedicated success manager",
        "Custom integrations",
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large enterprises with mission-critical AI needs.",
      features: [
        "Unlimited users",
        "Custom ML model development",
        "On-premise / private cloud",
        "24/7 dedicated engineering",
        "SLA-backed uptime",
        "Full source access",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Pricing</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Plans that <span className="gradient-text">Scale</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Standard software development rates. Every plan includes core AI capabilities and dedicated support.
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card-hover p-6 sm:p-8 flex flex-col ${
                plan.highlighted ? "border-primary/40 shadow-[0_0_40px_hsl(var(--neon-blue)/0.1)]" : ""
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
