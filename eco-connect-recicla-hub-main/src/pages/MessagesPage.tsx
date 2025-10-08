import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Send, User } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const MessagesPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      setUser(user);
    } catch (error) {
      console.error("Error checking user:", error);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  // Mock conversations for demonstration
  const conversations = [
    {
      id: 1,
      name: "Maria Machel",
      lastMessage: "Obrigada pela ajuda com a reciclagem!",
      time: "10:30",
      unread: 2,
      avatar: "MM",
    },
    {
      id: 2,
      name: "Paulo Cossa",
      lastMessage: "Quando podemos agendar a coleta?",
      time: "Ontem",
      unread: 0,
      avatar: "PC",
    },
    {
      id: 3,
      name: "Centro de Reciclagem",
      lastMessage: "Recebemos seu material, obrigado!",
      time: "2 dias atrás",
      unread: 0,
      avatar: "CR",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mensagens</h1>
          <p className="text-muted-foreground">
            Converse com outros membros da comunidade
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Conversations list */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Conversas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer border-b border-border transition-colors"
                  >
                    <Avatar>
                      <AvatarFallback>{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm truncate">
                          {conversation.name}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {conversation.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="ml-2">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat area */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Maria Machel</CardTitle>
              <CardDescription>Online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {/* Received message */}
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">MM</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                      <p className="text-sm">
                        Olá! Vi que você está coletando plástico na região de Maputo.
                      </p>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        10:25
                      </span>
                    </div>
                  </div>

                  {/* Sent message */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[70%]">
                      <p className="text-sm">
                        Sim! Tenho cerca de 25kg disponíveis. Quando pode recolher?
                      </p>
                      <span className="text-xs opacity-70 mt-1 block">
                        10:27
                      </span>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {user?.user_metadata?.full_name
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Received message */}
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">MM</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                      <p className="text-sm">
                        Obrigada pela ajuda com a reciclagem!
                      </p>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        10:30
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Message input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;
