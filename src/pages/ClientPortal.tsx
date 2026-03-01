import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import {
  LogOut, Users, Package, FileText, DollarSign, Mail, Shield,
  Plus, Eye, Trash2, Edit, ChevronDown, Search, Filter,
  TrendingUp, Calendar, Clock, CheckCircle, AlertCircle, XCircle
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import { useTheme } from "@/components/ThemeProvider";

type Tab = "overview" | "clients" | "packages" | "invoices" | "submissions";

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

const ClientPortal = () => {
  const { user, role, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [clients, setClients] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const totalRevenue = invoices.filter(i => i.status === "paid").reduce((s, i) => s + Number(i.amount), 0);
  const pendingRevenue = invoices.filter(i => i.status === "pending").reduce((s, i) => s + Number(i.amount), 0);
  const activeClients = clients.filter(c => c.status === "active").length;

  const revenueByMonth = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((acc: any[], inv) => {
      const month = new Date(inv.issue_date).toLocaleString("default", { month: "short" });
      const existing = acc.find((a) => a.name === month);
      if (existing) existing.value += Number(inv.amount);
      else acc.push({ name: month, value: Number(inv.amount) });
      return acc;
    }, []);

  const invoicesByStatus = [
    { name: "Paid", value: invoices.filter(i => i.status === "paid").length, color: "hsl(145, 63%, 49%)" },
    { name: "Pending", value: invoices.filter(i => i.status === "pending").length, color: "hsl(45, 93%, 58%)" },
    { name: "Overdue", value: invoices.filter(i => i.status === "overdue").length, color: "hsl(0, 72%, 63%)" },
    { name: "Draft", value: invoices.filter(i => i.status === "draft").length, color: "hsl(240, 5%, 55%)" },
  ].filter(s => s.value > 0);

  const statCards = [
    { icon: Users, label: "Active Clients", value: activeClients, sub: `${clients.length} total`, color: "hsl(217, 91%, 60%)" },
    { icon: FileText, label: "Invoices", value: invoices.length, sub: `${invoices.filter(i => i.status === "paid").length} paid`, color: "hsl(145, 63%, 49%)" },
    { icon: DollarSign, label: "Revenue", value: `R${totalRevenue.toLocaleString()}`, sub: `R${pendingRevenue.toLocaleString()} pending`, color: "hsl(0, 72%, 63%)" },
    { icon: Mail, label: "Leads", value: submissions.length, sub: `${submissions.filter(s => s.status === "new").length} new`, color: "hsl(45, 93%, 58%)" },
  ];

  const tabs: { key: Tab; label: string; icon: any; adminOnly?: boolean }[] = [
    { key: "overview", label: "Overview", icon: TrendingUp },
    { key: "clients", label: "Clients", icon: Users, adminOnly: true },
    { key: "packages", label: "Packages", icon: Package },
    { key: "invoices", label: "Invoices", icon: FileText },
    { key: "submissions", label: "Leads", icon: Mail, adminOnly: true },
  ];

  const filteredTabs = tabs.filter(t => !t.adminOnly || isAdmin);

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
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: "hsl(0, 72%, 63%, 0.1)", color: "hsl(0, 72%, 63%)", border: "1px solid hsl(0, 72%, 63%, 0.3)" }}>
                    <Shield size={10} /> Admin
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <button onClick={signOut} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
              <LogOut size={14} /> Sign Out
            </button>
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

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats */}
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

              {/* Charts */}
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
                          {invoicesByStatus.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </div>

              {/* Recent activity */}
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
                  <h3 className="text-sm font-semibold mb-3">Recent Invoices</h3>
                  {invoices.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No invoices yet</p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {invoices.slice(0, 5).map((inv) => (
                        <div key={inv.id} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border/20">
                          <div>
                            <p className="text-sm font-medium">{inv.invoice_number}</p>
                            <p className="text-[11px] text-muted-foreground">R{Number(inv.amount).toLocaleString()}</p>
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
                    {submissions.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No submissions yet</p>
                    ) : (
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

          {/* Clients Tab */}
          {activeTab === "clients" && isAdmin && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Industry</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients
                        .filter(c => !searchQuery || c.company_name?.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((c) => (
                          <tr key={c.id} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                            <td className="p-3 font-medium">{c.company_name}</td>
                            <td className="p-3 text-muted-foreground">{c.contact_email}</td>
                            <td className="p-3 text-muted-foreground">{c.industry || "—"}</td>
                            <td className="p-3"><StatusBadge status={c.status} /></td>
                            <td className="p-3 text-muted-foreground text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      {clients.length === 0 && (
                        <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No clients yet</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === "packages" && (
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Package</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((p) => (
                      <tr key={p.id} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">{p.name}</td>
                        <td className="p-3 text-muted-foreground">{p.package_type || "—"}</td>
                        <td className="p-3 text-muted-foreground">R{Number(p.price).toLocaleString()}</td>
                        <td className="p-3"><StatusBadge status={p.is_active ? "active" : "inactive"} /></td>
                      </tr>
                    ))}
                    {packages.length === 0 && (
                      <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No packages yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === "invoices" && (
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Invoice #</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Issue Date</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Due Date</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-border/10 hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium font-mono text-xs">{inv.invoice_number}</td>
                        <td className="p-3">R{Number(inv.amount).toLocaleString()}</td>
                        <td className="p-3 text-muted-foreground text-xs">{new Date(inv.issue_date).toLocaleDateString()}</td>
                        <td className="p-3 text-muted-foreground text-xs">{new Date(inv.due_date).toLocaleDateString()}</td>
                        <td className="p-3"><StatusBadge status={inv.status} /></td>
                      </tr>
                    ))}
                    {invoices.length === 0 && (
                      <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No invoices yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Submissions Tab */}
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
                      </tr>
                    ))}
                    {submissions.length === 0 && (
                      <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No submissions yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ClientPortal;
