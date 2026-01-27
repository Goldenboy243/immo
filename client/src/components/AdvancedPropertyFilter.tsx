import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export interface FilterState {
  search: string;
  city: string;
  status: string;
  type: string;
  priceMin: number;
  priceMax: number;
  bedrooms: string;
  bathrooms: string;
}

interface AdvancedPropertyFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const cities = [
  "Toutes les villes",
  "Kinshasa",
  "Lubumbashi",
  "Goma",
  "Bukavu",
  "Kisangani",
  "Kananga",
  "Matadi",
  "Kolwezi",
];

export default function AdvancedPropertyFilter({
  filters,
  onFilterChange,
  onReset,
}: AdvancedPropertyFilterProps) {
  const [priceRange, setPriceRange] = useState([filters.priceMin, filters.priceMax]);

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    onFilterChange({ ...filters, priceMin: values[0], priceMax: values[1] });
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'search' && value) return true;
    if (key === 'city' && value !== 'Toutes les villes') return true;
    if (key === 'status' && value !== 'tous') return true;
    if (key === 'type' && value !== 'tous') return true;
    if (key === 'priceMin' && value > 0) return true;
    if (key === 'priceMax' && value < 1000000) return true;
    if (key === 'bedrooms' && value !== 'tous') return true;
    if (key === 'bathrooms' && value !== 'tous') return true;
    return false;
  }).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Rechercher par titre, localisation..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 relative">
              <SlidersHorizontal className="h-4 w-4" />
              Filtres
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-emerald-600">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtres avancés</SheetTitle>
              <SheetDescription>
                Affinez votre recherche de propriétés
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              {/* City Filter */}
              <div>
                <Label>Ville</Label>
                <Select value={filters.city} onValueChange={(value) => updateFilter('city', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Sélectionner une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div>
                <Label>Statut</Label>
                <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les statuts</SelectItem>
                    <SelectItem value="vente">À vendre</SelectItem>
                    <SelectItem value="location">À louer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div>
                <Label>Type de propriété</Label>
                <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Filtrer par type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les types</SelectItem>
                    <SelectItem value="maison">Maison</SelectItem>
                    <SelectItem value="appartement">Appartement</SelectItem>
                    <SelectItem value="terrain">Terrain</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <Label>Fourchette de prix</Label>
                <div className="mt-4 mb-6">
                  <Slider
                    min={0}
                    max={1000000}
                    step={10000}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <Label>Chambres</Label>
                <Select value={filters.bedrooms} onValueChange={(value) => updateFilter('bedrooms', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Nombre de chambres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Toutes</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bathrooms */}
              <div>
                <Label>Salles de bain</Label>
                <Select value={filters.bathrooms} onValueChange={(value) => updateFilter('bathrooms', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Nombre de salles de bain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Toutes</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={onReset}
              >
                <X className="h-4 w-4 mr-2" />
                Réinitialiser les filtres
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Recherche: {filters.search}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter('search', '')}
              />
            </Badge>
          )}
          {filters.city !== 'Toutes les villes' && (
            <Badge variant="secondary" className="gap-1">
              {filters.city}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter('city', 'Toutes les villes')}
              />
            </Badge>
          )}
          {filters.status !== 'tous' && (
            <Badge variant="secondary" className="gap-1">
              {filters.status === 'vente' ? 'À vendre' : 'À louer'}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter('status', 'tous')}
              />
            </Badge>
          )}
          {filters.type !== 'tous' && (
            <Badge variant="secondary" className="gap-1">
              {filters.type}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter('type', 'tous')}
              />
            </Badge>
          )}
          {(filters.priceMin > 0 || filters.priceMax < 1000000) && (
            <Badge variant="secondary" className="gap-1">
              ${filters.priceMin.toLocaleString()} - ${filters.priceMax.toLocaleString()}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setPriceRange([0, 1000000]);
                  onFilterChange({ ...filters, priceMin: 0, priceMax: 1000000 });
                }}
              />
            </Badge>
          )}
          {filters.bedrooms !== 'tous' && (
            <Badge variant="secondary" className="gap-1">
              {filters.bedrooms}+ chambres
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter('bedrooms', 'tous')}
              />
            </Badge>
          )}
          {filters.bathrooms !== 'tous' && (
            <Badge variant="secondary" className="gap-1">
              {filters.bathrooms}+ salles de bain
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter('bathrooms', 'tous')}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filters.city === 'Kinshasa' ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateFilter('city', filters.city === 'Kinshasa' ? 'Toutes les villes' : 'Kinshasa')}
          className={filters.city === 'Kinshasa' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
        >
          Kinshasa
        </Button>
        <Button
          variant={filters.city === 'Lubumbashi' ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateFilter('city', filters.city === 'Lubumbashi' ? 'Toutes les villes' : 'Lubumbashi')}
          className={filters.city === 'Lubumbashi' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
        >
          Lubumbashi
        </Button>
        <Button
          variant={filters.city === 'Goma' ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateFilter('city', filters.city === 'Goma' ? 'Toutes les villes' : 'Goma')}
          className={filters.city === 'Goma' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
        >
          Goma
        </Button>
        <Button
          variant={filters.status === 'vente' ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateFilter('status', filters.status === 'vente' ? 'tous' : 'vente')}
          className={filters.status === 'vente' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
        >
          À vendre
        </Button>
        <Button
          variant={filters.status === 'location' ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateFilter('status', filters.status === 'location' ? 'tous' : 'location')}
          className={filters.status === 'location' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
        >
          À louer
        </Button>
      </div>
    </div>
  );
}
