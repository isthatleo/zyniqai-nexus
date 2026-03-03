import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import {
  LogOut, Users, Package, FileText, DollarSign, Mail, Shield,
  Plus, Trash2, Edit, Search, X, Check,
  TrendingUp, Calendar, Clock, CheckCircle, AlertCircle, XCircle,
  Save, RefreshCw, BarChart3, CreditCard
} from "lucide-react";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";

type Tab = "overview" | "clients" | "packages" | "invoices" | "revenue" | "submissions" | "leads";

const statusColors: Record<string, string> = {
  active: "hsl(145, 63%, 49%)",
  inactive: "hsl(240, 5%, 55%)",
  paid: "hsl(145, 63%, 49%)",
  pending: "hsl(45, 93%, 58%)",
  overdue: "hsl(0, 72%, 63%)",
  draft: "hsl(240, 5%, 55%)",
  new: "hsl(217, 91%, 60%)",
  read: "hsl(240, 5%, 55%)",
  replied: "hsl(145, 63%, 49%)",
};

const StatusBadge = ({ status }: { status: string }) => {
  const color = statusColors[status] || "hsl(240, 5%, 55%)";
  return (
    <span
      className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}30` }}
    >
      {status}
    </span>
  );
};

/* ---- Modal Shell ---- */
const Modal = ({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) => (
  <AnimatePresence>
    {open && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative z-10 w-full max-w-lg glass-card p-6 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">{title}</h2>
            <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors"><X size={16} /></button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const inputClass = "w-full px-3 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all";
const btnPrimary = "flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50";
const btnOutline = "flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all";

const ClientPortal = () => {
  const { user, role, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [clients, setClients] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [revenue, setRevenue] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Modal states
  const [clientModal, setClientModal] = useState<{ open: boolean; editing?: any }>({ open: false });
  const [packageModal, setPackageModal] = useState<{ open: boolean; editing?: any }>({ open: false });
  const [invoiceModal, setInvoiceModal] = useState<{ open: boolean; editing?: any }>({ open: false });
  const [revenueModal, setRevenueModal] = useState<{ open: boolean; editing?: any }>({ open: false });
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; table: string; id: string }>({ open: false, table: "", id: "" });

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  const fetchData = useCallback(async () => {
    if (!user) return;
    const [c, i, s, p, r, l] = await Promise.all([
      supabase.from("clients").select("*").order("created_at", { ascending: false }),
      supabase.from("invoices").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("packages").select("*").order("created_at", { ascending: false }),
      supabase.from("revenue_tracking").select("*").order("payment_date", { ascending: false }),
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
    ]);
    setClients(c.data || []);
    setInvoices(i.data || []);
    setSubmissions(s.data || []);
    setPackages(p.data || []);
    setRevenue(r.data || []);
    setLeads(l.data || []);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData, refreshKey]);

  const refresh = () => setRefreshKey(k => k + 1);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }
  if (!user) return null;

  const isAdmin = role === "admin";
  const gridColor = resolvedTheme === "light" ? "hsl(240 5% 90%)" : "hsl(240 4% 20%)";
  const coralMain = "hsl(0, 72%, 63%)";

  const totalRevenue = revenue.reduce((s, r) => s + Number(r.amount), 0);
  const pendingRevenue = invoices.filter(i => i.status === "pending").reduce((s, i) => s + Number(i.amount), 0);
  const activeClients = clients.filter(c => c.status === "active").length;
  const totalInvoiced = invoices.reduce((s, i) => s + Number(i.amount), 0);

  const revenueByMonth = revenue.reduce((acc: any[], r) => {
    const month = new Date(r.payment_date).toLocaleString("default", { month: "short", year: "2-digit" });
    const existing = acc.find((a) => a.name === month);
    if (existing) existing.value += Number(r.amount);
    else acc.push({ name: month, value: Number(r.amount) });
    return acc;
  }, []);

  const invoicesByStatus = [
    { name: "Paid", value: invoices.filter(i => i.status === "paid").length, color: "hsl(145, 63%, 49%)" },
    { name: "Pending", value: invoices.filter(i => i.status === "pending").length, color: "hsl(45, 93%, 58%)" },
    { name: "Overdue", value: invoices.filter(i => i.status === "overdue").length, color: "hsl(0, 72%, 63%)" },
    { name: "Draft", value: invoices.filter(i => i.status === "draft").length, color: "hsl(240, 5%, 55%)" },
  ].filter(s => s.value > 0);

  const statCards = isAdmin ? [
    { icon: Users, label: "Active Clients", value: activeClients, sub: `${clients.length} total`, color: "hsl(217, 91%, 60%)" },
    { icon: FileText, label: "Invoices", value: invoices.length, sub: `R${totalInvoiced.toLocaleString()} invoiced`, color: "hsl(145, 63%, 49%)" },
    { icon: DollarSign, label: "Revenue", value: `R${totalRevenue.toLocaleString()}`, sub: `R${pendingRevenue.toLocaleString()} pending`, color: "hsl(0, 72%, 63%)" },
    { icon: Mail, label: "Leads", value: submissions.length, sub: `${submissions.filter(s => s.status === "new").length} new`, color: "hsl(45, 93%, 58%)" },
  ] : [
    { icon: FileText, label: "My Invoices", value: invoices.length, sub: `${invoices.filter(i => i.status === "paid").length} paid`, color: "hsl(145, 63%, 49%)" },
    { icon: DollarSign, label: "Total Due", value: `R${pendingRevenue.toLocaleString()}`, sub: `R${totalInvoiced.toLocaleString()} total`, color: "hsl(0, 72%, 63%)" },
    { icon: CreditCard, label: "Payments", value: revenue.length, sub: `R${totalRevenue.toLocaleString()} paid`, color: "hsl(217, 91%, 60%)" },
    { icon: Package, label: "Packages", value: packages.length, sub: "available", color: "hsl(45, 93%, 58%)" },
  ];

  const tabs: { key: Tab; label: string; icon: any; adminOnly?: boolean }[] = [
    { key: "overview", label: "Overview", icon: TrendingUp },
    { key: "clients", label: "Clients", icon: Users, adminOnly: true },
    { key: "packages", label: "Packages", icon: Package },
    { key: "invoices", label: "Invoices", icon: FileText },
    { key: "revenue", label: "Revenue", icon: DollarSign },
    { key: "leads", label: "AI Leads", icon: BarChart3, adminOnly: true },
    { key: "submissions", label: "Contact Leads", icon: Mail, adminOnly: true },
  ];

  const filteredTabs = tabs.filter(t => !t.adminOnly || isAdmin);

  /* ---- CRUD Handlers ---- */
  const handleDeleteConfirm = async () => {
    const { table, id } = deleteConfirm;
    const { error } = await supabase.from(table as any).delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted successfully" }); refresh(); }
    setDeleteConfirm({ open: false, table: "", id: "" });
  };

  const handleSaveClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      company_name: fd.get("company_name") as string,
      contact_name: fd.get("contact_name") as string || null,
      contact_email: fd.get("contact_email") as string || null,
      phone: fd.get("phone") as string || null,
      status: fd.get("status") as string || "active",
    };
    if (clientModal.editing) {
      const { error } = await supabase.from("clients").update(data).eq("id", clientModal.editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("clients").insert(data);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: clientModal.editing ? "Client updated" : "Client created" });
    setClientModal({ open: false }); refresh();
  };

  const handleSavePackage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const features = (fd.get("features") as string).split("\n").filter(Boolean);
    const data = {
      name: fd.get("name") as string,
      description: fd.get("description") as string || null,
      price_monthly: Number(fd.get("price_monthly")) || 0,
      price_yearly: Number(fd.get("price_yearly")) || 0,
      currency: fd.get("currency") as string || "ZAR",
      features: features,
      is_active: fd.get("is_active") === "true",
    };
    if (packageModal.editing) {
      const { error } = await supabase.from("packages").update(data).eq("id", packageModal.editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("packages").insert(data);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: packageModal.editing ? "Package updated" : "Package created" });
    setPackageModal({ open: false }); refresh();
  };

  const handleSaveInvoice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      invoice_number: fd.get("invoice_number") as string,
      client_id: fd.get("client_id") as string,
      package_id: (fd.get("package_id") as string) || null,
      amount: Number(fd.get("amount")),
      currency: fd.get("currency") as string || "ZAR",
      issue_date: fd.get("issue_date") as string,
      due_date: fd.get("due_date") as string,
      status: fd.get("status") as string || "pending",
      notes: fd.get("notes") as string || null,
    };
    if (invoiceModal.editing) {
      const { error } = await supabase.from("invoices").update(data).eq("id", invoiceModal.editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("invoices").insert(data);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: invoiceModal.editing ? "Invoice updated" : "Invoice created" });
    setInvoiceModal({ open: false }); refresh();
  };

  const handleSaveRevenue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      client_id: fd.get("client_id") as string,
      invoice_id: (fd.get("invoice_id") as string) || null,
      amount: Number(fd.get("amount")),
      currency: fd.get("currency") as string || "ZAR",
      payment_date: fd.get("payment_date") as string,
      payment_method: fd.get("payment_method") as string || null,
      notes: fd.get("notes") as string || null,
    };
    if (revenueModal.editing) {
      const { error } = await supabase.from("revenue_tracking").update(data).eq("id", revenueModal.editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("revenue_tracking").insert(data);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: revenueModal.editing ? "Payment updated" : "Payment recorded" });
    setRevenueModal({ open: false }); refresh();
  };

  const handleUpdateSubmissionStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: `Status updated to ${status}` }); refresh(); }
  };

  const getClientName = (clientId: string) => clients.find(c => c.id === clientId)?.company_name || "—";
  const getPackageName = (pkgId: string | null) => packages.find(p => p.id === pkgId)?.name || "—";

  return (
    <Layout>
      <div className="pt-20 pb-20 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl font-bold">Client Portal</h1>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/30">
                    <Shield size={10} /> Admin
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={refresh} className={btnOutline}><RefreshCw size={14} /> Refresh</button>
              <button onClick={signOut} className={btnOutline}><LogOut size={14} /> Sign Out</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
            {filteredTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <tab.icon size={13} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* ==================== OVERVIEW ==================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {statCards.map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-4 text-center">
                    <stat.icon size={16} className="mx-auto mb-2" style={{ color: stat.color }} />
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {revenueByMonth.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-4">Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={revenueByMonth}>
                        <defs>
                          <linearGradient id="portalGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={coralMain} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={coralMain} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke={coralMain} strokeWidth={2} fill="url(#portalGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
                {invoicesByStatus.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-4">Invoice Status</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={invoicesByStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                          {invoicesByStatus.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Legend formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
                  <h3 className="text-sm font-semibold mb-3">Recent Invoices</h3>
                  {invoices.length === 0 ? <p className="text-xs text-muted-foreground">No invoices yet</p> : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {invoices.slice(0, 5).map((inv) => (
                        <div key={inv.id} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border/20">
                          <div>
                            <p className="text-sm font-medium">{inv.invoice_number}</p>
                            <p className="text-[11px] text-muted-foreground">R{Number(inv.amount).toLocaleString()} · {getClientName(inv.client_id)}</p>
                          </div>
                          <StatusBadge status={inv.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
                {isAdmin && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-3">Recent Leads</h3>
                    {submissions.length === 0 ? <p className="text-xs text-muted-foreground">No submissions yet</p> : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {submissions.slice(0, 5).map((sub) => (
                          <div key={sub.id} className="p-2.5 rounded-lg bg-muted/30 border border-border/20">
                            <div className="flex items-center justify-between mb-0.5">
                              <p className="text-sm font-medium">{sub.name}</p>
                              <StatusBadge status={sub.status} />
                            </div>
                            <p className="text-[11px] text-muted-foreground">{sub.email}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* ==================== CLIENTS ==================== */}
          {activeTab === "clients" && isAdmin && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm focus:outline-none focus:border-primary/50 transition-all" />
                </div>
                <button onClick={() => setClientModal({ open: true })} className={btnPrimary}><Plus size={14} /> Add Client</button>
              </div>
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Joined</th>
                        <th className="text-right p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.filter(c => !searchQuery || c.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) || c.contact_name?.toLowerCase().includes(searchQuery.toLowerCase())).map((c) => (
                        <tr key={c.id} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                          <td className="p-3 font-medium">{c.company_name}</td>
                          <td className="p-3 text-muted-foreground">{c.contact_name || "—"}</td>
                          <td className="p-3 text-muted-foreground">{c.contact_email || "—"}</td>
                          <td className="p-3"><StatusBadge status={c.status} /></td>
                          <td className="p-3 text-muted-foreground text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => setClientModal({ open: true, editing: c })} className="w-7 h-7 rounded flex items-center justify-center hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"><Edit size={13} /></button>
                              <button onClick={() => setDeleteConfirm({ open: true, table: "clients", id: c.id })} className="w-7 h-7 rounded flex items-center justify-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {clients.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No clients yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== PACKAGES ==================== */}
          {activeTab === "packages" && (
            <div className="space-y-4">
              {isAdmin && (
                <div className="flex justify-end">
                  <button onClick={() => setPackageModal({ open: true })} className={btnPrimary}><Plus size={14} /> Add Package</button>
                </div>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map((p) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-base">{p.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{p.description || "No description"}</p>
                      </div>
                      <StatusBadge status={p.is_active ? "active" : "inactive"} />
                    </div>
                    <div className="mt-auto pt-3 border-t border-border/20">
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl font-bold">R{Number(p.price_monthly).toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">/mo</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mb-3">R{Number(p.price_yearly).toLocaleString()}/yr</p>
                      {Array.isArray(p.features) && p.features.length > 0 && (
                        <ul className="space-y-1">
                          {(p.features as string[]).slice(0, 5).map((f, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <CheckCircle size={11} className="text-primary mt-0.5 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {isAdmin && (
                      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border/20">
                        <button onClick={() => setPackageModal({ open: true, editing: p })} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"><Edit size={11} /> Edit</button>
                        <button onClick={() => setDeleteConfirm({ open: true, table: "packages", id: p.id })} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors ml-auto"><Trash2 size={11} /> Delete</button>
                      </div>
                    )}
                  </motion.div>
                ))}
                {packages.length === 0 && <div className="col-span-full text-center text-muted-foreground py-12">No packages yet</div>}
              </div>
            </div>
          )}

          {/* ==================== INVOICES ==================== */}
          {activeTab === "invoices" && (
            <div className="space-y-4">
              {isAdmin && (
                <div className="flex justify-end">
                  <button onClick={() => setInvoiceModal({ open: true })} className={btnPrimary}><Plus size={14} /> Create Invoice</button>
                </div>
              )}
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Invoice #</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Package</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Issue</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Due</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                        {isAdmin && <th className="text-right p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                          <td className="p-3 font-medium font-mono text-xs">{inv.invoice_number}</td>
                          <td className="p-3 text-muted-foreground">{getClientName(inv.client_id)}</td>
                          <td className="p-3 text-muted-foreground">{getPackageName(inv.package_id)}</td>
                          <td className="p-3 font-medium">R{Number(inv.amount).toLocaleString()}</td>
                          <td className="p-3 text-muted-foreground text-xs">{new Date(inv.issue_date).toLocaleDateString()}</td>
                          <td className="p-3 text-muted-foreground text-xs">{new Date(inv.due_date).toLocaleDateString()}</td>
                          <td className="p-3"><StatusBadge status={inv.status} /></td>
                          {isAdmin && (
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => setInvoiceModal({ open: true, editing: inv })} className="w-7 h-7 rounded flex items-center justify-center hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"><Edit size={13} /></button>
                                <button onClick={() => setDeleteConfirm({ open: true, table: "invoices", id: inv.id })} className="w-7 h-7 rounded flex items-center justify-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={13} /></button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                      {invoices.length === 0 && <tr><td colSpan={isAdmin ? 8 : 7} className="p-8 text-center text-muted-foreground">No invoices yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== REVENUE ==================== */}
          {activeTab === "revenue" && (
            <div className="space-y-4">
              {isAdmin && (
                <div className="flex justify-end">
                  <button onClick={() => setRevenueModal({ open: true })} className={btnPrimary}><Plus size={14} /> Record Payment</button>
                </div>
              )}
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Method</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notes</th>
                        {isAdmin && <th className="text-right p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {revenue.map((r) => (
                        <tr key={r.id} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                          <td className="p-3 text-xs">{new Date(r.payment_date).toLocaleDateString()}</td>
                          <td className="p-3 text-muted-foreground">{getClientName(r.client_id)}</td>
                          <td className="p-3 font-medium">R{Number(r.amount).toLocaleString()}</td>
                          <td className="p-3 text-muted-foreground">{r.payment_method || "—"}</td>
                          <td className="p-3 text-muted-foreground max-w-[200px] truncate">{r.notes || "—"}</td>
                          {isAdmin && (
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => setRevenueModal({ open: true, editing: r })} className="w-7 h-7 rounded flex items-center justify-center hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"><Edit size={13} /></button>
                                <button onClick={() => setDeleteConfirm({ open: true, table: "revenue_tracking", id: r.id })} className="w-7 h-7 rounded flex items-center justify-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={13} /></button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                      {revenue.length === 0 && <tr><td colSpan={isAdmin ? 6 : 5} className="p-8 text-center text-muted-foreground">No payments recorded yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== AI LEADS ==================== */}
          {activeTab === "leads" && isAdmin && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Total Leads", value: leads.length, color: "hsl(217, 91%, 60%)" },
                  { label: "Qualified", value: leads.filter(l => l.status === "qualified" || l.status === "enterprise").length, color: "hsl(145, 63%, 49%)" },
                  { label: "Nurture", value: leads.filter(l => l.status === "nurture").length, color: "hsl(45, 93%, 58%)" },
                  { label: "Enterprise", value: leads.filter(l => l.status === "enterprise").length, color: "hsl(0, 72%, 63%)" },
                ].map((s, i) => (
                  <div key={i} className="glass-card p-3 text-center">
                    <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Industry</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Revenue</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Score</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tier</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                          <td className="p-3">
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-[10px] text-muted-foreground">{lead.email}</p>
                          </td>
                          <td className="p-3 text-muted-foreground">{lead.company || "—"}</td>
                          <td className="p-3 text-muted-foreground">{lead.industry || "—"}</td>
                          <td className="p-3 text-muted-foreground">{lead.monthly_revenue || "—"}</td>
                          <td className="p-3">
                            <span className={`text-xs font-mono font-bold ${
                              Number(lead.score) >= 4.3 ? "text-primary" :
                              Number(lead.score) >= 3.5 ? "text-[hsl(145,63%,49%)]" :
                              Number(lead.score) >= 2.5 ? "text-[hsl(45,93%,58%)]" : "text-muted-foreground"
                            }`}>{Number(lead.score).toFixed(1)}</span>
                          </td>
                          <td className="p-3"><StatusBadge status={lead.recommended_tier || "core"} /></td>
                          <td className="p-3"><StatusBadge status={lead.status} /></td>
                          <td className="p-3 text-muted-foreground text-xs">{new Date(lead.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                      {leads.length === 0 && <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">No AI-qualified leads yet. Leads are captured from the chat widget.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          {activeTab === "submissions" && isAdmin && (
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="text-right p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">{sub.name}</td>
                        <td className="p-3 text-muted-foreground">{sub.email}</td>
                        <td className="p-3 text-muted-foreground">{sub.company || "—"}</td>
                        <td className="p-3 text-muted-foreground max-w-[200px] truncate">{sub.message}</td>
                        <td className="p-3"><StatusBadge status={sub.status} /></td>
                        <td className="p-3 text-muted-foreground text-xs">{new Date(sub.created_at).toLocaleDateString()}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {sub.status === "new" && (
                              <button onClick={() => handleUpdateSubmissionStatus(sub.id, "read")} className="text-[10px] px-2 py-1 rounded bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">Mark Read</button>
                            )}
                            {sub.status !== "replied" && (
                              <button onClick={() => handleUpdateSubmissionStatus(sub.id, "replied")} className="text-[10px] px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary transition-colors">Replied</button>
                            )}
                            <button onClick={() => setDeleteConfirm({ open: true, table: "contact_submissions", id: sub.id })} className="w-7 h-7 rounded flex items-center justify-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {submissions.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No submissions yet</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==================== MODALS ==================== */}

      {/* Delete Confirmation */}
      <Modal open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, table: "", id: "" })} title="Confirm Delete">
        <p className="text-sm text-muted-foreground mb-4">Are you sure you want to delete this record? This action cannot be undone.</p>
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => setDeleteConfirm({ open: false, table: "", id: "" })} className={btnOutline}>Cancel</button>
          <button onClick={handleDeleteConfirm} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-all">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </Modal>

      {/* Client Modal */}
      <Modal open={clientModal.open} onClose={() => setClientModal({ open: false })} title={clientModal.editing ? "Edit Client" : "Add Client"}>
        <form onSubmit={handleSaveClient} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Company Name *</label>
            <input name="company_name" defaultValue={clientModal.editing?.company_name || ""} required className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Contact Name</label>
              <input name="contact_name" defaultValue={clientModal.editing?.contact_name || ""} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Phone</label>
              <input name="phone" defaultValue={clientModal.editing?.phone || ""} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
            <input name="contact_email" type="email" defaultValue={clientModal.editing?.contact_email || ""} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
            <select name="status" defaultValue={clientModal.editing?.status || "active"} className={inputClass}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setClientModal({ open: false })} className={btnOutline}>Cancel</button>
            <button type="submit" className={btnPrimary}><Save size={14} /> Save</button>
          </div>
        </form>
      </Modal>

      {/* Package Modal */}
      <Modal open={packageModal.open} onClose={() => setPackageModal({ open: false })} title={packageModal.editing ? "Edit Package" : "Add Package"}>
        <form onSubmit={handleSavePackage} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Package Name *</label>
            <input name="name" defaultValue={packageModal.editing?.name || ""} required className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
            <textarea name="description" defaultValue={packageModal.editing?.description || ""} rows={2} className={inputClass} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Monthly Price</label>
              <input name="price_monthly" type="number" step="0.01" defaultValue={packageModal.editing?.price_monthly || 0} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Yearly Price</label>
              <input name="price_yearly" type="number" step="0.01" defaultValue={packageModal.editing?.price_yearly || 0} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Currency</label>
              <select name="currency" defaultValue={packageModal.editing?.currency || "ZAR"} className={inputClass}>
                <option value="ZAR">ZAR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Features (one per line)</label>
            <textarea name="features" defaultValue={Array.isArray(packageModal.editing?.features) ? (packageModal.editing.features as string[]).join("\n") : ""} rows={4} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Active</label>
            <select name="is_active" defaultValue={packageModal.editing?.is_active !== false ? "true" : "false"} className={inputClass}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setPackageModal({ open: false })} className={btnOutline}>Cancel</button>
            <button type="submit" className={btnPrimary}><Save size={14} /> Save</button>
          </div>
        </form>
      </Modal>

      {/* Invoice Modal */}
      <Modal open={invoiceModal.open} onClose={() => setInvoiceModal({ open: false })} title={invoiceModal.editing ? "Edit Invoice" : "Create Invoice"}>
        <form onSubmit={handleSaveInvoice} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Invoice # *</label>
              <input name="invoice_number" defaultValue={invoiceModal.editing?.invoice_number || `INV-${Date.now().toString().slice(-6)}`} required className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Client *</label>
              <select name="client_id" defaultValue={invoiceModal.editing?.client_id || ""} required className={inputClass}>
                <option value="">Select client</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Package</label>
              <select name="package_id" defaultValue={invoiceModal.editing?.package_id || ""} className={inputClass}>
                <option value="">None</option>
                {packages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Amount *</label>
              <input name="amount" type="number" step="0.01" defaultValue={invoiceModal.editing?.amount || ""} required className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Issue Date</label>
              <input name="issue_date" type="date" defaultValue={invoiceModal.editing?.issue_date || new Date().toISOString().slice(0, 10)} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Due Date</label>
              <input name="due_date" type="date" defaultValue={invoiceModal.editing?.due_date || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10)} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Currency</label>
              <select name="currency" defaultValue={invoiceModal.editing?.currency || "ZAR"} className={inputClass}>
                <option value="ZAR">ZAR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
            <select name="status" defaultValue={invoiceModal.editing?.status || "pending"} className={inputClass}>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Notes</label>
            <textarea name="notes" defaultValue={invoiceModal.editing?.notes || ""} rows={2} className={inputClass} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setInvoiceModal({ open: false })} className={btnOutline}>Cancel</button>
            <button type="submit" className={btnPrimary}><Save size={14} /> Save</button>
          </div>
        </form>
      </Modal>

      {/* Revenue Modal */}
      <Modal open={revenueModal.open} onClose={() => setRevenueModal({ open: false })} title={revenueModal.editing ? "Edit Payment" : "Record Payment"}>
        <form onSubmit={handleSaveRevenue} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Client *</label>
              <select name="client_id" defaultValue={revenueModal.editing?.client_id || ""} required className={inputClass}>
                <option value="">Select client</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Invoice</label>
              <select name="invoice_id" defaultValue={revenueModal.editing?.invoice_id || ""} className={inputClass}>
                <option value="">None</option>
                {invoices.map(i => <option key={i.id} value={i.id}>{i.invoice_number} (R{Number(i.amount).toLocaleString()})</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Amount *</label>
              <input name="amount" type="number" step="0.01" defaultValue={revenueModal.editing?.amount || ""} required className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Date</label>
              <input name="payment_date" type="date" defaultValue={revenueModal.editing?.payment_date || new Date().toISOString().slice(0, 10)} className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Currency</label>
              <select name="currency" defaultValue={revenueModal.editing?.currency || "ZAR"} className={inputClass}>
                <option value="ZAR">ZAR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Payment Method</label>
            <select name="payment_method" defaultValue={revenueModal.editing?.payment_method || ""} className={inputClass}>
              <option value="">Select method</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Cash">Cash</option>
              <option value="Crypto">Crypto</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Notes</label>
            <textarea name="notes" defaultValue={revenueModal.editing?.notes || ""} rows={2} className={inputClass} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setRevenueModal({ open: false })} className={btnOutline}>Cancel</button>
            <button type="submit" className={btnPrimary}><Save size={14} /> Save</button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default ClientPortal;
