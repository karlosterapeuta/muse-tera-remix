import { useState, useEffect } from 'react';
import { ClipboardList, Search, Music, Activity, FileText, MessageCircle, Rocket } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const screenshots = [
  { src: '/musetera-uploads/app-dashboard.png', label: 'Dashboard' },
  { src: '/musetera-uploads/app-anamnese.png', label: 'Anamnese' },
  { src: '/musetera-uploads/app-evolucao.png', label: 'Evolução' },
];

const SystemDemo = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const stages = [
    { label: 'Anamnese', icon: ClipboardList, color: 'text-[hsl(var(--glow-blue))]' },
    { label: 'Avaliação', icon: Search, color: 'text-[hsl(var(--glow-purple))]' },
    { label: 'Plano Musicoterapia', icon: Music, color: 'text-[hsl(var(--accent))]' },
    { label: 'Intervenção', icon: Activity, color: 'text-[hsl(var(--glow-cyan))]' },
    { label: 'Relatório', icon: FileText, color: 'text-[hsl(var(--glow-emerald))]' },
  ];

  useEffect(() => {
    if (isPaused || !isVisible) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % screenshots.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, isVisible]);

  const handleAccessSystem = () => {
    window.open('https://portal.musetera.com.br/login', '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = () => {
    window.open(
      'https://api.whatsapp.com/send?phone=5581986953506&text=Oi%2C%20tenho%20interesse%20em%20adquirir%20o%20sistema%20para%20Musicoterapeutas.',
      '_blank'
    );
  };

  return (
    <section
      id="recursos"
      className="relative overflow-hidden py-20 md:py-28 bg-background"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="container-padding relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
                <div className="w-2 h-2 bg-[hsl(var(--glow-emerald))] rounded-full animate-pulse" />
                <span className="text-sm text-primary font-medium">Sistema ao vivo</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair leading-tight text-foreground">
                Gerencie sua prática de <span className="gradient-text">musicoterapia</span> com facilidade
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Uma plataforma completa para acompanhar o progresso dos seus pacientes,
                agendar sessões e organizar todo o seu trabalho terapêutico em um só lugar.
              </p>
            </div>

            {/* Stages Grid */}
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                Fluxo completo
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {stages.map((stage, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <stage.icon
                      className={`h-7 w-7 ${stage.color} mx-auto mb-2 group-hover:scale-110 transition-transform`}
                    />
                    <div className="text-xs font-semibold text-foreground leading-tight">
                      {stage.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccessSystem}
                className="group inline-flex items-center justify-center gap-2 btn-premium px-7 py-3.5 rounded-xl font-semibold text-white"
              >
                <Rocket className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                Acessar sistema
              </button>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground px-7 py-3.5 rounded-xl font-semibold transition-all"
              >
                <MessageCircle className="h-4 w-4 text-[hsl(var(--glow-emerald))]" />
                WhatsApp
              </button>
            </div>
          </div>

          {/* Right side - Screenshot carousel */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Glow */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/20 via-accent/20 to-[hsl(var(--glow-cyan))]/20 blur-3xl opacity-60 pointer-events-none" />

            {/* Browser frame */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/10">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <div className="ml-3 text-xs text-muted-foreground font-mono truncate">
                  portal-musetera.app / {screenshots[currentSlide].label.toLowerCase()}
                </div>
              </div>

              <div className="relative aspect-[16/10] bg-background">
                {screenshots.map((s, i) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={`Tela ${s.label} do sistema MuseTera`}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      i === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {screenshots.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Ver ${s.label}`}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
    </section>
  );
};

export default SystemDemo;
