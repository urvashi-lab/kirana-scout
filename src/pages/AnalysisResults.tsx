import { RiskBadge } from "@/components/RiskBadge";
import { ConfidenceBar } from "@/components/ConfidenceBar";
import { FraudAlertCard } from "@/components/FraudAlertCard";
import {
  CheckCircle2,
  MapPin,
  TrendingUp,
  BarChart3,
  Eye,
  Package,
  AlertTriangle,
  Info,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const benchmarkData = [
  { range: "₹2k–4k", count: 8, isTarget: false },
  { range: "₹4k–6k", count: 15, isTarget: false },
  { range: "₹6k–8k", count: 22, isTarget: false },
  { range: "₹8k–10k", count: 18, isTarget: true },
  { range: "₹10k–12k", count: 12, isTarget: false },
  { range: "₹12k+", count: 5, isTarget: false },
];

const confidenceFactors = [
  { factor: "Image Quality", score: 85 },
  { factor: "Image Count", score: 100 },
  { factor: "Risk Flags", score: 60 },
  { factor: "Peer Match", score: 78 },
  { factor: "Geo Signal", score: 72 },
  { factor: "SKU Clarity", score: 88 },
];

const skuData = [
  { category: "FMCG", count: 45 },
  { category: "Beverages", count: 28 },
  { category: "Snacks", count: 32 },
  { category: "Personal Care", count: 18 },
  { category: "Tobacco", count: 12 },
  { category: "Other", count: 8 },
];

export default function AnalysisResults() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-heading font-bold">Shop KS-001</h1>
              <RiskBadge level="low" />
            </div>
            <p className="text-sm text-muted-foreground">Andheri West, Mumbai • Analyzed 2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Download Report</Button>
          <Button size="sm">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Approve Loan
          </Button>
        </div>
      </div>

      {/* Summary Panel */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Daily Sales", value: "₹8,000–12,000", sub: "Estimated range" },
          { label: "Monthly Revenue", value: "₹2.4L–3.6L", sub: "30-day projection" },
          { label: "Monthly Income", value: "₹48,000–72,000", sub: "After expenses" },
          { label: "Inventory Value", value: "₹1.8L", sub: "Detected from images" },
        ].map((item) => (
          <div key={item.label} className="glass-card rounded-2xl p-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{item.label}</p>
            <p className="text-lg font-heading font-bold mt-1">{item.value}</p>
            <p className="text-[10px] text-muted-foreground">{item.sub}</p>
          </div>
        ))}
        <div className="glass-card rounded-2xl p-4">
          <ConfidenceBar score={82} />
          <div className="mt-2 inline-flex items-center gap-1.5 bg-risk-low/10 text-risk-low px-2.5 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 className="h-3 w-3" /> Recommend Approve
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList className="bg-muted rounded-xl p-1 h-auto">
          <TabsTrigger value="insights" className="rounded-lg text-xs data-[state=active]:shadow-sm">
            <Eye className="h-3.5 w-3.5 mr-1.5" /> Visual Insights
          </TabsTrigger>
          <TabsTrigger value="geo" className="rounded-lg text-xs data-[state=active]:shadow-sm">
            <MapPin className="h-3.5 w-3.5 mr-1.5" /> Geo Intelligence
          </TabsTrigger>
          <TabsTrigger value="fraud" className="rounded-lg text-xs data-[state=active]:shadow-sm">
            <AlertTriangle className="h-3.5 w-3.5 mr-1.5" /> Fraud Detection
          </TabsTrigger>
          <TabsTrigger value="benchmark" className="rounded-lg text-xs data-[state=active]:shadow-sm">
            <BarChart3 className="h-3.5 w-3.5 mr-1.5" /> Benchmarking
          </TabsTrigger>
          <TabsTrigger value="confidence" className="rounded-lg text-xs data-[state=active]:shadow-sm">
            <Info className="h-3.5 w-3.5 mr-1.5" /> Confidence
          </TabsTrigger>
        </TabsList>

        {/* Visual Insights */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Shelf Image with YOLO overlay */}
            <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-heading font-semibold mb-3">Shelf Analysis (YOLO Detection)</h3>
            <div className="aspect-video rounded-xl bg-muted relative overflow-hidden">
              <img
                src="/images/yolo analysis.png"
                alt="Shelf Analysis YOLO Detection"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

            {/* SKU Distribution */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-heading font-semibold mb-3">SKU Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={skuData} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 50%)" />
                  <YAxis dataKey="category" type="category" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 50%)" width={80} />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  <Bar dataKey="count" fill="hsl(217, 72%, 45%)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center p-2 rounded-lg bg-muted">
                  <p className="text-lg font-heading font-bold">143</p>
                  <p className="text-[10px] text-muted-foreground">Total SKUs</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted">
                  <p className="text-lg font-heading font-bold">78%</p>
                  <p className="text-[10px] text-muted-foreground">Shelf Density</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted">
                  <p className="text-lg font-heading font-bold">6</p>
                  <p className="text-[10px] text-muted-foreground">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Geo Intelligence */}
        <TabsContent value="geo" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-heading font-semibold mb-3">Location Intelligence</h3>
              <div className="h-60 rounded-xl bg-muted relative overflow-hidden">
                <img
                  src="/images/Andheri-West.png"
                  alt="Location Intelligence Map"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                  <span className="font-semibold text-foreground">19.0760° N, 72.8777° E</span> • Andheri West, Mumbai
                </p>
          </div>
            <div className="space-y-4">
              {[
                { label: "Geo Footfall Score", value: "0.78", desc: "High pedestrian traffic area" },
                { label: "Nearby Shops", value: "12", desc: "Within 500m radius" },
                { label: "Road Classification", value: "Main Street", desc: "High commercial activity zone" },
                { label: "Competition Index", value: "Medium", desc: "Moderate kirana density" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-heading font-bold">{item.value}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground max-w-[140px] text-right">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Fraud Detection */}
        <TabsContent value="fraud" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FraudAlertCard
              title="Cross-Signal Mismatch"
              description="GPS location indicates a residential zone, but inventory levels suggest commercial activity. Warrants physical verification."
              severity="medium"
            />
            <FraudAlertCard
              title="Shelf Placement Anomaly"
              description="Detected unusually uniform product arrangement. May indicate staged or borrowed inventory for assessment."
              severity="low"
            />
            <FraudAlertCard
              title="Expiry Clustering Risk"
              description="No risk detected. Product expiry dates show normal distribution pattern."
              severity="low"
            />
            <FraudAlertCard
              title="Inventory vs Revenue Mismatch"
              description="Inventory value aligns with estimated daily sales. No anomaly detected."
              severity="low"
            />
          </div>

          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-heading font-semibold mb-2">AI Explanation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The shop shows <strong className="text-foreground">moderate confidence</strong> with one medium-severity flag related to geo-zone classification mismatch.
              While inventory levels and SKU diversity are healthy, we recommend a brief physical verification to confirm commercial use.
              The shelf placement anomaly is flagged as low severity due to minor uniformity patterns that are common in recently restocked stores.
            </p>
          </div>
        </TabsContent>

        {/* Benchmarking */}
        <TabsContent value="benchmark" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-heading font-semibold mb-3">Peer Distribution (Daily Sales)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={benchmarkData}>
                  <XAxis dataKey="range" tick={{ fontSize: 10 }} stroke="hsl(220, 10%, 50%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 50%)" />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {benchmarkData.map((entry, i) => (
                      <rect key={i} fill={entry.isTarget ? "hsl(217, 72%, 45%)" : "hsl(220, 15%, 85%)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="glass-card rounded-2xl p-5 flex flex-col justify-center items-center text-center">
              <div className="h-28 w-28 rounded-full border-4 border-primary flex items-center justify-center mb-4">
                <div>
                  <p className="text-2xl font-heading font-bold">76th</p>
                  <p className="text-xs text-muted-foreground">percentile</p>
                </div>
              </div>
              <p className="text-sm font-semibold">Top 24% in area</p>
              <p className="text-xs text-muted-foreground mt-1">Outperforms most kirana stores within 2km radius</p>
              <div className="flex items-center gap-1 mt-3 text-risk-low">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">Above average performance</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Confidence Breakdown */}
        <TabsContent value="confidence" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-heading font-semibold mb-3">Confidence Factors</h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={confidenceFactors}>
                  <PolarGrid stroke="hsl(220, 15%, 90%)" />
                  <PolarAngleAxis dataKey="factor" tick={{ fontSize: 10 }} stroke="hsl(220, 10%, 50%)" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} stroke="hsl(220, 10%, 50%)" />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="hsl(217, 72%, 45%)"
                    fill="hsl(217, 72%, 45%)"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {confidenceFactors.map((f) => (
                <div key={f.factor} className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{f.factor}</span>
                    <span className="text-sm font-heading font-bold">{f.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        f.score >= 80 ? "bg-risk-low" : f.score >= 60 ? "bg-risk-medium" : "bg-risk-high"
                      }`}
                      style={{ width: `${f.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
