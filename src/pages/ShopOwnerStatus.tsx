import { CheckCircle2, Clock, XCircle, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCases, CaseStatus } from "@/contexts/CaseContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const statusConfig: Record<CaseStatus, { icon: typeof Clock; label: string; message: string; color: string }> = {
  pending: {
    icon: Clock,
    label: "Under Review",
    message: "Your application is under review. We'll update you shortly.",
    color: "text-risk-medium",
  },
  approved: {
    icon: CheckCircle2,
    label: "Approved",
    message: "Your loan has been approved! You will be contacted soon.",
    color: "text-risk-low",
  },
  rejected: {
    icon: XCircle,
    label: "Not Approved",
    message: "Your application was not approved at this time.",
    color: "text-risk-high",
  },
};

export default function ShopOwnerStatus() {
  const { userName } = useAuth();
  const { getOwnerCases } = useCases();
  const navigate = useNavigate();
  const cases = getOwnerCases(userName);

  if (cases.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 space-y-4">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground/40" />
        <h2 className="text-lg font-heading font-semibold">No Applications Yet</h2>
        <p className="text-sm text-muted-foreground">Submit your shop details to get started</p>
        <Button onClick={() => navigate("/owner/upload")} className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" /> New Application
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-bold">My Applications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track your credit assessment status</p>
        </div>
        <Button size="sm" onClick={() => navigate("/owner/upload")} className="rounded-xl">
          <Plus className="h-3.5 w-3.5 mr-1.5" /> New
        </Button>
      </div>

      <div className="space-y-3">
        {cases.map((c) => {
          const config = statusConfig[c.status];
          const Icon = config.icon;
          return (
            <div key={c.id} className="glass-card rounded-2xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{c.id}</p>
                  <h3 className="font-heading font-semibold mt-0.5">{c.shopName}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.location}</p>
                </div>
                <div className={cn("flex items-center gap-1.5 text-sm font-medium", config.color)}>
                  <Icon className="h-4 w-4" />
                  {config.label}
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-sm text-muted-foreground">{config.message}</p>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <TimelineStep done label="Application Submitted" date={new Date(c.submittedAt).toLocaleDateString()} />
                <TimelineStep done={c.status !== "pending"} label="Under Review" active={c.status === "pending"} />
                <TimelineStep done={c.status === "approved" || c.status === "rejected"} label={c.status === "rejected" ? "Decision: Not Approved" : "Decision: Approved"} active={false} />
              </div>

              <p className="text-[10px] text-muted-foreground">
                Submitted: {new Date(c.submittedAt).toLocaleString()} • {c.images.length} images
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineStep({ done, label, date, active }: { done: boolean; label: string; date?: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={cn(
        "h-3 w-3 rounded-full border-2 shrink-0",
        done ? "bg-risk-low border-risk-low" : active ? "border-risk-medium bg-transparent" : "border-border bg-transparent"
      )} />
      <div className="flex-1">
        <p className={cn("text-xs", done || active ? "text-foreground" : "text-muted-foreground")}>{label}</p>
        {date && <p className="text-[10px] text-muted-foreground">{date}</p>}
      </div>
    </div>
  );
}
