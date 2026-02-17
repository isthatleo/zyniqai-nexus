import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Hotel, Calendar, Users, BarChart3, Brain, Clock, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";

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
  const p = pricing[region];

  return (
    <Layout>
      <div className="pt-20">
        <section className="section-padding relative">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Industry OS</span>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
                ZyniqAI <span className="gradient-text">Hospitality OS</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transform your hotel into a fully digital ecosystem. Centralize operations, increase direct bookings, and make data-driven decisions with AI-powered intelligence.
              </p>
            </motion.div>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {features.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card-hover p-6 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <f.icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Dashboard Preview */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <h2 className="text-2xl font-display font-bold text-center mb-8">Dashboard Preview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="text-sm font-medium mb-1">Occupancy Rate</h3>
                  <p className="text-xs text-muted-foreground mb-4">Monthly trend</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={occupancyData}>
                      <defs>
                        <linearGradient id="gradOcc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2CE9FF" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#2CE9FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 20% 18%)" />
                      <XAxis dataKey="month" tick={{ fill: "#B0B0B0", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#B0B0B0", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="rate" stroke="#2CE9FF" strokeWidth={2} fill="url(#gradOcc)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-sm font-medium mb-1">Revenue Channels</h3>
                  <p className="text-xs text-muted-foreground mb-4">Direct vs OTA bookings (k)</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 20% 18%)" />
                      <XAxis dataKey="month" tick={{ fill: "#B0B0B0", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#B0B0B0", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="direct" fill="#7FFF00" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="ota" fill="#7D5CFF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Pricing */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-display font-bold text-center mb-4">Pricing</h2>
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border/50">
                  {(["za", "uk", "us"] as Region[]).map((r) => (
                    <button key={r} onClick={() => setRegion(r)} className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${region === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {r === "za" ? "🇿🇦 ZAR" : r === "uk" ? "🇬🇧 GBP" : "🇺🇸 USD"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 mb-6 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Base Build</p>
                <p className="text-2xl font-display font-bold text-primary">{p.build}</p>
                <p className="text-sm text-muted-foreground mt-1">once-off · scoped per property</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { name: "Starter", price: p.t1, features: ["Maintenance & bug fixes", "Minor feature updates", "Monthly check-in", "48h response SLA"] },
                  { name: "Growth", price: p.t2, features: ["Everything in Starter", "Analytics & reporting", "AI forecasting beta", "24h response SLA"], highlighted: true },
                  { name: "Strategic", price: p.t3, features: ["Everything in Growth", "AI continuous improvement", "Custom analytics", "Priority support", "12h response SLA"] },
                ].map((plan) => (
                  <div key={plan.name} className={`glass-card-hover p-6 flex flex-col ${"highlighted" in plan && plan.highlighted ? "border-primary/40" : ""}`}>
                    {"highlighted" in plan && plan.highlighted && <span className="text-[10px] font-medium tracking-widest uppercase text-primary-foreground bg-primary px-3 py-1 rounded-full self-start mb-3">Popular</span>}
                    <h3 className="text-lg font-display font-semibold">{plan.name}</h3>
                    <p className="text-2xl font-display font-bold mt-2">{plan.price}<span className="text-sm text-muted-foreground">/mo</span></p>
                    <ul className="space-y-2 mt-4 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check size={14} className="text-accent flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="mt-6 block text-center text-sm font-medium py-3 rounded-lg border border-border/60 text-foreground hover:border-primary/40 transition-all">
                      Get Started
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="mt-16 text-center">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:shadow-[0_0_30px_hsl(var(--neon-blue)/0.4)] transition-all">
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
