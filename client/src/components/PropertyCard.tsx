import { Link } from "wouter";
import { MapPin, Bed, Bath, Square, Heart, Phone, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VerifiedBadge from "./VerifiedBadge";
import RatingStars from "./RatingStars";
import WishlistButton from "./WishlistButton";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  price: string | number;
  location: string;
  type: string;
  status: string;
  statusLabel?: string;
  description?: string;
  isVerified?: boolean;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isPopular?: boolean;
  bedrooms?: number;
  bathrooms?: number;
  area?: string | number;
  ownerAvatar?: string;
  ownerName?: string;
}

export default function PropertyCard({ 
  id, 
  image, 
  title, 
  price, 
  location, 
  type, 
  status,
  statusLabel,
  description,
  isVerified = false,
  rating,
  reviewCount,
  isNew = false,
  isPopular = false,
  bedrooms = 3,
  bathrooms = 2,
  area = "150m²",
  ownerAvatar,
  ownerName,
}: PropertyCardProps) {
  // Format price for display
  const formattedPrice = typeof price === 'number' 
    ? `$${price.toLocaleString()}` 
    : price;
  
  // Format area for display
  const formattedArea = typeof area === 'number'
    ? `${area}m²`
    : area;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white border-0 shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link href={`/biens/${id}`}>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Wishlist Button */}
        <div className="absolute top-3 right-3">
          <WishlistButton propertyId={id} />
        </div>

        {/* Status & Special Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge 
            className={`font-semibold ${
              status === "vente" 
                ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {statusLabel || (status === "vente" ? "À vendre" : "À louer")}
          </Badge>
          {isNew && (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-semibold">
              Nouveau
            </Badge>
          )}
          {isPopular && (
            <Badge className="bg-rose-500 hover:bg-rose-600 text-white font-semibold">
              Populaire
            </Badge>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-gray-900/80 backdrop-blur-sm text-white font-bold text-lg px-3 py-1.5">
            {formattedPrice}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        {/* Verified & Rating Row */}
        <div className="flex items-center justify-between mb-2">
          {isVerified && <VerifiedBadge size="sm" />}
          {rating && <RatingStars rating={rating} reviewCount={reviewCount} size="sm" />}
        </div>

        <Link href={`/biens/${id}`}>
          <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 flex-shrink-0 text-emerald-500" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 py-3 border-t border-b border-gray-100 mb-3">
          {bedrooms > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Bed className="h-4 w-4 text-gray-400" />
              <span>{bedrooms}</span>
            </div>
          )}
          {bathrooms > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Bath className="h-4 w-4 text-gray-400" />
              <span>{bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Square className="h-4 w-4 text-gray-400" />
            <span>{formattedArea}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Phone className="h-4 w-4 mr-1" />
            Appeler
          </Button>
          <Button size="sm" variant="outline" className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
            <MessageCircle className="h-4 w-4 mr-1" />
            Message
          </Button>
        </div>
      </div>
    </Card>
  );
}
