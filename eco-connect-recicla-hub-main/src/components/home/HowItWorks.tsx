
import { MapPin, Recycle, Calendar } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Recycle className="h-8 w-8 text-primary" />,
      title: "Publique ou Encontre Resíduos",
      description: "Cadastre seus materiais recicláveis ou procure por materiais disponíveis em sua região.",
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "Conecte-se Localmente",
      description: "Encontre recicladores, cooperativas e outros usuários próximos a você através do nosso mapa interativo.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Agende a Coleta",
      description: "Combine horários convenientes para coleta ou entrega dos materiais e acompanhe todo o processo.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
          <p className="text-lg text-muted-foreground">
            Nossa plataforma facilita a conexão entre pessoas com resíduos e aqueles que podem reciclá-los, promovendo um ciclo sustentável em três simples passos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-background rounded-xl p-6 shadow-sm border border-border"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
