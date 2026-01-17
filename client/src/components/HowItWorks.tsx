import { Search, CheckCircle, Key, Shield, MessageCircle, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Search,
    title: "Recherchez",
    description: "Parcourez des milliers de propriétés vérifiées dans toute la RDC",
    color: "bg-emerald-500"
  },
  {
    icon: CheckCircle,
    title: "Vérifiez",
    description: "Consultez les avis, photos et documents de chaque propriété",
    color: "bg-amber-500"
  },
  {
    icon: MessageCircle,
    title: "Contactez",
    description: "Discutez directement avec les propriétaires vérifiés",
    color: "bg-blue-500"
  },
  {
    icon: Key,
    title: "Emménagez",
    description: "Finalisez en toute sécurité et recevez vos clés",
    color: "bg-purple-500"
  }
];

interface HowItWorksProps {
  className?: string;
}

export default function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-white", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Simple et sécurisé
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Trouvez votre logement idéal en quelques étapes simples, 
            sans intermédiaires douteux ni frais cachés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200" />
              )}
              
              <div className="relative flex flex-col items-center text-center">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={cn(
                  "h-20 w-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg",
                  step.color
                )}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Safety callout */}
        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <Shield className="h-8 w-8 text-emerald-600" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl mb-2">Protection anti-arnaque garantie</h3>
            <p className="text-muted-foreground">
              Chaque propriétaire est vérifié, chaque annonce est validée. 
              Plus jamais de mauvaises surprises avec les courtiers non fiables.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
