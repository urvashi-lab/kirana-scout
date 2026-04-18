import { ArrowLeft, Image, MapPin, Calendar, TrendingUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/RiskBadge";
import { ConfidenceBar } from "@/components/ConfidenceBar";
import { useNavigate } from "react-router-dom";

const analysisHistory = [
  { date: "Apr 10, 2026", confidence: 82, risk: "low" as const, sales: "₹8,000–12,000/day" },
  { date: "Feb 15, 2026", confidence: 74, risk: "medium" as const, sales: "₹6,500–10,000/day" },
  { date: "Dec 5, 2025", confidence: 68, risk: "medium" as const, sales: "₹5,000–8,500/day" },
];

export default function ShopDetail() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold">Shop KS-001 — Detail</h1>
          <p className="text-sm text-muted-foreground">Andheri West, Mumbai</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Analyses", value: "3" },
          { label: "Latest Confidence", value: "82%" },
          { label: "Trend", value: "↑ Improving" },
          { label: "Current Status", value: "Approved" },
        ].map((m) => (
          <div key={m.label} className="glass-card rounded-2xl p-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</p>
            <p className="text-xl font-heading font-bold mt-1">{m.value}</p>
          </div>
        ))}
      </div>

   
      {/* Image Gallery */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-sm font-heading font-semibold mb-3 flex items-center gap-2">
          <Image className="h-4 w-4" /> Image Gallery
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Shelf Front", src: "/images/kirana1.jpg" },
            { label: "Shelf Side", src: "/images/kirana2.jpg" },
            { label: "Counter", src: "/images/kirana3.jpg" },
            { label: "Exterior", src: "/images/kirana4.webp" },
          ].map((item) => (
            <div key={item.label} className="aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image not found
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-[10px] text-muted-foreground block text-center mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis History */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-sm font-heading font-semibold mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4" /> Analysis History
        </h3>
        <div className="space-y-3">
          {analysisHistory.map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={() => navigate("/results/demo")}
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{a.date}</span>
                <RiskBadge level={a.risk} />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{a.sales}</span>
                <div className="w-24">
                  <ConfidenceBar score={a.confidence} size="sm" showLabel={false} />
                </div>
                <span className="text-xs font-heading font-bold">{a.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-sm font-heading font-semibold mb-3 flex items-center gap-2">
          <MessageSquare className="h-4 w-4" /> Officer Notes
        </h3>
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-muted/50">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Rajesh Kumar</span>
              <span>Apr 10, 2026</span>
            </div>
            <p className="text-sm">Shop owner cooperative. Good inventory management. Recommend approval for ₹2L loan.</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/50">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Priya Singh</span>
              <span>Feb 15, 2026</span>
            </div>
            <p className="text-sm">Physical visit confirmed commercial activity. Geo-zone mismatch is due to recent rezoning.</p>
          </div>
        </div>
        <textarea
          className="w-full mt-3 rounded-xl border bg-card p-3 text-sm resize-none focus:ring-1 focus:ring-primary focus:outline-none"
          rows={2}
          placeholder="Add a note..."
        />
        <Button size="sm" className="mt-2">Add Note</Button>
      </div>
    </div>
  );
}
