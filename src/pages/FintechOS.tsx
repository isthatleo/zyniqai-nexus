import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Landmark, TrendingUp, AlertTriangle, FileCheck, BarChart3 } from "lucide-react";

const features = [
  { icon: Shield, title: "Real-Time Fraud Detection", desc: "ML-powered transaction monitoring with anomaly detection and instant alerts.", color: "hsl(0, 72%, 63%)" },
  { icon: Landmark, title: "Regulatory Compliance", desc: "Automated KYC/AML workflows, audit trails, and compliance reporting.", color: "hsl(145, 63%, 49%)" },
  { icon: TrendingUp, title: "AI Risk Assessment", desc: "Credit scoring, portfolio risk analysis, and market prediction engines.", color: "hsl(217, 91%, 60%)" },
  { icon: AlertTriangle, title: "Anomaly Detection", desc: "Pattern recognition across transactions and accounts.", color: "hsl(45, 93%, 58%)" },
  { icon: FileCheck, title: "Automated Reporting", desc: "Regulatory reports and analytics on schedule or on-demand.", color: "hsl(187, 72%, 55%)" },
  { icon: BarChart3, title: "Revenue Analytics", desc: "Track fees, margins, and profitability in real-time.", color: "hsl(265, 83%, 68%)" },
];

type Region = "za" | "uk" | "us";
const pricing: Record<Region, { build: string; t1: string; t2: string; t3: string }> = {
  za: { build: "R120k – R400k", t1: "R 12,000", t2: "R 25,000", t3: "R 55,000+" },
  uk: { build: "£8k – £30k", t1: "£ 1,200", t2: "£ 3,000", t3: "£ 7,000+" },
  us: { build: "$10k – $40k", t1: "$ 1,500", t2: "$ 4,000", t3: "$ 9,000+" },
};

const FintechOS = () => {
  const [region, setRegion] = useState<Region>("za");
  const p = pricing[region];

  return (
    <Layout>
      <div className="pt-24 pb-20 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20 max-w-3xl mx-auto">
            <span className="feature-pill" style={{ borderColor: "hsl(0, 72%, 63%, 0.4)", color: "hsl(0, 72%, 63%)", backgroundColor: "hsl(0, 72%, 63%, 0.08)" }}>Fintech OS</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-6 mb-4">Intelligent Financial <span className="gradient-text">Infrastructure</span></h1>
            <p className="text-muted-foreground text-lg leading-relaxed">Build secure financial platforms with real-time fraud detection, automated compliance, and AI-driven risk assessment.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card-hover p-6 group text-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Pricing</h2>
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted/50 border border-border/50">
              {(["za", "uk", "us"] as Region[]).map((r) => (
                <button key={r} onClick={() => setRegion(r)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${region === r ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                  {r === "za" ? "🇿🇦 ZA" : r === "uk" ? "🇬🇧 UK" : "🇺🇸 US"}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="glass-card p-5 text-center mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Platform Build</p>
            <p className="text-2xl font-bold text-primary">{p.build}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {[
              { name: "Starter", price: p.t1, features: ["Fraud monitoring", "Basic compliance", "Monthly reports"] },
              { name: "Growth", price: p.t2, features: ["Everything in Starter", "AI risk models", "Custom dashboards", "24h SLA"] },
              { name: "Enterprise", price: p.t3, features: ["Everything in Growth", "Dedicated engineer", "Custom ML models", "12h SLA"] },
            ].map((tier, i) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`glass-card-hover p-6 text-center ${i === 1 ? "border-primary/40" : ""}`}>
                <h3 className="font-bold text-sm mb-2">{tier.name}</h3>
                <p className="text-2xl font-bold mb-1">{tier.price}</p>
                <p className="text-xs text-muted-foreground mb-4">/month</p>
                <ul className="space-y-2">{tier.features.map(f => <li key={f} className="text-xs text-muted-foreground">{f}</li>)}</ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
              Book a Strategy Call <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FintechOS;
