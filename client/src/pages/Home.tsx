/* STYLE SYSTEM: Infraestrutura Editorial — composição assimétrica, painéis de vidro fumê, sinais âmbar, teal técnico e metadados monoespaçados. */
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Circle,
  Menu,
  MoveUpRight,
  X,
} from "lucide-react";

const heroImage = "/manus-storage/musetera-hero_a1d096f0.jpg";
const signalImage = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=88";
const orbitImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85";
const brandMark = "/manus-storage/musetera-mark_6cb27931.png";

const navItems = [
  { label: "O método", id: "method" },
  { label: "O que fazemos", id: "services" },
  { label: "Contato", id: "contact" },
];

const services = [
  {
    index: "01",
    title: "Estratégia digital",
    description:
      "Clareza para decisões complexas. Investigamos o contexto, organizamos prioridades e transformamos intenção em direção executável.",
    tag: "pensamento",
  },
  {
    index: "02",
    title: "Design de produto",
    description:
      "Interfaces que fazem sistemas difíceis parecerem naturais — da arquitetura da informação ao último estado de interação.",
    tag: "experiência",
  },
  {
    index: "03",
    title: "Tecnologia aplicada",
    description:
      "Prototipamos, testamos e colocamos no ar experiências digitais que sustentam a escala sem perder o detalhe humano.",
    tag: "construção",
  },
];

