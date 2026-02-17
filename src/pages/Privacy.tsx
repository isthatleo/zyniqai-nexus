import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const Privacy = () => (
  <Layout>
    <div className="pt-20">
      <section className="section-padding relative">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: February 2026</p>
          </motion.div>

          <div className="prose prose-sm max-w-none space-y-8">
            {[
              { title: "1. Information We Collect", content: "We collect information you provide directly — such as your name, email address, company name, and project details when you contact us, request a demo, or engage our services. We also collect technical data including IP addresses, browser type, and usage analytics to improve our platform." },
              { title: "2. How We Use Your Information", content: "Your information is used to provide and improve our services, communicate about projects and updates, process payments, ensure platform security, and comply with legal obligations. We never sell your personal data to third parties." },
              { title: "3. Data Security", content: "We implement enterprise-grade security measures including encryption at rest and in transit, secure access controls, regular security audits, and compliance with industry standards. All client data is hosted on SOC 2 compliant infrastructure." },
              { title: "4. Data Retention", content: "We retain your personal data only as long as necessary to fulfil the purposes for which it was collected, including legal, accounting, or reporting requirements. Project data is retained for the duration of our engagement plus a reasonable archive period." },
              { title: "5. Your Rights", content: "You have the right to access, correct, or delete your personal data. You may also request data portability or object to processing. For POPIA (South Africa), GDPR (EU/UK), and CCPA (California) requests, contact our data protection team." },
              { title: "6. Cookies & Tracking", content: "We use essential cookies for site functionality and analytics cookies to understand usage patterns. You can manage cookie preferences through your browser settings. We do not use cookies for advertising purposes." },
              { title: "7. Contact", content: "For privacy inquiries, contact us at privacy@zyniqai.com or +27 70 773 1490. ZyniqAI (Pty) Ltd, Cape Town, South Africa." },
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

export default Privacy;
