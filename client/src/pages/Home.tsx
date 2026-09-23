/* STYLE SYSTEM: clone fiel do preview público MuseTera — SaaS para musicoterapeutas, marinho profundo, serif display, dashboard, confiança, recursos, depoimentos e preços. */
import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, Check, ChevronDown, ClipboardList, Clock3, HeartHandshake, Menu, MessageCircle, Music2, Play, ShieldCheck, Sparkles, UsersRound, X } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const mediaOrigin = "https://musetera-ybjdwyyk.manus.space";
const brandMark = `${mediaOrigin}/manus-storage/musetera-logo-circular_1932db1d.png`;
const heroImage = `${mediaOrigin}/manus-storage/musetera-musicoterapia-hero_c947579a.jpg`;
const dashboardAsset = `${mediaOrigin}/manus-storage/musetera-dashboard-celular_e12da4c6.png`;
const heroVideo = `${mediaOrigin}/manus-storage/musetera-hero-video_c5363dfd.mp4`;
const anamneseAsset = "https://muse-remix-magic.lovable.app/musetera-uploads/app-anamnese.png";
const evolucaoAsset = "https://muse-remix-magic.lovable.app/musetera-uploads/app-evolucao.png";

const navItems = [
  { label: "Sobre", id: "sobre" },
  { label: "Recursos", id: "recursos" },
  { label: "Depoimentos", id: "depoimentos" },
  { label: "Preços", id: "precos" },
];

const PROMO_CLOSED_KEY = "musetera_promo_closed";
const PROMO_END_AT = new Date("2026-12-01T23:59:59-03:00").getTime();
const getPromoRemaining = () => Math.max(0, PROMO_END_AT - Date.now());
const formatPromoTime = (ms: number) => { const total = Math.floor(ms / 1000); return { h: String(Math.floor(total / 3600)).padStart(2, "0"), m: String(Math.floor((total % 3600) / 60)).padStart(2, "0"), s: String(total % 60).padStart(2, "0") }; };

const testimonials = [
  { initials: "AS", name: "Dra. Ana Paula Silva", role: "Musicoterapeuta Clínica", years: "8 anos de experiência", city: "São Paulo, SP", specialty: "Especialista em Autismo", quote: "O MuseTera transformou completamente minha prática. Consegui reduzir 70% do tempo gasto com administração e focar no que realmente importa: meus pacientes. Os relatórios me ajudam a demonstrar resultados concretos para famílias e equipes multidisciplinares." },
  { initials: "CM", name: "Prof. Carlos Mendes", role: "Diretor de Clínica", years: "12 anos de experiência", city: "Rio de Janeiro, RJ", specialty: "Gestão Clínica", quote: "Implementamos o MuseTera em nossa clínica com 6 musicoterapeutas. A padronização dos processos e a visibilidade dos resultados aumentaram nossa eficiência em 40% e a satisfação dos pacientes em 35%. Ferramenta indispensável!" },
  { initials: "MS", name: "Mariana Santos", role: "Musicoterapeuta Hospitalar", years: "6 anos de experiência", city: "Brasília, DF", specialty: "Musicoterapia Hospitalar", quote: "Trabalho em ambiente hospitalar onde cada minuto conta. O MuseTera me permite acessar históricos, fazer anotações e gerar relatórios rapidamente. A integração com WhatsApp facilita muito a comunicação com as famílias." },
];

const plans = [
  { id: "30-days" as const, name: "Sem Fidelidade", detail: "30 dias", description: "Flexibilidade máxima para seu negócio", price: "R$ 34,90", suffix: "/mês", features: ["Pacientes ilimitados", "Agendamento avançado", "Relatórios detalhados", "Planos de tratamento", "Suporte prioritário", "50GB de armazenamento"] },
  { id: "6-months" as const, name: "Fidelidade 6 Meses", detail: "economia semestral", description: "Economia com compromisso semestral", price: "R$ 199,00", suffix: "/6 meses", popular: true, features: ["Pacientes ilimitados", "Agendamento avançado", "Relatórios detalhados", "Planos de tratamento", "Suporte prioritário", "50GB de armazenamento"] },
  { id: "12-months" as const, name: "Fidelidade 12 Meses", detail: "melhor custo-benefício", description: "Melhor custo-benefício para sua prática", price: "R$ 399,00", suffix: "/12 meses", features: ["Pacientes ilimitados", "Agendamento avançado", "Relatórios detalhados", "Planos de tratamento", "Suporte prioritário", "50GB de armazenamento"] },
];

