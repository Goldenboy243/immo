import { useState } from "react";
import { Link } from "wouter";
import { 
  GraduationCap, 
  Shield, 
  MapPin, 
  Search, 
  CheckCircle, 
  Users, 
  Wifi,
  Car,
  UtensilsCrossed,
  Bed,
  Bath,
  ArrowRight,
  Star,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CitySelector, { City, drcCities } from "@/components/CitySelector";
import WishlistButton from "@/components/WishlistButton";
import RatingStars from "@/components/RatingStars";

const universities = [
  { id: "unikin", name: "Université de Kinshasa (UNIKIN)", city: "Kinshasa" },
  { id: "unilu", name: "Université de Lubumbashi (UNILU)", city: "Lubumbashi" },
  { id: "ulpgl", name: "ULPGL Goma", city: "Goma" },
  { id: "ucb", name: "Université Catholique de Bukavu", city: "Bukavu" },
  { id: "unikis", name: "Université de Kisangani", city: "Kisangani" },
];

const studentListings = [
  {
    id: "s1",
    title: "Chambre meublée près UNIKIN",
    price: "$150/mois",
    location: "Lemba, Kinshasa",
    university: "UNIKIN",
    distance: "5 min à pied",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 24,
    isVerified: true,
    amenities: ["wifi", "cuisine", "securite"],
    type: "Chambre individuelle",
  },
  {
    id: "s2",
    title: "Colocation 3 chambres - Étudiants",
    price: "$100/mois",
    location: "Kampemba, Lubumbashi",
    university: "UNILU",
    distance: "10 min en bus",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    rating: 4.5,
    reviews: 18,
    isVerified: true,
    amenities: ["wifi", "cuisine", "parking"],
    type: "Colocation",
  },
  {
    id: "s3",
    title: "Studio moderne pour étudiant",
    price: "$200/mois",
    location: "Goma Centre",
    university: "ULPGL Goma",
    distance: "15 min à pied",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop",
    rating: 4.9,
    reviews: 31,
    isVerified: true,
    amenities: ["wifi", "cuisine", "securite"],
    type: "Studio",
  },
  {
    id: "s4",
    title: "Chambre chez l'habitant - Famille d'accueil",
    price: "$120/mois",
    location: "Ibanda, Bukavu",
    university: "UCB",
    distance: "8 min à pied",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 15,
    isVerified: true,
    amenities: ["wifi", "repas", "securite"],
    type: "Famille d'accueil",
  },
];

export default function StudentHousing() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<string>("");

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi": return <Wifi className="h-4 w-4" />;
      case "cuisine": return <UtensilsCrossed className="h-4 w-4" />;
      case "parking": return <Car className="h-4 w-4" />;
      case "securite": return <Shield className="h-4 w-4" />;
      case "repas": return <UtensilsCrossed className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <GraduationCap className="h-5 w-5" />
              <span className="font-medium">Logement Étudiant Vérifié</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Trouvez votre logement<br />
              <span className="text-amber-200">près de votre université</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Plus jamais d'arnaque. Tous nos logements sont vérifiés et les propriétaires validés.
              Idéal pour les étudiants voyageant entre les villes de la RDC.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Ville</label>
                  <CitySelector
                    value={selectedCity}
                    onChange={setSelectedCity}
                    placeholder="Choisir une ville"
                    className="w-full h-12"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Université</label>
                  <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Toutes les universités" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((uni) => (
                        <SelectItem key={uni.id} value={uni.id}>
                          {uni.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Type</label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Type de logement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chambre">Chambre individuelle</SelectItem>
                      <SelectItem value="colocation">Colocation</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="famille">Famille d'accueil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white gap-2">
                    <Search className="h-5 w-5" />
                    Rechercher
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-white/90">
              <Shield className="h-5 w-5 text-white" />
              <span className="text-sm font-medium">100% vérifié</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle className="h-5 w-5 text-white" />
              <span className="text-sm font-medium">Propriétaires validés</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Users className="h-5 w-5 text-white" />
              <span className="text-sm font-medium">2000+ étudiants logés</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Anti-arnaque", desc: "Propriétaires vérifiés" },
              { icon: GraduationCap, title: "Près des campus", desc: "Accès facile aux cours" },
              { icon: Users, title: "Colocation", desc: "Partagez les frais" },
              { icon: CheckCircle, title: "Tout inclus", desc: "Wifi, eau, électricité" },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Logements disponibles
              </h2>
              <p className="text-muted-foreground">
                {studentListings.length} logements vérifiés près des universités
              </p>
            </div>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récents</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 right-3 flex justify-between">
                    <div className="flex flex-col gap-2">
                      {listing.isVerified && (
                        <Badge className="bg-emerald-500 text-white border-0">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Vérifié
                        </Badge>
                      )}
                      <Badge className="bg-amber-500 text-white border-0">
                        {listing.type}
                      </Badge>
                    </div>
                    <WishlistButton propertyId={listing.id} size="sm" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/95 text-gray-900 font-bold text-lg px-3 py-1.5">
                      {listing.price}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {listing.university}
                    </Badge>
                    <RatingStars rating={listing.rating} size="sm" />
                  </div>
                  
                  <h3 className="font-bold mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors">
                    {listing.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 text-amber-500" />
                    <span>{listing.location}</span>
                    <span className="text-amber-600 font-medium">• {listing.distance}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-3 border-t">
                    {listing.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-1 text-xs text-muted-foreground">
                        {getAmenityIcon(amenity)}
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button size="lg" className="gap-2 bg-amber-500 hover:bg-amber-600">
              Voir plus de logements
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Safety CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-emerald-900 to-teal-900">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Votre sécurité, notre priorité
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Nous vérifions chaque propriétaire et chaque logement. 
            Fini les arnaques et les courtiers malhonnêtes. 
            Voyagez en toute confiance pour vos études.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-emerald-900 hover:bg-gray-100">
              Comment ça marche ?
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Devenir propriétaire vérifié
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
