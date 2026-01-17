import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  propertyId: string;
  initialSaved?: boolean;
  variant?: "icon" | "full";
  size?: "sm" | "md" | "lg";
  className?: string;
  onToggle?: (saved: boolean) => void;
}

export default function WishlistButton({ 
  propertyId,
  initialSaved = false,
  variant = "icon",
  size = "md",
  className,
  onToggle
}: WishlistButtonProps) {
  const [saved, setSaved] = useState(initialSaved);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !saved;
    setSaved(newState);
    onToggle?.(newState);
  };

  const sizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  if (variant === "full") {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        className={cn(
          "gap-2 transition-all",
          saved && "bg-red-50 border-red-200 text-red-600 hover:bg-red-100",
          className
        )}
      >
        <Heart className={cn("h-4 w-4", saved && "fill-current")} />
        {saved ? "Enregistré" : "Enregistrer"}
      </Button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all",
        sizes[size],
        saved && "text-red-500",
        className
      )}
      aria-label={saved ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart className={cn(iconSizes[size], saved && "fill-current")} />
    </button>
  );
}
