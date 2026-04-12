import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: "low" | "medium" | "high";
  className?: string;
}

const config = {
  low: { label: "Low Risk", bg: "bg-risk-low/10", text: "text-risk-low", dot: "bg-risk-low" },
  medium: { label: "Medium", bg: "bg-risk-medium/10", text: "text-risk-medium", dot: "bg-risk-medium" },
  high: { label: "High Risk", bg: "bg-risk-high/10", text: "text-risk-high", dot: "bg-risk-high" },
};

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const c = config[level];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", c.bg, c.text, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}
