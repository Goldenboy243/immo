import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  showCount?: boolean;
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function RatingStars({ 
  rating, 
  maxRating = 5, 
  showCount = false,
  count = 0,
  size = "md",
  className 
}: RatingStarsProps) {
  const sizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => {
          const filled = index < Math.floor(rating);
          const halfFilled = index === Math.floor(rating) && rating % 1 !== 0;
          
          return (
            <Star
              key={index}
              className={cn(
                sizes[size],
                filled || halfFilled 
                  ? "text-amber-400 fill-amber-400" 
                  : "text-gray-300"
              )}
            />
          );
        })}
      </div>
      <span className={cn("text-muted-foreground font-medium", textSizes[size])}>
        {rating.toFixed(1)}
      </span>
      {showCount && count > 0 && (
        <span className={cn("text-muted-foreground", textSizes[size])}>
          ({count} avis)
        </span>
      )}
    </div>
  );
}
