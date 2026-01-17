import { Link } from "wouter";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import PropertyCard from "@/components/PropertyCard";
import HowItWorks from "@/components/HowItWorks";
import PopularCities from "@/components/PopularCities";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { TrustSection } from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Home as HomeIcon, Key, GraduationCap, Shield, ArrowRight, Smartphone, Download } from "lucide-react";

// Placeholder images from Unsplash
const house1 = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80";
const house2 = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
const apartment1 = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80";
const land1 = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80";

export default function Home() {
  const services = [
    {
      icon: ShoppingBag,
      title: "Acheter",
      description: "Trouvez la propriété de vos rêves parmi notre sélection de maisons et appartements vérifiés en RDC.",
    },
    {
      icon: HomeIcon,
      title: "Vendre",
      description: "Publiez votre annonce gratuitement. Notre plateforme vous connecte directement aux acheteurs sérieux.",
    },
    {
      icon: Key,
      title: "Louer",
      description: "Découvrez nos propriétés en location - appartements, maisons et chambres dans toute la RDC.",
    },
    {
      icon: GraduationCap,
      title: "Étudiants",
      description: "Logements vérifiés près des universités. Fini les arnaques, trouvez votre chambre en toute sécurité.",
    },
  ];

  const featuredProperties = [
    {
      id: "1",
      image: house1,
      title: "Villa Moderne de Luxe",
      price: "$350,000",
      location: "Gombe, Kinshasa",
      type: "Maison",
      status: "vente",
      statusLabel: "À vendre",
      description: "Belle villa moderne avec 4 chambres, jardin spacieux et piscine privée.",
      isVerified: true,
      rating: 4.8,
      reviewCount: 24,
      isPopular: true,
      bedrooms: 4,
      bathrooms: 3,
      area: "320m²",
    },
    {
      id: "2",
      image: house2,
      title: "Maison Familiale Spacieuse",
      price: "$280,000",
      location: "Lubumbashi, Haut-Katanga",
      type: "Maison",
      status: "vente",
      statusLabel: "À vendre",
      description: "Maison familiale de 5 chambres avec double garage et grand terrain.",
      isVerified: true,
      rating: 4.6,
      reviewCount: 18,
      bedrooms: 5,
      bathrooms: 3,
      area: "450m²",
    },
    {
      id: "3",
      image: apartment1,
      title: "Appartement Moderne Centre-Ville",
      price: "$800/mois",
      location: "Goma, Nord-Kivu",
      type: "Appartement",
      status: "location",
      statusLabel: "À louer",
      description: "Appartement moderne de 3 chambres en plein centre-ville, meublé.",
      isVerified: true,
      rating: 4.9,
      reviewCount: 32,
      isNew: true,
      bedrooms: 3,
      bathrooms: 2,
      area: "120m²",
    },
    {
      id: "4",
      image: land1,
      title: "Terrain Résidentiel",
      price: "$120,000",
      location: "Bukavu, Sud-Kivu",
      type: "Terrain",
      status: "vente",
      statusLabel: "À vendre",
      description: "Grand terrain résidentiel de 1000m² dans un quartier calme et sécurisé.",
      isVerified: true,
      rating: 4.5,
      reviewCount: 12,
      bedrooms: 0,
      bathrooms: 0,
      area: "1000m²",
    },
  ];

  return (
    <div className="bg-gray-50">
      <Hero />

      {/* How It Works */}
      <HowItWorks />

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Nos Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comment pouvons-nous vous aider ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Des solutions immobilières complètes pour tous vos besoins en RDC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Featured Properties */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                À la une
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Propriétés Recommandées
              </h2>
              <p className="text-muted-foreground text-lg">
                Découvrez notre sélection de biens vérifiés
              </p>
            </div>
            <Link href="/biens">
              <Button variant="outline" className="hidden md:flex gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/biens">
              <Button className="w-full max-w-sm bg-emerald-600 hover:bg-emerald-700">
                Voir toutes les propriétés
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <PopularCities />

      {/* Student Housing CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <GraduationCap className="h-8 w-8" />
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                  Pour les étudiants
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Vous êtes étudiant ?
              </h2>
              <p className="text-white/90 text-lg max-w-xl mb-6">
                Trouvez un logement sécurisé près de votre université. 
                Tous nos propriétaires sont vérifiés pour éviter les arnaques.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Shield className="h-5 w-5" />
                <span>100% des propriétaires vérifiés</span>
              </div>
            </div>
            <Link href="/etudiants">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 gap-2">
                Trouver un logement étudiant
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Trust Section */}
      <TrustSection />

      {/* App Download CTA */}
      <section className="py-16 md:py-20 bg-emerald-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Téléchargez notre application
              </h2>
              <p className="text-emerald-100 text-lg max-w-xl mb-6">
                Recherchez, comparez et contactez les propriétaires directement depuis votre téléphone.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-gray-100 gap-2">
                  <Smartphone className="h-5 w-5" />
                  App Store
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                  <Download className="h-5 w-5" />
                  Google Play
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-64 h-[500px] bg-gradient-to-b from-emerald-700 to-emerald-800 rounded-3xl border-8 border-emerald-700 shadow-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <Smartphone className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-emerald-300">Bientôt disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
