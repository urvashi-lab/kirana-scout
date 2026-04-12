import { cn } from "@/lib/utils";

interface ConfidenceBarProps {
  score: number; // 0–100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ConfidenceBar({ score, size = "md", showLabel = true }: ConfidenceBarProps) {
  const color = score >= 75 ? "bg-risk-low" : score >= 50 ? "bg-risk-medium" : "bg-risk-high";
  const height = size === "sm" ? "h-1.5" : size === "md" ? "h-2.5" : "h-4";

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-muted-foreground">Confidence</span>
          <span className="text-sm font-heading font-bold">{score}%</span>
        </div>
      )}
      <div className={cn("w-full rounded-full bg-muted overflow-hidden", height)}>
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", color)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
