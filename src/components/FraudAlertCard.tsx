import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info, LucideIcon } from "lucide-react";

interface FraudAlertCardProps {
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
}

const severityConfig: Record<string, { icon: LucideIcon; bg: string; border: string; iconColor: string }> = {
  low: { icon: Info, bg: "bg-primary/5", border: "border-primary/20", iconColor: "text-primary" },
  medium: { icon: AlertCircle, bg: "bg-risk-medium/5", border: "border-risk-medium/20", iconColor: "text-risk-medium" },
  high: { icon: AlertTriangle, bg: "bg-risk-high/5", border: "border-risk-high/20", iconColor: "text-risk-high" },
};

export function FraudAlertCard({ title, description, severity }: FraudAlertCardProps) {
  const c = severityConfig[severity];
  const Icon = c.icon;

  return (
    <div className={cn("rounded-xl border p-4 flex gap-3", c.bg, c.border)}>
      <div className="mt-0.5">
        <Icon className={cn("h-5 w-5", c.iconColor)} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{title}</p>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
            severity === "high" && "bg-risk-high/10 text-risk-high",
            severity === "medium" && "bg-risk-medium/10 text-risk-medium",
            severity === "low" && "bg-primary/10 text-primary",
          )}>
            {severity}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}
