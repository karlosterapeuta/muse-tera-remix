import { Star, Quote, MapPin, Calendar } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Dra. Ana Paula Silva',
      role: 'Musicoterapeuta Clínica',
      experience: '8 anos de experiência',
      location: 'São Paulo, SP',
      content: 'O MuseTera transformou completamente minha prática. Consegui reduzir 70% do tempo gasto com administração e focar no que realmente importa: meus pacientes. Os relatórios me ajudam a demonstrar resultados concretos para famílias e equipes multidisciplinares.',
      rating: 5,
      avatar: 'AS',
      specialty: 'Especialista em Autismo',
      patients: '45+ pacientes atendidos'
    },
    {
      name: 'Prof. Carlos Mendes',
      role: 'Diretor de Clínica',
      experience: '12 anos de experiência',
      location: 'Rio de Janeiro, RJ',
      content: 'Implementamos o MuseTera em nossa clínica com 6 musicoterapeutas. A padronização dos processos e a visibilidade dos resultados aumentaram nossa eficiência em 40% e a satisfação dos pacientes em 35%. Ferramenta indispensável!',
      rating: 5,
      avatar: 'CM',
      specialty: 'Gestão Clínica',
      patients: '200+ pacientes mensais'
    },
    {
      name: 'Mariana Santos',
      role: 'Musicoterapeuta Hospitalar',
      experience: '6 anos de experiência',
      location: 'Brasília, DF',
      content: 'Trabalho em ambiente hospitalar onde cada minuto conta. O MuseTera me permite acessar históricos, fazer anotações e gerar relatórios rapidamente. A integração com WhatsApp facilita muito a comunicação com as famílias.',
      rating: 5,
      avatar: 'MS',
      specialty: 'Musicoterapia Hospitalar',
      patients: '30+ pacientes semanais'
    }
  ];

  return (
    <section id="depoimentos" className="section-padding relative overflow-hidden border-t border-white/5 bg-background">
      <div className="absolute inset-0 mesh-gradient pointer-events-none" />
      
      <div className="container-padding relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-foreground">
            O que dizem nossos <span className="gradient-text">profissionais</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Musicoterapeutas de todo o Brasil já estão transformando suas práticas 
            com o MuseTera. Conheça suas experiências reais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative glass-card-premium hover-glow-enhanced p-8"
            >
              {/* Quote icon */}
              <div className="absolute -left-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-amber-500 shadow-lg shadow-amber-500/20">
                <Quote className="h-4 w-4 text-slate-950" />
              </div>

              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <div className="text-sm font-medium text-emerald-300">Verificado ✓</div>
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed italic text-sm">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="space-y-4 border-t border-white/10 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-300 to-blue-600 font-semibold text-slate-950 shadow-lg shadow-blue-500/20">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm font-medium text-sky-200">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>{testimonial.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3" />
                      <span>{testimonial.location}</span>
                    </div>
                    <div className="font-medium text-amber-100">{testimonial.specialty}</div>
                    <div className="font-medium text-emerald-300">{testimonial.patients}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
