import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend
} from "recharts";
import { Hotel, GraduationCap, Truck, Copy, Check } from "lucide-react";

// ============ HOSPITALITY OS DASHBOARD MOCKUP ============
const hospOccupancy = [
  { month: "Jan", rate: 62, rev: 180 }, { month: "Feb", rate: 68, rev: 210 },
  { month: "Mar", rate: 75, rev: 260 }, { month: "Apr", rate: 82, rev: 320 },
  { month: "May", rate: 78, rev: 290 }, { month: "Jun", rate: 90, rev: 380 },
  { month: "Jul", rate: 95, rev: 420 }, { month: "Aug", rate: 88, rev: 360 },
];
const hospRooms = [
  { type: "Standard", occupied: 42, total: 50 },
  { type: "Deluxe", occupied: 28, total: 30 },
  { type: "Suite", occupied: 8, total: 12 },
  { type: "Penthouse", occupied: 3, total: 4 },
];
const hospGuests = [
  { name: "Check-ins Today", value: 23 }, { name: "Check-outs", value: 18 },
  { name: "In-House", value: 81 }, { name: "VIP Guests", value: 7 },
];

// ============ EDUCATION OS DASHBOARD MOCKUP ============
const eduEnrollment = [
  { year: "2020", students: 1800 }, { year: "2021", students: 2100 },
  { year: "2022", students: 2340 }, { year: "2023", students: 2580 },
  { year: "2024", students: 2820 },
];
const eduPerformance = [
  { subject: "Math", avg: 72, pass: 88 }, { subject: "Science", avg: 68, pass: 82 },
  { subject: "English", avg: 76, pass: 92 }, { subject: "History", avg: 71, pass: 85 },
];
const eduAttendance = Array.from({ length: 20 }, (_, i) => ({
  week: `W${i + 1}`,
  rate: 88 + Math.random() * 10,
}));

// ============ LOGISTICS OS DASHBOARD MOCKUP ============
const logDeliveries = [
  { month: "Jan", onTime: 920, late: 80 }, { month: "Feb", onTime: 960, late: 40 },
  { month: "Mar", onTime: 1040, late: 60 }, { month: "Apr", onTime: 1100, late: 30 },
];
const logFleet = [
  { status: "Active", value: 87, color: "hsl(145, 63%, 49%)" },
  { status: "Maintenance", value: 12, color: "hsl(45, 93%, 58%)" },
  { status: "Idle", value: 18, color: "hsl(240, 5%, 55%)" },
  { status: "En Route", value: 63, color: "hsl(217, 91%, 60%)" },
];
const logRoutes = [
  { route: "JHB→CPT", distance: "1,400km", time: "14h", savings: "23%" },
  { route: "DBN→PE", distance: "640km", time: "7h", savings: "18%" },
  { route: "CPT→BFN", distance: "1,000km", time: "11h", savings: "31%" },
];

const COLORS = ["hsl(0, 72%, 63%)", "hsl(145, 63%, 49%)", "hsl(45, 93%, 58%)", "hsl(217, 91%, 60%)"];

const MiniTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border/50 rounded-lg px-2.5 py-1.5 text-[10px] shadow-lg">
      <p className="text-muted-foreground">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || p.fill }} className="font-medium">{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

const KPICard = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="bg-muted/30 border border-border/20 rounded-xl p-3 text-center">
    <p className="text-lg font-bold text-primary">{value}</p>
    <p className="text-[10px] text-muted-foreground">{label}</p>
    {sub && <p className="text-[9px] text-muted-foreground/60">{sub}</p>}
  </div>
);

