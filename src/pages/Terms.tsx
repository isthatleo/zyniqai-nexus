import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const Terms = () => (
  <Layout>
    <div className="pt-20">
      <section className="section-padding relative">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: February 2026</p>
          </motion.div>

          <div className="space-y-8">
            {[
              { title: "1. Services", content: "ZyniqAI provides AI systems engineering, software development, infrastructure architecture, and ongoing optimization services as described in individual project scopes and retainer agreements. All deliverables are subject to the terms outlined in your specific service agreement." },
              { title: "2. Intellectual Property", content: "Unless otherwise agreed in writing, all custom code, AI models, and systems built for clients become client property upon full payment. ZyniqAI retains rights to proprietary frameworks, tools, and methodologies used in delivery. Open-source components remain under their respective licenses." },
              { title: "3. Payment Terms", content: "Project implementation fees are billed according to the milestone schedule in your agreement. Retainer fees are billed monthly in advance. Late payments may incur interest at 2% per month. All prices are exclusive of applicable taxes." },
              { title: "4. Confidentiality", content: "Both parties agree to maintain the confidentiality of proprietary information shared during the engagement. This includes business data, technical architectures, AI models, and strategic plans. NDAs are available upon request for sensitive projects." },
              { title: "5. Service Level Agreements", content: "Response times and service levels are determined by your retainer tier: Maintenance (48h), Growth (24h), or Strategic Partner (12h). Uptime guarantees for managed systems are specified in individual SLAs." },
              { title: "6. Limitation of Liability", content: "ZyniqAI's liability is limited to the fees paid for the specific service giving rise to the claim. We are not liable for indirect, consequential, or incidental damages. Force majeure events are excluded from liability." },
              { title: "7. Governing Law", content: "These terms are governed by the laws of the Republic of South Africa. Disputes shall be resolved through arbitration in Cape Town, South Africa, unless otherwise agreed." },
            ].map((section) => (
              <div key={section.title} className="glass-card p-6">
                <h2 className="text-lg font-display font-semibold mb-3">{section.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

export default Terms;
