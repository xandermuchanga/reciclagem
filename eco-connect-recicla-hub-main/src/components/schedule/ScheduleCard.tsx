
import { Calendar, MapPin, Recycle, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface Schedule {
  id: number;
  title: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  location: string;
  materials: string[];
  requestedBy: string;
  requestedFrom: string;
}

interface ScheduleCardProps {
  schedule: Schedule;
  variant?: "requester" | "provider";
}

const ScheduleCard = ({ schedule, variant = "provider" }: ScheduleCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pendente</Badge>;
      case "confirmed":
        return <Badge variant="secondary">Confirmado</Badge>;
      case "completed":
        return <Badge variant="default">Concluído</Badge>;
      case "canceled":
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Pendente</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{schedule.title}</CardTitle>
          {getStatusBadge(schedule.status)}
        </div>
      </CardHeader>
      
      <CardContent className="pt-2 pb-4 text-sm flex-grow">
        <div className="space-y-3">
          <div className="flex items-start">
            <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <span>{schedule.date}</span>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <span>{schedule.time}</span>
          </div>
          
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <span>{schedule.location}</span>
          </div>
          
          <div className="flex items-start">
            <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <span>
              {variant === "provider" 
                ? `Solicitado por: ${schedule.requestedBy}`
                : `Solicitado para: ${schedule.requestedFrom}`}
            </span>
          </div>
          
          <div>
            <div className="flex items-start mb-1">
              <Recycle className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <span>Materiais:</span>
            </div>
            <div className="flex flex-wrap gap-1 ml-6">
              {schedule.materials.map((material, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {material}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-2">
        {schedule.status === "pending" && variant === "provider" && (
          <>
            <Button variant="default" size="sm" className="flex-1">
              Confirmar
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Recusar
            </Button>
          </>
        )}
        
        {schedule.status === "pending" && variant === "requester" && (
          <Button variant="outline" size="sm" className="flex-1">
            Cancelar
          </Button>
        )}
        
        {schedule.status === "confirmed" && (
          <>
            <Button variant="default" size="sm" className="flex-1">
              Concluir
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Reagendar
            </Button>
          </>
        )}
        
        {schedule.status === "completed" && (
          <Button variant="outline" size="sm" className="flex-1">
            Ver detalhes
          </Button>
        )}
        
        {schedule.status === "canceled" && (
          <Button variant="outline" size="sm" className="flex-1">
            Reagendar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ScheduleCard;
