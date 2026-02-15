import { motion } from "framer-motion";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, Fuel, Clock, DollarSign } from "lucide-react";

const lineData = [
  { name: "Jan", value: 65 }, { name: "Feb", value: 72 }, { name: "Mar", value: 68 },
  { name: "Apr", value: 80 }, { name: "May", value: 85 }, { name: "Jun", value: 92 },
  { name: "Jul", value: 88 }, { name: "Aug", value: 95 },
];

const barData = [
  { name: "Mon", profit: 4200, cost: 2400 },
  { name: "Tue", profit: 3800, cost: 2100 },
  { name: "Wed", profit: 5100, cost: 2800 },
  { name: "Thu", profit: 4700, cost: 2200 },
  { name: "Fri", profit: 5300, cost: 2600 },
];

const kpis = [
  { label: "Fuel Efficiency", value: "94.2%", change: "+3.1%", icon: Fuel, positive: true },
  { label: "ETA Accuracy", value: "98.7%", change: "+1.2%", icon: Clock, positive: true },
  { label: "Revenue", value: "$2.4M", change: "+12.5%", icon: DollarSign, positive: true },
  { label: "Growth Rate", value: "23.8%", change: "+5.4%", icon: TrendingUp, positive: true },
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
            Live Dashboard
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Your Data, <span className="gradient-text-green">Visualized</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Interactive charts and KPIs that update in real-time, giving you complete operational visibility.
          </p>
        </motion.div>

        {/* KPI Cards */}
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
                <span className="text-xs font-medium text-neon-green">{kpi.change}</span>
              </div>
              <p className="text-2xl font-display font-bold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-medium mb-1">Efficiency Trend</h3>
            <p className="text-xs text-muted-foreground mb-6">Fleet efficiency over 8 months</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2CE9FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2CE9FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 20% 18%)" />
                <XAxis dataKey="name" tick={{ fill: "#B0B0B0", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#B0B0B0", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#2CE9FF" strokeWidth={2} fill="url(#gradBlue)" />
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
            <h3 className="text-sm font-medium mb-1">Profit vs Cost</h3>
            <p className="text-xs text-muted-foreground mb-6">Weekly breakdown analysis</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(216 20% 18%)" />
                <XAxis dataKey="name" tick={{ fill: "#B0B0B0", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#B0B0B0", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="profit" fill="#7FFF00" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" fill="#7D5CFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
