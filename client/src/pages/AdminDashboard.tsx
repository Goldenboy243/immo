import { useState } from "react";
import { Link } from "wouter";
import {
  LayoutDashboard, Home, Users, FileText, Settings, Bell, Search,
  TrendingUp, TrendingDown, Eye, DollarSign, CheckCircle, Clock,
  MoreVertical, Edit, Trash2, Shield, Ban, ChevronDown, Filter,
  Download, Plus, BarChart3, PieChart, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const stats = [
  { label: "Total Propriétés", value: "1,234", change: "+12%", trend: "up", icon: Home },
  { label: "Utilisateurs Actifs", value: "5,678", change: "+8%", trend: "up", icon: Users },
  { label: "Vues ce mois", value: "45.2K", change: "+23%", trend: "up", icon: Eye },
  { label: "Revenus", value: "$12,450", change: "-3%", trend: "down", icon: DollarSign },
];

const recentProperties = [
  {
    id: "1",
    title: "Villa Moderne de Luxe",
    owner: "Jean Mukendi",
    ownerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50",
    location: "Kinshasa",
    price: "$350,000",
    status: "active",
    verified: true,
    views: 1250,
    date: "2026-01-25",
  },
  {
    id: "2",
    title: "Appartement Centre-Ville",
    owner: "Marie Kabila",
    ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50",
    location: "Lubumbashi",
    price: "$800/mois",
    status: "pending",
    verified: false,
    views: 456,
    date: "2026-01-24",
  },
  {
    id: "3",
    title: "Terrain Commercial",
    owner: "Patrick Lumumba",
    ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50",
    location: "Goma",
    price: "$120,000",
    status: "active",
    verified: true,
    views: 890,
    date: "2026-01-23",
  },
  {
    id: "4",
    title: "Studio Meublé",
    owner: "Sophie Tshisekedi",
    ownerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50",
    location: "Kinshasa",
    price: "$450/mois",
    status: "rejected",
    verified: false,
    views: 123,
    date: "2026-01-22",
  },
];

const recentUsers = [
  {
    id: "1",
    name: "Jean Mukendi",
    email: "jean@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50",
    role: "owner",
    properties: 5,
    verified: true,
    joinDate: "2025-06-15",
    status: "active",
  },
  {
    id: "2",
    name: "Marie Kabila",
    email: "marie@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50",
    role: "owner",
    properties: 2,
    verified: false,
    joinDate: "2025-09-20",
    status: "active",
  },
  {
    id: "3",
    name: "Patrick Lumumba",
    email: "patrick@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50",
    role: "user",
    properties: 0,
    verified: false,
    joinDate: "2026-01-10",
    status: "active",
  },
  {
    id: "4",
    name: "Sophie Tshisekedi",
    email: "sophie@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50",
    role: "owner",
    properties: 3,
    verified: true,
    joinDate: "2025-11-05",
    status: "suspended",
  },
];

const verificationRequests = [
  {
    id: "1",
    user: "Marie Kabila",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50",
    email: "marie@example.com",
    documents: ["ID Card", "Property Deed"],
    submittedAt: "2026-01-24",
    status: "pending",
  },
  {
    id: "2",
    user: "Patrick Lumumba",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50",
    email: "patrick@example.com",
    documents: ["ID Card", "Business License"],
    submittedAt: "2026-01-23",
    status: "pending",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-700">Actif</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700">En attente</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700">Rejeté</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-700">Suspendu</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-bold text-lg">Safari.cd</span>
                <Badge variant="secondary" className="ml-2">Admin</Badge>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Rechercher..." className="pl-9 w-64" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-1">
            <Button
              variant={activeTab === "overview" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Vue d'ensemble
            </Button>
            <Button
              variant={activeTab === "properties" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("properties")}
            >
              <Home className="mr-2 h-4 w-4" />
              Propriétés
            </Button>
            <Button
              variant={activeTab === "users" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Utilisateurs
            </Button>
            <Button
              variant={activeTab === "verifications" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("verifications")}
            >
              <Shield className="mr-2 h-4 w-4" />
              Vérifications
              <Badge className="ml-auto bg-amber-500">{verificationRequests.length}</Badge>
            </Button>
            <Button
              variant={activeTab === "reports" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("reports")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Rapports
            </Button>
            <Button
              variant={activeTab === "settings" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Vue d'ensemble</h1>
                <div className="flex items-center gap-2">
                  <Select defaultValue="7days">
                    <SelectTrigger className="w-40">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="7days">7 derniers jours</SelectItem>
                      <SelectItem value="30days">30 derniers jours</SelectItem>
                      <SelectItem value="90days">90 derniers jours</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <Card key={stat.label} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        <div className={`flex items-center gap-1 mt-2 text-sm ${
                          stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                        }`}>
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span>{stat.change} vs mois dernier</span>
                        </div>
                      </div>
                      <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Propriétés par ville</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <PieChart className="h-12 w-12 text-gray-300" />
                    <span className="ml-2 text-gray-400">Graphique à venir</span>
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Tendance des inscriptions</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <BarChart3 className="h-12 w-12 text-gray-300" />
                    <span className="ml-2 text-gray-400">Graphique à venir</span>
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Propriétés récentes</h3>
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Propriété</TableHead>
                      <TableHead>Propriétaire</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Vues</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentProperties.slice(0, 4).map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{property.title}</span>
                            {property.verified && (
                              <Shield className="h-4 w-4 text-emerald-600" />
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{property.location}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={property.ownerAvatar} />
                              <AvatarFallback>{property.owner[0]}</AvatarFallback>
                            </Avatar>
                            <span>{property.owner}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{property.price}</TableCell>
                        <TableCell>{getStatusBadge(property.status)}</TableCell>
                        <TableCell>{property.views}</TableCell>
                        <TableCell>{property.date}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === "properties" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Gestion des propriétés</h1>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </div>

              <Card className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Rechercher une propriété..." className="pl-9" />
                  </div>
                  <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filtrer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="active">Actifs</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="rejected">Rejetés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Propriété</TableHead>
                      <TableHead>Propriétaire</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Vues</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{property.title}</span>
                            {property.verified && (
                              <Shield className="h-4 w-4 text-emerald-600" />
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{property.location}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={property.ownerAvatar} />
                              <AvatarFallback>{property.owner[0]}</AvatarFallback>
                            </Avatar>
                            <span>{property.owner}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{property.price}</TableCell>
                        <TableCell>{getStatusBadge(property.status)}</TableCell>
                        <TableCell>{property.views}</TableCell>
                        <TableCell>{property.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {property.status === "pending" && (
                              <>
                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="destructive">
                                  <Ban className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </div>

              <Card className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Rechercher un utilisateur..." className="pl-9" />
                  </div>
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filtrer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="owner">Propriétaires</SelectItem>
                      <SelectItem value="user">Utilisateurs</SelectItem>
                      <SelectItem value="verified">Vérifiés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Propriétés</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Inscrit le</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{user.name}</span>
                                {user.verified && (
                                  <Shield className="h-4 w-4 text-emerald-600" />
                                )}
                              </div>
                              <span className="text-sm text-gray-500">{user.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {user.role === "owner" ? "Propriétaire" : "Utilisateur"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.properties}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir profil
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              {!user.verified && (
                                <DropdownMenuItem>
                                  <Shield className="mr-2 h-4 w-4" />
                                  Vérifier
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="mr-2 h-4 w-4" />
                                Suspendre
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === "verifications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Demandes de vérification</h1>
                <Badge className="bg-amber-500 text-white">
                  {verificationRequests.length} en attente
                </Badge>
              </div>

              <div className="grid gap-4">
                {verificationRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{request.user}</h3>
                          <p className="text-sm text-gray-500">{request.email}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Soumis le {request.submittedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approuver
                        </Button>
                        <Button variant="destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          Rejeter
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Documents soumis:</h4>
                      <div className="flex gap-2">
                        {request.documents.map((doc) => (
                          <Badge key={doc} variant="secondary">
                            <FileText className="h-3 w-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}

                {verificationRequests.length === 0 && (
                  <Card className="p-12 text-center">
                    <Shield className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Aucune demande de vérification en attente</p>
                  </Card>
                )}
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Rapports & Analytics</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Revenus mensuels</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <BarChart3 className="h-12 w-12 text-gray-300" />
                    <span className="ml-2 text-gray-400">Graphique à venir</span>
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Distribution par type</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <PieChart className="h-12 w-12 text-gray-300" />
                    <span className="ml-2 text-gray-400">Graphique à venir</span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Paramètres</h1>
              <Card className="p-6">
                <p className="text-gray-500">Page des paramètres à venir...</p>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
