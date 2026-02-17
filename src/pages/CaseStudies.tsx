import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign, Users, BarChart3, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    client: "Meridian Logistics",
    industry: "Logistics & Supply Chain",
    challenge: "Manual route planning causing 35% fuel waste and frequent delivery delays across 200+ vehicles.",
    solution: "Deployed ZyniqAI Logistics OS with AI-powered route optimization, real-time fleet tracking, and predictive maintenance alerts.",
    results: [
      { label: "Fuel Cost Reduction", value: "38%", icon: DollarSign },
      { label: "On-Time Deliveries", value: "96.4%", icon: Clock },
      { label: "Fleet Utilization", value: "+42%", icon: TrendingUp },
    ],
    quote: "ZyniqAI transformed our operations. Their predictive models cut our downtime by 40% and their team integrated seamlessly with ours.",
    quotePerson: "Sarah Chen, VP of Engineering",
    color: "neon-blue" as const,
  },
  {
    client: "NovaTech Industries",
    industry: "Financial Services",
    challenge: "Fragmented data silos preventing real-time decision-making across 12 departments and 3 countries.",
    solution: "Built a centralized AI analytics platform with custom dashboards, anomaly detection, and automated executive reporting.",
    results: [
      { label: "Decision Speed", value: "5x Faster", icon: Zap },
      { label: "Data Accuracy", value: "99.2%", icon: BarChart3 },
      { label: "Cost Savings", value: "$2.4M/yr", icon: DollarSign },
    ],
    quote: "The AI dashboards ZyniqAI built gave us visibility we never had. We're making data-driven decisions in real-time now, not quarterly.",
    quotePerson: "Marcus Williams, Chief Data Officer",
    color: "neon-green" as const,
  },
  {
    client: "Apex Financial Group",
    industry: "Enterprise SaaS",
    challenge: "Legacy systems causing 99.1% uptime (target: 99.99%) with no observability into production failures.",
    solution: "Complete infrastructure overhaul with cloud migration, observability dashboards, CI/CD pipelines, and AI-driven incident prediction.",
    results: [
      { label: "System Uptime", value: "99.97%", icon: TrendingUp },
      { label: "Incident Response", value: "-72%", icon: Clock },
      { label: "Team Efficiency", value: "+60%", icon: Users },
    ],
    quote: "From architecture to deployment, ZyniqAI delivered enterprise-grade AI systems on time and on budget. They're the real deal.",
    quotePerson: "Elena Rodriguez, CTO",
    color: "neon-purple" as const,
  },
  {
    client: "Coastal Resorts Group",
    industry: "Hospitality",
    challenge: "Manual booking management, no revenue analytics, and zero visibility into occupancy trends across 8 properties.",
    solution: "Deployed ZyniqAI Hospitality OS with integrated booking engine, revenue dashboards, staff scheduling, and AI occupancy forecasting.",
    results: [
      { label: "Direct Bookings", value: "+55%", icon: TrendingUp },
      { label: "Revenue Growth", value: "+32%", icon: DollarSign },
      { label: "Staff Efficiency", value: "+45%", icon: Users },
    ],
    quote: "We went from spreadsheets to a fully intelligent hotel platform in 12 weeks. ZyniqAI understood hospitality from day one.",
    quotePerson: "James Nkosi, Operations Director",
    color: "neon-blue" as const,
  },
  {
    client: "Greenfield Academy",
    industry: "Education",
    challenge: "Disconnected admin systems, manual attendance, no fee tracking, and inability to forecast enrollment trends.",
    solution: "Built ZyniqAI Education OS with student management, automated attendance, fee tracking, performance analytics, and AI enrollment forecasting.",
    results: [
      { label: "Admin Time Saved", value: "60%", icon: Clock },
      { label: "Fee Collection", value: "98.5%", icon: DollarSign },
      { label: "Enrollment Accuracy", value: "94%", icon: BarChart3 },
    ],
    quote: "Our teachers can finally focus on teaching. ZyniqAI automated everything we were doing by hand for years.",
    quotePerson: "Dr. Amira Patel, Principal",
    color: "neon-green" as const,
  },
];

const colorMap = {
  "neon-blue": "text-neon-blue border-neon-blue/20",
  "neon-green": "text-neon-green border-neon-green/20",
  "neon-purple": "text-neon-purple border-neon-purple/20",
};

const CaseStudies = () => (
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
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">
              Case Studies
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Real Results. <span className="gradient-text">Real Impact.</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how enterprises across industries leverage ZyniqAI to transform operations, cut costs, and drive intelligent growth.
            </p>
          </motion.div>

          <div className="space-y-8">
            {caseStudies.map((study, i) => (
              <motion.div
                key={study.client}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-card-hover overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <div>
                      <h3 className="text-xl font-display font-bold">{study.client}</h3>
                      <p className="text-xs text-muted-foreground">{study.industry}</p>
                    </div>
                    <span className={`text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border ${colorMap[study.color]}`}>
                      {study.industry}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-destructive mb-2">Challenge</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-2">Solution</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {study.results.map((r) => (
                      <div key={r.label} className="glass-card p-4 text-center">
                        <r.icon size={16} className="text-primary mx-auto mb-2" />
                        <p className="text-lg sm:text-2xl font-display font-bold text-primary">{r.value}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{r.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="glass-card p-4 sm:p-6">
                    <p className="text-sm text-muted-foreground italic leading-relaxed mb-2">"{study.quote}"</p>
                    <p className="text-xs font-medium text-foreground">— {study.quotePerson}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:shadow-[0_0_30px_hsl(var(--neon-blue)/0.4)] transition-all duration-300"
            >
              Start Your Success Story <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  </Layout>
);

export default CaseStudies;
