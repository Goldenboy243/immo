import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Building2, 
  Home, 
  GraduationCap,
  CreditCard,
  Smartphone,
  Wallet,
  Shield,
  TrendingUp,
  Eye,
  Clock,
  BadgeCheck,
  Sparkles,
  ChevronRight
} from "lucide-react";

// Plan types
interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  icon: React.ReactNode;
  badge?: string;
}

// Boost/Feature types
interface BoostFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: React.ReactNode;
}

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedBoost, setSelectedBoost] = useState<BoostFeature | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Subscription plans
  const plans: Plan[] = [
    {
      id: "basic",
      name: "Gratuit",
      description: "Pour commencer sur Safari.cd",
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: <Home className="w-6 h-6" />,
      features: [
        "3 annonces actives",
        "Photos standard (5 max)",
        "Visibilité normale",
        "Support par email",
        "Statistiques basiques"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      description: "Pour les agents immobiliers",
      monthlyPrice: 29,
      yearlyPrice: 290,
      icon: <Building2 className="w-6 h-6" />,
      highlighted: true,
      badge: "Populaire",
      features: [
        "20 annonces actives",
        "Photos HD illimitées",
        "Visibilité prioritaire",
        "Badge vérifié",
        "Support prioritaire",
        "Statistiques avancées",
        "Visite virtuelle 360°",
        "Mise en avant 1x/mois"
      ]
    },
    {
      id: "enterprise",
      name: "Entreprise",
      description: "Pour les agences et promoteurs",
      monthlyPrice: 99,
      yearlyPrice: 990,
      icon: <Crown className="w-6 h-6" />,
      badge: "Premium",
      features: [
        "Annonces illimitées",
        "Photos & vidéos HD",
        "Visibilité maximale",
        "Badge Premium vérifié",
        "Support dédié 24/7",
        "Analyses détaillées",
        "Visite virtuelle 360°",
        "Mise en avant illimitée",
        "Page agence personnalisée",
        "API & Intégrations"
      ]
    }
  ];

  // Individual boost features
  const boostFeatures: BoostFeature[] = [
    {
      id: "featured",
      name: "Mise en avant",
      description: "Votre annonce apparaît en tête des résultats",
      price: 5,
      duration: "7 jours",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: "spotlight",
      name: "Spotlight",
      description: "Bandeau spécial et position premium sur la page d'accueil",
      price: 15,
      duration: "7 jours",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: "urgent",
      name: "Urgent",
      description: "Badge urgent + notification aux utilisateurs intéressés",
      price: 10,
      duration: "3 jours",
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: "refresh",
      name: "Rafraîchir",
      description: "Remonter votre annonce comme nouvelle",
      price: 2,
      duration: "Instantané",
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: "verified",
      name: "Badge Vérifié",
      description: "Vérification de l'annonce par notre équipe",
      price: 8,
      duration: "30 jours",
      icon: <BadgeCheck className="w-5 h-5" />
    },
    {
      id: "analytics",
      name: "Statistiques Pro",
      description: "Analyses détaillées des vues et contacts",
      price: 5,
      duration: "30 jours",
      icon: <Eye className="w-5 h-5" />
    }
  ];

  // Payment methods for DRC
  const paymentMethods = [
    { id: "mpesa", name: "M-Pesa", icon: <Smartphone className="w-5 h-5" /> },
    { id: "orange", name: "Orange Money", icon: <Smartphone className="w-5 h-5" /> },
    { id: "airtel", name: "Airtel Money", icon: <Smartphone className="w-5 h-5" /> },
    { id: "card", name: "Carte Bancaire", icon: <CreditCard className="w-5 h-5" /> },
    { id: "cash", name: "Paiement en agence", icon: <Wallet className="w-5 h-5" /> }
  ];

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setSelectedBoost(null);
    if (plan.monthlyPrice > 0) {
      setPaymentDialogOpen(true);
    }
  };

  const handleSelectBoost = (boost: BoostFeature) => {
    setSelectedBoost(boost);
    setSelectedPlan(null);
    setPaymentDialogOpen(true);
  };

  const handlePayment = () => {
    // Here you would integrate with payment provider
    console.log("Processing payment:", {
      type: selectedPlan ? "subscription" : "boost",
      item: selectedPlan || selectedBoost,
      method: paymentMethod,
      billing: isYearly ? "yearly" : "monthly"
    });
    setPaymentDialogOpen(false);
    // Show success toast
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white mb-4">Tarification transparente</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choisissez votre formule
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Des options flexibles pour particuliers, agents et agences immobilières en RDC
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="subscriptions" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
            <TabsTrigger value="boosts">Boosts & Options</TabsTrigger>
          </TabsList>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-8">
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <Label htmlFor="billing" className={!isYearly ? "font-semibold" : "text-gray-500"}>
                Mensuel
              </Label>
              <Switch
                id="billing"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <Label htmlFor="billing" className={isYearly ? "font-semibold" : "text-gray-500"}>
                Annuel
                <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-700">
                  -17%
                </Badge>
              </Label>
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative ${plan.highlighted ? 'border-emerald-500 border-2 shadow-xl' : ''}`}
                >
                  {plan.badge && (
                    <Badge 
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 ${
                        plan.highlighted ? 'bg-emerald-600' : 'bg-gray-800'
                      }`}
                    >
                      {plan.badge}
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-2">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      plan.highlighted ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {plan.icon}
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      {plan.monthlyPrice > 0 && (
                        <span className="text-gray-500">
                          /{isYearly ? 'an' : 'mois'}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-3 text-left">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${
                        plan.highlighted 
                          ? 'bg-emerald-600 hover:bg-emerald-700' 
                          : ''
                      }`}
                      variant={plan.highlighted ? "default" : "outline"}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {plan.monthlyPrice === 0 ? "Commencer gratuitement" : "Choisir ce plan"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Boosts Tab */}
          <TabsContent value="boosts" className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-2">Boostez vos annonces</h2>
              <p className="text-gray-600">
                Augmentez la visibilité de vos annonces avec nos options de promotion
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {boostFeatures.map((boost) => (
                <Card key={boost.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        {boost.icon}
                      </div>
                      <Badge variant="secondary">{boost.duration}</Badge>
                    </div>
                    <CardTitle className="text-lg mt-3">{boost.name}</CardTitle>
                    <CardDescription>{boost.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-emerald-600">
                        ${boost.price}
                      </span>
                      <Button 
                        size="sm"
                        onClick={() => handleSelectBoost(boost)}
                      >
                        Acheter
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Trust Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <Shield className="w-10 h-10 mx-auto mb-3 text-emerald-600" />
                  <h3 className="font-semibold mb-1">Paiement sécurisé</h3>
                  <p className="text-sm text-gray-600">Vos transactions sont protégées</p>
                </div>
                <div>
                  <Star className="w-10 h-10 mx-auto mb-3 text-emerald-600" />
                  <h3 className="font-semibold mb-1">Satisfait ou remboursé</h3>
                  <p className="text-sm text-gray-600">Garantie 30 jours</p>
                </div>
                <div>
                  <Zap className="w-10 h-10 mx-auto mb-3 text-emerald-600" />
                  <h3 className="font-semibold mb-1">Activation instantanée</h3>
                  <p className="text-sm text-gray-600">Vos options sont actives immédiatement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "Comment fonctionne le paiement mobile ?",
                a: "Après avoir choisi votre formule, sélectionnez votre opérateur mobile (M-Pesa, Orange Money, Airtel Money). Vous recevrez une notification sur votre téléphone pour confirmer le paiement."
              },
              {
                q: "Puis-je changer de formule à tout moment ?",
                a: "Oui, vous pouvez upgrader votre formule à tout moment. La différence sera calculée au prorata. Pour downgrader, attendez la fin de votre période d'abonnement."
              },
              {
                q: "Les boosts sont-ils cumulables ?",
                a: "Oui, vous pouvez combiner plusieurs boosts sur une même annonce pour maximiser sa visibilité."
              },
              {
                q: "Que se passe-t-il à la fin de mon abonnement ?",
                a: "Votre compte passe automatiquement au plan gratuit. Vos annonces restent actives mais seules les 3 premières seront visibles."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Finaliser votre achat</DialogTitle>
            <DialogDescription>
              {selectedPlan && (
                <>Plan {selectedPlan.name} - ${isYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice}/{isYearly ? 'an' : 'mois'}</>
              )}
              {selectedBoost && (
                <>{selectedBoost.name} - ${selectedBoost.price}</>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Mode de paiement</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un mode de paiement" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex items-center gap-2">
                        {method.icon}
                        {method.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(paymentMethod === "mpesa" || paymentMethod === "orange" || paymentMethod === "airtel") && (
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input 
                  id="phone" 
                  placeholder="+243 XXX XXX XXX" 
                  type="tel"
                />
                <p className="text-xs text-gray-500">
                  Vous recevrez une demande de paiement sur ce numéro
                </p>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Numéro de carte</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiration</Label>
                    <Input id="expiry" placeholder="MM/AA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "cash" && (
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  Rendez-vous dans l'une de nos agences partenaires à Kinshasa, Lubumbashi ou Goma avec votre référence de commande pour effectuer le paiement.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handlePayment}
              disabled={!paymentMethod}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Shield className="w-4 h-4 mr-2" />
              Payer maintenant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