export const HospitalityDashboardMockup = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {hospGuests.map(g => <KPICard key={g.name} label={g.name} value={String(g.value)} />)}
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-muted/20 border border-border/20 rounded-xl p-4">
        <p className="text-xs font-medium mb-3">Occupancy & Revenue Trend</p>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={hospOccupancy}>
            <defs>
              <linearGradient id="mockGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 72%, 63%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0, 72%, 63%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
            <Tooltip content={<MiniTooltip />} />
            <Area type="monotone" dataKey="rate" stroke="hsl(0, 72%, 63%)" strokeWidth={2} fill="url(#mockGrad1)" name="Occupancy %" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-muted/20 border border-border/20 rounded-xl p-4">
        <p className="text-xs font-medium mb-3">Room Availability</p>
        <div className="space-y-3">
          {hospRooms.map(r => (
            <div key={r.type}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-muted-foreground">{r.type}</span>
                <span className="font-medium">{r.occupied}/{r.total}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted/50">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(r.occupied / r.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const EducationDashboardMockup = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KPICard label="Total Students" value="2,820" sub="+12% YoY" />
      <KPICard label="Attendance" value="94.2%" sub="This semester" />
      <KPICard label="Pass Rate" value="86.8%" sub="All subjects" />
      <KPICard label="Fee Collection" value="98.5%" sub="Current term" />
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-muted/20 border border-border/20 rounded-xl p-4">
        <p className="text-xs font-medium mb-3">Enrollment Growth</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={eduEnrollment}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
            <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
            <Tooltip content={<MiniTooltip />} />
            <Line type="monotone" dataKey="students" stroke="hsl(0, 72%, 63%)" strokeWidth={2} dot={{ r: 3 }} name="Students" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-muted/20 border border-border/20 rounded-xl p-4">
        <p className="text-xs font-medium mb-3">Subject Performance</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={eduPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
            <XAxis dataKey="subject" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
            <Tooltip content={<MiniTooltip />} />
            <Bar dataKey="avg" fill="hsl(0, 72%, 63%)" radius={[4, 4, 0, 0]} name="Average %" />
            <Bar dataKey="pass" fill="hsl(145, 63%, 49%)" radius={[4, 4, 0, 0]} name="Pass Rate %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export const LogisticsDashboardMockup = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KPICard label="Active Vehicles" value="142" />
      <KPICard label="On-Time Rate" value="96.4%" sub="Last 30 days" />
      <KPICard label="Fuel Savings" value="38%" sub="AI-optimized" />
      <KPICard label="Deliveries/Day" value="2,140" sub="+18% MoM" />
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-muted/20 border border-border/20 rounded-xl p-4">
        <p className="text-xs font-medium mb-3">Delivery Performance</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={logDeliveries}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 4% 20%)" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
            <Tooltip content={<MiniTooltip />} />
            <Bar dataKey="onTime" stackId="a" fill="hsl(145, 63%, 49%)" name="On Time" radius={[0, 0, 0, 0]} />
            <Bar dataKey="late" stackId="a" fill="hsl(0, 72%, 63%)" name="Late" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-muted/20 border border-border/20 rounded-xl p-4">
        <p className="text-xs font-medium mb-3">Fleet Status</p>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={logFleet} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
              {logFleet.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip content={<MiniTooltip />} />
            <Legend formatter={(v) => <span className="text-[10px] text-muted-foreground">{v}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="bg-muted/20 border border-border/20 rounded-xl p-4">
      <p className="text-xs font-medium mb-3">AI-Optimized Routes</p>
      <div className="grid grid-cols-3 gap-3">
        {logRoutes.map(r => (
          <div key={r.route} className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xs font-bold text-foreground">{r.route}</p>
            <p className="text-[10px] text-muted-foreground">{r.distance} · {r.time}</p>
            <p className="text-xs font-bold text-primary mt-1">{r.savings} saved</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============ MVP PROMPTS FOR ADMIN ============
const mvpPrompts: Record<string, string> = {
  hospitality: `Build a Hospitality Management Dashboard with:
- Real-time room occupancy grid (Standard/Deluxe/Suite/Penthouse)
- Check-in/Check-out management with guest profiles
- Revenue analytics: occupancy trends, ADR, RevPAR charts
- Reservation calendar with drag-and-drop
- AI demand forecasting with pricing recommendations
- Staff scheduling with shift management
- Guest communication automation (pre-arrival, during stay, post-checkout)
- Review sentiment analysis dashboard
- Integration with booking engines (Booking.com, Expedia APIs)
Tech: React, TailwindCSS, Supabase, Recharts, date-fns`,

  education: `Build an Education Management System Dashboard with:
- Student roster with profiles, grades, and attendance records
- Class scheduling timetable with room allocation
- Attendance tracking with automated parent notifications
- Grade book with subject-wise performance analytics
- Fee management: invoicing, payment tracking, overdue alerts
- AI enrollment forecasting with resource planning
- Automated report card generation
- Parent/Guardian communication portal
- Compliance reporting (regulatory requirements)
Tech: React, TailwindCSS, Supabase, Recharts, react-hook-form`,

  logistics: `Build a Logistics & Fleet Management Dashboard with:
- Real-time fleet tracking map with vehicle status indicators
- Route optimization engine with AI suggestions
- Delivery scheduling with driver assignment
- Inventory management: warehouse stock levels, reorder points
- Delivery confirmation with proof-of-delivery capture
- Fleet maintenance scheduling with predictive alerts
- Cost analytics: fuel, maintenance, labor per delivery
- Customer delivery tracking portal with live ETAs
- Demand forecasting for inventory optimization
Tech: React, TailwindCSS, Supabase, Recharts, Mapbox GL`,
};

export const MVPPromptsPanel = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeOS, setActiveOS] = useState<string>("hospitality");

  const copyPrompt = (key: string) => {
    navigator.clipboard.writeText(mvpPrompts[key]);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const osOptions = [
    { key: "hospitality", label: "Hospitality OS", icon: Hotel },
    { key: "education", label: "Education OS", icon: GraduationCap },
    { key: "logistics", label: "Logistics OS", icon: Truck },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {osOptions.map(os => (
          <button key={os.key} onClick={() => setActiveOS(os.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeOS === os.key ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground"
            }`}>
            <os.icon size={13} /> {os.label}
          </button>
        ))}
      </div>

      {/* Dashboard Preview */}
      <div className="glass-card p-4">
        <p className="text-xs font-semibold mb-3 text-primary">Live Dashboard Preview</p>
        {activeOS === "hospitality" && <HospitalityDashboardMockup />}
        {activeOS === "education" && <EducationDashboardMockup />}
        {activeOS === "logistics" && <LogisticsDashboardMockup />}
      </div>

      {/* MVP Prompt */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-primary">MVP Prompt — {osOptions.find(o => o.key === activeOS)?.label}</p>
          <button onClick={() => copyPrompt(activeOS)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-medium hover:bg-primary/20 transition-all">
            {copied === activeOS ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy Prompt</>}
          </button>
        </div>
        <pre className="text-[11px] text-muted-foreground bg-muted/30 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap max-h-48 overflow-y-auto border border-border/20">
          {mvpPrompts[activeOS]}
        </pre>
      </div>
    </div>
  );
};
