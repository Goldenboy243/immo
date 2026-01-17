import { Card } from "@/components/ui/card";
import { Target, Heart, Award, Users } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Notre Mission",
      description: "Faciliter l'accès à la propriété pour tous les habitants de Lubumbashi en offrant des services immobiliers de qualité et transparents.",
    },
    {
      icon: Heart,
      title: "Nos Valeurs",
      description: "Intégrité, professionnalisme et engagement envers nos clients sont au cœur de tout ce que nous faisons.",
    },
    {
      icon: Award,
      title: "Notre Expertise",
      description: "Une connaissance approfondie du marché immobilier local et des années d'expérience dans le secteur.",
    },
    {
      icon: Users,
      title: "Notre Équipe",
      description: "Des professionnels passionnés et dévoués, prêts à vous accompagner dans tous vos projets immobiliers.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-page-title">
            À Propos de IMMO
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Votre partenaire de confiance dans l'immobilier à Lubumbashi
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">

        <div className="mb-16">
          <Card className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">IMMO lubumbashi</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Fondée par des professionnels passionnés de l'immobilier, <strong className="text-foreground">IMMO lubumbashi</strong> 
                {" "}s'est rapidement imposée comme une référence incontournable dans le secteur immobilier de Lubumbashi.
              </p>
              <p>
                Notre agence est née d'une vision simple mais ambitieuse : rendre le marché immobilier plus accessible, 
                transparent et efficace pour tous. Que vous soyez acheteur, vendeur ou locataire, nous mettons notre 
                expertise et notre réseau au service de vos projets.
              </p>
              <p>
                Nous comprenons que l'acquisition ou la vente d'une propriété est l'une des décisions les plus importantes 
                de votre vie. C'est pourquoi nous nous engageons à vous offrir un accompagnement personnalisé, des conseils 
                avisés et un service irréprochable à chaque étape de votre parcours immobilier.
              </p>
              <p>
                Grâce à notre connaissance approfondie du marché local et à notre engagement envers l'excellence, 
                nous avons aidé des centaines de familles à trouver leur maison idéale et des propriétaires à vendre 
                leurs biens dans les meilleures conditions.
              </p>
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Ce qui nous définit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-[#8B5CF6] flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 md:p-12 bg-gradient-to-r from-primary/10 to-[#8B5CF6]/10 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Notre engagement envers vous</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
              Chez IMMO lubumbashi, chaque client est unique et mérite une attention particulière. 
              Nous nous engageons à vous offrir une expérience immobilière exceptionnelle, basée sur la confiance, 
              la transparence et des résultats concrets.
            </p>
            <p className="font-semibold text-foreground">
              Faites confiance à IMMO pour tous vos projets immobiliers à Lubumbashi !
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
