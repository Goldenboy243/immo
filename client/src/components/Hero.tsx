import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Home, Building2, GraduationCap, Hotel, Shield, Users, BadgeCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Category = "immobilier" | "etudiant" | "hotel";

export default function Hero() {
  const [activeCategory, setActiveCategory] = useState<Category>("immobilier");

  const categoryContent = {
    immobilier: {
      title: "Trouvez votre propriété idéale",
      subtitle: "en République Démocratique du Congo",
      description: "Des milliers de biens vérifiés - Maisons, Appartements, Terrains",
      searchPlaceholder: "Rechercher par ville, quartier...",
    },
    etudiant: {
      title: "Logements étudiants sécurisés",
      subtitle: "près de votre université",
      description: "Chambres et studios vérifiés pour étudiants - Sans arnaque",
      searchPlaceholder: "Rechercher près d'une université...",
    },
    hotel: {
      title: "Réservez votre hébergement",
      subtitle: "partout en RDC",
      description: "Hôtels, auberges et locations courte durée",
      searchPlaceholder: "Où allez-vous ?",
    },
  };

  const content = categoryContent[activeCategory];

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1.5">
            <button
              onClick={() => setActiveCategory("immobilier")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === "immobilier"
                  ? "bg-white text-emerald-800 shadow-lg"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Home className="h-4 w-4" />
              Immobilier
            </button>
            <button
              onClick={() => setActiveCategory("etudiant")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === "etudiant"
                  ? "bg-white text-amber-700 shadow-lg"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Étudiants
            </button>
            <button
              onClick={() => setActiveCategory("hotel")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === "hotel"
                  ? "bg-white text-blue-700 shadow-lg"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Hotel className="h-4 w-4" />
              Hôtels
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {content.title}<br />
            <span className="text-emerald-300">{content.subtitle}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder={content.searchPlaceholder}
                  className="pl-12 h-14 text-lg border-gray-200 focus-visible:ring-emerald-500 rounded-xl"
                />
              </div>
              
              <Select defaultValue="kinshasa">
                <SelectTrigger className="w-full md:w-[180px] h-14 border-gray-200 rounded-xl">
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kinshasa">Kinshasa</SelectItem>
                  <SelectItem value="lubumbashi">Lubumbashi</SelectItem>
                  <SelectItem value="goma">Goma</SelectItem>
                  <SelectItem value="bukavu">Bukavu</SelectItem>
                  <SelectItem value="kisangani">Kisangani</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white h-14 px-8 gap-2 rounded-xl text-lg"
              >
                <Search className="h-5 w-5" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
        
        {/* Quick Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link href="/biens?status=vente">
            <Button 
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-emerald-800 backdrop-blur-sm"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Acheter
            </Button>
          </Link>
          <Link href="/biens?status=location">
            <Button 
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-emerald-800 backdrop-blur-sm"
            >
              Louer
            </Button>
          </Link>
          <Link href="/etudiants">
            <Button 
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-emerald-800 backdrop-blur-sm"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Logement étudiant
            </Button>
          </Link>
          <Link href="/hotels">
            <Button 
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-emerald-800 backdrop-blur-sm"
            >
              <Hotel className="h-4 w-4 mr-2" />
              Hôtels
            </Button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-emerald-400" />
            <span className="text-sm">Propriétaires vérifiés</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            <span className="text-sm">Transactions sécurisées</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-400" />
            <span className="text-sm">+10,000 utilisateurs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
