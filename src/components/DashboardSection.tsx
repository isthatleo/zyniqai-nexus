import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, Activity, Clock, DollarSign } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { animate, stagger } from "animejs";
import WavyText from "./WavyText";

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
  const gridColor = resolvedTheme === "light" ? "hsl(240 5% 90%)" : "hsl(240 4% 20%)";
  const tickColor = resolvedTheme === "light" ? "#888" : "#777";
  const coralMain = "hsl(0, 72%, 63%)";
  const coralDark = "hsl(0, 60%, 45%)";
  const kpisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!kpisRef.current) return;
    const cards = kpisRef.current.querySelectorAll(".kpi-card");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(cards, {
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.95, 1],
            duration: 700,
            delay: stagger(100),
            ease: "outExpo",
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(kpisRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="dashboard" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your Data, <WavyText text="Visualized" className="gradient-text" staggerDelay={40} />
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enterprise-grade dashboards with real-time AI analytics and actionable insights.
          </p>
        </motion.div>

        <div ref={kpisRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="kpi-card glass-card-hover p-4 text-center opacity-0"
            >
              <kpi.icon size={16} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-xl font-bold">{kpi.value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.label}</p>
              <p className="text-[11px] text-primary font-medium">{kpi.change}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-1">AI Model Performance</h3>
            <p className="text-xs text-muted-foreground mb-4">Accuracy over 8 months</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="gradCoral" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={coralMain} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={coralMain} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: tickColor, fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke={coralMain} strokeWidth={2} fill="url(#gradCoral)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-1">Revenue vs Cost</h3>
            <p className="text-xs text-muted-foreground mb-4">Weekly analysis</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: tickColor, fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill={coralMain} radius={[3, 3, 0, 0]} />
                <Bar dataKey="cost" fill={coralDark} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
