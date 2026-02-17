import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Landmark, ShieldCheck, TrendingUp, BarChart3, Brain, Lock, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

type Region = "za" | "uk" | "us";
const pricing: Record<Region, { build: string; t1: string; t2: string; t3: string }> = {
  za: { build: "R300k – R500k", t1: "R 22,000", t2: "R 35,000", t3: "R 55,000" },
  uk: { build: "£25k – £45k", t1: "£ 1,800", t2: "£ 3,000", t3: "£ 4,500" },
  us: { build: "$30k – $55k", t1: "$ 2,500", t2: "$ 4,000", t3: "$ 6,000" },
};

const features = [
  { icon: Landmark, title: "Payment Infrastructure", desc: "Multi-currency payment processing, settlement engines, and reconciliation automation." },
  { icon: ShieldCheck, title: "Compliance & KYC", desc: "Automated KYC/AML checks, regulatory reporting, and audit trail management." },
  { icon: TrendingUp, title: "Risk Assessment", desc: "AI-driven credit scoring, risk profiling, and portfolio analysis in real-time." },
  { icon: BarChart3, title: "Financial Analytics", desc: "Real-time transaction dashboards, revenue analytics, and performance metrics." },
  { icon: Brain, title: "Fraud Detection", desc: "Machine learning models detecting anomalous transactions and suspicious patterns." },
  { icon: Lock, title: "Security & Encryption", desc: "End-to-end encryption, tokenization, and enterprise-grade security infrastructure." },
];

const FintechOS = () => {
  const [region, setRegion] = useState<Region>("za");
  const p = pricing[region];

  return (
    <Layout>
      <div className="pt-20">
        <section className="section-padding relative">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Industry OS</span>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
                ZyniqAI <span className="gradient-text">Fintech OS</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Build secure, scalable financial platforms with real-time fraud detection, compliance automation, and AI-driven risk assessment.
              </p>
            </motion.div>

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
                <p className="text-sm text-muted-foreground mt-1">once-off · scoped per platform</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { name: "Starter", price: p.t1, features: ["Maintenance & security patches", "Compliance monitoring", "Monthly reports", "48h response SLA"] },
                  { name: "Growth", price: p.t2, features: ["Everything in Starter", "Feature expansions", "AI fraud model retraining", "24h response SLA"], highlighted: true },
                  { name: "Strategic", price: p.t3, features: ["Everything in Growth", "Custom AI models", "Regulatory advisory", "Priority support", "12h response SLA"] },
                ].map((plan) => (
                  <div key={plan.name} className={`glass-card-hover p-6 flex flex-col ${"highlighted" in plan && plan.highlighted ? "border-primary/40" : ""}`}>
                    {"highlighted" in plan && plan.highlighted && <span className="text-[10px] font-medium tracking-widest uppercase text-primary-foreground bg-primary px-3 py-1 rounded-full self-start mb-3">Popular</span>}
                    <h3 className="text-lg font-display font-semibold">{plan.name}</h3>
                    <p className="text-2xl font-display font-bold mt-2">{plan.price}<span className="text-sm text-muted-foreground">/mo</span></p>
                    <ul className="space-y-2 mt-4 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check size={14} className="text-primary flex-shrink-0" /> {f}
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

export default FintechOS;
