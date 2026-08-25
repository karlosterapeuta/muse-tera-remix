import { useEffect, useState } from 'react';
import { Menu, Rocket, X, Sparkles } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const sections = ['sobre', 'recursos', 'depoimentos', 'precos'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      setActiveSection(current ?? '');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Sobre', href: '#sobre', id: 'sobre' },
    { name: 'Recursos', href: '#recursos', id: 'recursos' },
    { name: 'Depoimentos', href: '#depoimentos', id: 'depoimentos' },
    { name: 'Preços', href: '#precos', id: 'precos' },
  ];

  const handleAccessSystem = () => {
    window.open('https://portal.musetera.com.br/login', '_blank', 'noopener,noreferrer');
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      style={{ top: 'var(--promo-h, 0px)' }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-slate-950/90 py-2 shadow-xl shadow-blue-950/20 backdrop-blur-2xl'
          : 'bg-slate-950/35 py-3 backdrop-blur-md'
      }`}
    >
      <div className="container-padding">
        <div className="flex h-12 items-center justify-between gap-6">
          <a href="#home" className="group flex shrink-0 items-center gap-3" onClick={closeMenu}>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-blue-300/30 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-sm font-bold text-blue-100 shadow-lg shadow-blue-950/20 transition-all duration-300 group-hover:scale-105 group-hover:border-blue-300/50">
              <Sparkles className="h-4 w-4 text-blue-200" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            </span>
            <span className="flex flex-col">
              <span className="font-playfair text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-blue-100">
                Muse<span className="text-blue-300">Tera</span>
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-white/45 sm:block">
                Gestão para musicoterapeutas
              </span>
            </span>
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 backdrop-blur-md lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-500/15 text-blue-100 shadow-[0_0_12px_-2px_rgba(59,130,246,0.25)]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button
              onClick={handleAccessSystem}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-500/35"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              <Rocket className="relative h-3.5 w-3.5" />
              <span className="relative">Acessar sistema</span>
            </button>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/80 transition-colors hover:bg-blue-500/15 hover:text-blue-100 hover:border-blue-400/30 lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 lg:hidden ${isMenuOpen ? 'max-h-[25rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container-padding border-t border-white/10 pt-3">
          <nav aria-label="Navegação móvel" className="space-y-1 rounded-2xl border border-white/10 bg-white/[0.04] p-2 pb-4 backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-500/15 text-blue-100 shadow-[0_0_12px_-2px_rgba(59,130,246,0.2)]'
                    : 'text-white/65 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {item.name}
                {activeSection === item.id && <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />}
              </a>
            ))}
            <button
              onClick={() => {
                handleAccessSystem();
                closeMenu();
              }}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/35"
            >
              <Rocket className="h-4 w-4" />
              Acessar sistema
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
