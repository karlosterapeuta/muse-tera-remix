/* STYLE SYSTEM: réplica do preview MuseTera — SaaS acolhedor para musicoterapeutas, marinho profundo, creme, dourado e teal, dashboard como prova visual e fluxo clínico claro. */
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileText,
  HeartHandshake,
  Menu,
  MessageCircle,
  Music2,
  Play,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";

const brandMark = "/manus-storage/musetera-marca_094991a6.png";
const therapyImage = "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1400&q=88";
const roomImage = "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=88";
const heroImage = "/manus-storage/musetera-musicoterapia-hero_c947579a.jpg";

const navItems = [
  { label: "Sobre", id: "sobre" },
  { label: "Recursos", id: "recursos" },
  { label: "Para quem é", id: "publicos" },
  { label: "Planos", id: "planos" },
];

const workflow = [
  { icon: ClipboardList, label: "Anamnese", active: false },
  { icon: BarChart3, label: "Avaliação", active: false },
  { icon: Music2, label: "Plano de musicoterapia", active: true },
  { icon: HeartHandshake, label: "Intervenção", active: false },
  { icon: FileText, label: "Relatório", active: false },
];

const audiences = [
  { icon: Music2, title: "Profissionais autônomos", text: "Organize pacientes, sessões e evolução em um só lugar — sem perder o jeito singular da sua prática." },
  { icon: UsersRound, title: "Clínicas e equipes", text: "Crie um fluxo comum para sua equipe e mantenha o cuidado individualizado em cada atendimento." },
  { icon: HeartHandshake, title: "Instituições", text: "Tenha histórico, relatórios e visão de acompanhamento para conversar melhor com famílias e equipes." },
];

const plans = [
  { name: "Essencial", description: "Para começar a organizar sua prática", price: "fale com a equipe", features: ["Cadastro de pacientes", "Agenda de sessões", "Anotações por atendimento", "Evolução organizada"] },
  { name: "Profissional", description: "Para quem quer mais clareza no dia a dia", price: "fale com a equipe", popular: true, features: ["Tudo do Essencial", "Planos terapêuticos", "Relatórios personalizados", "Suporte prioritário"] },
  { name: "Equipe", description: "Para clínicas que cuidam em conjunto", price: "sob consulta", features: ["Tudo do Profissional", "Gestão de equipe", "Visão por unidade", "Onboarding acompanhado"] },
];

