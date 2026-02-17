import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Users, Package, FileText, DollarSign, Mail, Shield } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from "@/components/ThemeProvider";

const ClientPortal = () => {
  const { user, role, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const [clients, setClients] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [c, i, s, p] = await Promise.all([
        supabase.from("clients").select("*").order("created_at", { ascending: false }),
        supabase.from("invoices").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("packages").select("*").order("created_at", { ascending: false }),
      ]);
      setClients(c.data || []);
      setInvoices(i.data || []);
      setSubmissions(s.data || []);
      setPackages(p.data || []);
    };
    fetchData();
  }, [user]);

  if (loading) return <Layout><div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div></Layout>;
  if (!user) return null;

  const gridColor = resolvedTheme === "light" ? "hsl(40 15% 90%)" : "hsl(30 10% 18%)";
  const goldMain = "#D4AF37";

  const revenueData = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((acc: any[], inv) => {
      const month = new Date(inv.issue_date).toLocaleString("default", { month: "short" });
      const existing = acc.find((a) => a.name === month);
      if (existing) existing.value += Number(inv.amount);
      else acc.push({ name: month, value: Number(inv.amount) });
      return acc;
    }, []);

  const statCards = [
    { icon: Users, label: "Total Clients", value: clients.length, color: "text-primary" },
    { icon: FileText, label: "Invoices", value: invoices.length, color: "text-primary" },
    { icon: DollarSign, label: "Revenue", value: `R${invoices.filter(i => i.status === "paid").reduce((s, i) => s + Number(i.amount), 0).toLocaleString()}`, color: "text-primary" },
    { icon: Mail, label: "Submissions", value: submissions.length, color: "text-primary" },
  ];

  return (
    <Layout>
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-display font-bold">Client Portal</h1>
                {role === "admin" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                    <Shield size={12} /> Admin
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <button onClick={signOut} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5 text-center">
                <stat.icon size={20} className={`mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-display font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Revenue Chart */}
          {revenueData.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-8">
              <h3 className="text-sm font-medium mb-4">Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="portalGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={goldMain} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={goldMain} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke={goldMain} strokeWidth={2} fill="url(#portalGold)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Tables */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Clients */}
            {role === "admin" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2"><Users size={16} className="text-primary" /> Clients</h3>
                {clients.length === 0 ? <p className="text-xs text-muted-foreground">No clients yet</p> : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {clients.map((c) => (
                      <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                        <div>
                          <p className="text-sm font-medium">{c.company_name}</p>
                          <p className="text-xs text-muted-foreground">{c.contact_email}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{c.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Invoices */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2"><FileText size={16} className="text-primary" /> Recent Invoices</h3>
              {invoices.length === 0 ? <p className="text-xs text-muted-foreground">No invoices yet</p> : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {invoices.slice(0, 10).map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                      <div>
                        <p className="text-sm font-medium">{inv.invoice_number}</p>
                        <p className="text-xs text-muted-foreground">R{Number(inv.amount).toLocaleString()}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${inv.status === "paid" ? "bg-primary/10 text-primary" : inv.status === "overdue" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{inv.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Contact Submissions (admin only) */}
            {role === "admin" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 lg:col-span-2">
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2"><Mail size={16} className="text-primary" /> Contact Submissions</h3>
                {submissions.length === 0 ? <p className="text-xs text-muted-foreground">No submissions yet</p> : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {submissions.slice(0, 10).map((sub) => (
                      <div key={sub.id} className="p-3 rounded-lg bg-muted/30 border border-border/30">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{sub.name}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${sub.status === "new" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{sub.status}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{sub.email} • {sub.company}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{sub.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientPortal;
