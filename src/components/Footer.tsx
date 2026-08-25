import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Produto: [
      { label: 'Recursos', href: '#recursos' },
      { label: 'Preços', href: '#precos' },
      { label: 'Sobre o MuseTera', href: '#sobre' },
    ],
    Suporte: [
      { label: 'Falar com a equipe', href: 'https://api.whatsapp.com/send?phone=5581986953506' },
      { label: 'E-mail', href: 'mailto:portal.musetera@gmail.com' },
      { label: 'Acessar sistema', href: 'https://portal.musetera.com.br/login' },
    ],
    Legal: [
      { label: 'Privacidade', href: '#' },
      { label: 'Termos de uso', href: '#' },
      { label: 'LGPD', href: '#' },
    ],
  };

  return (
    <footer className="relative overflow-hidden bg-[#07101d]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

      <div className="container-padding py-16 lg:py-20">
        <div className="mb-16 grid gap-12 lg:grid-cols-[1.25fr_1fr_1fr_1fr]">
          <div className="max-w-sm space-y-6">
            <a href="#home" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200/30 bg-amber-200/10 font-semibold text-amber-100">M</span>
              <span className="font-playfair text-2xl font-semibold text-white">
                Muse<span className="text-amber-200">Tera</span>
              </span>
            </a>
            <p className="leading-relaxed text-white/55">
              Tecnologia simples e especializada para que musicoterapeutas organizem sua prática e estejam mais presentes no cuidado.
            </p>
            <a
              href="https://www.instagram.com/sistema_musetera/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do MuseTera"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-amber-200/30 hover:text-amber-100"
            >
              <Instagram className="h-4 w-4" />
              @sistema_musetera
            </a>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-100/80">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-4 border-y border-white/10 py-6 text-sm text-white/55 md:grid-cols-3">
          <a href="mailto:portal.musetera@gmail.com" className="flex items-center gap-3 transition-colors hover:text-white">
            <Mail className="h-4 w-4 text-amber-200" />
            portal.musetera@gmail.com
          </a>
          <a href="tel:+5581986953506" className="flex items-center gap-3 transition-colors hover:text-white">
            <Phone className="h-4 w-4 text-amber-200" />
            (81) 98695-3506
          </a>
          <span className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-amber-200" />
            Pernambuco, Brasil
          </span>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 text-xs text-white/35 sm:flex-row sm:items-center">
          <p>© 2024 MuseTera. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            <MessageCircle className="h-3.5 w-3.5 text-emerald-300" />
            Feito para quem transforma vidas através da música.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
