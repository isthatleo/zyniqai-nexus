import { motion } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, Activity, Clock, DollarSign } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const lineData = [
  { name: "Jan", value: 65 }, { name: "Feb", value: 72 }, { name: "Mar", value: 68 },
  { name: "Apr", value: 80 }, { name: "May", value: 85 }, { name: "Jun", value: 92 },
  { name: "Jul", value: 88 }, { name: "Aug", value: 95 },
];

const barData = [
  { name: "Mon", revenue: 4200, cost: 2400 },
  { name: "Tue", revenue: 3800, cost: 2100 },
  { name: "Wed", revenue: 5100, cost: 2800 },
  { name: "Thu", revenue: 4700, cost: 2200 },
  { name: "Fri", revenue: 5300, cost: 2600 },
];

const kpis = [
  { label: "AI Accuracy", value: "97.3%", change: "+2.1%", icon: Activity },
  { label: "Avg Response", value: "42ms", change: "-18%", icon: Clock },
  { label: "Revenue Impact", value: "$8.2M", change: "+24.5%", icon: DollarSign },
  { label: "Model Growth", value: "34.2%", change: "+8.4%", icon: TrendingUp },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="text-muted-foreground">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-medium">{p.value}</p>
      ))}
    </div>
  );
};

const DashboardSection = () => {
  const { resolvedTheme } = useTheme();
  const gridColor = resolvedTheme === "light" ? "hsl(40 15% 90%)" : "hsl(30 10% 18%)";
  const tickColor = resolvedTheme === "light" ? "#888" : "#B0B0B0";
  const goldMain = "#D4AF37";
  const goldDark = "#8B6914";

  return (
    <section id="dashboard" className="section-padding relative">
      <div className="absolute inset-0 particle-bg opacity-50" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">
            Platform Preview
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Your Data, <span className="gradient-text">Visualized</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enterprise-grade dashboards with real-time AI analytics, predictive KPIs, and actionable insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <kpi.icon size={18} className="text-muted-foreground" />
                <span className="text-xs font-medium text-primary">{kpi.change}</span>
              </div>
              <p className="text-2xl font-display font-bold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-medium mb-1">AI Model Performance</h3>
            <p className="text-xs text-muted-foreground mb-6">Accuracy trend over 8 months</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="gradGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={goldMain} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={goldMain} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke={goldMain} strokeWidth={2} fill="url(#gradGold)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-medium mb-1">Revenue vs Cost</h3>
            <p className="text-xs text-muted-foreground mb-6">Weekly breakdown analysis</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill={goldMain} radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" fill={goldDark} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