function DashboardMockup() {
  return (
    <div className="dashboard-mockup" aria-label="Prévia visual do dashboard MuseTera">
      <div className="dashboard-topbar"><span className="window-dots"><i /><i /><i /></span><span>portal.musetera.app</span><span className="dashboard-topbar__status"><span /> online</span></div>
      <div className="dashboard-body">
        <div className="dashboard-sidebar"><div className="dashboard-sidebar__brand"><img src={brandMark} alt="" /></div><span className="side-active"><BarChart3 size={13} /></span><span><UsersRound size={13} /></span><span><CalendarDays size={13} /></span><span><FileText size={13} /></span></div>
        <div className="dashboard-content">
          <div className="dashboard-heading"><div><small>VISÃO GERAL</small><h3>Sua prática, em sintonia.</h3></div><span className="dashboard-date">Hoje, 24 de maio</span></div>
          <div className="dashboard-metrics"><div><small>Pacientes</small><strong>—</strong><em>organizados</em></div><div><small>Sessões</small><strong>—</strong><em>na agenda</em></div><div><small>Planos ativos</small><strong>—</strong><em>em acompanhamento</em></div></div>
          <div className="dashboard-chart"><div className="chart-title"><span>Evolução dos pacientes</span><small>últimos 30 dias</small><b>ver detalhes <ArrowRight size={11} /></b></div><div className="chart-bars">{[32, 44, 37, 52, 58, 66, 74, 65, 82, 88].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div>
          <div className="dashboard-next"><span className="next-icon"><Clock3 size={15} /></span><div><small>PRÓXIMA SESSÃO</small><strong>Seu próximo atendimento</strong></div><span className="next-arrow"><ArrowRight size={15} /></span></div>
        </div>
      </div>
      <div className="dashboard-toast"><span><Check size={13} /></span><div><strong>Tudo sob controle</strong><small>Dados organizados e seguros</small></div></div>
    </div>
  );
}

function VideoPanel() {
  return (
    <div className="video-panel">
      <div className="video-panel__image" style={{ backgroundImage: `url(${roomImage})` }} />
      <div className="video-panel__overlay" />
      <button className="video-play" aria-label="Reproduzir apresentação do MuseTera"><Play size={18} fill="currentColor" /></button>
      <div className="video-panel__meta"><span>Conheça o MuseTera</span><span>02:18</span></div>
    </div>
  );
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState("dashboard");
  const [showPromo, setShowPromo] = useState(true);
  const [count, setCount] = useState(7);

  useEffect(() => {
    const timer = window.setInterval(() => setCount((value) => value > 0 ? value - 1 : 59), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="muse-site">
      {showPromo && <div className="promo-bar"><span><Sparkles size={13} /> condição especial de lançamento termina em <b>00:{String(count).padStart(2, "0")}</b></span><button onClick={() => scrollToSection("planos")}>Ver condição <ArrowRight size={13} /></button><button className="promo-close" aria-label="Fechar aviso" onClick={() => setShowPromo(false)}><X size={14} /></button></div>}
      <header className={`muse-header ${showPromo ? "muse-header--with-promo" : ""}`}>
        <a href="#home" className="muse-brand"><span className="muse-brand__mark"><img src={brandMark} alt="" /></span><span><strong>MuseTera</strong><small>GESTÃO PARA MUSICOTERAPEUTAS</small></span></a>
        <nav className={`muse-nav ${menuOpen ? "muse-nav--open" : ""}`}>
          {navItems.map((item) => <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <button className="header-login" onClick={() => scrollToSection("contato")}>Acessar sistema <ArrowRight size={14} /></button>
        </nav>
        <button className="muse-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </header>

      <main>
        <section className="muse-hero" id="home">
          <div className="muse-hero__texture" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="muse-hero__wash" />
          <div className="muse-container muse-hero__inner">
            <div className="muse-hero__copy"><span className="pill-label"><Music2 size={13} /> tecnologia que entende o cuidado</span><div className="hero-wordmark"><Music2 size={16} /><span>MuseTera</span></div><h1>Mais tempo para <em>cuidar.</em><br />Menos tempo <strong>organizando.</strong></h1><p>O sistema completo para musicoterapeutas registrarem sessões, acompanharem a evolução e conduzirem cada plano terapêutico com mais clareza.</p><div className="hero-actions"><button className="muse-button muse-button--gold" onClick={() => scrollToSection("recursos")}>Conhecer o sistema <ArrowRight size={15} /></button><button className="muse-button muse-button--ghost" onClick={() => scrollToSection("contato")}><MessageCircle size={15} /> Falar com a equipe</button></div><div className="hero-trust"><span><UsersRound size={14} /> feito para sua prática</span><span><ShieldCheck size={14} /> cuidado com seus dados</span><span><Check size={14} /> teste guiado</span></div></div>
            <div className="muse-hero__product"><DashboardMockup /></div>
          </div>
          <button className="hero-scroll" onClick={() => scrollToSection("sobre")}><span>descubra mais</span><ChevronDown size={17} /></button>
        </section>

        <section className="intro-section" id="sobre"><div className="muse-container intro-grid"><div className="intro-copy"><span className="section-kicker">01 / sobre o MuseTera</span><h2>Sua prática é única.<br /><em>Seu sistema também.</em></h2><p>O MuseTera nasceu para tirar a organização do caminho — e devolver para você o que realmente importa: presença, escuta e tempo de qualidade em cada encontro.</p><button className="inline-link" onClick={() => scrollToSection("recursos")}>Entenda como funciona <ArrowRight size={15} /></button></div><VideoPanel /></div><div className="muse-container stats-strip"><div><strong>01</strong><span>lugar para cada etapa<br />do seu atendimento</span></div><div><strong>∞</strong><span>possibilidades de cuidado<br />com mais clareza</span></div><div><strong>24h</strong><span>mais tranquilidade<br />na sua rotina</span></div></div></section>

        <section className="publics-section" id="publicos"><div className="muse-container"><div className="section-heading section-heading--center"><span className="section-kicker">02 / para quem é</span><h2>Feito para quem<br /><em>faz o cuidado acontecer.</em></h2><p>Uma plataforma que respeita a complexidade da musicoterapia e se adapta ao jeito como você trabalha.</p></div><div className="audience-grid">{audiences.map(({ icon: Icon, title, text }) => <article className="audience-card" key={title}><span className="audience-card__icon"><Icon size={20} /></span><h3>{title}</h3><p>{text}</p><button onClick={() => scrollToSection("contato")}>Saiba mais <ArrowRight size={14} /></button></article>)}</div></div></section>

        <section className="feature-section" id="recursos"><div className="muse-container"><div className="section-heading"><span className="section-kicker">03 / sistema ao vivo</span><h2>Seu trabalho,<br /><em>em sintonia.</em></h2><p>Do primeiro registro ao relatório final, tudo o que você precisa para conduzir uma prática organizada — sem deixar de ser humana.</p></div><div className="feature-tabs"><div className="feature-tabs__list">{[{ id: "dashboard", label: "Visão geral", icon: BarChart3 }, { id: "anamnese", label: "Anamnese", icon: ClipboardList }, { id: "evolucao", label: "Evolução", icon: HeartHandshake }].map(({ id, label, icon: Icon }) => <button key={id} className={activeFeature === id ? "is-active" : ""} onClick={() => setActiveFeature(id)}><Icon size={16} /><span>{label}</span><ArrowRight size={14} /></button>)}</div><div className="feature-stage"><div className={`mini-app mini-app--${activeFeature}`}><div className="mini-app__top"><span className="window-dots"><i /><i /><i /></span><span>portal.musetera.app / {activeFeature}</span></div><div className="mini-app__content">{activeFeature === "dashboard" && <DashboardMockup />}{activeFeature === "anamnese" && <div className="form-preview"><span className="preview-label">ANAMNESE / NOVO REGISTRO</span><h3>Conhecendo a história de cada paciente.</h3><div className="fake-form"><span /><span /><span /><span /><span /><span /></div><div className="fake-button">Salvar registro <ArrowRight size={13} /></div></div>}{activeFeature === "evolucao" && <div className="evolution-preview"><span className="preview-label">EVOLUÇÃO / ACOMPANHAMENTO</span><h3>Uma visão clara do processo.</h3><div className="evolution-lines"><i /><i /><i /><i /><i /></div><div className="evolution-footer"><span>observações da sessão</span><b>+ clareza</b></div></div>}</div></div></div></div><div className="workflow-line">{workflow.map(({ icon: Icon, label, active }, index) => <div className={active ? "is-active" : ""} key={label}><span><Icon size={15} /></span><small>{label}</small>{index < workflow.length - 1 && <i />}</div>)}</div></div></section>

        <section className="video-cta-section"><div className="muse-container video-cta-grid"><div className="video-cta-copy"><span className="section-kicker">04 / na prática</span><h2>Organização que<br /><em>libera presença.</em></h2><p>Veja como o MuseTera acompanha o seu trabalho sem interferir no que torna cada atendimento único.</p><button className="muse-button muse-button--dark" onClick={() => scrollToSection("contato")}>Quero ver o sistema <ArrowRight size={15} /></button></div><div className="video-card"><div className="video-card__art" style={{ backgroundImage: `url(${therapyImage})` }} /><div className="video-card__shade" /><div className="video-card__play"><Play size={20} fill="currentColor" /></div><div className="video-card__caption"><span>um olhar por dentro</span><b>play / 02:18</b></div></div></div></section>

        <section className="plans-section" id="planos"><div className="muse-container"><div className="section-heading section-heading--center"><span className="section-kicker">05 / planos</span><h2>Comece no seu<br /><em>tempo.</em></h2><p>Escolha o caminho que faz sentido para a sua prática hoje. A equipe ajuda você a encontrar o próximo.</p></div><div className="plans-grid">{plans.map((plan) => <article className={`plan-card ${plan.popular ? "plan-card--popular" : ""}`} key={plan.name}>{plan.popular && <span className="plan-popular">mais escolhido</span>}<div className="plan-card__top"><h3>{plan.name}</h3><p>{plan.description}</p></div><div className="plan-price"><small>plano sob medida</small><strong>{plan.price}</strong></div><div className="plan-features">{plan.features.map((feature) => <span key={feature}><Check size={14} />{feature}</span>)}</div><button className={plan.popular ? "muse-button muse-button--gold" : "muse-button muse-button--outline"} onClick={() => scrollToSection("contato")}>Falar sobre este plano <ArrowRight size={14} /></button></article>)}</div></div></section>

        <section className="contact-section" id="contato"><div className="muse-container contact-grid"><div><span className="section-kicker">06 / vamos conversar</span><h2>Mais cuidado.<br /><em>Menos ruído.</em></h2><p>Conte um pouco sobre a sua prática e descubra como o MuseTera pode acompanhar o seu próximo movimento.</p></div><div className="contact-card"><span className="contact-card__icon"><MessageCircle size={20} /></span><h3>Fale com a equipe</h3><p>Uma conversa rápida para entender seu momento e mostrar o sistema por dentro.</p><a href="mailto:portal.musetera@gmail.com">portal.musetera@gmail.com <ArrowRight size={14} /></a><a className="whatsapp-link" href="https://wa.me/5581986953506" target="_blank" rel="noreferrer"><MessageCircle size={15} /> Chamar no WhatsApp</a></div></div></section>
      </main>

      <footer className="muse-footer"><div className="muse-container muse-footer__grid"><a href="#home" className="muse-brand"><span className="muse-brand__mark"><img src={brandMark} alt="" /></span><span><strong>MuseTera</strong><small>GESTÃO PARA MUSICOTERAPEUTAS</small></span></a><p>Tecnologia simples e especializada para que musicoterapeutas organizem sua prática e estejam mais presentes no cuidado.</p><div className="footer-links"><a href="#recursos">Recursos</a><a href="#planos">Planos</a><a href="#sobre">Sobre o MuseTera</a><a href="#contato">Falar com a equipe</a></div></div><div className="muse-container muse-footer__bottom"><span>© 2026 MuseTera</span><span>feito para o cuidado que se escuta</span><a href="#home">voltar ao topo <ArrowRight size={13} /></a></div></footer><a className="floating-whatsapp" href="https://wa.me/5581986953506" target="_blank" rel="noreferrer" aria-label="Fale conosco no WhatsApp"><MessageCircle size={22} /></a>
    </div>
  );
}
