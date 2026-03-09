import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import CharacterReveal from "./CharacterReveal";

type Region = "za" | "uk" | "us";

const regionLabels: Record<Region, string> = {
  za: "🇿🇦 South Africa",
  uk: "🇬🇧 United Kingdom",
  us: "🇺🇸 United States",
};

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

const tierAccents: Record<string, { color: string; glow: string }> = {
  "Web Design":   { color: "hsl(var(--cyan-accent))",   glow: "hsl(var(--cyan-accent) / 0.2)" },
  "Zyniq Core":   { color: "hsl(var(--blue-accent))",   glow: "hsl(var(--blue-accent) / 0.2)" },
  "Zyniq Scale":  { color: "hsl(var(--primary))",       glow: "hsl(var(--primary) / 0.3)" },
  "Zyniq Elite":  { color: "hsl(var(--gold))",          glow: "hsl(var(--gold) / 0.25)" },
};

const tierBreakdowns: Record<string, { category: string; detail: string }[]> = {
  "Web Design": [
    { category: "Design",      detail: "Custom UI/UX design tailored to your brand" },
    { category: "Development", detail: "Responsive code across all devices" },
    { category: "SEO",         detail: "On-page optimization & meta setup" },
    { category: "CMS",         detail: "Content management system integration" },
    { category: "Launch",      detail: "SSL, hosting setup, and deployment" },
    { category: "Support",     detail: "30-day post-launch bug fixes" },
  ],
  "Zyniq Core": [
    { category: "AI Audit",           detail: "Full operational AI readiness assessment" },
    { category: "Automation",         detail: "1 core workflow automation per month" },
    { category: "Prompt Engineering", detail: "Custom prompt frameworks for your ops" },
    { category: "Dashboard",          detail: "Performance metrics & KPI tracking" },
    { category: "Optimization",       detail: "14-day post-deploy optimization window" },
    { category: "Support",            detail: "48h response SLA" },
  ],
  "Zyniq Scale": [
    { category: "Multi-Workflow",  detail: "Unlimited automation builds per month" },
    { category: "Custom Agents",   detail: "AI agents tailored to your workflows" },
    { category: "API Integrations",detail: "Connect to any third-party system" },
    { category: "Sprint Cycles",   detail: "Monthly optimization sprint included" },
    { category: "Team Training",   detail: "AI training for your internal teams" },
    { category: "Support",         detail: "Priority 24h response channel" },
  ],
  "Zyniq Elite": [
    { category: "AI Architect",      detail: "Dedicated senior AI architect assigned" },
    { category: "Custom Models",     detail: "Proprietary ML model strategy & training" },
    { category: "Data Pipelines",    detail: "Advanced ETL & data infrastructure" },
    { category: "AI Governance",     detail: "Compliance, ethics & risk framework" },
    { category: "Strategic Advisory",detail: "Ongoing C-suite AI strategy sessions" },
    { category: "Founder Access",    detail: "Direct line to ZyniqAI leadership" },
  ],
};

const tierTags: Record<string, string> = {
  "Web Design":  "Startup-Friendly",
  "Zyniq Core":  "",
  "Zyniq Scale": "Most Selected",
  "Zyniq Elite": "Enterprise",
};

const tierOrder = ["Web Design", "Zyniq Core", "Zyniq Scale", "Zyniq Elite"];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE },
  }),
};

