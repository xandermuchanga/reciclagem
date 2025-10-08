
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Recycle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <Recycle className="h-16 w-16 text-primary mb-4 animate-bounce-subtle" />
      <h1 className="text-5xl font-bold mb-6">Página Não Encontrada</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Parece que você tentou acessar uma página que não existe ou foi movida.
      </p>
      <div className="space-x-4">
        <Button size="lg" asChild>
          <Link to="/">Voltar ao início</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/map">Explorar mapa</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
