import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <Card className="p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white border-0 shadow-md group cursor-pointer">
      <div className="flex justify-center mb-5">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center group-hover:from-emerald-100 group-hover:to-teal-200 transition-colors">
          <Icon className="h-8 w-8 text-emerald-600" />
        </div>
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-600 transition-colors">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </Card>
  );
}
