import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Rocket } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['sobre', 'recursos', 'beneficios', 'depoimentos', 'precos'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
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

  return (
    <nav
      style={{ top: 'var(--promo-h, 0px)' }}
      className={`fixed left-0 right-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-card/95 backdrop-blur-2xl py-2 shadow-lg shadow-black/20'
          : 'bg-card/40 backdrop-blur-xl py-4'
      }`}
    >
      {/* Gradient border at bottom when scrolled */}
      <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`} style={{
        background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3), transparent)'
      }} />
      <div className="container-padding">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/musetera-logo.jpeg" 
                alt="MuseTera Logo" 
                className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/30 group-hover:ring-primary transition-all duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-playfair gradient-text group-hover:opacity-90 transition-opacity">
                MuseTera
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Gestão para Musicoterapeutas
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  activeSection === item.id 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-purple-500 transition-all duration-300 rounded-full ${
                  activeSection === item.id ? 'w-1/2' : 'w-0 group-hover:w-1/3'
                }`} />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground hover:bg-secondary font-medium text-sm"
              onClick={handleAccessSystem}
            >
              Entrar
            </Button>
            <Button 
              className="relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-white font-semibold shadow-lg shadow-primary/20 transition-all duration-300 group"
              onClick={handleAccessSystem}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="h-4 w-4 group-hover:animate-bounce" />
                Acessar Sistema
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
        isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-card/98 backdrop-blur-2xl border-t border-border">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-300 font-medium animate-fade-in ${
                  activeSection === item.id ? 'text-primary bg-primary/5' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col space-y-3 pt-4 mt-4 border-t border-border">
              <Button 
                variant="ghost" 
                className="justify-center text-muted-foreground hover:text-foreground hover:bg-secondary animate-fade-in"
                style={{ animationDelay: '300ms' }}
                onClick={() => {
                  handleAccessSystem();
                  setIsMenuOpen(false);
                }}
              >
                Entrar
              </Button>
              <Button 
                className="relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 text-white justify-center font-semibold animate-fade-in"
                style={{ animationDelay: '350ms' }}
                onClick={() => {
                  handleAccessSystem();
                  setIsMenuOpen(false);
                }}
              >
                <span className="flex items-center gap-2">
                  <Rocket className="h-4 w-4" />
                  Acessar Sistema
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
