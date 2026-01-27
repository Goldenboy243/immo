import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BadgeCheck, 
  Shield, 
  Upload, 
  FileText, 
  Building2, 
  User, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Camera,
  MapPin,
  Phone,
  Mail,
  Award,
  Star,
  Lock,
  Eye,
  TrendingUp,
  Users,
  ChevronRight
} from "lucide-react";

// Verification status types
type VerificationStatus = "not_started" | "pending" | "approved" | "rejected";

interface VerificationRequest {
  id: string;
  type: "individual" | "agent" | "agency";
  status: VerificationStatus;
  submittedAt?: Date;
  documents: string[];
  feedback?: string;
}

export default function Verification() {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [verificationType, setVerificationType] = useState<"individual" | "agent" | "agency">("individual");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    idType: "",
    idNumber: "",
    agencyName: "",
    licenseNumber: "",
    bio: "",
    agreeTerms: false
  });
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({
    idFront: null,
    idBack: null,
    selfie: null,
    license: null,
    businessReg: null
  });

  // Mock verification status - in real app, this would come from API
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("not_started");

  const totalSteps = verificationType === "agency" ? 4 : 3;
  const progress = (step / totalSteps) * 100;

  const handleFileUpload = (key: string, file: File | null) => {
    setUploadedFiles(prev => ({ ...prev, [key]: file }));
  };

  const handleSubmit = () => {
    // In real app, submit to API
    console.log("Submitting verification:", { verificationType, formData, uploadedFiles });
    setVerificationStatus("pending");
  };

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-emerald-600" />
            </div>
            <CardTitle>Connexion requise</CardTitle>
            <CardDescription>
              Connectez-vous pour demander la vérification de votre compte
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Se connecter
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // If verification is pending or approved, show status
  if (verificationStatus !== "not_started") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">Statut de vérification</h1>
            <p className="text-emerald-100">Suivez l'état de votre demande</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              {verificationStatus === "pending" && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-10 h-10 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">En cours de vérification</h2>
                  <p className="text-gray-600 mb-6">
                    Notre équipe examine vos documents. Vous recevrez une notification dès que la vérification sera terminée.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <h3 className="font-semibold mb-3">Documents soumis :</h3>
                    <ul className="space-y-2">
                      {Object.entries(uploadedFiles).map(([key, file]) => file && (
                        <li key={key} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500 mt-6">
                    Délai estimé : 24-48 heures
                  </p>
                </div>
              )}

              {verificationStatus === "approved" && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BadgeCheck className="w-10 h-10 text-emerald-600" />
                  </div>
                  <Badge className="bg-emerald-600 mb-4">Vérifié</Badge>
                  <h2 className="text-2xl font-bold mb-2">Compte vérifié !</h2>
                  <p className="text-gray-600 mb-6">
                    Félicitations ! Votre compte a été vérifié. Vous bénéficiez maintenant des avantages réservés aux membres vérifiés.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <BadgeCheck className="w-6 h-6 text-emerald-600 mb-2" />
                      <h4 className="font-semibold">Badge vérifié</h4>
                      <p className="text-sm text-gray-600">Visible sur toutes vos annonces</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <TrendingUp className="w-6 h-6 text-emerald-600 mb-2" />
                      <h4 className="font-semibold">Visibilité accrue</h4>
                      <p className="text-sm text-gray-600">Priorité dans les résultats</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <Users className="w-6 h-6 text-emerald-600 mb-2" />
                      <h4 className="font-semibold">Confiance renforcée</h4>
                      <p className="text-sm text-gray-600">Les acheteurs vous font confiance</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <Star className="w-6 h-6 text-emerald-600 mb-2" />
                      <h4 className="font-semibold">Support prioritaire</h4>
                      <p className="text-sm text-gray-600">Assistance dédiée</p>
                    </div>
                  </div>
                </div>
              )}

              {verificationStatus === "rejected" && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Vérification refusée</h2>
                  <p className="text-gray-600 mb-6">
                    Malheureusement, nous n'avons pas pu vérifier votre compte. Veuillez vérifier les informations et réessayer.
                  </p>
                  <Alert variant="destructive" className="text-left mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Raison : Les documents fournis ne sont pas lisibles. Veuillez soumettre des photos plus claires.
                    </AlertDescription>
                  </Alert>
                  <Button onClick={() => setVerificationStatus("not_started")} className="bg-emerald-600 hover:bg-emerald-700">
                    Soumettre à nouveau
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white mb-4">Vérification de compte</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Faites vérifier votre compte
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Gagnez la confiance des acheteurs et vendeurs avec un badge de vérification
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  Avantages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: <BadgeCheck className="w-5 h-5" />, title: "Badge vérifié", desc: "Visible sur votre profil et annonces" },
                  { icon: <Eye className="w-5 h-5" />, title: "Visibilité accrue", desc: "+40% de vues sur vos annonces" },
                  { icon: <Shield className="w-5 h-5" />, title: "Confiance", desc: "Les utilisateurs préfèrent les comptes vérifiés" },
                  { icon: <TrendingUp className="w-5 h-5" />, title: "Priorité", desc: "Apparaissez en premier dans les recherches" }
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{benefit.title}</h4>
                      <p className="text-xs text-gray-500">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Étape {step} sur {totalSteps}</span>
                  <span className="text-sm font-medium text-emerald-600">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Choose Type */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Type de compte</h2>
                      <p className="text-gray-600">Choisissez le type de vérification qui vous correspond</p>
                    </div>

                    <RadioGroup 
                      value={verificationType} 
                      onValueChange={(value) => setVerificationType(value as typeof verificationType)}
                      className="grid gap-4"
                    >
                      {[
                        { 
                          value: "individual", 
                          icon: <User className="w-6 h-6" />,
                          title: "Particulier", 
                          desc: "Vous vendez ou louez votre propre bien",
                          docs: "Carte d'identité + Selfie"
                        },
                        { 
                          value: "agent", 
                          icon: <BadgeCheck className="w-6 h-6" />,
                          title: "Agent immobilier", 
                          desc: "Vous représentez des propriétaires",
                          docs: "Carte d'identité + Licence professionnelle"
                        },
                        { 
                          value: "agency", 
                          icon: <Building2 className="w-6 h-6" />,
                          title: "Agence immobilière", 
                          desc: "Vous gérez une agence ou entreprise",
                          docs: "Documents d'entreprise + Licence"
                        }
                      ].map((type) => (
                        <Label
                          key={type.value}
                          htmlFor={type.value}
                          className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            verificationType === type.value 
                              ? 'border-emerald-500 bg-emerald-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            verificationType === type.value ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{type.title}</div>
                            <div className="text-sm text-gray-600">{type.desc}</div>
                            <div className="text-xs text-gray-400 mt-1">Documents: {type.docs}</div>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Informations personnelles</h2>
                      <p className="text-gray-600">Ces informations seront vérifiées avec vos documents</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nom complet *</Label>
                        <Input 
                          id="fullName"
                          placeholder="Tel qu'écrit sur votre pièce d'identité"
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input 
                          id="phone"
                          placeholder="+243 XXX XXX XXX"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville *</Label>
                        <Select 
                          value={formData.city}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une ville" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kinshasa">Kinshasa</SelectItem>
                            <SelectItem value="lubumbashi">Lubumbashi</SelectItem>
                            <SelectItem value="goma">Goma</SelectItem>
                            <SelectItem value="bukavu">Bukavu</SelectItem>
                            <SelectItem value="matadi">Matadi</SelectItem>
                            <SelectItem value="kananga">Kananga</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse complète *</Label>
                      <Textarea 
                        id="address"
                        placeholder="Numéro, avenue, commune, quartier..."
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>

                    {verificationType === "agency" && (
                      <>
                        <div className="border-t pt-4">
                          <h3 className="font-semibold mb-4">Informations de l'agence</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="agencyName">Nom de l'agence *</Label>
                              <Input 
                                id="agencyName"
                                placeholder="Nom officiel de l'entreprise"
                                value={formData.agencyName}
                                onChange={(e) => setFormData(prev => ({ ...prev, agencyName: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="licenseNumber">Numéro RCCM *</Label>
                              <Input 
                                id="licenseNumber"
                                placeholder="XX/XXXXX/XXXX"
                                value={formData.licenseNumber}
                                onChange={(e) => setFormData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {(verificationType === "agent" || verificationType === "agency") && (
                      <div className="space-y-2">
                        <Label htmlFor="bio">Description professionnelle</Label>
                        <Textarea 
                          id="bio"
                          placeholder="Décrivez votre expérience et vos spécialités..."
                          value={formData.bio}
                          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                          rows={4}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Document Upload */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Documents justificatifs</h2>
                      <p className="text-gray-600">Téléchargez des photos claires de vos documents</p>
                    </div>

                    <Alert>
                      <Camera className="h-4 w-4" />
                      <AlertDescription>
                        Assurez-vous que les photos sont nettes, bien éclairées et que toutes les informations sont lisibles.
                      </AlertDescription>
                    </Alert>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* ID Front */}
                      <div className="space-y-2">
                        <Label>Pièce d'identité (recto) *</Label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                          {uploadedFiles.idFront ? (
                            <div className="space-y-2">
                              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                              <p className="text-sm text-gray-600">{uploadedFiles.idFront.name}</p>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleFileUpload("idFront", null)}
                              >
                                Changer
                              </Button>
                            </div>
                          ) : (
                            <label className="cursor-pointer">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Cliquez pour télécharger</p>
                              <p className="text-xs text-gray-400">PNG, JPG jusqu'à 5MB</p>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => handleFileUpload("idFront", e.target.files?.[0] || null)}
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* ID Back */}
                      <div className="space-y-2">
                        <Label>Pièce d'identité (verso) *</Label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                          {uploadedFiles.idBack ? (
                            <div className="space-y-2">
                              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                              <p className="text-sm text-gray-600">{uploadedFiles.idBack.name}</p>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleFileUpload("idBack", null)}
                              >
                                Changer
                              </Button>
                            </div>
                          ) : (
                            <label className="cursor-pointer">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Cliquez pour télécharger</p>
                              <p className="text-xs text-gray-400">PNG, JPG jusqu'à 5MB</p>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => handleFileUpload("idBack", e.target.files?.[0] || null)}
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Selfie */}
                      <div className="space-y-2">
                        <Label>Selfie avec pièce d'identité *</Label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                          {uploadedFiles.selfie ? (
                            <div className="space-y-2">
                              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                              <p className="text-sm text-gray-600">{uploadedFiles.selfie.name}</p>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleFileUpload("selfie", null)}
                              >
                                Changer
                              </Button>
                            </div>
                          ) : (
                            <label className="cursor-pointer">
                              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Photo de vous tenant votre pièce</p>
                              <p className="text-xs text-gray-400">PNG, JPG jusqu'à 5MB</p>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => handleFileUpload("selfie", e.target.files?.[0] || null)}
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Professional License (for agents/agencies) */}
                      {(verificationType === "agent" || verificationType === "agency") && (
                        <div className="space-y-2">
                          <Label>Licence professionnelle *</Label>
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                            {uploadedFiles.license ? (
                              <div className="space-y-2">
                                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                                <p className="text-sm text-gray-600">{uploadedFiles.license.name}</p>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleFileUpload("license", null)}
                                >
                                  Changer
                                </Button>
                              </div>
                            ) : (
                              <label className="cursor-pointer">
                                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Attestation ou carte professionnelle</p>
                                <p className="text-xs text-gray-400">PNG, JPG, PDF jusqu'à 5MB</p>
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*,.pdf"
                                  onChange={(e) => handleFileUpload("license", e.target.files?.[0] || null)}
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Agency Documents (only for agencies) */}
                {step === 4 && verificationType === "agency" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Documents d'entreprise</h2>
                      <p className="text-gray-600">Documents légaux de votre agence</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Registre de commerce (RCCM) *</Label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                          {uploadedFiles.businessReg ? (
                            <div className="space-y-2">
                              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                              <p className="text-sm text-gray-600">{uploadedFiles.businessReg.name}</p>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleFileUpload("businessReg", null)}
                              >
                                Changer
                              </Button>
                            </div>
                          ) : (
                            <label className="cursor-pointer">
                              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Extrait du registre de commerce</p>
                              <p className="text-xs text-gray-400">PNG, JPG, PDF jusqu'à 5MB</p>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileUpload("businessReg", e.target.files?.[0] || null)}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id="terms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))}
                        />
                        <Label htmlFor="terms" className="text-sm leading-relaxed">
                          J'accepte les <a href="#" className="text-emerald-600 hover:underline">conditions d'utilisation</a> et 
                          la <a href="#" className="text-emerald-600 hover:underline">politique de confidentialité</a> de Safari.cd. 
                          Je certifie que les informations fournies sont exactes.
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Final Step for non-agency */}
                {step === 3 && verificationType !== "agency" && (
                  <div className="border-t pt-6">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        J'accepte les <a href="#" className="text-emerald-600 hover:underline">conditions d'utilisation</a> et 
                        la <a href="#" className="text-emerald-600 hover:underline">politique de confidentialité</a> de Safari.cd. 
                        Je certifie que les informations fournies sont exactes.
                      </Label>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setStep(s => s - 1)}
                  disabled={step === 1}
                >
                  Retour
                </Button>
                {step < totalSteps ? (
                  <Button 
                    onClick={() => setStep(s => s + 1)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Continuer
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={!formData.agreeTerms}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Soumettre la demande
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
