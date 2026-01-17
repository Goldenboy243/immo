import { Link } from "wouter";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  type: string;
  status: string;
  description: string;
}

export default function PropertyCard({ 
  id, 
  image, 
  title, 
  price, 
  location, 
  type, 
  status,
  description 
}: PropertyCardProps) {
  return (
    <Link href={`/biens/${id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white" data-testid={`card-property-${id}`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <Badge 
              className="bg-white/95 text-foreground hover:bg-white font-semibold"
              data-testid={`badge-status-${id}`}
            >
              {status}
            </Badge>
            <Badge 
              className="bg-gradient-to-r from-primary to-[#8B5CF6] text-white border-0 font-bold text-base px-3 py-1"
              data-testid={`badge-price-${id}`}
            >
              {price}
            </Badge>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1" data-testid={`text-title-${id}`}>
            {title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span data-testid={`text-location-${id}`} className="line-clamp-1">{location}</span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>

          <div className="flex items-center gap-4 pt-3 border-t">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Bed className="h-4 w-4" />
              <span>3</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Bath className="h-4 w-4" />
              <span>2</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Square className="h-4 w-4" />
              <span>150m²</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
