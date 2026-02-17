import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Ready to <span className="gradient-text">Build</span> With AI?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Let's discuss how ZyniqAI can architect and deploy intelligent systems for your organization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: "hello@zyniqai.com" },
              { icon: Phone, label: "Phone", value: "+27 70 773 1490" },
              { icon: MapPin, label: "HQ", value: "Cape Town, South Africa" },
            ].map((item) => (
              <div key={item.label} className="glass-card p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="glass-card p-6">
              <h4 className="font-display font-semibold text-sm mb-2">Enterprise Inquiry?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                For large-scale AI deployments, custom system builds, or strategic partnerships, reach out for a tailored consultation.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 glass-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--gold)/0.1)] transition-all" required />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Email</label>
                  <input type="email" placeholder="you@company.com" className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--gold)/0.1)] transition-all" required />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Company</label>
                <input type="text" placeholder="Company name" className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--gold)/0.1)] transition-all" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">How can we help?</label>
                <textarea rows={4} placeholder="Tell us about your project, challenges, and goals..." className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--gold)/0.1)] transition-all resize-none" />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:shadow-[0_0_30px_hsl(var(--gold)/0.4)] transition-all duration-300 hover:bg-primary/90">
                {submitted ? "Message Sent!" : (<>Send Message <Send size={16} /></>)}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
