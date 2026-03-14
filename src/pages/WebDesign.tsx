import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Palette, Smartphone, Zap, Search, Database, ShieldCheck, Check, ArrowRight, Users, BarChart3, Layers, Brain, Workflow, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

type Region = "za" | "uk" | "us";
const pricing: Record<Region, { build: string; t1: string; t2: string; t3: string }> = {
  za: { build: "R150k – R350k", t1: "R 10,000", t2: "R 18,000", t3: "R 30,000" },
  uk: { build: "£15k – £35k", t1: "£ 900", t2: "£ 1,600", t3: "£ 2,700" },
  us: { build: "$18k – $42k", t1: "$ 1,100", t2: "$ 1,900", t3: "$ 3,200" },
};

const features = [
  { icon: Palette, title: "UI/UX Design", desc: "Custom brand-aligned interfaces with Figma prototypes and user testing." },
  { icon: Smartphone, title: "Mobile-First Responsive", desc: "Fluid layouts optimized for all devices, browsers, and screen sizes." },
  { icon: Zap, title: "Performance Optimization", desc: "Core Web Vitals excellence with lazy loading, CDN, and image optimization." },
  { icon: Search, title: "SEO & Accessibility", desc: "Semantic HTML, Lighthouse 100s, schema markup, and WCAG 2.2 compliance." },
  { icon: Database, title: "CMS Integration", desc: "Headless CMS like Sanity/Strapi with visual editing and content APIs." },
  { icon: ShieldCheck, title: "Security & Maintenance", desc: "HTTPS, security headers, automated updates, and 99.9% uptime monitoring." },
];

const WebDesign = () => {
  const [region, setRegion] = useState<Region>("za");
  const p = pricing[region];

  return (
    <Layout>
      <div className="pt-20">
        <section className="section-padding relative">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-center mb-16"
            >
              <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Core Service</span>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
                Premium <span className="gradient-text">Web Design</span> & Development
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Modern websites for startups and brands. Landing pages to full platforms with AI-powered features and enterprise-grade performance.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {features.map((f, i) => (
                <motion.div 
                  key={f.title} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.06 }} 
                  className="glass-card-hover p-6 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <f.icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Pricing */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-display font-bold text-center mb-4">Monthly Retainer Pricing</h2>
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border/50">
                  {(["za", "uk", "us"] as Region[]).map((r) => (
                    <button 
                      key={r} 
                      onClick={() => setRegion(r)} 
                      className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${region === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {r === "za" ? "🇿🇦 ZAR" : r === "uk" ? "🇬🇧 GBP" : "🇺🇸 USD"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 mb-6 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Website Build</p>
                <p className="text-2xl font-display font-bold text-primary">{p.build}</p>
                <p className="text-sm text-muted-foreground mt-1">once-off · custom scope</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { 
                    name: "Starter", 
                    price: p.t1, 
                    features: ["Monthly maintenance & updates", "Performance monitoring", "Basic security", "48h response SLA"] 
                  },
                  { 
                    name: "Growth", 
                    price: p.t2, 
                    features: ["Everything in Starter", "Feature development", "SEO optimization", "Analytics setup", "24h response SLA"], 
                    highlighted: true 
                  },
                  { 
                    name: "Strategic", 
                    price: p.t3, 
                    features: ["Everything in Growth", "Dedicated designer", "A/B testing", "Conversion optimization", "Priority support 12h SLA"] 
                  },
                ].map((plan) => (
                  <div key={plan.name} className={`glass-card-hover p-6 flex flex-col ${plan.highlighted ? "border-primary/40 ring-2 ring-primary/20" : ""}`}>
                    {plan.highlighted && <span className="text-[10px] font-medium tracking-widest uppercase text-primary-foreground bg-primary px-3 py-1 rounded-full self-start mb-3">Most Popular</span>}
                    <h3 className="text-lg font-display font-semibold">{plan.name}</h3>
                    <p className="text-2xl font-display font-bold mt-2">{plan.price}<span className="text-sm text-muted-foreground">/mo</span></p>
                    <ul className="space-y-2 mt-4 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check size={14} className="text-primary flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      to="/contact" 
                      className="mt-6 block text-center text-sm font-medium py-3 rounded-lg border border-border/60 text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all pointer-events-auto z-30 relative"
                    >
                      Get Started
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="mt-16 text-center">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all"
              >
                Book a Strategy Call <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default WebDesign;

