import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";

import house1 from "@assets/stock_images/luxury_modern_house__fa3f4f9e.jpg";
import house2 from "@assets/stock_images/luxury_modern_house__6f277bde.jpg";
import house3 from "@assets/stock_images/luxury_modern_house__a74684b9.jpg";
import house4 from "@assets/stock_images/luxury_modern_house__f3e6569e.jpg";
import apartment1 from "@assets/stock_images/modern_apartment_int_41935162.jpg";
import apartment2 from "@assets/stock_images/modern_apartment_int_c8cd17ed.jpg";
import apartment3 from "@assets/stock_images/modern_apartment_int_9c6252d0.jpg";
import land1 from "@assets/stock_images/empty_land_plot_for__b52bf2bf.jpg";
import land2 from "@assets/stock_images/empty_land_plot_for__9b92e56d.jpg";

export default function Properties() {
  const [location] = useLocation();
  const [statusFilter, setStatusFilter] = useState("tous");
  const [typeFilter, setTypeFilter] = useState("tous");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (status === "vente" || status === "location") {
      setStatusFilter(status);
    }
  }, [location]);

  const allProperties = [
    {
      id: "1",
      image: house1,
      title: "Villa Moderne de Luxe",
      price: "$350,000",
      location: "Lubumbashi",
      type: "maison",
      status: "vente",
      statusLabel: "À vendre",
      description: "Belle villa moderne avec 4 chambres, jardin spacieux et piscine privée.",
    },
    {
      id: "2",
      image: house2,
      title: "Maison Familiale Spacieuse",
      price: "$280,000",
      location: "Lubumbashi",
      type: "maison",
      status: "vente",
      statusLabel: "À vendre",
      description: "Maison familiale de 5 chambres avec double garage et grand terrain.",
    },
    {
      id: "3",
      image: house3,
      title: "Villa avec Vue Panoramique",
      price: "$420,000",
      location: "Lubumbashi",
      type: "maison",
      status: "vente",
      statusLabel: "À vendre",
      description: "Villa de standing avec vue exceptionnelle, 6 chambres et équipements haut de gamme.",
    },
    {
      id: "4",
      image: house4,
      title: "Maison de Campagne",
      price: "$1,200/mois",
      location: "Lubumbashi",
      type: "maison",
      status: "location",
      statusLabel: "À louer",
      description: "Charmante maison de campagne avec 3 chambres, idéale pour les familles.",
    },
    {
      id: "5",
      image: apartment1,
      title: "Appartement Moderne Centre-Ville",
      price: "$800/mois",
      location: "Lubumbashi",
      type: "appartement",
      status: "location",
      statusLabel: "À louer",
      description: "Appartement moderne de 3 chambres en plein centre-ville, entièrement meublé.",
    },
    {
      id: "6",
      image: apartment2,
      title: "Studio Lumineux",
      price: "$450/mois",
      location: "Lubumbashi",
      type: "appartement",
      status: "location",
      statusLabel: "À louer",
      description: "Studio moderne et lumineux, parfait pour célibataire ou étudiant.",
    },
    {
      id: "7",
      image: apartment3,
      title: "Appartement de Standing",
      price: "$180,000",
      location: "Lubumbashi",
      type: "appartement",
      status: "vente",
      statusLabel: "À vendre",
      description: "Appartement haut de gamme de 4 chambres avec terrasse et parking.",
    },
    {
      id: "8",
      image: land1,
      title: "Terrain Résidentiel",
      price: "$120,000",
      location: "Lubumbashi",
      type: "terrain",
      status: "vente",
      statusLabel: "À vendre",
      description: "Grand terrain résidentiel de 1000m² dans un quartier calme et sécurisé.",
    },
    {
      id: "9",
      image: land2,
      title: "Terrain Commercial",
      price: "$250,000",
      location: "Lubumbashi",
      type: "terrain",
      status: "vente",
      statusLabel: "À vendre",
      description: "Terrain commercial stratégiquement situé, idéal pour projet d'entreprise.",
    },
  ];

  const filteredProperties = allProperties.filter((property) => {
    const matchesStatus = statusFilter === "tous" || property.status === statusFilter;
    const matchesType = typeFilter === "tous" || property.type === typeFilter;
    return matchesStatus && matchesType;
  });

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
          <PropertyFilter
            statusFilter={statusFilter}
            typeFilter={typeFilter}
            onStatusChange={setStatusFilter}
            onTypeChange={setTypeFilter}
          />
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                image={property.image}
                title={property.title}
                price={property.price}
                location={property.location}
                type={property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                status={property.statusLabel}
                description={property.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl">
            <p className="text-muted-foreground text-lg">Aucune propriété ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}
