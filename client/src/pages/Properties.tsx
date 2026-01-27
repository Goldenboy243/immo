import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import PropertyCard from "@/components/PropertyCard";
import AdvancedPropertyFilter, { FilterState } from "@/components/AdvancedPropertyFilter";

// Placeholder images from Unsplash
const house1 = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80";
const house2 = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
const house3 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";
const house4 = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80";
const apartment1 = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80";
const apartment2 = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";
const apartment3 = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80";
const land1 = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80";
const land2 = "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80";

export default function Properties() {
  const [location] = useLocation();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    city: 'Toutes les villes',
    status: 'tous',
    type: 'tous',
    priceMin: 0,
    priceMax: 1000000,
    bedrooms: 'tous',
    bathrooms: 'tous',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (status === "vente" || status === "location") {
      setFilters(prev => ({ ...prev, status }));
    }
  }, [location]);

  const allProperties = [
    {
      id: "1",
      image: house1,
      title: "Villa Moderne de Luxe",
      price: 350000,
      location: "Gombe, Kinshasa",
      city: "Kinshasa",
      type: "maison",
      status: "vente",
      statusLabel: "À vendre",
      description: "Belle villa moderne avec 4 chambres, jardin spacieux et piscine privée.",
      bedrooms: 4,
      bathrooms: 3,
      area: 300,
      isVerified: true,
      rating: 4.9,
      reviewCount: 15,
    },
    {
      id: "2",
      image: house2,
      title: "Maison Familiale Spacieuse",
      price: 280000,
      location: "Lubumbashi Centre",
      city: "Lubumbashi",
      type: "maison",
      status: "vente",
      statusLabel: "À vendre",
      description: "Maison familiale de 5 chambres avec double garage et grand terrain.",
      bedrooms: 5,
      bathrooms: 3,
      area: 350,
      isVerified: true,
      rating: 4.7,
      reviewCount: 12,
    },
    {
      id: "3",
      image: house3,
      title: "Villa avec Vue Panoramique",
      price: 420000,
      location: "Himbi, Goma",
      city: "Goma",
      type: "maison",
      status: "vente",
      statusLabel: "À vendre",
      description: "Villa de standing avec vue exceptionnelle, 6 chambres et équipements haut de gamme.",
      bedrooms: 6,
      bathrooms: 4,
      area: 450,
      isVerified: true,
      rating: 5.0,
      reviewCount: 20,
    },
    {
      id: "4",
      image: house4,
      title: "Maison de Campagne",
      price: 1200,
      location: "Ibanda, Bukavu",
      city: "Bukavu",
      type: "maison",
      status: "location",
      statusLabel: "À louer",
      description: "Charmante maison de campagne avec 3 chambres, idéale pour les familles.",
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      isVerified: false,
      rating: 4.5,
      reviewCount: 8,
    },
    {
      id: "5",
      image: apartment1,
      title: "Appartement Moderne Centre-Ville",
      price: 800,
      location: "Gombe, Kinshasa",
      city: "Kinshasa",
      type: "appartement",
      status: "location",
      statusLabel: "À louer",
      description: "Appartement moderne de 3 chambres en plein centre-ville, entièrement meublé.",
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      isVerified: true,
      rating: 4.8,
      reviewCount: 25,
    },
    {
      id: "6",
      image: apartment2,
      title: "Studio Lumineux",
      price: 450,
      location: "Lubumbashi Centre",
      city: "Lubumbashi",
      type: "appartement",
      status: "location",
      statusLabel: "À louer",
      description: "Studio moderne et lumineux, parfait pour célibataire ou étudiant.",
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      isVerified: false,
      rating: 4.3,
      reviewCount: 10,
    },
    {
      id: "7",
      image: apartment3,
      title: "Appartement de Standing",
      price: 180000,
      location: "Limete, Kinshasa",
      city: "Kinshasa",
      type: "appartement",
      status: "vente",
      statusLabel: "À vendre",
      description: "Appartement haut de gamme de 4 chambres avec terrasse et parking.",
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      isVerified: true,
      rating: 4.9,
      reviewCount: 18,
    },
    {
      id: "8",
      image: land1,
      title: "Terrain Résidentiel",
      price: 120000,
      location: "Ngaliema, Kinshasa",
      city: "Kinshasa",
      type: "terrain",
      status: "vente",
      statusLabel: "À vendre",
      description: "Grand terrain résidentiel de 1000m² dans un quartier calme et sécurisé.",
      bedrooms: 0,
      bathrooms: 0,
      area: 1000,
      isVerified: true,
      rating: 4.6,
      reviewCount: 7,
    },
    {
      id: "9",
      image: land2,
      title: "Terrain Commercial",
      price: 250000,
      location: "Centre-ville, Lubumbashi",
      city: "Lubumbashi",
      type: "terrain",
      status: "vente",
      statusLabel: "À vendre",
      description: "Terrain commercial stratégiquement situé, idéal pour projet d'entreprise.",
      bedrooms: 0,
      bathrooms: 0,
      area: 800,
      isVerified: true,
      rating: 4.8,
      reviewCount: 5,
    },
  ];

  const filteredProperties = allProperties.filter((property) => {
    // Search filter
    const searchLower = filters.search.toLowerCase();
    const matchesSearch = !filters.search || 
      property.title.toLowerCase().includes(searchLower) ||
      property.location.toLowerCase().includes(searchLower) ||
      property.description.toLowerCase().includes(searchLower);
    
    // City filter
    const matchesCity = filters.city === 'Toutes les villes' || property.city === filters.city;
    
    // Status filter
    const matchesStatus = filters.status === "tous" || property.status === filters.status;
    
    // Type filter
    const matchesType = filters.type === "tous" || property.type === filters.type;
    
    // Price filter
    const matchesPrice = property.price >= filters.priceMin && property.price <= filters.priceMax;
    
    // Bedrooms filter
    const matchesBedrooms = filters.bedrooms === 'tous' || property.bedrooms >= parseInt(filters.bedrooms);
    
    // Bathrooms filter
    const matchesBathrooms = filters.bathrooms === 'tous' || property.bathrooms >= parseInt(filters.bathrooms);
    
    return matchesSearch && matchesCity && matchesStatus && matchesType && matchesPrice && matchesBedrooms && matchesBathrooms;
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      city: 'Toutes les villes',
      status: 'tous',
      type: 'tous',
      priceMin: 0,
      priceMax: 1000000,
      bedrooms: 'tous',
      bathrooms: 'tous',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/20 to-background">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-page-title">
            Toutes les Propriétés
          </h1>
          <p className="text-muted-foreground text-lg">
            {filteredProperties.length} bien{filteredProperties.length > 1 ? 's' : ''} disponible{filteredProperties.length > 1 ? 's' : ''} à Lubumbashi
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <AdvancedPropertyFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl">
            <p className="text-muted-foreground text-lg">Aucune propriété ne correspond à vos critères de recherche.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
