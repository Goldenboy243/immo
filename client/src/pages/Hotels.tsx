import { useState } from "react";
import { 
  Hotel, 
  MapPin, 
  Search, 
  Calendar,
  Users,
  Star,
  Wifi,
  Car,
  UtensilsCrossed,
  Dumbbell,
  Waves,
  CheckCircle,
  ArrowRight
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

const hotelListings = [
  {
    id: "h1",
    name: "Grand Hôtel Kinshasa",
    type: "Hôtel 5 étoiles",
    stars: 5,
    price: "$180/nuit",
    location: "Gombe, Kinshasa",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 156,
    amenities: ["wifi", "piscine", "restaurant", "gym", "parking"],
    isVerified: true,
  },
  {
    id: "h2",
    name: "Lubumbashi Palace",
    type: "Hôtel 4 étoiles",
    stars: 4,
    price: "$120/nuit",
    location: "Centre-ville, Lubumbashi",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    rating: 4.6,
    reviews: 98,
    amenities: ["wifi", "restaurant", "parking"],
    isVerified: true,
  },
  {
    id: "h3",
    name: "Lake Kivu Resort",
    type: "Resort",
    stars: 4,
    price: "$150/nuit",
    location: "Goma, Nord-Kivu",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    rating: 4.9,
    reviews: 87,
    amenities: ["wifi", "piscine", "restaurant", "spa"],
    isVerified: true,
  },
  {
    id: "h4",
    name: "Auberge du Voyageur",
    type: "Auberge",
    stars: 3,
    price: "$45/nuit",
    location: "Bukavu Centre",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&h=400&fit=crop",
    rating: 4.3,
    reviews: 52,
    amenities: ["wifi", "petit-dejeuner"],
    isVerified: true,
  },
  {
    id: "h5",
    name: "Business Hotel Kisangani",
    type: "Hôtel 3 étoiles",
    stars: 3,
    price: "$85/nuit",
    location: "Kisangani",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
    rating: 4.4,
    reviews: 34,
    amenities: ["wifi", "restaurant", "parking"],
    isVerified: true,
  },
  {
    id: "h6",
    name: "Appartement Meublé Premium",
    type: "Appartement",
    stars: 0,
    price: "$95/nuit",
    location: "Ngaliema, Kinshasa",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 28,
    amenities: ["wifi", "cuisine", "parking"],
    isVerified: true,
  },
];

export default function Hotels() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi": return <Wifi className="h-3.5 w-3.5" />;
      case "piscine": return <Waves className="h-3.5 w-3.5" />;
      case "restaurant": return <UtensilsCrossed className="h-3.5 w-3.5" />;
      case "gym": return <Dumbbell className="h-3.5 w-3.5" />;
      case "parking": return <Car className="h-3.5 w-3.5" />;
      case "spa": return <Waves className="h-3.5 w-3.5" />;
      case "petit-dejeuner": return <UtensilsCrossed className="h-3.5 w-3.5" />;
      case "cuisine": return <UtensilsCrossed className="h-3.5 w-3.5" />;
      default: return null;
    }
  };

  const renderStars = (count: number) => {
    if (count === 0) return null;
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <Hotel className="h-5 w-5" />
              <span className="font-medium">Hôtels & Séjours en RDC</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Réservez votre<br />
              <span className="text-blue-200">séjour parfait</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Hôtels, auberges, appartements meublés et plus encore.
              Voyagez à travers la RDC en toute tranquillité.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Destination</label>
                  <CitySelector
                    value={selectedCity}
                    onChange={setSelectedCity}
                    placeholder="Où allez-vous ?"
                    className="w-full h-12"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Arrivée</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Départ</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Voyageurs</label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Personnes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 personne</SelectItem>
                      <SelectItem value="2">2 personnes</SelectItem>
                      <SelectItem value="3">3 personnes</SelectItem>
                      <SelectItem value="4">4+ personnes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <Search className="h-5 w-5" />
                    Rechercher
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Filtrer:</span>
            <Button variant="outline" size="sm" className="rounded-full">
              Hôtels
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Auberges
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Appartements
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              5 étoiles
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Petit-déjeuner inclus
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Piscine
            </Button>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Hébergements disponibles
              </h2>
              <p className="text-muted-foreground">
                {hotelListings.length} établissements en RDC
              </p>
            </div>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommandés</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelListings.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 right-3 flex justify-between">
                    <div className="flex flex-col gap-2">
                      {hotel.isVerified && (
                        <Badge className="bg-emerald-500 text-white border-0">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Vérifié
                        </Badge>
                      )}
                      <Badge className="bg-blue-600 text-white border-0">
                        {hotel.type}
                      </Badge>
                    </div>
                    <WishlistButton propertyId={hotel.id} size="sm" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/95 text-gray-900 font-bold text-lg px-3 py-1.5">
                      {hotel.price}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {renderStars(hotel.stars)}
                    <RatingStars rating={hotel.rating} count={hotel.reviews} size="sm" showCount />
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {hotel.name}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>{hotel.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <div 
                        key={amenity} 
                        className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-full"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <span className="text-xs text-muted-foreground">
                        +{hotel.amenities.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
              Voir plus d'hébergements
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vous êtes propriétaire d'un hôtel ?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez Safari.cd et atteignez des milliers de voyageurs 
            à la recherche d'hébergement en République Démocratique du Congo.
          </p>
          <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
            Lister votre établissement
          </Button>
        </div>
      </section>
    </div>
  );
}
