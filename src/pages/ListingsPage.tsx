
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ListingCard, { Listing } from "@/components/listings/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const mockListings: Listing[] = [
  {
    id: 1,
    title: "Garrafas PET",
    type: "waste",
    category: "Plástico",
    materials: ["PET", "Plástico", "Transparente"],
    location: "Maputo",
    postedBy: "Maria Sitoe",
    postedDate: "14 Maio, 2025",
    quantity: "15kg",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 2,
    title: "Papelão",
    type: "waste",
    category: "Papel",
    materials: ["Papelão", "Papel"],
    location: "Matola, Maputo",
    postedBy: "Carlos Matusse",
    postedDate: "13 Maio, 2025",
    quantity: "20kg",
    image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 3,
    title: "Sucata Eletrônica",
    type: "waste",
    category: "Eletrônicos",
    materials: ["Placas", "Cabos", "Baterias"],
    location: "Beira, Sofala",
    postedBy: "Ana Tembe",
    postedDate: "12 Maio, 2025",
    quantity: "5kg",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 4,
    title: "Latas de Alumínio",
    type: "request",
    category: "Metal",
    materials: ["Alumínio"],
    location: "Nampula",
    postedBy: "Cooperativa ReciclarMoz",
    postedDate: "11 Maio, 2025",
    quantity: "Qualquer quantidade",
    image: "https://images.unsplash.com/photo-1512219463144-33b770d2dfc8?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 5,
    title: "Vidros para reciclagem",
    type: "waste",
    category: "Vidro",
    materials: ["Vidro", "Garrafas"],
    location: "Pemba, Cabo Delgado",
    postedBy: "Roberto Machava",
    postedDate: "10 Maio, 2025",
    quantity: "8kg",
    image: "https://images.unsplash.com/photo-1485786161871-4c3ed7034546?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 6,
    title: "Procuro papel para reciclagem",
    type: "request",
    category: "Papel",
    materials: ["Papel", "Papelão", "Jornal"],
    location: "Quelimane, Zambézia",
    postedBy: "Eco Reciclagem Moçambique",
    postedDate: "9 Maio, 2025",
    quantity: "50kg+",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 7,
    title: "Plástico PVC",
    type: "waste",
    category: "Plástico",
    materials: ["PVC", "Plástico"],
    location: "Tete",
    postedBy: "João Mondlane",
    postedDate: "8 Maio, 2025",
    quantity: "12kg",
    image: "https://images.unsplash.com/photo-1582577727355-3ff3d493bbb6?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 8,
    title: "Óleo de cozinha usado",
    type: "waste",
    category: "Óleo",
    materials: ["Óleo", "Orgânico"],
    location: "Xai-Xai, Gaza",
    postedBy: "Restaurante Verde",
    postedDate: "7 Maio, 2025",
    quantity: "5L",
    image: "https://images.unsplash.com/photo-1527195575508-5b138d14a6a8?auto=format&fit=crop&q=80&w=300&h=200",
  },
];

const ListingsPage = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "waste" | "request">("all");
  
  const filteredListings = mockListings.filter((listing) => {
    if (activeFilter === "all") return true;
    return listing.type === activeFilter;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Anúncios de Materiais</h1>
            <p className="text-muted-foreground">
              Encontre materiais disponíveis ou solicite o que precisa
            </p>
          </div>
          
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/listings/create">
              <Plus className="mr-2 h-4 w-4" /> Criar anúncio
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          {/* Filters sidebar */}
          <div className="bg-card p-6 rounded-lg border border-border h-fit sticky top-24">
            <h2 className="font-semibold mb-4">Filtros</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar anúncios..." className="pl-10" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Tipo de anúncio</label>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={activeFilter === "all" ? "default" : "outline"} 
                    className="cursor-pointer"
                    onClick={() => setActiveFilter("all")}
                  >
                    Todos
                  </Badge>
                  <Badge 
                    variant={activeFilter === "waste" ? "secondary" : "outline"} 
                    className="cursor-pointer"
                    onClick={() => setActiveFilter("waste")}
                  >
                    Disponíveis
                  </Badge>
                  <Badge 
                    variant={activeFilter === "request" ? "outline" : "outline"} 
                    className={`cursor-pointer ${activeFilter === "request" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => setActiveFilter("request")}
                  >
                    Solicitações
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Categorias</label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer">Plástico</Badge>
                  <Badge variant="outline" className="cursor-pointer">Papel</Badge>
                  <Badge variant="outline" className="cursor-pointer">Metal</Badge>
                  <Badge variant="outline" className="cursor-pointer">Vidro</Badge>
                  <Badge variant="outline" className="cursor-pointer">Eletrônicos</Badge>
                  <Badge variant="outline" className="cursor-pointer">Óleo</Badge>
                  <Badge variant="outline" className="cursor-pointer">Capim</Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Localização</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as localizações</SelectItem>
                    <SelectItem value="maputo">Maputo</SelectItem>
                    <SelectItem value="matola">Matola</SelectItem>
                    <SelectItem value="beira">Beira</SelectItem>
                    <SelectItem value="nampula">Nampula</SelectItem>
                    <SelectItem value="tete">Tete</SelectItem>
                    <SelectItem value="pemba">Pemba</SelectItem>
                    <SelectItem value="quelimane">Quelimane</SelectItem>
                    <SelectItem value="xai-xai">Xai-Xai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Classificar por</label>
                <Select defaultValue="recent">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="quantity-asc">Menor quantidade</SelectItem>
                    <SelectItem value="quantity-desc">Maior quantidade</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                    <SelectItem value="za">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">Aplicar filtros</Button>
            </div>
          </div>
          
          {/* Listings grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            
            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Nenhum anúncio encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar seus filtros ou criar um novo anúncio.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListingsPage;
