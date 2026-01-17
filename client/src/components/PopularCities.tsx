import { Link } from "wouter";
import { MapPin, ArrowRight, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CityData {
  id: string;
  name: string;
  province: string;
  propertyCount: number;
  image: string;
  featured?: boolean;
}

const popularCities: CityData[] = [
  {
    id: "kinshasa",
    name: "Kinshasa",
    province: "Kinshasa",
    propertyCount: 2450,
    image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600&h=400&fit=crop",
    featured: true
  },
  {
    id: "lubumbashi",
    name: "Lubumbashi",
    province: "Haut-Katanga",
    propertyCount: 1280,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
    featured: true
  },
  {
    id: "goma",
    name: "Goma",
    province: "Nord-Kivu",
    propertyCount: 756,
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop"
  },
  {
    id: "bukavu",
    name: "Bukavu",
    province: "Sud-Kivu",
    propertyCount: 534,
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&h=400&fit=crop"
  },
  {
    id: "kisangani",
    name: "Kisangani",
    province: "Tshopo",
    propertyCount: 412,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop"
  },
  {
    id: "matadi",
    name: "Matadi",
    province: "Kongo-Central",
    propertyCount: 298,
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&h=400&fit=crop"
  }
];

interface PopularCitiesProps {
  className?: string;
}

export default function PopularCities({ className }: PopularCitiesProps) {
  const featuredCities = popularCities.filter(c => c.featured);
  const otherCities = popularCities.filter(c => !c.featured);

  return (
    <section className={cn("py-16 md:py-24 bg-gray-50", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Explorer la RDC
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Villes populaires
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Découvrez les meilleures opportunités immobilières dans les grandes villes congolaises
            </p>
          </div>
          <Link href="/biens">
            <span className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:underline mt-4 md:mt-0">
              Voir toutes les villes
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Featured cities - Large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featuredCities.map((city) => (
            <Link key={city.id} href={`/biens?ville=${city.id}`}>
              <div className="group relative h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    {city.province}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {city.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/90">
                    <Building2 className="h-4 w-4" />
                    <span>{city.propertyCount.toLocaleString()} propriétés</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Other cities - Smaller cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {otherCities.map((city) => (
            <Link key={city.id} href={`/biens?ville=${city.id}`}>
              <div className="group relative h-40 md:h-48 rounded-xl overflow-hidden cursor-pointer">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white mb-0.5">
                    {city.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {city.propertyCount.toLocaleString()} propriétés
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/biens">
            <span className="inline-flex items-center gap-2 text-primary font-medium">
              Voir toutes les villes
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
