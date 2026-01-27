import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Mock properties data for now (will be replaced with database)
const mockProperties = [
  {
    id: "1",
    title: "Villa Moderne de Luxe",
    description: "Belle villa moderne avec 4 chambres, jardin spacieux et piscine privée.",
    price: 350000,
    priceType: "sale",
    location: "Gombe, Kinshasa",
    city: "Kinshasa",
    type: "maison",
    status: "vente",
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    yearBuilt: 2021,
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"],
    features: ["Piscine", "Jardin", "Parking", "Sécurité 24/7"],
    isVerified: true,
    isNew: true,
    isPopular: false,
    rating: 4.9,
    reviewCount: 15,
    views: 1250,
  },
  {
    id: "2",
    title: "Maison Familiale Spacieuse",
    description: "Maison familiale de 5 chambres avec double garage et grand terrain.",
    price: 280000,
    priceType: "sale",
    location: "Lubumbashi Centre",
    city: "Lubumbashi",
    type: "maison",
    status: "vente",
    bedrooms: 5,
    bathrooms: 3,
    area: 350,
    yearBuilt: 2019,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"],
    features: ["Double garage", "Grand terrain", "Cave"],
    isVerified: true,
    isNew: false,
    isPopular: true,
    rating: 4.7,
    reviewCount: 12,
    views: 890,
  },
  {
    id: "3",
    title: "Villa avec Vue Panoramique",
    description: "Villa de standing avec vue exceptionnelle sur le lac Kivu.",
    price: 420000,
    priceType: "sale",
    location: "Himbi, Goma",
    city: "Goma",
    type: "villa",
    status: "vente",
    bedrooms: 6,
    bathrooms: 4,
    area: 450,
    yearBuilt: 2022,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"],
    features: ["Vue panoramique", "Terrasse", "Piscine à débordement"],
    isVerified: true,
    isNew: true,
    isPopular: true,
    rating: 5.0,
    reviewCount: 20,
    views: 2100,
  },
  {
    id: "4",
    title: "Appartement Moderne Centre-Ville",
    description: "Appartement moderne de 3 chambres en plein centre-ville, entièrement meublé.",
    price: 800,
    priceType: "rent",
    location: "Gombe, Kinshasa",
    city: "Kinshasa",
    type: "appartement",
    status: "location",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    yearBuilt: 2020,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"],
    features: ["Meublé", "Climatisation", "Internet haut débit"],
    isVerified: true,
    isNew: false,
    isPopular: true,
    rating: 4.8,
    reviewCount: 25,
    views: 1560,
  },
  {
    id: "5",
    title: "Studio Lumineux",
    description: "Studio moderne et lumineux, parfait pour célibataire ou étudiant.",
    price: 450,
    priceType: "rent",
    location: "Lubumbashi Centre",
    city: "Lubumbashi",
    type: "studio",
    status: "location",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    yearBuilt: 2018,
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"],
    features: ["Kitchenette", "Eau chaude", "Parking"],
    isVerified: false,
    isNew: false,
    isPopular: false,
    rating: 4.3,
    reviewCount: 10,
    views: 450,
  },
  {
    id: "6",
    title: "Terrain Résidentiel",
    description: "Grand terrain résidentiel de 1000m² dans un quartier calme et sécurisé.",
    price: 120000,
    priceType: "sale",
    location: "Ngaliema, Kinshasa",
    city: "Kinshasa",
    type: "terrain",
    status: "vente",
    bedrooms: 0,
    bathrooms: 0,
    area: 1000,
    yearBuilt: null,
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"],
    features: ["Titre foncier", "Accès goudronné", "Eau et électricité disponibles"],
    isVerified: true,
    isNew: true,
    isPopular: false,
    rating: 4.6,
    reviewCount: 7,
    views: 320,
  },
];

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes

  // Get all properties with filtering
  app.get("/api/properties", (req, res) => {
    try {
      let filtered = [...mockProperties];
      const { search, city, status, type, priceMin, priceMax, bedrooms, bathrooms } = req.query;

      if (search) {
        const searchLower = (search as string).toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }

      if (city && city !== "Toutes les villes") {
        filtered = filtered.filter(p => p.city === city);
      }

      if (status && status !== "tous") {
        filtered = filtered.filter(p => p.status === status);
      }

      if (type && type !== "tous") {
        filtered = filtered.filter(p => p.type === type);
      }

      if (priceMin) {
        filtered = filtered.filter(p => p.price >= Number(priceMin));
      }

      if (priceMax) {
        filtered = filtered.filter(p => p.price <= Number(priceMax));
      }

      if (bedrooms && bedrooms !== "tous") {
        filtered = filtered.filter(p => p.bedrooms >= Number(bedrooms));
      }

      if (bathrooms && bathrooms !== "tous") {
        filtered = filtered.filter(p => p.bathrooms >= Number(bathrooms));
      }

      res.json(filtered);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  // Get single property by ID
  app.get("/api/properties/:id", (req, res) => {
    try {
      const property = mockProperties.find(p => p.id === req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  // Get featured properties
  app.get("/api/properties/featured", (req, res) => {
    try {
      const featured = mockProperties.filter(p => p.isPopular || p.isNew).slice(0, 4);
      res.json(featured);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured properties" });
    }
  });

  // Search properties
  app.get("/api/search", (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.json([]);
      }
      const searchLower = (q as string).toLowerCase();
      const results = mockProperties.filter(p =>
        p.title.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower) ||
        p.city.toLowerCase().includes(searchLower)
      ).slice(0, 10);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Submit inquiry
  app.post("/api/inquiries", (req, res) => {
    try {
      const { propertyId, senderName, senderEmail, senderPhone, message } = req.body;
      
      if (!propertyId || !senderName || !senderEmail || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // In production, this would save to database
      console.log("New inquiry:", { propertyId, senderName, senderEmail, senderPhone, message });
      
      res.json({ success: true, message: "Inquiry sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit inquiry" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