const flow = ["Anamnese", "Avaliação", "Plano Musicoterapia", "Intervenção", "Relatório"];

function scrollToSection(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }


function ProductScreenshot({ src, alt, phone = false }: { src: string; alt: string; phone?: boolean }) { return <div className={`product-screenshot ${phone ? "product-screenshot--phone" : ""}`}><img src={src} alt={alt} onError={(event) => { event.currentTarget.style.display = "none"; }} /><div className="product-screenshot__fallback"><BarChart3 size={22} /><span>prévia do sistema MuseTera</span></div></div>; }

function WhatsAppIcon() {
  return <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.55 0 .24 5.31.24 11.84c0 2.09.55 4.13 1.59 5.93L.14 24l6.37-1.67a11.82 11.82 0 0 0 5.57 1.42h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.17-1.23-6.15-3.41-8.43Zm-8.44 18.25h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.78.99 1.01-3.68-.23-.38a9.87 9.87 0 0 1-1.51-5.24C2.18 6.39 6.61 1.96 12.08 1.96c2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.44 9.9-9.91 9.9Zm5.43-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5a9.08 9.08 0 0 1-1.67-2.08c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" /></svg>;
}

const activityNotices = [
  { title: "Condição especial ativa", detail: "Disponível até 01/12/2026", icon: Sparkles },
  { title: "7 dias para testar", detail: "Conheça o sistema sem compromisso", icon: Clock3 },
  { title: "Dados protegidos", detail: "Privacidade e LGPD em foco", icon: ShieldCheck },
  { title: "Tudo em um só lugar", detail: "Pacientes, sessões e evolução", icon: ClipboardList },
];
function ActivityNotifications() {
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("musetera_activity_closed") === "1") { setClosed(true); return; }
    let hideTimer: number | undefined;
    let nextTimer: number | undefined;
    let cursor = 0;
    const showNext = () => {
      setIndex(cursor % activityNotices.length);
      setVisible(true);
      hideTimer = window.setTimeout(() => {
        setVisible(false);
        nextTimer = window.setTimeout(() => { cursor += 1; showNext(); }, 12000);
      }, 5000);
    };
    nextTimer = window.setTimeout(showNext, 6000);
    return () => { if (hideTimer) window.clearTimeout(hideTimer); if (nextTimer) window.clearTimeout(nextTimer); };
  }, []);
  if (closed || index < 0) return null;
  const notice = activityNotices[index];
  const Icon = notice.icon;
  return <div role="status" aria-live="polite" className={`activity-notification ${visible ? "is-visible" : ""}`}>
    <div className="activity-notification__icon"><Icon size={18} /></div>
    <div className="activity-notification__copy"><strong>{notice.title}</strong><span>{notice.detail}</span><small>informação do MuseTera</small></div>
    <button aria-label="Fechar notificações" onClick={() => { sessionStorage.setItem("musetera_activity_closed", "1"); setClosed(true); }}><X size={13} /></button>
  </div>;
}
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState("dashboard");
  const [promoClosed, setPromoClosed] = useState(false);
  const [promoRemaining, setPromoRemaining] = useState(getPromoRemaining());
  useEffect(() => { if (typeof window === "undefined") return; if (sessionStorage.getItem(PROMO_CLOSED_KEY) === "1") { setPromoClosed(true); document.documentElement.style.setProperty("--promo-h", "0px"); return; } document.documentElement.style.setProperty("--promo-h", "42px"); setPromoRemaining(getPromoRemaining()); const timer = window.setInterval(() => setPromoRemaining(getPromoRemaining()), 1000); return () => { window.clearInterval(timer); document.documentElement.style.setProperty("--promo-h", "0px"); }; }, []);
  const { h, m, s } = formatPromoTime(promoRemaining);
  const featureSrc = activeFeature === "anamnese" ? anamneseAsset : activeFeature === "evolucao" ? evolucaoAsset : dashboardAsset;
  const createPreference = trpc.payments.createPreference.useMutation();
  const handleCheckout = async (plan: (typeof plans)[number]) => {
    try {
      const data = await createPreference.mutateAsync({ plan: plan.id });
      window.location.assign(data.initPoint);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível abrir o checkout agora.");
    }
  };

  return <div className="muse-site">
    {!promoClosed && <div className="promo-bar"><div className="promo-bar__inner"><Clock3 size={14} /><span className="promo-bar__copy">Condição especial de lançamento termina em</span><span className="promo-bar__copy promo-bar__copy--mobile">Termina em</span><div className="promo-countdown"><b>{h}</b><i>:</i><b>{m}</b><i>:</i><b>{s}</b></div><button onClick={() => scrollToSection("precos")}>Ver condição <ArrowRight size={13} /></button><button className="promo-close" aria-label="Fechar aviso de promoção" onClick={() => { sessionStorage.setItem(PROMO_CLOSED_KEY, "1"); document.documentElement.style.setProperty("--promo-h", "0px"); setPromoClosed(true); }}><X size={14} /></button></div></div>}
    <header className={`muse-header ${!promoClosed ? "muse-header--with-promo" : ""}`}><a href="#home" className="muse-brand"><span className="muse-brand__mark"><img src={brandMark} alt="" /></span><span><strong>MuseTera</strong><small>GESTÃO PARA MUSICOTERAPEUTAS</small></span></a><nav className={`muse-nav ${menuOpen ? "muse-nav--open" : ""}`}>{navItems.map((item) => <a href={`#${item.id}`} key={item.id} onClick={() => setMenuOpen(false)}>{item.label}</a>)}<button className="header-login" onClick={() => window.open("https://portal.musetera.com.br/login", "_top")}>Acessar sistema <ArrowRight size={14} /></button></nav><button className="muse-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></header>

    <main>
      <section className="muse-hero" id="home"><video className="muse-hero__video" autoPlay muted loop playsInline preload="metadata" poster={heroImage} aria-hidden="true"><source src={heroVideo} type="video/mp4" /></video><div className="muse-hero__texture" style={{ backgroundImage: `url(${heroImage})` }} /><div className="muse-hero__wash" /><div className="muse-container muse-hero__inner"><div className="muse-hero__copy"><span className="pill-label"><Music2 size={13} /> Tecnologia que entende o cuidado</span><div className="hero-wordmark"><img src={brandMark} alt="" /><span>MuseTera</span></div><h1>Mais tempo para <em>cuidar.</em><br />Menos tempo <strong>organizando.</strong></h1><p>O sistema completo para musicoterapeutas registrarem sessões, acompanharem a evolução e conduzirem cada plano terapêutico com mais clareza.</p><div className="hero-actions"><button className="muse-button muse-button--gold" onClick={() => scrollToSection("recursos")}>Conhecer o sistema <ArrowRight size={15} /></button><button className="muse-button muse-button--ghost" onClick={() => scrollToSection("depoimentos")}><MessageCircle size={15} /> Falar com a equipe</button></div><div className="hero-trust"><span><UsersRound size={14} /> +500 profissionais</span><span><ShieldCheck size={14} /> LGPD em foco</span><span><Check size={14} /> 7 dias para testar</span></div></div></div><button className="hero-scroll" onClick={() => scrollToSection("sobre")}><span>Descubra mais</span><ChevronDown size={17} /></button></section>

      <section className="trust-section"><div className="muse-container trust-pills"><span><ShieldCheck size={14} /> LGPD Compliance</span><span><ShieldCheck size={14} /> ISO 27001</span><span><UsersRound size={14} /> Associação Brasileira de Musicoterapia</span></div></section>

      <section className="about-section" id="sobre"><div className="muse-container section-heading section-heading--center"><span className="section-kicker">Quem somos</span><h2>Sobre o MuseTera</h2><p>Nascemos da necessidade real de musicoterapeutas por uma solução completa e especializada para gestão de suas práticas clínicas.</p></div><div className="muse-container about-content"><div className="history"><span className="section-kicker">Nossa história</span><div className="history-item"><b>2019</b><p>O MuseTera foi criado por uma equipe multidisciplinar de musicoterapeutas, desenvolvedores e especialistas em saúde digital.</p></div><div className="history-item"><b>2021</b><p>Após anos de pesquisa em parceria com profissionais da musicoterapia, lançamos a plataforma completa.</p></div><div className="history-item"><b>Hoje</b><p>Somos uma solução especializada para musicoterapeutas em todo o Brasil.</p></div></div><div className="about-stats"><div><strong>5+</strong><span>Anos de experiência</span></div><div><strong>500+</strong><span>Musicoterapeutas ativos</span></div><div><strong>15k+</strong><span>Sessões realizadas</span></div><div><strong>99,9%</strong><span>Uptime garantido</span></div></div></div><div className="muse-container mission-box"><span className="section-kicker">Nossa missão</span><p>“Capacitar musicoterapeutas com tecnologia de ponta para que possam focar no que fazem de melhor: <em>transformar vidas através da música.</em> Acreditamos que a tecnologia deve simplificar, não complicar.”</p></div></section>

      <section className="live-section" id="recursos"><div className="muse-container section-heading"><span className="section-kicker">Sistema ao vivo</span><h2>Gerencie sua prática de<br /><em>musicoterapia com facilidade</em></h2><p>Uma plataforma completa para acompanhar o progresso dos seus pacientes, agendar sessões e organizar todo o seu trabalho terapêutico em um só lugar.</p></div><div className="muse-container workflow"><span className="section-kicker">Fluxo completo</span><div className="workflow-items">{flow.map((item, index) => <div key={item} className={index === 2 ? "is-active" : ""}><span>{String(index + 1).padStart(2, "0")}</span><b>{item}</b>{index < flow.length - 1 && <i />}</div>)}</div></div><div className="muse-container feature-product"><div className="feature-product__copy"><span className="product-url">portal.musetera.app / {activeFeature}</span><h3>Sua prática,<br /><em>em sintonia.</em></h3><p>Dados organizados, decisões mais claras e mais tempo para o cuidado.</p><div className="product-actions"><button className="muse-button muse-button--gold" onClick={() => window.open("https://portal.musetera.com.br/login", "_top")}>Acessar sistema <ArrowRight size={14} /></button><a href="https://wa.me/5581985436981?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+MuseTera." target="_top" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a></div></div><div className="feature-product__screen"><div className="feature-tabs">{[{ id: "dashboard", label: "Dashboard" }, { id: "anamnese", label: "Anamnese" }, { id: "evolucao", label: "Evolução" }].map((tab) => <button className={activeFeature === tab.id ? "is-active" : ""} key={tab.id} onClick={() => setActiveFeature(tab.id)}>{tab.label}</button>)}</div><ProductScreenshot src={featureSrc} alt={`Tela ${activeFeature} do sistema MuseTera`} phone={activeFeature === "dashboard"} /></div></div></section>

      <section className="testimonials-section" id="depoimentos"><div className="muse-container section-heading section-heading--center"><span className="section-kicker">Experiências reais</span><h2>O que dizem nossos<br /><em>profissionais</em></h2><p>Musicoterapeutas de todo o Brasil já estão transformando suas práticas com o MuseTera.</p></div><div className="muse-container testimonials-grid">{testimonials.map((item) => <article className="testimonial-card" key={item.name}><div className="testimonial-card__verified"><ShieldCheck size={14} /> Verificado</div><p className="testimonial-card__quote">“{item.quote}”</p><div className="testimonial-card__person"><span>{item.initials}</span><div><strong>{item.name}</strong><small>{item.role}</small></div></div><div className="testimonial-card__meta"><span>{item.years}</span><span>{item.city}</span><span>{item.specialty}</span></div></article>)}</div></section>

      <section className="pricing-section" id="precos"><div className="muse-container section-heading section-heading--center"><span className="section-kicker">Planos que crescem com você</span><h2>Escolha o plano ideal<br /><em>para sua prática</em></h2><p>Todos os planos incluem suporte completo para você começar com tranquilidade.</p></div><div className="muse-container plans-grid">{plans.map((plan) => <article className={`plan-card ${plan.popular ? "plan-card--popular" : ""}`} key={plan.name}>{plan.popular && <span className="plan-popular">Mais Popular</span>}<div className="plan-card__top"><h3>{plan.name}</h3><span>{plan.detail}</span><p>{plan.description}</p></div><div className="plan-price"><strong>{plan.price}</strong><small>{plan.suffix}</small></div>{plan.popular && <div className="plan-offer">⚡ Restam apenas 5 vagas neste preço</div>}<div className="plan-guarantee">7 dias de garantia de reembolso</div><div className="plan-features">{plan.features.map((feature) => <span key={feature}><Check size={14} />{feature}</span>)}</div><button className={plan.popular ? "muse-button muse-button--gold" : "muse-button muse-button--outline"} onClick={() => handleCheckout(plan)} disabled={createPreference.isPending}>{createPreference.isPending ? "Abrindo checkout..." : "Assinar Plano"} <ArrowRight size={14} /></button></article>)}</div></section>

      <section className="contact-section" id="contato"><div className="muse-container contact-inner"><div><span className="section-kicker">Pronto para começar?</span><h2>Mais tempo para cuidar.<br /><em>Fale com a equipe.</em></h2><p>Descubra como o MuseTera pode simplificar sua rotina e acompanhar o crescimento da sua prática.</p></div><div className="contact-card"><MessageCircle size={20} /><h3>Vamos conversar</h3><p>Estamos aqui para ajudar você a encontrar o plano ideal.</p><a href="mailto:portal.musetera@gmail.com">portal.musetera@gmail.com <ArrowRight size={14} /></a><a href="https://wa.me/5581985436981?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+MuseTera." target="_top" rel="noreferrer"><MessageCircle size={14} /> WhatsApp</a></div></div></section>
    </main>

    <footer className="muse-footer"><div className="muse-container muse-footer__grid"><a href="#home" className="muse-brand"><span className="muse-brand__mark"><img src={brandMark} alt="" /></span><span><strong>MuseTera</strong><small>GESTÃO PARA MUSICOTERAPEUTAS</small></span></a><p>Tecnologia simples e especializada para que musicoterapeutas organizem sua prática e estejam mais presentes no cuidado.</p><div className="footer-links"><a href="#recursos">Recursos</a><a href="#precos">Preços</a><a href="#sobre">Sobre o MuseTera</a><a href="#contato">Falar com a equipe</a><a href="mailto:portal.musetera@gmail.com">E-mail</a><a href="https://www.instagram.com/sistema_musetera/" target="_blank" rel="noreferrer">Instagram</a></div></div><div className="muse-container muse-footer__bottom"><span>© 2026 MuseTera</span><span>Privacidade · Termos de uso · LGPD</span><a href="#home">voltar ao topo <ArrowRight size={13} /></a></div></footer><ActivityNotifications /><a className="floating-whatsapp" href="https://wa.me/5581985436981?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+o+MuseTera." target="_top" rel="noreferrer" aria-label="Fale conosco no WhatsApp"><span className="floating-whatsapp__halo" aria-hidden="true" /><WhatsAppIcon /><span className="floating-whatsapp__label">Fale conosco</span></a>
  </div>;
}
