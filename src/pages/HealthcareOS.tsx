import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Stethoscope, User, ClipboardList, Activity, Brain, FileText, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import ParallaxSection from "@/components/ParallaxSection";
// Note: Create HealthcareDashboardMockup in DashboardMockups.tsx later if needed

type Region = "za" | "uk" | "us";
const pricing: Record<Region, { build: string; t1: string; t2: string; t3: string }> = {
  za: { build: "R220k – R450k", t1: "R 22,000", t2: "R 35,000", t3: "R 60,000" },
  uk: { build: "£18k – £38k", t1: "£ 1,800", t2: "£ 2,900", t3: "£ 5,000" },
  us: { build: "$22k – $48k", t1: "R 2,400", t2: "R 3,800", t3: "R 6,500" },
};

const features = [
  { icon: Stethoscope, title: "Patient Management", desc: "EHR/EMR systems, appointment scheduling, and patient portals." },
  { icon: User, title: "Staff & Doctor Scheduling", desc: "Shift rostering, on-call management, and availability tracking." },
  { icon: ClipboardList, title: "Clinical Workflows", desc: "Electronic prescriptions, lab orders, and treatment plans." },
  { icon: Activity, title: "Performance Analytics", desc: "KPIs, bed occupancy, revenue cycle management, and outcomes tracking." },
  { icon: Brain, title: "AI Diagnostics", desc: "Predictive readmission risk, triage prioritization, and outcome forecasting." },
  { icon: FileText, title: "Compliance & Billing", desc: "HIPAA/GDPR compliance, insurance billing, and regulatory reporting." },
];

const tierBreakdowns = [
  { breakdowns: [{ cat: "Maintenance", detail: "Bug fixes & system stability" }, { cat: "Updates", detail: "Monthly minor improvements" }, { cat: "Check-in", detail: "Monthly review call" }, { cat: "SLA", detail: "48h response time" }] },
  { breakdowns: [{ cat: "Features", detail: "Workflow customizations" }, { cat: "Analytics", detail: "Patient flow dashboards" }, { cat: "AI Beta", detail: "Early diagnostic models" }, { cat: "SLA", detail: "24h priority response" }] },
  { breakdowns: [{ cat: "AI Engine", detail: "Custom diagnostic models" }, { cat: "Integrations", detail: "Lab/PACS/HIS systems" }, { cat: "Dedicated", detail: "Priority support channel" }, { cat: "SLA", detail: "12h critical response" }] },
];

const HealthcareOS = () => {
  const [region, setRegion] = useState<Region>("za");
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const p = pricing[region];
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!featuresRef.current) return;
    const cards = featuresRef.current.querySelectorAll(".health-feature");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(cards, {
          opacity: [0, 1],
          translateY: [25, 0],
          scale: [0.9, 1],
          duration: 800,
          delay: stagger(90),
          ease: "outExpo",
        });
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    observer.observe(featuresRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <div className="pt-20 w-full">
        <section className="section-padding relative">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Industry OS</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                ZyniqAI <span className="gradient-text" style={{
                  background: "linear-gradient(90deg, hsl(40,72%,63%), hsl(0,72%,63%), hsl(280,83%,68%))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text !important",
                  WebkitTextFillColor: "transparent !important",
                }}>Healthcare OS</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Streamline clinical workflows, enhance patient outcomes, and ensure regulatory compliance with AI-powered healthcare intelligence.
              </p>
            </motion.div>

            <div ref={featuresRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {features.map((f) => (
                <div key={f.title} className="health-feature glass-card-hover p-6 group text-center opacity-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <f.icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Dashboard mockup placeholder */}
            <ParallaxSection speed={0.2}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                <ScrollTextReveal text="Dashboard Preview" tag="h2"
                  className="text-2xl font-display font-bold mb-8" staggerDelay={40} />
                <div className="glass-card p-6 text-center text-muted-foreground">
                  Healthcare Dashboard Mockup (Coming Soon)
                </div>
              </motion.div>
            </ParallaxSection>

            {/* Pricing */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-display font-bold mb-4">Pricing</h2>
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border/50">
                  {(["za", "uk", "us"] as Region[]).map((r) => (
                    <button key={r} onClick={() => setRegion(r)} className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${region === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {r === "za" ? "🇿🇦 ZAR" : r === "uk" ? "🇬🇧 GBP" : "🇺🇸 USD"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Base Build</p>
                <p className="text-2xl font-display font-bold text-primary">{p.build}</p>
                <p className="text-sm text-muted-foreground mt-1">once-off · scoped per facility</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { name: "Starter", price: p.t1, features: ["Maintenance & compliance patches", "Minor updates", "Monthly check-in", "48h response"], highlighted: false },
                  { name: "Growth", price: p.t2, features: ["Everything in Starter", "Analytics dashboards", "AI triage beta", "24h response"], highlighted: true },
                  { name: "Strategic", price: p.t3, features: ["Everything in Growth", "Custom AI diagnostics", "Regulatory integrations", "12h response"], highlighted: false },
                ].map((plan, idx) => (
                  <div
                    key={plan.name}
                    className={`glass-card-hover p-6 flex flex-col relative ${plan.highlighted ? "border-primary/40 ring-2 ring-primary/20" : ""}`}
                    onMouseEnter={() => setHoveredTier(idx)}
                    onMouseLeave={() => setHoveredTier(null)}
                  >
                    {plan.highlighted && <span className="text-[10px] font-medium tracking-widest uppercase text-primary-foreground bg-primary px-3 py-1 rounded-full self-center mb-3">Popular</span>}
                    <h3 className="text-lg font-display font-semibold">{plan.name}</h3>
                    <p className="text-2xl font-display font-bold mt-2">{plan.price}<span className="text-sm text-muted-foreground">/mo</span></p>
                    <ul className="space-y-2 mt-4 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center justify-center gap-2 text-sm text-muted-foreground"><Check size={14} className="text-primary flex-shrink-0" /> {f}</li>
                      ))}
                    </ul>
                    {hoveredTier === idx && tierBreakdowns[idx] && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-full right-full -bottom-4 translate-y-full z-10 pointer-events-none mx-auto w-fit">
                        <div className="glass-card p-4 border border-border/30 backdrop-blur-xl shadow-2xl max-w-xs">
                          <p className="text-xs font-semibold text-primary mb-3 flex items-center gap-1.5">
                            💡 What's Included
                          </p>
                          {tierBreakdowns[idx].breakdowns.map((b) => (
                            <div key={b.cat} className="flex items-start gap-2 mb-2 last:mb-0">
                              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                              <div className="text-left">
                                <span className="text-xs font-medium text-foreground block">{b.cat}</span>
                                <span className="text-[11px] text-muted-foreground">{b.detail}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    <Link to="/contact" className="mt-6 block text-center text-sm font-semibold py-3 rounded-lg bg-gradient-to-r from-primary/90 hover:from-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 pointer-events-auto z-40 relative border-2 border-transparent hover:border-primary/50">Get Started</Link>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="mt-16">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:shadow-[0_0_30px_hsl(var(--gold)/0.4)] transition-all">
                Book a Strategy Call <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HealthcareOS;

