import { CheckCircle2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  variant?: "default" | "small" | "large";
  showText?: boolean;
  className?: string;
}

export default function VerifiedBadge({ 
  variant = "default", 
  showText = true,
  className 
}: VerifiedBadgeProps) {
  const sizes = {
    small: "h-3 w-3",
    default: "h-4 w-4",
    large: "h-5 w-5"
  };

  const textSizes = {
    small: "text-xs",
    default: "text-sm",
    large: "text-base"
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1 text-emerald-600 font-medium",
      textSizes[variant],
      className
    )}>
      <CheckCircle2 className={cn(sizes[variant], "fill-emerald-100")} />
      {showText && <span>Vérifié</span>}
    </div>
  );
}

export function VerifiedOwnerBadge({ className }: { className?: string }) {
  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-200",
      className
    )}>
      <Shield className="h-3.5 w-3.5" />
      <span>Propriétaire vérifié</span>
    </div>
  );
}
