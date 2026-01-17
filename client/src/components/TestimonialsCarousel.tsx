import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
  category: "achat" | "location" | "etudiant" | "hotel";
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Marie Kalombo",
    role: "Propriétaire",
    location: "Kinshasa",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    content: "J'ai vendu mon appartement en moins de 3 semaines grâce à Safari.cd. Le processus était simple et les acheteurs étaient sérieux. Je recommande vivement!",
    category: "achat"
  },
  {
    id: "2",
    name: "Patrick Mutombo",
    role: "Étudiant",
    location: "Lubumbashi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    content: "En tant qu'étudiant venant de Kinshasa, j'avais peur de tomber sur des arnaqueurs. Avec Safari.cd, j'ai trouvé une chambre vérifiée près de l'université en toute sécurité.",
    category: "etudiant"
  },
  {
    id: "3",
    name: "Claudine Mwamba",
    role: "Femme d'affaires",
    location: "Goma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4,
    content: "Je voyage souvent pour le travail. Safari.cd me permet de réserver des hôtels et logements temporaires facilement dans différentes villes de la RDC.",
    category: "hotel"
  },
  {
    id: "4",
    name: "Jean-Pierre Kabila",
    role: "Locataire",
    location: "Bukavu",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    content: "Finalement une plateforme qui vérifie les propriétaires! J'ai évité plusieurs arnaques avant de découvrir Safari.cd. Mon appartement actuel est parfait.",
    category: "location"
  }
];

interface TestimonialsCarouselProps {
  className?: string;
}

export default function TestimonialsCarousel({ className }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className={cn("py-16 md:py-24 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900", className)}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-emerald-200 rounded-full text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-emerald-100/80 max-w-2xl mx-auto text-lg">
            Des milliers de Congolais font confiance à Safari.cd pour leurs besoins immobiliers
          </p>
        </div>

        <div className="relative">
          {/* Main testimonial card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative">
              <Quote className="absolute top-6 left-6 h-12 w-12 text-emerald-100" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < testimonials[currentIndex].rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                  "{testimonials[currentIndex].content}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="h-14 w-14 rounded-full object-cover ring-4 ring-emerald-100"
                  />
                  <div>
                    <h4 className="font-bold text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-muted-foreground">
                      {testimonials[currentIndex].role} · {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 w-12 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === currentIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 w-12 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { label: "Utilisateurs satisfaits", value: "10K+" },
            { label: "Propriétés listées", value: "5,000+" },
            { label: "Villes couvertes", value: "15+" },
            { label: "Note moyenne", value: "4.8/5" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-emerald-200 text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
