import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const parsed = contactSchema.parse({ name, email, company: company || undefined, message });

      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.name,
        email: parsed.email,
        company: parsed.company || null,
        message: parsed.message,
      });

      if (error) throw error;

      // Try to send email notification via edge function
      try {
        await supabase.functions.invoke("send-contact-notification", {
          body: { name: parsed.name, email: parsed.email, company: parsed.company, message: parsed.message },
        });
      } catch {
        // Email notification is best-effort
      }

      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setName(""); setEmail(""); setCompany(""); setMessage("");
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        toast({ title: "Validation error", description: err.errors[0].message, variant: "destructive" });
      } else {
        toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_hsl(var(--gold)/0.1)] transition-all";

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Ready to <span className="gradient-text">Build</span> With AI?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Let's discuss how ZyniqAI can architect and deploy intelligent systems for your organization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-2 space-y-6">
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
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-3 glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} required />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={inputClass} required />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Company</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">How can we help?</label>
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your project..." className={`${inputClass} resize-none`} required />
              </div>
              <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:shadow-[0_0_30px_hsl(var(--gold)/0.4)] transition-all duration-300 hover:bg-primary/90 disabled:opacity-50">
                {submitting ? "Sending..." : (<>Send Message <Send size={16} /></>)}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
