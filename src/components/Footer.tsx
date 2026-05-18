import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Produto': ['Recursos', 'Preços', 'Segurança', 'Atualizações'],
    'Suporte': ['Central de Ajuda', 'Documentação', 'Contato', 'Status do Sistema'],
    'Empresa': ['Sobre nós', 'Blog', 'Carreiras', 'Imprensa'],
    'Legal': ['Privacidade', 'Termos de Uso', 'LGPD', 'Cookies']
  };

  return (
    <footer className="bg-gray-950 relative overflow-hidden">
      {/* Gradient divider */}
      <div className="h-px w-full" style={{
        background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), rgba(168, 85, 247, 0.5), transparent)'
      }} />
      
      {/* Inspirational Quote Section */}
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="container-padding text-center relative z-10">
          <p className="text-lg lg:text-2xl font-medium text-white/90 italic max-w-4xl mx-auto">
            "Portanto, quer comais quer bebais, ou façais qualquer outra coisa, fazei tudo para glória de Deus."
          </p>
          <span className="text-sm text-white/50 mt-3 block">1 Coríntios 10:31</span>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-padding py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <img src="/lovable-uploads/musetera-logo.jpeg" alt="MuseTera Logo" className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500/50" />
              <span className="text-xl font-bold font-playfair bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">MuseTera</span>
            </div>
            <p className="text-white/60 leading-relaxed">
              A plataforma completa para musicoterapeutas organizarem sua prática e proporcionarem o melhor cuidado aos seus pacientes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 group">
                <Facebook className="h-5 w-5 text-white/50 group-hover:text-blue-400 transition-colors" />
              </a>
              <a href="https://www.instagram.com/sistema_musetera/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-pink-400/50 hover:bg-white/10 transition-all duration-300 group">
                <Instagram className="h-5 w-5 text-white/50 group-hover:text-pink-400 transition-colors" />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 group">
                <Linkedin className="h-5 w-5 text-white/50 group-hover:text-blue-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="font-semibold text-lg text-white">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}><a href="#" className="text-white/50 hover:text-blue-400 transition-colors duration-200">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3"><Mail className="h-5 w-5 text-blue-400" /><span className="text-white/60">portal.musetera@gmail.com</span></div>
            <div className="flex items-center space-x-3"><Phone className="h-5 w-5 text-blue-400" /><span className="text-white/60">(81) 98695-3506</span></div>
            <div className="flex items-center space-x-3"><MapPin className="h-5 w-5 text-blue-400" /><span className="text-white/60">Pernambuco, Brasil</span></div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-white/10 py-6">
        <div className="container-padding">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/40 text-sm">© 2024 MuseTera. Todos os direitos reservados.</p>
            <div className="flex space-x-6 text-sm text-white/40">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Termos</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
