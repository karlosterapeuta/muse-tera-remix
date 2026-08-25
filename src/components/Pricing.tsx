import { Check, Star, Shield, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type PlanKey = '30dias' | '6meses' | '12meses';

const WHATSAPP_LINK = 'https://api.whatsapp.com/send/?phone=5581986953506&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+MuseTera.&type=phone_number&app_absent=0';

const Pricing = () => {
  const plans = [
    {
      key: '30dias' as PlanKey,
      name: 'Sem Fidelidade 30 dias',
      price: 'R$ 69,90',
      period: '/mês',
      description: 'Flexibilidade máxima para seu negócio',
      features: ['Pacientes ilimitados', 'Agendamento avançado', 'Relatórios detalhados', 'Planos de tratamento', 'Suporte prioritário', '50GB de armazenamento'],
      cta: 'Assinar Plano',
      popular: false,
      refundGuarantee: true,
    },
    {
      key: '6meses' as PlanKey,
      name: 'FIDELIDADE 6 Meses',
      price: 'R$ 399,00',
      period: '/6 meses',
      description: 'Economia com compromisso semestral',
      features: ['Pacientes ilimitados', 'Agendamento avançado', 'Relatórios detalhados', 'Planos de tratamento', 'Suporte prioritário', '50GB de armazenamento'],
      cta: 'Assinar Plano',
      popular: true,
      refundGuarantee: true,
    },
    {
      key: '12meses' as PlanKey,
      name: 'FIDELIDADE 12 Meses',
      price: 'R$ 699,00',
      period: '/12 meses',
      description: 'Melhor custo-benefício com plano anual',
      features: ['Pacientes ilimitados', 'Agendamento avançado', 'Relatórios detalhados', 'Planos de tratamento', 'Suporte prioritário', '50GB de armazenamento'],
      cta: 'Assinar Plano',
      popular: false,
      refundGuarantee: true,
    },
  ];

  const handleSubscribe = () => {
    window.open(WHATSAPP_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="precos" className="section-padding relative overflow-hidden section-alt border-t border-white/5">
      <div className="absolute inset-0 mesh-gradient" />

      <div className="container-padding relative z-10">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="font-playfair text-3xl font-semibold tracking-tight text-foreground lg:text-5xl">
            Planos que <span className="gradient-text">crescem</span> com você
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Escolha o plano ideal para sua prática. Todos os planos incluem suporte completo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? 'lg:scale-105 shadow-2xl shadow-blue-500/10 border border-blue-500/40 bg-slate-900'
                  : 'hover-glow-enhanced glass-card-premium'
              }`}
            >
              {plan.popular && (
                <>
                  <div className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full" />
                  <div className="pointer-events-none absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full" />

                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-slate-950 shadow-lg shadow-blue-500/25">
                      <Star className="h-4 w-4 fill-slate-950" />
                      <span>Mais Popular</span>
                    </div>
                  </div>
                </>
              )}

              <CardHeader className="relative text-center pb-4">
                <h3
                  className={`text-2xl font-bold ${
                    plan.popular
                      ? 'bg-gradient-to-r from-slate-200 via-blue-200 to-blue-400 bg-clip-text text-transparent'
                      : 'text-foreground'
                  }`}
                >
                  {plan.name}
                </h3>
                <p className={plan.popular ? 'text-slate-400' : 'text-muted-foreground'}>{plan.description}</p>
                <div className="pt-4">
                  <span
                    className={`text-4xl lg:text-5xl font-bold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent'
                        : 'gradient-text'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className={plan.popular ? 'text-slate-400' : 'text-muted-foreground'}>{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-6">
                {plan.popular && (
                  <div className="rounded-xl border-2 border-blue-500/50 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-indigo-500/10 p-4 space-y-2 shadow-[0_0_25px_-5px_rgba(59,130,246,0.3)]">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-90" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      </span>
                      <span className="text-lg font-extrabold text-blue-300 tracking-wide drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                        ⚡ Restam apenas 5 vagas neste preço
                      </span>
                    </div>
                    <p className="text-sm font-bold text-blue-200/90 pl-7 uppercase tracking-widest">
                      Oferta válida só hoje · não perca
                    </p>
                  </div>
                )}

                {plan.refundGuarantee && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-400">7 dias de garantia de reembolso</span>
                  </div>
                )}

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className={`h-5 w-5 flex-shrink-0 ${plan.popular ? 'text-blue-400' : 'text-green-500'}`} />
                      <span className={plan.popular ? 'text-slate-300' : 'text-muted-foreground'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-xl py-3 text-lg font-semibold group ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-300 to-blue-500 text-slate-950 shadow-xl shadow-blue-500/20 hover:from-blue-200 hover:to-blue-400'
                      : 'border-2 border-white/15 bg-white/[0.03] text-foreground hover:border-blue-300/60 hover:bg-blue-500/[0.08] hover:text-blue-100'
                  } transition-all duration-300`}
                  onClick={handleSubscribe}
                >
                  <span>{plan.cta}</span>
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
