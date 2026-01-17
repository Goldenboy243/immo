import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, ChevronDown, LogIn, UserPlus, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CategoryTabs, { Category } from "./CategoryTabs";
import CitySelector, { City, drcCities } from "./CitySelector";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("immobilier");
  const [selectedCity, setSelectedCity] = useState<City | null>(drcCities[0]);

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/biens", label: "Explorer" },
    { path: "/etudiants", label: "Étudiants" },
    { path: "/hotels", label: "Hôtels" },
    { path: "/publier", label: "Publier une annonce" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900 leading-tight">safari</span>
              <span className="text-[10px] text-emerald-600 font-medium tracking-wider">.cd</span>
            </div>
          </Link>

          {/* Category Tabs - Desktop */}
          <nav className="hidden lg:flex items-center">
            <CategoryTabs 
              activeCategory={activeCategory}
              onChange={setActiveCategory}
              variant="compact"
            />
          </nav>

          {/* City Selector - Desktop */}
          <div className="hidden lg:flex items-center">
            <CitySelector
              value={selectedCity}
              onChange={setSelectedCity}
              className="min-w-[180px]"
            />
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist button - Desktop */}
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden md:flex text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
            >
              <Heart className="h-5 w-5" />
            </Button>

            {/* Notifications - Desktop */}
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden md:flex text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>

            {/* User Dropdown - Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="hidden md:flex items-center gap-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <User className="h-4 w-4" />
                  <span>Compte</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer">
                  <LogIn className="mr-2 h-4 w-4" />
                  Se connecter
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Créer un compte
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-emerald-600">
                  Publier une annonce
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            {/* Mobile Category Tabs */}
            <div className="mb-4">
              <CategoryTabs 
                activeCategory={activeCategory}
                onChange={setActiveCategory}
                variant="default"
              />
            </div>

            {/* Mobile City Selector */}
            <div className="mb-4 px-2">
              <CitySelector
                value={selectedCity}
                onChange={setSelectedCity}
                className="w-full"
              />
            </div>

            {/* Mobile Nav Links */}
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      location === link.path 
                        ? "bg-emerald-50 text-emerald-700" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 px-2">
              <Button variant="outline" className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Se connecter
              </Button>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Créer un compte
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
