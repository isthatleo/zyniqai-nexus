import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "For small teams getting started with AI operations.",
    features: ["Up to 5 users", "Basic analytics dashboard", "10K data points/day", "Email support", "API access"],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$199",
    period: "/mo",
    description: "For growing businesses needing advanced AI insights.",
    features: ["Up to 25 users", "Advanced predictive analytics", "1M data points/day", "Priority support", "Custom integrations", "Fleet intelligence"],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with complex operations.",
    features: ["Unlimited users", "Full AI module suite", "Unlimited data", "24/7 dedicated support", "On-premise deployment", "Custom ML models"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Pricing</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Plans that <span className="gradient-text">Scale</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start small, grow fast. Every plan includes core AI capabilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card-hover p-8 flex flex-col ${
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
                <span className="text-4xl font-display font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-neon-green flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center text-sm font-medium py-3 rounded-lg transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.3)]"
                    : "border border-border/60 text-foreground hover:border-primary/40 hover:bg-muted/30"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
