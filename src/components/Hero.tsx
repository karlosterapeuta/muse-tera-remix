import { useEffect, useRef } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  MessageCircle,
  Music2,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.05 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleAccessSystem = () => {
    window.open('https://portal.musetera.com.br/login', '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = () => {
    window.open(
      'https://api.whatsapp.com/send?phone=5581986953506&text=Oi%2C%20tenho%20interesse%20em%20adquirir%20o%20sistema%20para%20Musicoterapeutas.',
      '_blank',
    );
  };

  const handleDiscover = () => {
    document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
  };

  const trustItems = [
    { icon: Users, label: '+500 profissionais' },
    { icon: ShieldCheck, label: 'LGPD em foco' },
    { icon: Check, label: '7 dias para testar' },
  ];

  return (
    <section
      id="home"
      className="hero-section relative isolate min-h-[100svh] overflow-hidden pt-32 pb-24 md:pt-40 md:pb-28"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/music-therapy-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-scrim absolute inset-0" />
      <div className="hero-light absolute -right-32 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="hero-light hero-light-warm absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="container-padding relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="max-w-3xl text-left">
          <div className="hero-eyebrow mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Tecnologia que entende o cuidado
          </div>

          <div className="mb-5 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.08s' }}>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-amber-200">
              <Music2 className="h-5 w-5" />
            </span>
            <span className="font-playfair text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Muse<span className="text-amber-200">Tera</span>
            </span>
          </div>

          <h1
            className="max-w-3xl font-playfair text-4xl font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[4.25rem] animate-fade-in"
            style={{ animationDelay: '0.16s' }}
          >
            Mais tempo para cuidar.
            <span className="mt-2 block text-gradient-warm">Menos tempo organizando.</span>
          </h1>

          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg md:text-xl animate-fade-in"
            style={{ animationDelay: '0.24s' }}
          >
            O sistema completo para musicoterapeutas registrarem sessões, acompanharem a evolução e conduzirem cada plano terapêutico com mais clareza.
          </p>

          <div
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center animate-fade-in"
            style={{ animationDelay: '0.32s' }}
          >
            <button
              onClick={handleAccessSystem}
              className="btn-premium group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 font-semibold text-white sm:w-auto"
            >
              <Rocket className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              Conhecer o sistema
              <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={handleWhatsApp}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/[0.12] sm:w-auto"
            >
              <MessageCircle className="h-4 w-4 text-emerald-300" />
              Falar com a equipe
            </button>
          </div>

          <div
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {trustItems.map((item) => (
              <div key={item.label} className="inline-flex items-center gap-2">
                <item.icon className="h-4 w-4 text-amber-200" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[440px] items-center justify-center lg:flex animate-fade-in" style={{ animationDelay: '0.25s' }}>
          <div className="hero-orbit absolute h-[30rem] w-[30rem] rounded-full border border-white/10" />
          <div className="hero-orbit hero-orbit-inner absolute h-[22rem] w-[22rem] rounded-full border border-amber-200/10" />

          <div className="hero-dashboard relative w-full max-w-[30rem] rounded-[1.75rem] border border-white/15 bg-slate-950/70 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 pb-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">portal.musetera.com.br</span>
            </div>

            <div className="space-y-4 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/40">Visão geral</p>
                  <h2 className="mt-1 font-playfair text-2xl text-white">Sua prática, em sintonia.</h2>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-200">Online</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                  <p className="text-[10px] text-white/40">Pacientes</p>
                  <p className="mt-1 text-xl font-semibold text-white">128</p>
                  <p className="mt-1 text-[10px] text-emerald-300">+12% este mês</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                  <p className="text-[10px] text-white/40">Sessões</p>
                  <p className="mt-1 text-xl font-semibold text-white">342</p>
                  <p className="mt-1 text-[10px] text-amber-200">Em acompanhamento</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                  <p className="text-[10px] text-white/40">Planos ativos</p>
                  <p className="mt-1 text-xl font-semibold text-white">86</p>
                  <p className="mt-1 text-[10px] text-sky-200">Tudo atualizado</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white/80">Evolução dos pacientes</p>
                    <p className="mt-1 text-[10px] text-white/40">Últimos 30 dias</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-300">+18,4%</span>
                </div>
                <div className="flex h-20 items-end gap-2">
                  {[34, 46, 39, 58, 51, 68, 82, 74, 92, 86, 100, 94].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t-md bg-gradient-to-t from-blue-500/40 to-amber-200/80" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-amber-200/15 bg-amber-200/[0.07] p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-200/15 text-amber-200">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white">Próxima sessão</p>
                  <p className="mt-0.5 truncate text-[10px] text-white/50">Hoje, 16:30 · Pedro Henrique</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-amber-200/70" />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-1 -left-3 flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/80 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-200">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Tudo sob controle</p>
              <p className="mt-0.5 text-[10px] text-white/45">Dados organizados e seguros</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDiscover}
        aria-label="Descubra mais"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white/80"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Descubra mais</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/25 pt-2">
          <ArrowDown className="h-3 w-3 animate-bounce" />
        </span>
      </button>
    </section>
  );
};

export default Hero;