const steps = [
  { number: "01", title: "Escutar", copy: "Mapeamos o cenário antes de propor a resposta." },
  { number: "02", title: "Sintetizar", copy: "Encontramos o fio que conecta negócio, marca e usuário." },
  { number: "03", title: "Materializar", copy: "Damos forma, ritmo e sistema à ideia certa." },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" aria-label="SIte MuseTera, início">
          <img src={brandMark} alt="" className="brand-lockup__mark" />
          <span className="brand-lockup__wordmark">
            <span>SIte</span> MuseTera
          </span>
        </a>

        <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="site-nav__link"
            >
              {item.label}
              <ArrowUpRight size={13} strokeWidth={1.7} />
            </a>
          ))}
          <button className="header-cta" onClick={() => { setMenuOpen(false); scrollToSection("contact"); }}>
            Iniciar conversa <ArrowUpRight size={15} strokeWidth={1.8} />
          </button>
        </nav>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-section__backdrop" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="hero-section__veil" />
          <div className="hero-section__grid" />
          <div className="container hero-section__inner">
            <div className="hero-copy">
              <div className="eyebrow hero-copy__eyebrow"><span className="status-dot" /> Estúdio digital / 2026</div>
              <h1 id="hero-title">Ideias que<br /><em>ganham sistema.</em></h1>
              <p className="hero-copy__lede">
                Estratégia, design e tecnologia para transformar complexidade em experiências que as pessoas entendem — e escolhem.
              </p>
              <div className="hero-copy__actions">
                <button className="button button--primary" onClick={() => scrollToSection("contact")}>
                  Ver o próximo movimento <ArrowDownRight size={17} strokeWidth={1.8} />
                </button>
                <button className="text-link" onClick={() => scrollToSection("method")}>
                  Conhecer o método <ChevronRight size={15} strokeWidth={1.6} />
                </button>
              </div>
            </div>

            <div className="hero-orbit" aria-hidden="true">
              <div className="hero-orbit__label label-top">signal / 001</div>
              <div className="hero-orbit__ring hero-orbit__ring--outer" />
              <div className="hero-orbit__ring hero-orbit__ring--inner" />
              <div className="hero-orbit__core"><span /> <span /> <span /></div>
              <div className="hero-orbit__label label-bottom">— 23° 32' 51.7&quot; S</div>
            </div>
          </div>
          <div className="hero-meta container" aria-label="Indicadores do estúdio">
            <span>Experiência que move</span>
            <span className="hero-meta__line" />
            <span>São Paulo · remoto</span>
            <span className="hero-meta__year">© 2026</span>
          </div>
        </section>

        <section className="manifesto-section" id="method" aria-labelledby="manifesto-title">
          <div className="container manifesto-grid">
            <div className="section-marker"><span>01</span><span className="section-marker__line" /></div>
            <div className="manifesto-copy">
              <p className="eyebrow">O método MuseTera</p>
              <h2 id="manifesto-title">Menos ruído.<br /><span>Mais sinal.</span></h2>
            </div>
            <div className="manifesto-body">
              <p className="large-copy">
                Toda marca carrega uma intenção. Nosso trabalho é revelar essa intenção, dar-lhe uma forma memorável e construir o sistema que a mantém viva.
              </p>
              <div className="manifesto-points">
                <div><Check size={15} /><span>pensamento antes de ferramenta</span></div>
                <div><Check size={15} /><span>design que sustenta decisão</span></div>
                <div><Check size={15} /><span>tecnologia que desaparece no uso</span></div>
              </div>
              <button className="text-link text-link--bright" onClick={() => scrollToSection("services")}>
                O que fazemos <MoveUpRight size={15} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </section>

        <section className="services-section" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="section-intro">
              <div>
                <p className="eyebrow">Capacidades / 03 frentes</p>
                <h2 id="services-title">Do primeiro<br /><em>insight ao impacto.</em></h2>
              </div>
              <p className="section-intro__note">Soluções sob medida para organizações que preferem construir o próximo capítulo a repetir o anterior.</p>
            </div>

            <div className="services-list">
              {services.map((service) => (
                <article className="service-row" key={service.index}>
                  <div className="service-row__index">{service.index}</div>
                  <div className="service-row__main">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="service-row__tag">{service.tag}</div>
                  <ArrowUpRight className="service-row__arrow" size={24} strokeWidth={1.4} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="signal-section" aria-labelledby="signal-title">
          <div className="container signal-grid">
            <div className="signal-visual">
              <img src={signalImage} alt="Composição abstrata de sinais luminosos em superfícies de grafite" />
              <div className="signal-visual__caption"><span>material study / 04</span><span>amber signal</span></div>
            </div>
            <div className="signal-copy">
              <p className="eyebrow">A diferença está no entre</p>
              <h2 id="signal-title">O trabalho bom<br />é <em>sentido</em> antes<br />de ser explicado.</h2>
              <p>Uma boa experiência reduz a distância entre o que uma organização quer dizer e o que uma pessoa consegue fazer. Criamos essa ponte com rigor, curiosidade e um olhar obcecado pelo detalhe.</p>
              <div className="signal-stat"><strong>+04</strong><span>camadas que atravessam<br />cada projeto</span></div>
            </div>
          </div>
        </section>

        <section className="process-section" aria-labelledby="process-title">
          <div className="container process-grid">
            <div className="process-heading">
              <p className="eyebrow">Como avançamos</p>
              <h2 id="process-title">Método com<br /><em>movimento.</em></h2>
              <p>Uma cadência simples para problemas complexos. Cada etapa transforma uma pergunta em uma próxima ação mais clara.</p>
            </div>
            <div className="process-steps">
              {steps.map((step, index) => (
                <div className="process-step" key={step.number}>
                  <div className="process-step__rail"><span>{step.number}</span>{index < steps.length - 1 && <div />}</div>
                  <div><h3>{step.title}</h3><p>{step.copy}</p></div>
                </div>
              ))}
            </div>
            <div className="process-orbit" aria-hidden="true">
              <img src={orbitImage} alt="" />
              <span>the next<br />is closer<br />than it looks</span>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-section__grid" />
          <div className="container contact-inner">
            <div className="contact-copy">
              <p className="eyebrow"><Circle size={9} fill="currentColor" /> Canal aberto / resposta em até 48h</p>
              <h2 id="contact-title">Tem um desafio<br />no horizonte?</h2>
              <p>Conte o que está tentando mover. A primeira conversa é um espaço para organizar a pergunta certa.</p>
              <a className="contact-link" href="mailto:hello@sitemusetera.com">hello@sitemusetera.com <ArrowUpRight size={19} /></a>
            </div>
            <div className="contact-side">
              <div className="contact-side__mark"><img src={brandMark} alt="" /></div>
              <span>SIte MuseTera<br />digital studio</span>
              <button className="button button--outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Voltar ao início <ArrowUpRight size={16} /></button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <span>© 2026 SIte MuseTera</span>
          <span>Designing the signal between people and possibility.</span>
          <a href="#top">Topo <ArrowUpRight size={13} /></a>
        </div>
      </footer>
    </div>
  );
}
