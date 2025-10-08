
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ScheduleCard, { Schedule } from "@/components/schedule/ScheduleCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for schedules
const mockSchedules: Schedule[] = [
  {
    id: 1,
    title: "Coleta de Garrafas PET",
    date: "18 de Maio, 2025",
    time: "14:00 - 16:00",
    status: "confirmed",
    location: "Rua das Flores, 123 - São Paulo, SP",
    materials: ["PET", "Plástico"],
    requestedBy: "Maria Silva",
    requestedFrom: "Cooperativa ReciclaVida"
  },
  {
    id: 2,
    title: "Entrega de Papelão",
    date: "19 de Maio, 2025",
    time: "10:00 - 11:30",
    status: "pending",
    location: "Av. Paulista, 1000 - São Paulo, SP",
    materials: ["Papelão", "Papel"],
    requestedBy: "Carlos Santos",
    requestedFrom: "EcoRecicle Ltda"
  },
  {
    id: 3,
    title: "Coleta de Eletrônicos",
    date: "20 de Maio, 2025",
    time: "15:30 - 17:00",
    status: "completed",
    location: "Rua Augusta, 500 - São Paulo, SP",
    materials: ["Placas", "Cabos", "Baterias"],
    requestedBy: "João Pereira",
    requestedFrom: "TechRecicla"
  },
  {
    id: 4,
    title: "Coleta de Óleo",
    date: "21 de Maio, 2025",
    time: "09:00 - 10:00",
    status: "canceled",
    location: "Rua Oscar Freire, 800 - São Paulo, SP",
    materials: ["Óleo"],
    requestedBy: "Restaurante Verde",
    requestedFrom: "BioDiesel Coleta"
  }
];

const SchedulePage = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const getFilteredSchedules = (tab: string) => {
    if (tab === "all") return mockSchedules;
    return mockSchedules.filter(schedule => schedule.status === tab);
  };

  const counts = {
    all: mockSchedules.length,
    pending: mockSchedules.filter(s => s.status === "pending").length,
    confirmed: mockSchedules.filter(s => s.status === "confirmed").length,
    completed: mockSchedules.filter(s => s.status === "completed").length,
    canceled: mockSchedules.filter(s => s.status === "canceled").length
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Agendamentos</h1>
            <p className="text-muted-foreground">
              Gerencie suas coletas e entregas de materiais
            </p>
          </div>
          
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/schedule/create">
              <Plus className="mr-2 h-4 w-4" /> Novo agendamento
            </Link>
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b mb-6">
            <TabsList className="bg-transparent">
              <TabsTrigger value="all" className="data-[state=active]:bg-background">
                Todos <span className="ml-1 text-xs bg-muted rounded-full px-2 py-0.5">{counts.all}</span>
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-background">
                Pendentes <span className="ml-1 text-xs bg-muted rounded-full px-2 py-0.5">{counts.pending}</span>
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="data-[state=active]:bg-background">
                Confirmados <span className="ml-1 text-xs bg-muted rounded-full px-2 py-0.5">{counts.confirmed}</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-background">
                Concluídos <span className="ml-1 text-xs bg-muted rounded-full px-2 py-0.5">{counts.completed}</span>
              </TabsTrigger>
              <TabsTrigger value="canceled" className="data-[state=active]:bg-background">
                Cancelados <span className="ml-1 text-xs bg-muted rounded-full px-2 py-0.5">{counts.canceled}</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredSchedules("all").map(schedule => (
                <ScheduleCard 
                  key={schedule.id} 
                  schedule={schedule} 
                  variant={schedule.id % 2 === 0 ? "provider" : "requester"}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredSchedules("pending").map(schedule => (
                <ScheduleCard 
                  key={schedule.id} 
                  schedule={schedule} 
                  variant={schedule.id % 2 === 0 ? "provider" : "requester"}
                />
              ))}
            </div>
            
            {getFilteredSchedules("pending").length === 0 && (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Nenhum agendamento pendente</h3>
                <p className="text-muted-foreground mb-6">
                  Você não possui agendamentos pendentes no momento.
                </p>
                <Button asChild>
                  <Link to="/schedule/create">
                    <Plus className="mr-2 h-4 w-4" /> Criar agendamento
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="confirmed" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredSchedules("confirmed").map(schedule => (
                <ScheduleCard 
                  key={schedule.id} 
                  schedule={schedule} 
                  variant={schedule.id % 2 === 0 ? "provider" : "requester"}
                />
              ))}
            </div>
            
            {getFilteredSchedules("confirmed").length === 0 && (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Nenhum agendamento confirmado</h3>
                <p className="text-muted-foreground mb-6">
                  Você não possui agendamentos confirmados no momento.
                </p>
                <Button asChild>
                  <Link to="/schedule/create">
                    <Plus className="mr-2 h-4 w-4" /> Criar agendamento
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredSchedules("completed").map(schedule => (
                <ScheduleCard 
                  key={schedule.id} 
                  schedule={schedule} 
                  variant={schedule.id % 2 === 0 ? "provider" : "requester"}
                />
              ))}
            </div>
            
            {getFilteredSchedules("completed").length === 0 && (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Nenhum agendamento concluído</h3>
                <p className="text-muted-foreground mb-6">
                  Você não possui agendamentos concluídos no momento.
                </p>
                <Button asChild>
                  <Link to="/schedule/create">
                    <Plus className="mr-2 h-4 w-4" /> Criar agendamento
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="canceled" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredSchedules("canceled").map(schedule => (
                <ScheduleCard 
                  key={schedule.id} 
                  schedule={schedule} 
                  variant={schedule.id % 2 === 0 ? "provider" : "requester"}
                />
              ))}
            </div>
            
            {getFilteredSchedules("canceled").length === 0 && (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Nenhum agendamento cancelado</h3>
                <p className="text-muted-foreground mb-6">
                  Você não possui agendamentos cancelados no momento.
                </p>
                <Button asChild>
                  <Link to="/schedule/create">
                    <Plus className="mr-2 h-4 w-4" /> Criar agendamento
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SchedulePage;
