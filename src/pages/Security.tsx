import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, FileCheck, AlertTriangle } from "lucide-react";

const practices = [
  { icon: Lock, title: "Encryption", desc: "All data encrypted at rest (AES-256) and in transit (TLS 1.3). API keys and secrets managed through secure vault systems." },
  { icon: Shield, title: "Access Control", desc: "Role-based access control (RBAC), multi-factor authentication, and principle of least privilege enforced across all systems." },
  { icon: Eye, title: "Monitoring & Audit", desc: "24/7 infrastructure monitoring, automated threat detection, comprehensive audit logs, and real-time alerting systems." },
  { icon: Server, title: "Infrastructure", desc: "SOC 2 compliant hosting, isolated tenant environments, regular penetration testing, and disaster recovery procedures." },
  { icon: FileCheck, title: "Compliance", desc: "POPIA (South Africa), GDPR (EU/UK), and industry-specific compliance frameworks. Regular compliance audits and certifications." },
  { icon: AlertTriangle, title: "Incident Response", desc: "Documented incident response plan with defined escalation procedures, client notification protocols, and post-incident analysis." },
];

const Security = () => (
  <Layout>
    <div className="pt-20">
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Security</span>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Enterprise-Grade <span className="gradient-text">Security</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Security is foundational to everything we build. Our practices protect your data, systems, and operations at every layer.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practices.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card-hover p-6 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <p.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 mt-12 text-center">
            <h3 className="text-lg font-display font-semibold mb-3">Report a Vulnerability</h3>
            <p className="text-sm text-muted-foreground mb-2">If you discover a security vulnerability, please report it responsibly.</p>
            <p className="text-sm text-primary font-medium">security@zyniqai.com</p>
          </motion.div>
        </div>
      </section>
    </div>
  </Layout>
);

export default Security;
