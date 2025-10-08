
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "Esta plataforma transformou a maneira como nossa cooperativa encontra materiais para reciclagem. Conseguimos ampliar nossa rede e aumentar nosso impacto social.",
    name: "Maria Silva",
    role: "Cooperativa ReciclaVida",
    avatar: "MS",
  },
  {
    quote:
      "Como gerador de resíduos industriais, sempre foi um desafio encontrar parceiros para reciclagem. Agora, todo material tem destino sustentável.",
    name: "Carlos Mendes",
    role: "Empresário Industrial",
    avatar: "CM",
  },
  {
    quote:
      "A facilidade de agendar coletas e encontrar pontos de reciclagem próximos mudou meus hábitos. Agora reciclo muito mais e me sinto contribuindo para um mundo melhor.",
    name: "Ana Ferreira",
    role: "Moradora em São Paulo",
    avatar: "AF",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Dizem Sobre Nós</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Confira os depoimentos de quem já utiliza nossa plataforma para conectar-se e promover a reciclagem sustentável.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full bg-card">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-6 flex-grow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary/20 mb-2"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                  <p className="text-foreground text-lg mb-4">{testimonial.quote}</p>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${testimonial.name}`} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
