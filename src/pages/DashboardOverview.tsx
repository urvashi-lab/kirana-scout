import { KpiCard } from "@/components/KpiCard";
import { RiskBadge } from "@/components/RiskBadge";
import { ConfidenceBar } from "@/components/ConfidenceBar";
import {
  Store,
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const recentAnalyses = [
  { id: "KS-001", location: "Andheri West, Mumbai", sales: "₹8,000–12,000/day", confidence: 82, risk: "low" as const },
  { id: "KS-002", location: "Koramangala, Bangalore", sales: "₹5,000–8,000/day", confidence: 67, risk: "medium" as const },
  { id: "KS-003", location: "Lajpat Nagar, Delhi", sales: "₹3,000–5,000/day", confidence: 45, risk: "high" as const },
  { id: "KS-004", location: "Baner, Pune", sales: "₹10,000–15,000/day", confidence: 91, risk: "low" as const },
  { id: "KS-005", location: "T Nagar, Chennai", sales: "₹6,000–9,000/day", confidence: 73, risk: "medium" as const },
];

const weeklyData = [
  { day: "Mon", analyses: 12 },
  { day: "Tue", analyses: 19 },
  { day: "Wed", analyses: 15 },
  { day: "Thu", analyses: 22 },
  { day: "Fri", analyses: 18 },
  { day: "Sat", analyses: 8 },
  { day: "Sun", analyses: 5 },
];

const riskDistribution = [
  { name: "Low Risk", value: 58, color: "hsl(145, 65%, 42%)" },
  { name: "Medium Risk", value: 28, color: "hsl(38, 92%, 55%)" },
  { name: "High Risk", value: 14, color: "hsl(0, 72%, 55%)" },
];

export default function DashboardOverview() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-heading font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of credit assessments and risk intelligence</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Shops Analyzed" value="1,247" change="+12% this month" changeType="positive" icon={Store} />
        <KpiCard title="Avg Confidence" value="76.3%" change="+2.1% vs last month" changeType="positive" icon={TrendingUp} />
        <KpiCard title="High Risk Cases" value="174" change="+8 this week" changeType="negative" icon={ShieldAlert} iconColor="bg-risk-high/10" />
        <KpiCard title="Approved Rate" value="72.4%" change="Stable" changeType="neutral" icon={CheckCircle2} iconColor="bg-risk-low/10" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card rounded-2xl p-5">
          <h3 className="text-sm font-heading font-semibold mb-4">Weekly Analyses</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(220, 15%, 90%)",
                  boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="analyses" fill="hsl(217, 72%, 45%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-heading font-semibold mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {riskDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {riskDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-heading font-semibold">Shop Locations</h3>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-risk-low" /> Low Risk</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-risk-medium" /> Medium</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-risk-high" /> High Risk</span>
          </div>
        </div>
        <div className="h-60 rounded-xl bg-muted relative overflow-hidden">
          <img
            src="/images/Swargate.png"
            alt="Shop Locations Map"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Recent Analyses Table */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-heading font-semibold">Recent Analyses</h3>
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate("/upload")}>
            + New Analysis
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Shop ID</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Est. Daily Sales</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Confidence</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk</th>
                <th className="text-right py-2.5 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {recentAnalyses.map((shop) => (
                <tr key={shop.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate("/results/demo")}>
                  <td className="py-3 px-3 font-medium font-heading">{shop.id}</td>
                  <td className="py-3 px-3 text-muted-foreground">{shop.location}</td>
                  <td className="py-3 px-3">{shop.sales}</td>
                  <td className="py-3 px-3 w-40">
                    <ConfidenceBar score={shop.confidence} size="sm" showLabel={false} />
                    <span className="text-xs text-muted-foreground">{shop.confidence}%</span>
                  </td>
                  <td className="py-3 px-3"><RiskBadge level={shop.risk} /></td>
                  <td className="py-3 px-3 text-right">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
