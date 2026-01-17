import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, TrendingUp, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  email: z.string().email("Email invalide"),
  propertyType: z.string().min(2, "Veuillez préciser le type de bien"),
  propertyDetails: z.string().min(20, "Veuillez fournir plus de détails sur votre bien"),
});

export default function Sell() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      propertyType: "",
      propertyDetails: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("Estimation request submitted:", values);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons sous peu pour l'estimation de votre bien.",
    });
    
    form.reset();
    setIsSubmitting(false);
  }

  const benefits = [
    {
      icon: TrendingUp,
      title: "Prix optimal",
      description: "Estimation professionnelle pour vendre au meilleur prix du marché",
    },
    {
      icon: Users,
      title: "Large réseau",
      description: "Accès à notre réseau étendu d'acheteurs potentiels",
    },
    {
      icon: Shield,
      title: "Sécurité garantie",
      description: "Transactions sécurisées et accompagnement juridique complet",
    },
    {
      icon: CheckCircle,
      title: "Service complet",
      description: "De l'estimation à la signature, nous gérons tout pour vous",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="bg-gradient-to-r from-primary to-[#8B5CF6] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-page-title">
            Vendez votre bien avec IMMO
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Bénéficiez de notre expertise pour vendre votre propriété rapidement et au meilleur prix du marché
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center p-6 bg-white shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-100 flex items-center justify-center">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h3 className="font-bold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-6">Pourquoi choisir IMMO ?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Avec plusieurs années d'expérience sur le marché immobilier de Lubumbashi, 
                IMMO s'est imposée comme une référence dans la vente de propriétés.
              </p>
              <p>
                Notre équipe d'experts vous accompagne à chaque étape du processus de vente, 
                de l'estimation gratuite de votre bien jusqu'à la signature finale.
              </p>
              <p>
                Nous utilisons les dernières technologies de marketing immobilier pour donner 
                une visibilité maximale à votre propriété et attirer les acheteurs sérieux.
              </p>
              <p className="font-semibold text-foreground">
                Demandez dès maintenant votre estimation gratuite et sans engagement !
              </p>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Demander une estimation gratuite</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="+243 XX XXX XXXX" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="votre@email.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de bien</FormLabel>
                        <FormControl>
                          <Input placeholder="Maison, Appartement, Terrain..." {...field} data-testid="input-property-type" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="propertyDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Détails du bien</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez votre bien (localisation, surface, nombre de chambres, etc.)" 
                            className="min-h-[120px]"
                            {...field} 
                            data-testid="textarea-property-details"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-[#8B5CF6] hover:opacity-90 text-white border-0"
                    disabled={isSubmitting}
                    data-testid="button-submit"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Demander mon estimation gratuite"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
