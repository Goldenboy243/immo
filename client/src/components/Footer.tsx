import { Link } from "wouter";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const propertyTypes = [
    { path: "/biens?type=maison", label: "Maisons" },
    { path: "/biens?type=appartement", label: "Appartements" },
    { path: "/biens?type=terrain", label: "Terrains" },
    { path: "/biens?status=location", label: "Locations" },
  ];

  const quickLinks = [
    { path: "/", label: "Accueil" },
    { path: "/biens", label: "Explorer" },
    { path: "/etudiants", label: "Logements étudiants" },
    { path: "/hotels", label: "Hôtels" },
  ];

  const resources = [
    { path: "/contact", label: "Contact" },
    { path: "/a-propos", label: "À propos" },
    { path: "/publier", label: "Publier une annonce" },
    { path: "#", label: "Aide" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 mb-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white leading-tight">safari</span>
                <span className="text-[10px] text-emerald-400 font-medium tracking-wider">.cd</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              La plateforme immobilière de confiance en République Démocratique du Congo.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-emerald-500 transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-emerald-500 transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-emerald-500 transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-emerald-500 transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">Types de Biens</h3>
            <ul className="space-y-2">
              {propertyTypes.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-sm text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-sm text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">Ressources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-sm text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                <span>Kinshasa, RDC</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                <span>+243 XX XXX XXXX</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                <span>contact@safari.cd</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Safari.cd. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
