
import { Recycle, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-secondary/10 to-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transforme resíduos em{" "}
              <span className="text-primary">recursos</span> sustentáveis
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Conectamos geradores de resíduos, recicladores e cooperativas em uma única plataforma para facilitar a reciclagem e promover a economia circular em sua comunidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/register">Começar agora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/map">Explorar mapa</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-card shadow-xl rounded-xl p-6 border border-border max-w-lg mx-auto">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Recycle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Anuncie seus resíduos</h3>
                    <p className="text-muted-foreground">
                      Poste seus materiais recicláveis ou encontre os recursos de que precisa.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Encontre serviços próximos</h3>
                    <p className="text-muted-foreground">
                      Localize recicladores e cooperativas em sua região com nosso mapa interativo.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Agende coletas</h3>
                    <p className="text-muted-foreground">
                      Organize horários convenientes para coleta e entrega de materiais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block absolute -bottom-8 -right-8 w-24 h-24 bg-primary/10 rounded-full"></div>
            <div className="hidden lg:block absolute -top-8 -left-8 w-16 h-16 bg-secondary/10 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 right-0 w-1/3 h-1/3 bg-secondary/5 rounded-tl-[100px]"></div>
    </section>
  );
};

export default Hero;
