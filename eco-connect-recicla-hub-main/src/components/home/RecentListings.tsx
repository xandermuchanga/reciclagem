
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecentListings } from "@/api/listingsApi";
import { Skeleton } from "@/components/ui/skeleton";

const RecentListings = () => {
  const { data: listings = [], isLoading, error } = useQuery({
    queryKey: ['recentListings'],
    queryFn: () => getRecentListings(4)
  });

  const placeholderImage = "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=300&h=200";

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Anúncios Recentes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Confira os últimos materiais disponíveis para reciclagem ou solicitações em nossa plataforma.
            </p>
          </div>
          <Button className="mt-4 md:mt-0" asChild>
            <Link to="/listings">Ver todos</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[3/2]">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader className="p-4 pb-2">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/5" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Erro ao carregar os anúncios recentes.</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Tentar novamente
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[3/2] overflow-hidden">
                  <img 
                    src={listing.image || placeholderImage} 
                    alt={listing.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{listing.title}</CardTitle>
                    <Badge variant={listing.type === "waste" ? "secondary" : "outline"}>
                      {listing.type === "waste" ? "Disponível" : "Procura-se"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  <div className="flex flex-col space-y-1">
                    <div>Categoria: {listing.category}</div>
                    <div>Quantidade: {listing.quantity}</div>
                    <div>Local: {listing.location}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={`/listings/${listing.id}`}>Ver detalhes</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListings;
