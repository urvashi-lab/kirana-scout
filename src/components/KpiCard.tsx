import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function KpiCard({ title, value, change, changeType = "neutral", icon: Icon, iconColor }: KpiCardProps) {
  return (
    <div className="glass-card rounded-2xl p-5 hover:shadow-card-hover transition-shadow duration-200 animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-heading font-bold mt-1">{value}</p>
          {change && (
            <p className={cn(
              "text-xs mt-1 font-medium",
              changeType === "positive" && "text-risk-low",
              changeType === "negative" && "text-risk-high",
              changeType === "neutral" && "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", iconColor || "bg-primary/10")}>
          <Icon className={cn("h-5 w-5", iconColor ? "text-card" : "text-primary")} />
        </div>
      </div>
    </div>
  );
}
