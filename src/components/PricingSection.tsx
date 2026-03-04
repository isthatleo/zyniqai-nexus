import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { animate, stagger } from "animejs";

type Region = "za" | "uk" | "us";

const regionLabels: Record<Region, string> = {
  za: "🇿🇦 South Africa",
  uk: "🇬🇧 United Kingdom",
  us: "🇺🇸 United States",
};

// Conversion rates from USD base
const conversionRates: Record<Region, { symbol: string; rate: number }> = {
  us: { symbol: "$", rate: 1 },
  uk: { symbol: "£", rate: 0.82 },
  za: { symbol: "R", rate: 18.5 },
};

const implPricing: Record<Region, string> = {
  za: "R45k – R180k",
  uk: "£4k – £15k",
  us: "$5k – $20k+",
};

// Breakdown details for each tier
const tierBreakdowns: Record<string, { category: string; detail: string }[]> = {
  "Zyniq Core": [
    { category: "AI Audit", detail: "Full operational AI readiness assessment" },
    { category: "Automation", detail: "1 core workflow automation per month" },
    { category: "Prompt Engineering", detail: "Custom prompt frameworks for your ops" },
    { category: "Dashboard", detail: "Performance metrics & KPI tracking" },
    { category: "Optimization", detail: "14-day post-deploy optimization window" },
    { category: "Support", detail: "48h response SLA" },
  ],
  "Zyniq Scale": [
    { category: "Multi-Workflow", detail: "Unlimited automation builds per month" },
    { category: "Custom Agents", detail: "AI agents tailored to your workflows" },
    { category: "API Integrations", detail: "Connect to any third-party system" },
    { category: "Sprint Cycles", detail: "Monthly optimization sprint included" },
    { category: "Team Training", detail: "AI training for your internal teams" },
    { category: "Support", detail: "Priority 24h response channel" },
  ],
  "Zyniq Elite": [
    { category: "AI Architect", detail: "Dedicated senior AI architect assigned" },
    { category: "Custom Models", detail: "Proprietary ML model strategy & training" },
    { category: "Data Pipelines", detail: "Advanced ETL & data infrastructure" },
    { category: "AI Governance", detail: "Compliance, ethics & risk framework" },
    { category: "Strategic Advisory", detail: "Ongoing C-suite AI strategy sessions" },
    { category: "Founder Access", detail: "Direct line to ZyniqAI leadership" },
  ],
};

const tierTags: Record<string, string> = {
  "Zyniq Core": "",
  "Zyniq Scale": "Most Selected",
  "Zyniq Elite": "Enterprise",
};

const PricingSection = () => {
  const [region, setRegion] = useState<Region>("us");
  const [packages, setPackages] = useState<any[]>([]);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      const { data } = await supabase.from("packages").select("*").eq("is_active", true).order("price_monthly", { ascending: true });
      if (data && data.length > 0) setPackages(data);
    };
    fetchPackages();
  }, []);

  // Anime.js stagger animation for pricing cards
  useEffect(() => {
    if (!cardsRef.current || packages.length === 0) return;
    const cards = cardsRef.current.querySelectorAll(".pricing-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(cards, {
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.95, 1],
            duration: 900,
            delay: stagger(150, { start: 100 }),
            ease: "outExpo",
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, [packages]);

  const formatPrice = (usdAmount: number) => {
    const { symbol, rate } = conversionRates[region];
    const converted = Math.round(usdAmount * rate);
    return `${symbol} ${converted.toLocaleString()}`;
  };

  return (
    <section id="pricing" className="section-padding relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
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
          className="glass-card p-5 mb-6"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">AI Implementation</p>
          <p className="text-2xl font-bold text-primary">{implPricing[region]}</p>
          <p className="text-xs text-muted-foreground">once-off · scoped per project</p>
        </motion.div>

        {/* Tiers from DB */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => {
            const tag = tierTags[pkg.name] || "";
            const isHighlighted = pkg.name === "Zyniq Scale";
            const breakdowns = tierBreakdowns[pkg.name] || [];
            const features = Array.isArray(pkg.features) ? (pkg.features as string[]) : [];

            return (
              <div
                key={pkg.id}
                className={`pricing-card glass-card-hover p-6 flex flex-col relative opacity-0 ${
                  isHighlighted ? "border-primary/40" : ""
                }`}
                onMouseEnter={() => setHoveredTier(pkg.name)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {tag && (
                  <span className="text-[10px] font-medium uppercase text-primary-foreground bg-primary px-2.5 py-0.5 rounded-full self-start mb-3">
                    {tag}
                  </span>
                )}
                <h3 className="text-base font-bold text-left">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground text-left mt-1 mb-3">{pkg.description}</p>
                <div className="text-left mt-1 mb-2">
                  <span className="text-3xl font-bold">{formatPrice(Number(pkg.price_monthly))}</span>
                  <span className="text-muted-foreground text-sm">/mo</span>
                </div>
                <p className="text-[11px] text-muted-foreground text-left mb-4">
                  {formatPrice(Number(pkg.price_yearly))}/yr
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-left">
                      <Check size={13} className="text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Breakdown Tooltip */}
                <AnimatePresence>
                  {hoveredTier === pkg.name && breakdowns.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 -bottom-2 translate-y-full z-30 mx-2"
                    >
                      <div className="glass-card p-4 border border-primary/20 shadow-xl">
                        <div className="flex items-center gap-1.5 mb-3">
                          <Sparkles size={12} className="text-primary" />
                          <p className="text-xs font-semibold text-primary">What's Included</p>
                        </div>
                        <div className="space-y-2">
                          {breakdowns.map((b) => (
                            <div key={b.category} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                              <div className="text-left">
                                <p className="text-xs font-medium text-foreground">{b.category}</p>
                                <p className="text-[10px] text-muted-foreground">{b.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-2 border-t border-border/30">
                          <p className="text-[10px] text-muted-foreground text-center">
                            Hover for details · {formatPrice(Number(pkg.price_monthly))}/mo billed monthly
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  to="/contact"
                  className={`block text-center text-sm font-medium py-2.5 rounded-full transition-all ${
                    isHighlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border/60 text-foreground hover:border-primary/40"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            );
          })}
          {packages.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">Loading packages...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
