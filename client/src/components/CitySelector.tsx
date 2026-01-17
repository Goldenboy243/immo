import { useState } from "react";
import { MapPin, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface City {
  id: string;
  name: string;
  province: string;
  popular?: boolean;
}

export const drcCities: City[] = [
  { id: "kinshasa", name: "Kinshasa", province: "Kinshasa", popular: true },
  { id: "lubumbashi", name: "Lubumbashi", province: "Haut-Katanga", popular: true },
  { id: "goma", name: "Goma", province: "Nord-Kivu", popular: true },
  { id: "bukavu", name: "Bukavu", province: "Sud-Kivu", popular: true },
  { id: "kisangani", name: "Kisangani", province: "Tshopo", popular: true },
  { id: "mbuji-mayi", name: "Mbuji-Mayi", province: "Kasaï-Oriental" },
  { id: "kananga", name: "Kananga", province: "Kasaï-Central" },
  { id: "likasi", name: "Likasi", province: "Haut-Katanga" },
  { id: "kolwezi", name: "Kolwezi", province: "Lualaba" },
  { id: "matadi", name: "Matadi", province: "Kongo-Central" },
  { id: "kikwit", name: "Kikwit", province: "Kwilu" },
  { id: "uvira", name: "Uvira", province: "Sud-Kivu" },
  { id: "bunia", name: "Bunia", province: "Ituri" },
  { id: "kalemie", name: "Kalemie", province: "Tanganyika" },
  { id: "beni", name: "Beni", province: "Nord-Kivu" },
];

interface CitySelectorProps {
  value: City | null;
  onChange: (city: City | null) => void;
  placeholder?: string;
  variant?: "default" | "minimal" | "hero";
  className?: string;
}

export default function CitySelector({ 
  value, 
  onChange, 
  placeholder = "Sélectionner une ville",
  variant = "default",
  className 
}: CitySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCities = drcCities.filter(city =>
    city.name.toLowerCase().includes(search.toLowerCase()) ||
    city.province.toLowerCase().includes(search.toLowerCase())
  );

  const popularCities = filteredCities.filter(c => c.popular);
  const otherCities = filteredCities.filter(c => !c.popular);

  if (variant === "hero") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all",
              className
            )}
          >
            <MapPin className="h-5 w-5" />
            <span className="font-medium">
              {value?.name || placeholder}
            </span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une ville..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {popularCities.length > 0 && (
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                  Villes populaires
                </p>
                {popularCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      onChange(city);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left hover:bg-muted transition-colors",
                      value?.id === city.id && "bg-primary/10 text-primary"
                    )}
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{city.name}</p>
                      <p className="text-xs text-muted-foreground">{city.province}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {otherCities.length > 0 && (
              <div className="p-2 border-t">
                <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                  Autres villes
                </p>
                {otherCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      onChange(city);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left hover:bg-muted transition-colors",
                      value?.id === city.id && "bg-primary/10 text-primary"
                    )}
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{city.name}</p>
                      <p className="text-xs text-muted-foreground">{city.province}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            {value ? value.name : placeholder}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une ville..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filteredCities.map((city) => (
            <button
              key={city.id}
              onClick={() => {
                onChange(city);
                setOpen(false);
                setSearch("");
              }}
              className={cn(
                "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left hover:bg-muted transition-colors",
                value?.id === city.id && "bg-primary/10 text-primary"
              )}
            >
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">{city.name}</p>
                <p className="text-xs text-muted-foreground">{city.province}</p>
              </div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
