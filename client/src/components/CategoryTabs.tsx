import { Home, GraduationCap, Hotel, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type Category = "immobilier" | "etudiant" | "hotel";

interface CategoryTabsProps {
  activeCategory: Category;
  onChange: (category: Category) => void;
  variant?: "default" | "hero" | "compact";
  className?: string;
}

const categories = [
  {
    id: "immobilier" as Category,
    label: "Immobilier",
    icon: Home,
    description: "Acheter, vendre ou louer"
  },
  {
    id: "etudiant" as Category,
    label: "Logement Étudiant",
    icon: GraduationCap,
    description: "Chambres et colocations"
  },
  {
    id: "hotel" as Category,
    label: "Hôtels & Séjours",
    icon: Hotel,
    description: "Réservations courte durée"
  }
];

export default function CategoryTabs({ 
  activeCategory, 
  onChange, 
  variant = "default",
  className 
}: CategoryTabsProps) {
  if (variant === "hero") {
    return (
      <div className={cn("inline-flex bg-white/10 backdrop-blur-md rounded-2xl p-1.5", className)}>
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onChange(category.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all",
                isActive 
                  ? "bg-white text-gray-900 shadow-lg" 
                  : "text-white hover:bg-white/10"
              )}
            >
              <category.icon className="h-5 w-5" />
              <span className="hidden sm:inline">{category.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("inline-flex bg-gray-100 rounded-lg p-1", className)}>
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onChange(category.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                isActive 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2", className)}>
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onChange(category.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all min-w-[120px]",
              isActive 
                ? "border-primary bg-primary/5 text-primary" 
                : "border-gray-200 hover:border-gray-300 text-gray-600"
            )}
          >
            <category.icon className={cn("h-6 w-6", isActive && "text-primary")} />
            <span className="font-medium text-sm">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function CategoryChips({ 
  activeCategory, 
  onChange,
  className 
}: Omit<CategoryTabsProps, 'variant'>) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onChange(category.id)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm transition-all",
              isActive 
                ? "border-primary bg-primary text-white" 
                : "border-gray-200 bg-white hover:border-primary/50 text-gray-700"
            )}
          >
            <category.icon className="h-4 w-4" />
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
