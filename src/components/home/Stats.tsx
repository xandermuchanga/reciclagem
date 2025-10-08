
import { Recycle, Users, MapPin, Calendar } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: <Recycle className="h-8 w-8 text-primary" />,
      value: "1.8 ton",
      label: "Resíduos reciclados",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      value: "800+",
      label: "Utilizadores activos",
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      value: "45+",
      label: "Cooperativas",
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      value: "350+",
      label: "Coletas realizadas",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nosso Impacto</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Juntos estamos criando um impacto real na sociedade e no meio ambiente através da reciclagem colaborativa em Moçambique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
