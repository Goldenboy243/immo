import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 bg-white border-0 shadow-md">
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-100 flex items-center justify-center">
          <Icon className="h-10 w-10 text-primary" />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3" data-testid={`text-service-${title.toLowerCase()}`}>{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}
