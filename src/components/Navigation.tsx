import { useEffect, useState } from 'react';
import { Menu, Rocket, X } from 'lucide-react';

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
          ? 'border-b border-white/10 bg-slate-950/90 py-2 shadow-xl shadow-slate-950/20 backdrop-blur-2xl'
          : 'bg-slate-950/35 py-3 backdrop-blur-md'
      }`}
    >
      <div className="container-padding">
        <div className="flex h-12 items-center justify-between gap-6">
          <a href="#home" className="group flex shrink-0 items-center gap-3" onClick={closeMenu}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200/30 bg-amber-200/10 text-sm font-bold text-amber-100 shadow-lg shadow-amber-950/10 transition-transform duration-300 group-hover:scale-105">
              M
            </span>
            <span className="flex flex-col">
              <span className="font-playfair text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-amber-100">
                Muse<span className="text-amber-200">Tera</span>
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-white/45 sm:block">
                Gestão para musicoterapeutas
              </span>
            </span>
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id ? 'text-amber-100' : 'text-white/60 hover:text-white'
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-amber-200 transition-all duration-200 ${
                    activeSection === item.id ? 'w-5' : 'w-0'
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button
              onClick={handleAccessSystem}
              className="inline-flex items-center gap-2 rounded-xl border border-amber-200/25 bg-amber-200/10 px-4 py-2.5 text-sm font-semibold text-amber-50 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-amber-200/15"
            >
              <Rocket className="h-3.5 w-3.5 text-amber-200" />
              Acessar sistema
            </button>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/80 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 lg:hidden ${isMenuOpen ? 'max-h-[25rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container-padding border-t border-white/10 pt-3">
          <nav aria-label="Navegação móvel" className="space-y-1 pb-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={closeMenu}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  activeSection === item.id ? 'bg-amber-200/10 text-amber-100' : 'text-white/65 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                handleAccessSystem();
                closeMenu();
              }}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-200 px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-100"
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
