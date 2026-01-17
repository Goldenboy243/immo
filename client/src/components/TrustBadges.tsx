import { Shield, CheckCircle, Users, Lock, Award, HeadphonesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadge {
  icon: React.ElementType;
  label: string;
  description?: string;
}

const trustBadges: TrustBadge[] = [
  {
    icon: Shield,
    label: "Protection anti-arnaque",
    description: "Transactions sécurisées"
  },
  {
    icon: CheckCircle,
    label: "5000+ propriétés vérifiées",
    description: "Listings authentiques"
  },
  {
    icon: Users,
    label: "10K+ utilisateurs actifs",
    description: "Communauté de confiance"
  },
  {
    icon: HeadphonesIcon,
    label: "Support 24/7",
    description: "Assistance disponible"
  }
];

interface TrustBadgesProps {
  variant?: "inline" | "grid" | "compact";
  className?: string;
}

export default function TrustBadges({ variant = "inline", className }: TrustBadgesProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap items-center gap-4", className)}>
        {trustBadges.slice(0, 2).map((badge) => (
          <div 
            key={badge.label}
            className="inline-flex items-center gap-2 text-sm text-white/90"
          >
            <badge.icon className="h-4 w-4 text-emerald-400" />
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-6", className)}>
        {trustBadges.map((badge) => (
          <div 
            key={badge.label}
            className="flex flex-col items-center text-center p-4 rounded-xl bg-white shadow-sm border border-gray-100"
          >
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
              <badge.icon className="h-6 w-6 text-emerald-600" />
            </div>
            <h4 className="font-semibold text-sm mb-1">{badge.label}</h4>
            {badge.description && (
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-6 md:gap-10", className)}>
      {trustBadges.map((badge) => (
        <div 
          key={badge.label}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
            <badge.icon className="h-4 w-4 text-emerald-600" />
          </div>
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

export function TrustSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Pourquoi choisir Safari.cd ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            La plateforme immobilière de confiance en République Démocratique du Congo
          </p>
        </div>
        <TrustBadges variant="grid" />
      </div>
    </section>
  );
}
