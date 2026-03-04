import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Truck, MapPin, Package, BarChart3, Brain, Wrench, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

type Region = "za" | "uk" | "us";
const pricing: Record<Region, { build: string; t1: string; t2: string; t3: string }> = {
  za: { build: "R200k – R400k", t1: "R 20,000", t2: "R 30,000", t3: "R 50,000" },
  uk: { build: "£18k – £35k", t1: "£ 1,800", t2: "£ 2,600", t3: "£ 4,200" },
  us: { build: "$22k – $45k", t1: "$ 2,200", t2: "$ 3,500", t3: "$ 5,500" },
};

const features = [
  { icon: Truck, title: "Fleet & Asset Tracking", desc: "Real-time GPS tracking, vehicle status, and driver management." },
  { icon: MapPin, title: "Route & Delivery Scheduling", desc: "AI-optimized routes with live ETAs and delivery confirmations." },
  { icon: Package, title: "Inventory & Warehouse", desc: "Stock levels, warehouse management, and supply chain visibility." },
  { icon: BarChart3, title: "Operations Dashboard", desc: "KPIs, delivery metrics, cost analysis, and performance reports." },
  { icon: Brain, title: "AI Demand Forecasting", desc: "Predict demand patterns, optimize inventory, and reduce waste." },
  { icon: Wrench, title: "Predictive Maintenance", desc: "AI-driven maintenance scheduling to prevent fleet downtime." },
];

const tierBreakdowns = [
  { breakdowns: [{ cat: "Fleet Monitoring", detail: "Real-time vehicle health tracking" }, { cat: "Maintenance", detail: "Bug fixes & stability updates" }, { cat: "Check-in", detail: "Monthly strategy review" }, { cat: "SLA", detail: "48h response" }] },
  { breakdowns: [{ cat: "Route AI", detail: "Continuous route optimization" }, { cat: "Analytics", detail: "Full delivery & cost reporting" }, { cat: "Integration", detail: "API updates & third-party sync" }, { cat: "SLA", detail: "24h priority response" }] },
  { breakdowns: [{ cat: "Demand AI", detail: "Predictive demand forecasting" }, { cat: "Maintenance AI", detail: "Predictive fleet maintenance" }, { cat: "Dedicated", detail: "Priority support channel" }, { cat: "SLA", detail: "12h critical response" }] },
];

const LogisticsOS = () => {
  const [region, setRegion] = useState<Region>("za");
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const p = pricing[region];
  const featuresRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!featuresRef.current) return;
    const cards = featuresRef.current.querySelectorAll(".log-feature");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(cards, {
          opacity: [0, 1],
          translateX: [-30, 0],
          duration: 900,
          delay: stagger(100),
          ease: "outExpo",
        });
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    observer.observe(featuresRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statusRef.current) return;
    const bars = statusRef.current.querySelectorAll(".status-bar");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(bars, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 700,
          delay: stagger(120),
          ease: "outExpo",
        });
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.2 });
    observer.observe(statusRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <div className="pt-20 w-full">
        <section className="section-padding relative">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Industry OS</span>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
                ZyniqAI <span className="gradient-text">Logistics OS</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Optimize your supply chain, reduce operational waste, and predict logistics challenges before they happen with ZyniqAI.
              </p>
            </motion.div>

            <div ref={featuresRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {features.map((f) => (
                <div key={f.title} className="log-feature glass-card-hover p-6 group text-center opacity-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <f.icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Dashboard mockup */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <h2 className="text-2xl font-display font-bold mb-8">Dashboard Preview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Active Vehicles", value: "142" },
                  { label: "On-Time Rate", value: "96.4%" },
                  { label: "Fuel Savings", value: "38%" },
                  { label: "AI Predictions", value: "2.1k/day" },
                ].map((kpi) => (
                  <div key={kpi.label} className="glass-card p-4">
                    <p className="text-xl font-display font-bold text-primary">{kpi.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{kpi.label}</p>
                  </div>
                ))}
              </div>
              <div ref={statusRef} className="grid md:grid-cols-3 gap-4">
                {[
                  { status: "En Route", count: 87, pct: 61 },
                  { status: "At Warehouse", count: 38, pct: 27 },
                  { status: "Maintenance", count: 17, pct: 12 },
                ].map((s) => (
                  <div key={s.status} className="status-bar glass-card p-5 opacity-0">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium">{s.status}</p>
                      <span className="text-xs font-bold text-primary">{s.count}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted/50">
                      <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

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
                <p className="text-sm text-muted-foreground mt-1">once-off · scoped per operation</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { name: "Starter", price: p.t1, features: ["Maintenance & bug fixes", "Fleet monitoring", "Monthly check-in", "48h response"] },
                  { name: "Growth", price: p.t2, features: ["Everything in Starter", "Route optimization", "Analytics upgrades", "24h response"], highlighted: true },
                  { name: "Strategic", price: p.t3, features: ["Everything in Growth", "AI demand forecasting", "Predictive maintenance", "Priority support", "12h response"] },
                ].map((plan, idx) => (
                  <div
                    key={plan.name}
                    className={`glass-card-hover p-6 flex flex-col relative ${plan.highlighted ? "border-primary/40" : ""}`}
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
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 right-0 -bottom-2 translate-y-full z-20 mx-1">
                        <div className="glass-card p-3 border border-primary/20 shadow-xl">
                          <p className="text-[10px] font-semibold text-primary mb-2">💡 Value Breakdown</p>
                          {tierBreakdowns[idx].breakdowns.map((b) => (
                            <div key={b.cat} className="flex items-start gap-1.5 mb-1.5">
                              <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                              <div className="text-left">
                                <span className="text-[10px] font-medium text-foreground">{b.cat}: </span>
                                <span className="text-[10px] text-muted-foreground">{b.detail}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    <Link to="/contact" className="mt-6 block text-center text-sm font-medium py-3 rounded-lg border border-border/60 text-foreground hover:border-primary/40 transition-all">Get Started</Link>
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

export default LogisticsOS;
