
import { Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-primary-foreground relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white"></div>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Recycle className="h-8 w-8" />
                <h3 className="text-xl font-semibold">Reciclagem Sustentavel</h3>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Junte-se à nossa comunidade e faça parte da mudança
              </h2>
              
              <p className="text-lg opacity-90">
                Cadastre-se agora para começar a anunciar seus resíduos, encontrar recicladores próximos, e contribuir para um futuro mais sustentável.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register">Criar uma conta</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/about">Saiba mais</Link>
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="aspect-square max-w-md mx-auto bg-white/20 backdrop-blur-sm rounded-2xl p-6 rotate-3 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-lg bg-white/20 p-4 flex items-center justify-center">
                    <Recycle className="h-12 w-12" />
                  </div>
                  <div className="aspect-square rounded-lg bg-white/20"></div>
                  <div className="aspect-square rounded-lg bg-white/20"></div>
                  <div className="aspect-square rounded-lg bg-white/20 p-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
