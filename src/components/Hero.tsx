import { useEffect, useRef } from 'react';
import { Sparkles, Rocket, MessageCircle, ShieldCheck, Users, Star } from 'lucide-react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const handleAccessSystem = () => {
    window.open('https://portal-musetera.netlify.app/login', '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = () => {
    window.open(
      'https://api.whatsapp.com/send?phone=5581986953506&text=Oi%2C%20tenho%20interesse%20em%20adquirir%20o%20sistema%20para%20Musicoterapeutas.',
      '_blank'
    );
  };

  const handleDiscover = () => {
    document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
  };

  const trust = [
    { icon: Users, label: '+500 musicoterapeutas' },
    { icon: ShieldCheck, label: 'Conforme LGPD' },
    { icon: Star, label: '4.9/5 avaliação' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-20 md:pt-28 md:pb-24"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/music-therapy-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-xs sm:text-sm text-white/90 font-medium">
            Sistema #1 para Musicoterapeutas no Brasil
          </span>
        </div>

        {/* Brand mark */}
        <div
          className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold tracking-tighter mb-4 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
          aria-hidden="true"
        >
          <span className="text-white">Muse</span>
          <span className="gradient-text-animated">Tera</span>
        </div>

        {/* H1 funcional */}
        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-playfair font-semibold text-white leading-tight max-w-4xl mx-auto mb-5 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          O sistema completo para musicoterapeutas{' '}
          <span className="gradient-text">gerenciarem pacientes, sessões e evolução</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          Organize prontuários, anamneses e planos terapêuticos em um só lugar.
          Mais tempo cuidando, menos tempo com burocracia.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <button
            onClick={handleAccessSystem}
            className="group inline-flex items-center justify-center gap-2 btn-premium px-7 py-3.5 rounded-xl font-semibold text-white w-full sm:w-auto"
          >
            <Rocket className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            Acessar sistema
          </button>
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white bg-white/5 hover:bg-white/10 backdrop-blur-md px-7 py-3.5 rounded-xl font-semibold transition-all w-full sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </button>
        </div>

        {/* Trust bar */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white/70 text-sm animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          {trust.map((t, i) => (
            <div key={i} className="inline-flex items-center gap-2">
              <t.icon className="h-4 w-4 text-primary" />
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleDiscover}
        aria-label="Descubra mais"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 scroll-indicator animate-fade-in"
        style={{ animationDelay: '0.8s' }}
      >
        <span className="text-white/60 text-[10px] sm:text-xs uppercase tracking-widest mb-2 block">
          Descubra mais
        </span>
        <div className="scroll-indicator-arrow mx-auto" />
      </button>
    </section>
  );
};

export default Hero;
