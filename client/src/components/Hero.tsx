import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import heroImage from "@assets/stock_images/luxury_modern_house__4b7a1d32.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 to-purple-50">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight" data-testid="text-hero-title">
            Trouvez votre propriété idéale<br />
            <span className="bg-gradient-to-r from-primary to-[#8B5CF6] bg-clip-text text-transparent">à Lubumbashi</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Des milliers de biens disponibles - Maisons, Appartements, Terrains
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Ville, quartier ou zone..." 
                  className="pl-10 h-12 border-0 bg-muted/30 focus-visible:ring-primary"
                  data-testid="input-search-location"
                />
              </div>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-[#8B5CF6] hover:opacity-90 text-white h-12 px-8 gap-2"
                data-testid="button-search"
              >
                <Search className="h-5 w-5" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/biens?status=vente">
            <Button 
              variant="outline"
              className="bg-white hover:bg-primary hover:text-white transition-all"
              data-testid="button-voir-vente"
            >
              Acheter
            </Button>
          </Link>
          <Link href="/biens?status=location">
            <Button 
              variant="outline"
              className="bg-white hover:bg-primary hover:text-white transition-all"
              data-testid="button-voir-location"
            >
              Louer
            </Button>
          </Link>
          <Link href="/vendre">
            <Button 
              variant="outline"
              className="bg-white hover:bg-primary hover:text-white transition-all"
            >
              Vendre
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
