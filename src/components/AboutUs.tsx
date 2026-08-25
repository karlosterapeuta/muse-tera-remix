import { Award, CheckCircle2, Clock, Heart, Shield, Target, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCountUp } from '@/hooks/useCountUp';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutUs = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const yearsCount = useCountUp({ end: 5, suffix: '+', startOnView: isVisible });
  const usersCount = useCountUp({ end: 500, suffix: '+', startOnView: isVisible });
  const sessionsCount = useCountUp({ end: 15, suffix: 'k+', startOnView: isVisible });
  const uptimeCount = useCountUp({ end: 99.9, decimals: 1, suffix: '%', startOnView: isVisible });

  const stats = [
    { countUp: yearsCount, label: 'Anos de experiência', icon: Clock, color: 'from-amber-200/90 to-amber-500' },
    { countUp: usersCount, label: 'Musicoterapeutas ativos', icon: Users, color: 'from-sky-300 to-blue-500' },
    { countUp: sessionsCount, label: 'Sessões realizadas', icon: Heart, color: 'from-rose-300 to-rose-500' },
    { countUp: uptimeCount, label: 'Uptime garantido', icon: Shield, color: 'from-emerald-300 to-emerald-500' },
  ];

  const certifications = [
    { icon: Shield, label: 'LGPD Compliance', color: 'text-emerald-300' },
    { icon: Award, label: 'ISO 27001', color: 'text-sky-300' },
    { icon: Users, label: 'Associação Brasileira de Musicoterapia', color: 'text-amber-200' },
  ];

  return (
    <section
      id="sobre"
      className="section-padding section-alt relative overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-20" />

      <div className="container-padding relative">
        <div className={`mb-12 flex flex-wrap justify-center gap-3 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200/25"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <cert.icon className={`h-4 w-4 ${cert.color}`} />
              <span className="text-sm font-medium text-foreground">{cert.label}</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
            </div>
          ))}
        </div>

        <div className={`mb-16 space-y-4 text-center transition-all delay-100 duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/[0.07] px-4 py-1.5">
            <span className="text-sm font-medium text-amber-100">Quem somos</span>
          </div>
          <h2 className="font-playfair text-3xl font-semibold tracking-tight text-foreground lg:text-5xl">
            Sobre o <span className="gradient-text">MuseTera</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Nascemos da necessidade real de musicoterapeutas por uma solução completa e especializada para gestão de suas práticas clínicas.
          </p>
        </div>

        <div className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className={`space-y-8 transition-all delay-200 duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <h3 className="flex items-center gap-3 text-2xl font-semibold text-foreground">
              <span className="h-8 w-1 rounded-full bg-gradient-to-b from-amber-200 to-blue-400" />
              Nossa história
            </h3>
            <div className="space-y-7 border-l border-white/10 pl-6">
              <div className="relative">
                <div className="absolute -left-[25px] h-3 w-3 rounded-full bg-amber-200 shadow-lg shadow-amber-200/30" />
                <div className="space-y-2">
                  <span className="text-sm font-semibold text-amber-100">2019</span>
                  <p className="text-muted-foreground">
                    O MuseTera foi criado por uma equipe multidisciplinar de musicoterapeutas, desenvolvedores e especialistas em saúde digital.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[25px] h-3 w-3 rounded-full bg-sky-300 shadow-lg shadow-sky-300/30" />
                <div className="space-y-2">
                  <span className="text-sm font-semibold text-sky-200">2021</span>
                  <p className="text-muted-foreground">
                    Após anos de pesquisa em parceria com profissionais da musicoterapia, lançamos a plataforma completa.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[25px] h-3 w-3 rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/30" />
                <div className="space-y-2">
                  <span className="text-sm font-semibold text-emerald-200">Hoje</span>
                  <p className="text-muted-foreground">
                    Somos a referência nacional em sistemas de gestão para musicoterapeutas, com presença em todos os estados brasileiros.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-4 transition-all delay-300 duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card-premium group p-6 text-center">
                <CardContent className="space-y-3 p-0">
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <stat.icon className="h-7 w-7 text-slate-950" />
                  </div>
                  <div className="gradient-text text-4xl font-bold" ref={stat.countUp.ref as React.RefObject<HTMLDivElement>}>
                    {stat.countUp.formattedCount}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className={`glass-card-premium relative overflow-hidden p-8 transition-all delay-400 duration-700 lg:p-12 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/[0.05] via-transparent to-sky-300/[0.06]" />
          <div className="relative space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5">
              <Target className="h-4 w-4 text-amber-200" />
              <span className="text-sm text-muted-foreground">Nossa missão</span>
            </div>
            <p className="mx-auto max-w-4xl font-light italic leading-relaxed text-foreground lg:text-2xl">
              “Capacitar musicoterapeutas com tecnologia de ponta para que possam focar no que fazem de melhor:{' '}
              <span className="gradient-text font-medium">transformar vidas através da música</span>. Acreditamos que a tecnologia deve simplificar, não complicar.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
