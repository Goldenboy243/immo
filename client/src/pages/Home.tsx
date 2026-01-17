import { Link } from "wouter";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Home as HomeIcon, Key } from "lucide-react";

import house1 from "@assets/stock_images/luxury_modern_house__fa3f4f9e.jpg";
import house2 from "@assets/stock_images/luxury_modern_house__6f277bde.jpg";
import apartment1 from "@assets/stock_images/modern_apartment_int_41935162.jpg";
import land1 from "@assets/stock_images/empty_land_plot_for__b52bf2bf.jpg";

export default function Home() {
  const services = [
    {
      icon: ShoppingBag,
      title: "Acheter",
      description: "Trouvez la propriété de vos rêves parmi notre sélection exclusive de maisons et appartements à Lubumbashi.",
    },
    {
      icon: HomeIcon,
      title: "Vendre",
      description: "Confiez-nous la vente de votre bien. Notre expertise garantit une transaction rapide et au meilleur prix.",
    },
    {
      icon: Key,
      title: "Louer",
      description: "Découvrez nos propriétés en location adaptées à vos besoins et votre budget.",
    },
  ];

  const featuredProperties = [
    {
      id: "1",
      image: house1,
      title: "Villa Moderne de Luxe",
      price: "$350,000",
      location: "Lubumbashi",
      type: "Maison",
      status: "À vendre",
      description: "Belle villa moderne avec 4 chambres, jardin spacieux et piscine privée.",
    },
    {
      id: "2",
      image: house2,
      title: "Maison Familiale Spacieuse",
      price: "$280,000",
      location: "Lubumbashi",
      type: "Maison",
      status: "À vendre",
      description: "Maison familiale de 5 chambres avec double garage et grand terrain.",
    },
    {
      id: "3",
      image: apartment1,
      title: "Appartement Moderne Centre-Ville",
      price: "$800/mois",
      location: "Lubumbashi",
      type: "Appartement",
      status: "À louer",
      description: "Appartement moderne de 3 chambres en plein centre-ville, meublé.",
    },
    {
      id: "4",
      image: land1,
      title: "Terrain Résidentiel",
      price: "$120,000",
      location: "Lubumbashi",
      type: "Terrain",
      status: "À vendre",
      description: "Grand terrain résidentiel de 1000m² dans un quartier calme et sécurisé.",
    },
  ];

  return (
    <div>
      <Hero />

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-services-title">
              Comment pouvons-nous vous aider ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Des solutions immobilières complètes pour tous vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-featured-title">
                Propriétés Recommandées
              </h2>
              <p className="text-muted-foreground text-lg">
                Découvrez notre sélection exclusive
              </p>
            </div>
            <Link href="/biens">
              <Button variant="outline" className="hidden md:flex">
                Voir tout
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/biens">
              <Button variant="outline" className="w-full max-w-sm">
                Voir toutes les propriétés
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
