
import { useState, useEffect, useRef } from "react";
import { MapPin, Search, Recycle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getLocations } from "@/api/locationsApi";
import type { Tables } from '@/integrations/supabase/types';

type Location = Tables<'locations'>;

const MapComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "waste" | "recycler" | "cooperative">("all");
  const [materialFilter, setMaterialFilter] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Query locations from Supabase
  const { data: locations = [], error } = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations
  });

  // Handle loading state
  useEffect(() => {
    if (locations.length > 0 || error) {
      setIsLoading(false);
    }
  }, [locations, error]);

  // Handle error
  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar localizações",
        description: "Não foi possível carregar os dados do mapa. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }, [error]);

  // Filter locations based on search query, type, and material filters
  const filteredLocations = locations.filter((location) => {
    // Filter by search query
    const matchesSearch = searchQuery
      ? location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    // Filter by type
    const matchesType = activeFilter === "all" ? true : location.type === activeFilter;
    
    // Filter by material
    const matchesMaterial = materialFilter
      ? location.materials.some(m => m.toLowerCase() === materialFilter.toLowerCase())
      : true;
    
    return matchesSearch && matchesType && matchesMaterial;
  });

  const handlePinClick = (id: string) => {
    setSelectedPin(id === selectedPin ? null : id);
  };

  const getMarkerStyle = (type: string) => {
    switch (type) {
      case "cooperative":
        return "bg-accent text-white";
      case "recycler":
        return "bg-primary text-white";
      case "waste":
        return "bg-secondary text-white";
      default:
        return "bg-muted text-foreground";
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "cooperative":
      case "recycler":
        return <Recycle className="h-4 w-4" />;
      case "waste":
        return <Recycle className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterClick = (filter: "all" | "waste" | "recycler" | "cooperative") => {
    setActiveFilter(filter);
  };

  const handleMaterialFilterClick = (material: string) => {
    setMaterialFilter(materialFilter === material ? null : material);
  };

  // Moçambique locations (mockup)
  const mockedLocations: Location[] = [
    {
      id: "1",
      name: "Cooperativa RECICLA",
      type: "cooperative",
      latitude: 30,
      longitude: 40,
      materials: ["Plástico", "Papel", "Metal"],
      address: "Av. Julius Nyerere, Maputo",
      phone: "+258 84 123 4567",
      quantity: null,
      user_id: null,
      user_name: null,
      created_at: new Date().toISOString()
    },
    {
      id: "2",
      name: "Centro de Reciclagem da Matola",
      type: "recycler",
      latitude: 35,
      longitude: 45,
      materials: ["Vidro", "Papel", "Eletrónicos"],
      address: "Rua da Matola, Matola",
      phone: "+258 82 987 6543",
      quantity: null,
      user_id: null,
      user_name: null,
      created_at: new Date().toISOString()
    },
    {
      id: "3",
      name: "Ponto de Recolha AMOR",
      type: "cooperative",
      latitude: 40,
      longitude: 30,
      materials: ["Plástico", "Papel"],
      address: "Baixa da Cidade, Maputo",
      phone: "+258 86 555 4321",
      quantity: null,
      user_id: null,
      user_name: null,
      created_at: new Date().toISOString()
    },
    {
      id: "4",
      name: "Material Reciclável",
      type: "waste",
      latitude: 45,
      longitude: 35,
      materials: ["Plástico", "Metal"],
      address: "Costa do Sol, Maputo",
      phone: null,
      quantity: "25kg",
      user_id: null,
      user_name: "Maria Machel",
      created_at: new Date().toISOString()
    },
    {
      id: "5",
      name: "Reciclagem da Beira",
      type: "recycler",
      latitude: 60,
      longitude: 70,
      materials: ["Papel", "Capim", "Metal"],
      address: "Av. Eduardo Mondlane, Beira",
      phone: "+258 84 222 3333",
      quantity: null,
      user_id: null,
      user_name: null,
      created_at: new Date().toISOString()
    },
    {
      id: "6",
      name: "Recolha Comunitária",
      type: "waste",
      latitude: 50,
      longitude: 55,
      materials: ["Eletrónicos", "Vidro"],
      address: "Bairro de Maxaquene, Maputo",
      phone: null,
      quantity: "10kg",
      user_id: null,
      user_name: "Paulo Cossa",
      created_at: new Date().toISOString()
    }
  ];

  // Use mocked locations if Supabase returns empty
  const displayLocations = locations.length > 0 ? filteredLocations : mockedLocations;

  return (
    <div className="h-[calc(100vh-88px)] flex">
      {/* Left sidebar - search and filters */}
      <div className="w-full max-w-md border-r border-border p-4 overflow-auto flex flex-col">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Explorar Mapa</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por localização..." 
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Filtrar por tipo</h3>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={activeFilter === "all" ? "default" : "outline"} 
              className="cursor-pointer hover:bg-accent hover:text-white"
              onClick={() => handleFilterClick("all")}
            >
              Todos
            </Badge>
            <Badge 
              variant={activeFilter === "waste" ? "secondary" : "outline"} 
              className="cursor-pointer"
              onClick={() => handleFilterClick("waste")}
            >
              Resíduos
            </Badge>
            <Badge 
              variant={activeFilter === "recycler" ? "outline" : "outline"} 
              className={`cursor-pointer ${activeFilter === "recycler" ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}`}
              onClick={() => handleFilterClick("recycler")}
            >
              Recicladores
            </Badge>
            <Badge 
              variant={activeFilter === "cooperative" ? "outline" : "outline"} 
              className={`cursor-pointer ${activeFilter === "cooperative" ? "bg-accent text-white" : "hover:bg-accent hover:text-white"}`}
              onClick={() => handleFilterClick("cooperative")}
            >
              Cooperativas
            </Badge>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Filtrar por material</h3>
          <div className="flex flex-wrap gap-2">
            {["Plástico", "Papel", "Metal", "Vidro", "Eletrónicos", "Óleo", "Capim"].map((material) => (
              <Badge 
                key={material}
                variant={materialFilter === material ? "secondary" : "outline"} 
                className="cursor-pointer hover:bg-secondary hover:text-white"
                onClick={() => handleMaterialFilterClick(material)}
              >
                {material}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex-grow overflow-auto">
          <h3 className="font-semibold mb-3">Resultados próximos</h3>
          <div className="space-y-4">
            {displayLocations.length === 0 && !isLoading && (
              <div className="text-center py-6">
                <p className="text-muted-foreground">Nenhum resultado encontrado.</p>
                <p className="text-sm">Tente ajustar seus filtros ou expandir sua busca.</p>
              </div>
            )}

            {displayLocations.map((location) => (
              <Card 
                key={location.id} 
                className={`cursor-pointer ${selectedPin === location.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handlePinClick(location.id)}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">{location.name}</CardTitle>
                    <Badge variant={
                      location.type === "waste" ? "secondary" :
                      location.type === "recycler" ? "default" :
                      "outline"
                    }>
                      {location.type === "waste" ? "Resíduo" : 
                       location.type === "recycler" ? "Reciclador" : 
                       "Cooperativa"}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {location.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2 pb-2">
                  <div className="text-sm">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {location.materials.map((material, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                    {location.type === "waste" && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        {location.user_name} • Quantidade: {location.quantity}
                      </div>
                    )}
                    {(location.type === "recycler" || location.type === "cooperative") && location.phone && (
                      <div className="text-xs text-muted-foreground">
                        Tel: {location.phone}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-2">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Ver detalhes
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - map */}
      <div className="flex-grow relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
              <p>Carregando mapa...</p>
            </div>
          </div>
        ) : (
          <div ref={mapRef} className="h-full w-full bg-muted/20">
            {/* Simulated map UI */}
            <div className="w-full h-full bg-[#E8F4F8] relative">
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%232E7D32\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'}}>
                </div>
              </div>

              {/* Simulated pins */}
              {displayLocations.map((location) => (
                <div
                  key={location.id}
                  className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                    getMarkerStyle(location.type)
                  } ${
                    selectedPin === location.id ? "scale-125 z-10 ring-2 ring-background" : ""
                  }`}
                  style={{
                    top: `${location.latitude}%`,
                    left: `${location.longitude}%`,
                  }}
                  onClick={() => handlePinClick(location.id)}
                >
                  {getMarkerIcon(location.type)}
                </div>
              ))}

              {/* Selected pin info */}
              {selectedPin && (
                <div
                  className="absolute bg-card p-4 rounded-lg shadow-lg border border-border w-64 z-20"
                  style={{
                    top: `${displayLocations.find(l => l.id === selectedPin)?.latitude! + 5}%`,
                    left: `${displayLocations.find(l => l.id === selectedPin)?.longitude}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <h4 className="font-semibold">
                    {displayLocations.find(l => l.id === selectedPin)?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {displayLocations.find(l => l.id === selectedPin)?.address}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {displayLocations
                      .find(l => l.id === selectedPin)
                      ?.materials.map((material, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                  </div>
                  <Button size="sm" className="w-full mt-2">Contactar</Button>
                </div>
              )}

              {/* Map controls simulation */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="icon" variant="outline" className="bg-card h-8 w-8">+</Button>
                <Button size="icon" variant="outline" className="bg-card h-8 w-8">-</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
