import { useState } from "react";
import { useRoute, Link } from "wouter";
import { 
  MapPin, Bed, Bath, Maximize, Calendar, Share2, Heart, Phone, 
  Mail, MessageCircle, CheckCircle, Shield, Star, ArrowLeft,
  Home, Car, Wifi, Utensils, Wind, Tv, Droplet, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PropertyCard from "@/components/PropertyCard";
import VerifiedBadge from "@/components/VerifiedBadge";
import RatingStars from "@/components/RatingStars";

// Mock property data - will be replaced with API call
const property = {
  id: "1",
  title: "Maison moderne dans quartier résidentiel",
  price: 150000,
  location: "Gombe, Kinshasa",
  city: "Kinshasa",
  type: "Maison",
  status: "À vendre",
  bedrooms: 4,
  bathrooms: 3,
  area: 250,
  yearBuilt: 2020,
  description: "Magnifique maison moderne située dans le quartier prisé de Gombe. Cette propriété offre un cadre de vie exceptionnel avec des finitions haut de gamme et une architecture contemporaine. Idéale pour une famille recherchant confort et élégance.",
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
  ],
  features: [
    "Cuisine équipée",
    "Parking privé (2 places)",
    "Jardin",
    "Sécurité 24/7",
    "Générateur",
    "Eau courante",
    "Climatisation",
    "Internet haut débit",
  ],
  amenities: [
    { icon: Car, label: "Parking" },
    { icon: Wifi, label: "Internet" },
    { icon: Wind, label: "Climatisation" },
    { icon: Droplet, label: "Eau courante" },
    { icon: Zap, label: "Générateur" },
    { icon: Shield, label: "Sécurité 24/7" },
  ],
  owner: {
    name: "Jean Mukendi",
    phone: "+243 812 345 678",
    email: "jean.mukendi@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    verified: true,
    rating: 4.8,
    reviewCount: 24,
  },
  postedDate: "2026-01-15",
  views: 1250,
  isVerified: true,
};

const similarProperties = [
  {
    id: "2",
    title: "Villa avec piscine",
    price: 200000,
    location: "Gombe, Kinshasa",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    isVerified: true,
    rating: 4.9,
    reviewCount: 18,
  },
  {
    id: "3",
    title: "Appartement moderne",
    price: 85000,
    location: "Gombe, Kinshasa",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    isVerified: true,
    rating: 4.7,
    reviewCount: 32,
  },
  {
    id: "4",
    title: "Maison familiale",
    price: 130000,
    location: "Ngaliema, Kinshasa",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400",
    bedrooms: 4,
    bathrooms: 2,
    area: 200,
    isVerified: false,
    rating: 4.5,
    reviewCount: 15,
  },
];

export default function PropertyDetail() {
  const [, params] = useRoute("/biens/:id");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <Link href="/biens">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour aux résultats
            </Button>
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <img
                src={property.images[selectedImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {property.isVerified && <VerifiedBadge />}
                <Badge className="bg-emerald-600 hover:bg-emerald-700">
                  {property.status}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="md:col-span-1 grid grid-cols-4 md:grid-cols-1 gap-4">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-emerald-600" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Price */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-600">
                    ${property.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">${Math.round(property.price / property.area)}/m²</div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Bed className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-500">Chambres</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Bath className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-500">Salles de bain</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Maximize className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold">{property.area} m²</div>
                    <div className="text-sm text-gray-500">Surface</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold">{property.yearBuilt}</div>
                    <div className="text-sm text-gray-500">Année</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Card className="p-6">
              <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="features">Caractéristiques</TabsTrigger>
                  <TabsTrigger value="location">Localisation</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">À propos de ce bien</h3>
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Type de propriété</h4>
                    <Badge variant="secondary">{property.type}</Badge>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Équipements</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <amenity.icon className="h-5 w-5 text-emerald-600" />
                          <span className="text-gray-700">{amenity.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Caractéristiques</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-emerald-600" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="location" className="mt-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Localisation</h3>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-gray-500">
                        <MapPin className="h-12 w-12 mx-auto mb-2" />
                        <p>Carte interactive à venir</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      <strong>Adresse:</strong> {property.location}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Owner Card */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={property.owner.avatar}
                  alt={property.owner.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{property.owner.name}</h3>
                    {property.owner.verified && (
                      <Shield className="h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <RatingStars rating={property.owner.rating} size="sm" />
                    <span className="text-sm text-gray-500">
                      ({property.owner.reviewCount} avis)
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700">
                  <Phone className="h-4 w-4" />
                  Appeler
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
              </div>
            </Card>

            {/* Contact Form */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Demande d'information</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="Votre nom" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="+243 ..." />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Je suis intéressé par ce bien..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Envoyer
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Propriétés similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                {...prop}
                status="À vendre"
                isVerified={prop.isVerified}
                rating={prop.rating}
                reviewCount={prop.reviewCount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
