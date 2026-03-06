import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Hotel, Calendar, Users, BarChart3, Brain, Clock, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import { useTheme } from "@/components/ThemeProvider";
import { animate, stagger } from "animejs";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import ParallaxSection from "@/components/ParallaxSection";
import { HospitalityDashboardMockup } from "@/components/DashboardMockups";

const occupancyData = [
  { month: "Jan", rate: 62 }, { month: "Feb", rate: 68 }, { month: "Mar", rate: 75 },
  { month: "Apr", rate: 82 }, { month: "May", rate: 78 }, { month: "Jun", rate: 90 },
  { month: "Jul", rate: 95 }, { month: "Aug", rate: 88 },
];

const revenueData = [
  { month: "Jan", direct: 320, ota: 180 }, { month: "Feb", direct: 380, ota: 160 },
  { month: "Mar", direct: 420, ota: 150 }, { month: "Apr", direct: 480, ota: 140 },
];

type Region = "za" | "uk" | "us";
const pricing: Record<Region, { build: string; t1: string; t2: string; t3: string }> = {
  za: { build: "R250k – R400k", t1: "R 18,000", t2: "R 28,000", t3: "R 45,000" },
  uk: { build: "£20k – £35k", t1: "£ 1,500", t2: "£ 2,400", t3: "£ 3,800" },
  us: { build: "$25k – $45k", t1: "$ 2,000", t2: "$ 3,200", t3: "$ 5,000" },
};

const features = [
  { icon: Hotel, title: "Website + Booking Engine", desc: "Direct bookings with zero commission, integrated with your property." },
  { icon: Calendar, title: "Facility & Event Management", desc: "Room, conference, and event scheduling with real-time availability." },
  { icon: Users, title: "Staff & Operations Dashboard", desc: "Task management, shift scheduling, and performance tracking." },
  { icon: BarChart3, title: "Revenue & Analytics", desc: "Occupancy trends, revenue per room, and competitive benchmarking." },
  { icon: Brain, title: "AI Forecasting", desc: "Predict demand, optimize pricing, and anticipate maintenance needs." },
  { icon: Clock, title: "Automation & Alerts", desc: "Automated guest communications, housekeeping triggers, and alerts." },
];

const tierBreakdowns = [
  { name: "Starter", breakdowns: [
    { cat: "Maintenance", detail: "Bug fixes & system health monitoring" },
    { cat: "Updates", detail: "Minor feature improvements monthly" },
    { cat: "Check-in", detail: "Monthly strategy call with your team" },
    { cat: "SLA", detail: "48h guaranteed response time" },
  ]},
  { name: "Growth", breakdowns: [
    { cat: "Analytics", detail: "Full occupancy & revenue reporting suite" },
    { cat: "AI Beta", detail: "Early access to demand forecasting models" },
    { cat: "Optimization", detail: "Monthly pricing & conversion optimization" },
    { cat: "SLA", detail: "24h priority response time" },
  ]},
  { name: "Strategic", breakdowns: [
    { cat: "AI Engine", detail: "Continuous model improvement & retraining" },
    { cat: "Custom Analytics", detail: "Bespoke dashboards for your KPIs" },
    { cat: "Priority", detail: "Dedicated support channel" },
    { cat: "SLA", detail: "12h critical response time" },
  ]},
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="text-muted-foreground">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-medium">{p.value}</p>
      ))}
    </div>
  );
};

const HospitalityOS = () => {
  const [region, setRegion] = useState<Region>("za");
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const p = pricing[region];
  const { resolvedTheme } = useTheme();
  const gridColor = resolvedTheme === "light" ? "hsl(40 15% 90%)" : "hsl(30 10% 18%)";
  const tickColor = resolvedTheme === "light" ? "#888" : "#B0B0B0";
  const featuresRef = useRef<HTMLDivElement>(null);
  const kpiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!featuresRef.current) return;
    const cards = featuresRef.current.querySelectorAll(".hosp-feature");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(cards, {
          opacity: [0, 1],
          translateY: [30, 0],
          rotateY: [10, 0],
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

  return (
    <Layout>
      <div className="pt-20 w-full">
        <section className="section-padding relative">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Industry OS</span>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
                ZyniqAI <span className="gradient-text">Hospitality OS</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transform your hotel into a fully digital ecosystem. Centralize operations, increase direct bookings, and make data-driven decisions with AI-powered intelligence.
              </p>
            </motion.div>

            <div ref={featuresRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {features.map((f) => (
                <div key={f.title} className="hosp-feature glass-card-hover p-6 group text-center opacity-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <f.icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Dashboard Preview */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <h2 className="text-2xl font-display font-bold mb-8">Dashboard Preview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="text-sm font-medium mb-1">Occupancy Rate</h3>
                  <p className="text-xs text-muted-foreground mb-4">Monthly trend</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={occupancyData}>
                      <defs>
                        <linearGradient id="gradOcc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                      <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="rate" stroke="#D4AF37" strokeWidth={2} fill="url(#gradOcc)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-sm font-medium mb-1">Revenue Channels</h3>
                  <p className="text-xs text-muted-foreground mb-4">Direct vs OTA bookings (k)</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                      <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="direct" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="ota" fill="#8B6914" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
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
                <p className="text-sm text-muted-foreground mt-1">once-off · scoped per property</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { name: "Starter", price: p.t1, features: ["Maintenance & bug fixes", "Minor feature updates", "Monthly check-in", "48h response SLA"] },
                  { name: "Growth", price: p.t2, features: ["Everything in Starter", "Analytics & reporting", "AI forecasting beta", "24h response SLA"], highlighted: true },
                  { name: "Strategic", price: p.t3, features: ["Everything in Growth", "AI continuous improvement", "Custom analytics", "Priority support", "12h response SLA"] },
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
                        <li key={f} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <Check size={14} className="text-primary flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>

                    {/* Hover breakdown */}
                    {hoveredTier === idx && tierBreakdowns[idx] && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-0 right-0 -bottom-2 translate-y-full z-20 mx-1"
                      >
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

                    <Link to="/contact" className="mt-6 block text-center text-sm font-medium py-3 rounded-lg border border-border/60 text-foreground hover:border-primary/40 transition-all">
                      Get Started
                    </Link>
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

export default HospitalityOS;
