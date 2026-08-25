import { Check, Star, Shield, Copy, CreditCard, Smartphone, ArrowLeft, Zap, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { generatePixPayload } from '@/utils/pixGenerator';

type PlanKey = '30dias' | '6meses' | '12meses';

const Pricing = () => {
  const [activeModal, setActiveModal] = useState<PlanKey | null>(null);
  const [showPixQRCode, setShowPixQRCode] = useState<PlanKey | null>(null);
  const { toast } = useToast();

  const pixKey = '60268856000174';

  const plansData = {
    '30dias': {
      label: 'Sem Fidelidade 30 dias',
      shortLabel: 'Sem Fidelidade',
      value: 'R$ 34,90',
      amount: 34.90,
      cardLink: 'https://link.infinitepay.io/karloss_christian/VC1DLTEtUg-1wFkGQI6Yz-34,90',
    },
    '6meses': {
      label: 'FIDELIDADE 6 Meses',
      shortLabel: 'FIDELIDADE 6 Meses',
      value: 'R$ 199,00',
      amount: 199.00,
      cardLink: 'https://link.infinitepay.io/karloss_christian/VC1DLTYtUg-QgJWgtnsP-199,00',
    },
    '12meses': {
      label: 'FIDELIDADE 12 Meses',
      shortLabel: 'FIDELIDADE 12 Meses',
      value: 'R$ 299,00',
      amount: 299.00,
      cardLink: 'https://link.infinitepay.io/karloss_christian/VC1DLUMtUg-7kHgD4nE5n-299,00',
    },
  } as const;

  const pixPayloads: Record<PlanKey, string> = {
    '30dias': generatePixPayload({ pixKey, beneficiaryName: 'MUSETERA', city: 'RECIFE', amount: 34.90 }),
    '6meses': generatePixPayload({ pixKey, beneficiaryName: 'MUSETERA', city: 'RECIFE', amount: 199.00 }),
    '12meses': generatePixPayload({ pixKey, beneficiaryName: 'MUSETERA', city: 'RECIFE', amount: 299.00 }),
  };

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    toast({ title: "Chave PIX copiada!", description: "Cole no seu app de pagamento" });
  };

  const handleCopyPayload = (planKey: PlanKey) => {
    navigator.clipboard.writeText(pixPayloads[planKey]);
    toast({ title: "Código PIX Copia e Cola copiado!", description: "Cole no seu app de pagamento" });
  };

  const handleSendReceipt = (planKey: PlanKey) => {
    const p = plansData[planKey];
    const message = `Olá! Acabei de fazer o pagamento do plano ${p.label} (${p.value}) via PIX. Segue o comprovante.`;
    window.open(`https://api.whatsapp.com/send?phone=5581986953506&text=${encodeURIComponent(message)}`, '_blank');
  };

  const closeModal = () => {
    setActiveModal(null);
    setShowPixQRCode(null);
  };

  const plans = [
    { key: '30dias' as PlanKey, name: 'Sem Fidelidade 30 dias', price: 'R$ 34,90', period: '/mês', description: 'Flexibilidade máxima para seu negócio', features: ['Pacientes ilimitados', 'Agendamento avançado', 'Relatórios detalhados', 'Planos de tratamento', 'Suporte prioritário', '50GB de armazenamento'], cta: 'Assinar Plano', popular: false, refundGuarantee: true },
    { key: '6meses' as PlanKey, name: 'FIDELIDADE 6 Meses', price: 'R$ 199,00', period: '/6 meses', description: 'Economia com compromisso semestral', features: ['Pacientes ilimitados', 'Agendamento avançado', 'Relatórios detalhados', 'Planos de tratamento', 'Suporte prioritário', '50GB de armazenamento'], cta: 'Assinar Plano', popular: true, refundGuarantee: true },
    { key: '12meses' as PlanKey, name: 'FIDELIDADE 12 Meses', price: 'R$ 299,00', period: '/12 meses', description: 'Melhor custo-benefício com plano anual', features: ['Pacientes ilimitados', 'Agendamento avançado', 'Relatórios detalhados', 'Planos de tratamento', 'Suporte prioritário', '50GB de armazenamento'], cta: 'Assinar Plano', popular: false, refundGuarantee: true }
  ];

  const renderPaymentModalContent = (planKey: PlanKey) => {
    const plan = plansData[planKey];

    if (showPixQRCode === planKey) {
      return (
        <div className="relative overflow-hidden rounded-lg">
          {/* Tech grid backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <DialogHeader>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-green-500 font-mono">Pix · Pagamento instantâneo</span>
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-slate-900">Escaneie o QR Code</DialogTitle>
              <DialogDescription className="text-center text-base sm:text-lg font-semibold text-slate-800">{plan.shortLabel} — <span className="text-blue-600">{plan.value}</span></DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center space-y-3 sm:space-y-4 py-3 sm:py-4">
              {/* QR with neon frame */}
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 shadow-[0_0_40px_-10px_rgba(34,197,94,0.6)]">
                <div className="bg-white p-2 sm:p-3 rounded-2xl relative">
                  <QRCodeSVG value={pixPayloads[planKey]} size={150} level="H" includeMargin={true} className="sm:!w-[180px] sm:!h-[180px]" />
                  {/* Corner brackets */}
                  <span className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-green-500 rounded-tl-md" />
                  <span className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-green-500 rounded-tr-md" />
                  <span className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-green-500 rounded-bl-md" />
                  <span className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-green-500 rounded-br-md" />
                </div>
              </div>

              <div className="w-full space-y-2">
                <p className="text-[11px] uppercase tracking-wider font-mono text-slate-700 font-semibold flex items-center gap-2">
                  <QrCode className="h-3 w-3" /> Chave PIX (CNPJ)
                </p>
                <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-lg border border-slate-300 backdrop-blur">
                  <span className="flex-1 text-sm font-mono break-all text-slate-900 font-semibold tracking-wide">{pixKey}</span>
                  <Button variant="ghost" size="icon" onClick={handleCopyPixKey} className="h-8 w-8 flex-shrink-0 text-slate-700 hover:text-blue-600">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={() => handleCopyPayload(planKey)} variant="outline" className="w-full bg-white hover:bg-blue-50 border-blue-300 hover:border-blue-500 text-slate-900 font-semibold gap-2">
                <Copy className="h-4 w-4" />
                Copiar código PIX (Copia e Cola)
              </Button>

              <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-300 rounded-lg p-3">
                <p className="text-xs sm:text-sm text-blue-900 font-medium text-center">
                  ⚡ Após pagar, envie o comprovante no WhatsApp para ativar seu acesso na hora
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Button variant="outline" onClick={() => setShowPixQRCode(null)} className="flex-1 bg-white border-slate-400 text-slate-900 font-semibold hover:bg-slate-100">
                  <ArrowLeft className="h-4 w-4 mr-2" />Voltar
                </Button>
                <Button onClick={() => handleSendReceipt(planKey)} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20">
                  Enviar Comprovante
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212, 160, 23,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(212, 160, 23,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <DialogHeader>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-mono">Selecione o método</span>
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-slate-900">Como você quer pagar?</DialogTitle>
            <DialogDescription className="text-center text-base sm:text-lg font-semibold text-slate-800">{plan.shortLabel}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-4 sm:py-6">
            {/* Cartão */}
            <button
              type="button"
              onClick={() => window.open(plan.cardLink, '_blank')}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 sm:p-5 text-left transition-all hover:border-blue-400 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.35)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all" />
              <div className="relative space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">Parcelado</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Cartão de Crédito</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1">Até 12x no cartão</p>
                  <p className="text-lg sm:text-xl font-bold text-blue-600 mt-1.5 sm:mt-2">{plan.value}</p>
                </div>
                <div className="flex items-center text-xs text-blue-600 font-medium">
                  Pagar agora
                  <ArrowLeft className="h-3 w-3 ml-1 rotate-180 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </button>

            {/* PIX */}
            <button
              type="button"
              onClick={() => setShowPixQRCode(planKey)}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 sm:p-5 text-left transition-all hover:border-green-400 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.35)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all" />
              <div className="absolute top-2 right-2">
                <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-green-700 bg-green-100 px-2 py-1 rounded">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Instantâneo
                </span>
              </div>
              <div className="relative space-y-2 sm:space-y-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                  <QrCode className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">PIX</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1">Aprovação em segundos</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600 mt-1.5 sm:mt-2">{plan.value}</p>
                </div>
                <div className="flex items-center text-xs text-green-600 font-medium">
                  Gerar QR Code
                  <ArrowLeft className="h-3 w-3 ml-1 rotate-180 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          </div>

          <Button
            variant="outline"
            onClick={closeModal}
            className="w-full bg-white border-slate-400 text-slate-900 font-semibold hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />Voltar
          </Button>
        </div>
      </div>
    );
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
            <Card key={index} className={`relative overflow-hidden ${plan.popular ? 'lg:scale-105 shadow-2xl shadow-indigo-500/10 border border-indigo-500/40 bg-slate-900' : 'hover-glow-enhanced glass-card-premium'}`}>
              {plan.popular && (
                <>
                  {/* Subtle background glow */}
                  <div className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full" />
                  <div className="pointer-events-none absolute -bottom-24 -left-24 w-48 h-48 bg-violet-500/10 blur-3xl rounded-full" />

                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-amber-200 to-amber-500 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/25">
                      <Star className="h-4 w-4 fill-slate-950" />
                      <span>Mais Popular</span>
                    </div>
                  </div>
                </>
              )}

              <CardHeader className="relative text-center pb-4">
                <h3 className={`text-2xl font-bold ${plan.popular ? 'bg-gradient-to-r from-slate-200 via-indigo-200 to-indigo-400 bg-clip-text text-transparent' : 'text-foreground'}`}>{plan.name}</h3>
                <p className={plan.popular ? 'text-slate-400' : 'text-muted-foreground'}>{plan.description}</p>
                <div className="pt-4">
                  <span className={`text-4xl lg:text-5xl font-bold ${plan.popular ? 'bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent' : 'gradient-text'}`}>{plan.price}</span>
                  <span className={plan.popular ? 'text-slate-400' : 'text-muted-foreground'}>{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-6">
                {plan.popular && (
                  <div className="rounded-xl border-2 border-amber-500/50 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-violet-500/10 p-4 space-y-2 shadow-[0_0_25px_-5px_rgba(245,158,11,0.3)]">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-90" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                      </span>
                      <span className="text-lg font-extrabold text-amber-300 tracking-wide drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">⚡ Restam apenas 5 vagas neste preço</span>
                    </div>
                    <p className="text-sm font-bold text-amber-200/90 pl-7 uppercase tracking-widest">Oferta válida só hoje · não perca</p>
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
                      <Check className={`h-5 w-5 flex-shrink-0 ${plan.popular ? 'text-indigo-400' : 'text-green-500'}`} />
                      <span className={plan.popular ? 'text-slate-300' : 'text-muted-foreground'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-xl py-3 text-lg font-semibold ${plan.popular ? 'bg-gradient-to-r from-amber-200 to-amber-500 text-slate-950 shadow-xl shadow-amber-500/20 hover:from-amber-100 hover:to-amber-400' : 'border-2 border-white/15 bg-white/[0.03] text-foreground hover:border-amber-200/60 hover:bg-amber-200/[0.06] hover:text-amber-100'} transition-all duration-300`}
                  onClick={() => {
                    setShowPixQRCode(null);
                    setActiveModal(plan.key);
                  }}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={activeModal !== null} onOpenChange={(open) => { if (!open) closeModal(); }}>
          <DialogContent className="w-[calc(100vw-1rem)] max-w-[95vw] sm:max-w-lg mx-2 sm:mx-4 bg-white border-slate-200 p-4 sm:p-6 max-h-[92vh] overflow-y-auto">
            {activeModal && renderPaymentModalContent(activeModal)}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Pricing;
