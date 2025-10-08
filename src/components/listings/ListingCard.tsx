
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

export interface Listing {
  id: number;
  title: string;
  type: "waste" | "request";
  category: string;
  materials: string[];
  location: string;
  quantity: string;
  postedBy: string;
  postedDate: string;
  image: string;
}

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="aspect-[3/2] relative overflow-hidden">
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <Badge 
          className="absolute top-3 right-3" 
          variant={listing.type === "waste" ? "secondary" : "outline"}
        >
          {listing.type === "waste" ? "Disponível" : "Procura-se"}
        </Badge>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{listing.title}</CardTitle>
        <div className="flex flex-wrap gap-1 mt-2">
          {listing.materials.map((material, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {material}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 text-sm text-muted-foreground flex-grow">
        <div className="space-y-2">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5" />
            <span>{listing.location}</span>
          </div>
          
          <div className="flex items-start">
            <User className="h-4 w-4 mr-2 mt-0.5" />
            <span>{listing.postedBy}</span>
          </div>
          
          <div className="flex items-start">
            <Calendar className="h-4 w-4 mr-2 mt-0.5" />
            <span>{listing.postedDate}</span>
          </div>
          
          {listing.quantity && (
            <p>
              <strong>Quantidade:</strong> {listing.quantity}
            </p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button variant="default" size="sm" className="w-full" asChild>
          <Link to={`/listings/${listing.id}`}>Ver detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