const PricingSection = () => {
  const [region, setRegion] = useState<Region>("us");
  const [packages, setPackages] = useState<any[]>([]);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      const { data } = await supabase.from("packages").select("*").eq("is_active", true);
      if (data && data.length > 0) {
        const sorted = [...data].sort((a, b) => {
          const ai = tierOrder.indexOf(a.name);
          const bi = tierOrder.indexOf(b.name);
          return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        });
        setPackages(sorted);
      }
    };
    fetchPackages();
  }, []);

  const formatPrice = (usdAmount: number) => {
    const { symbol, rate } = conversionRates[region];
    return `${symbol} ${Math.round(usdAmount * rate).toLocaleString()}`;
  };

  return (
    <section id="pricing" className="section-padding relative">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 bg-muted/20 text-[11px] font-mono text-muted-foreground tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Infrastructure-Grade{" "}
            <CharacterReveal text="Pricing" className="gradient-text" staggerDelay={35} />
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm leading-relaxed">
            From startup websites to enterprise AI infrastructure. Implementation projects plus ongoing retainer plans.
          </p>

          {/* Region selector */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted/50 border border-border/50">
            {(Object.keys(regionLabels) as Region[]).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
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

        {/* Implementation pricing */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-5 mb-8 inline-block w-full sm:w-auto sm:min-w-[260px]"
        >
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-1 font-mono">AI Implementation</p>
          <p className="text-2xl font-bold text-primary">{implPricing[region]}</p>
          <p className="text-xs text-muted-foreground">once-off · scoped per project</p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {packages.map((pkg, index) => {
            const isHovered = hoveredTier === pkg.name;
            const isHighlighted = pkg.name === "Zyniq Scale";
            const isWebDesign = pkg.name === "Web Design";
            const accent = tierAccents[pkg.name] || tierAccents["Zyniq Core"];
            const tag = tierTags[pkg.name] || "";
            const breakdowns = tierBreakdowns[pkg.name] || [];
            const features = Array.isArray(pkg.features) ? (pkg.features as string[]) : [];

            return (
              <div key={pkg.id} className={`relative ${isHighlighted ? "lg:scale-[1.03] lg:z-10" : ""}`}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative flex flex-col overflow-hidden rounded-2xl h-full"
                  style={{
                    background: "hsl(var(--card) / 0.65)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${isHovered ? accent.color + "55" : "hsl(var(--border) / 0.5)"}`,
                    boxShadow: isHovered
                      ? `0 0 40px ${accent.glow}, 0 20px 60px hsl(0 0% 0% / 0.25)`
                      : "0 2px 20px hsl(0 0% 0% / 0.08)",
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                  }}
                  onHoverStart={() => setHoveredTier(pkg.name)}
                  onHoverEnd={() => setHoveredTier(null)}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 25 } }}
                >
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${accent.color}14 0%, transparent 60%)`,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-400"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
                      opacity: isHovered ? 1 : 0.3,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full p-5 sm:p-6">
                    {/* Tag */}
                    {tag && (
                      <span
                        className="self-start text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3"
                        style={{
                          color: accent.color,
                          background: accent.color + "20",
                          border: `1px solid ${accent.color}40`,
                        }}
                      >
                        {tag}
                      </span>
                    )}

                    <h3 className="text-[15px] font-bold text-left mb-1">{pkg.name}</h3>
                    <p className="text-xs text-muted-foreground text-left leading-relaxed mb-4 line-clamp-2">
                      {pkg.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-end gap-1 mb-1 text-left">
                      <span className="text-[1.9rem] font-bold leading-none">
                        {formatPrice(Number(pkg.price_monthly))}
                      </span>
                      <span className="text-muted-foreground text-sm pb-0.5">/mo</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground text-left mb-5">
                      {formatPrice(Number(pkg.price_yearly))}/yr · save 15%
                    </p>

                    {/* Feature / Breakdown toggle */}
                    <div className="flex-1 relative min-h-[195px]">
                      <AnimatePresence mode="wait">
                        {!isHovered ? (
                          <motion.ul
                            key="features"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 space-y-2.5 overflow-hidden"
                          >
                            {features.map((f, fi) => (
                              <motion.li
                                key={f}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: fi * 0.05, duration: 0.25 }}
                                className="flex items-center gap-2 text-left"
                              >
                                <Check size={11} className="flex-shrink-0" style={{ color: accent.color }} />
                                <span className="text-xs text-muted-foreground leading-snug">{f}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        ) : (
                          <motion.div
                            key="breakdown"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 overflow-y-auto"
                          >
                            <div className="flex items-center gap-1.5 mb-3">
                              <Sparkles size={11} style={{ color: accent.color }} />
                              <p className="text-[11px] font-semibold" style={{ color: accent.color }}>
                                What's Included
                              </p>
                            </div>
                            {breakdowns.map((b, bi) => (
                              <motion.div
                                key={b.category}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: bi * 0.04, duration: 0.2 }}
                                className="flex items-start gap-2 mb-2.5 last:mb-0"
                              >
                                <div
                                  className="w-1.5 h-1.5 rounded-full mt-[5px] flex-shrink-0"
                                  style={{ backgroundColor: accent.color }}
                                />
                                <div className="flex-1 min-w-0 text-left">
                                  <p className="text-[11px] font-semibold text-foreground leading-none mb-0.5">
                                    {b.category}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground leading-snug">{b.detail}</p>
                                </div>
                              </motion.div>
                            ))}
                            {/* Pricing summary */}
                            <div className="mt-3 pt-3 border-t border-border/30">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Monthly</span>
                                <span className="font-semibold" style={{ color: accent.color }}>
                                  {formatPrice(Number(pkg.price_monthly))}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Annually (−15%)</span>
                                <span className="font-medium text-muted-foreground">
                                  {formatPrice(Number(pkg.price_yearly))}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* CTA */}
                    <Link
                      to={{ pathname: "/contact", search: `?tier=${encodeURIComponent(pkg.name)}` }}
                      state={{ selectedTier: pkg.name }}
                      className="block text-center text-sm font-semibold py-2.5 rounded-full transition-all duration-300 mt-4"
                      style={{
                        background: isHovered
                          ? accent.color
                          : isHighlighted
                          ? "hsl(var(--primary))"
                          : "transparent",
                        color:
                          isHovered || isHighlighted
                            ? "hsl(var(--primary-foreground))"
                            : "hsl(var(--foreground))",
                        border: `1px solid ${
                          isHovered
                            ? accent.color
                            : isHighlighted
                            ? "hsl(var(--primary))"
                            : "hsl(var(--border) / 0.6)"
                        }`,
                      }}
                    >
                      {isWebDesign ? "Get a Website" : "Get Started"}
                    </Link>
                  </div>
                </motion.div>
              </div>
            );
          })}

          {packages.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">
              <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin mx-auto mb-3" />
              Loading packages…
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
