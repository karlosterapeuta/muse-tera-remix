/* STYLE SYSTEM: Infraestrutura Editorial — estado de erro em grafite, âmbar Sinal, mono metadata e motivos de conexão para preservar a identidade em toda rota. */
import { ArrowUpRight, ChevronLeft, Circle } from "lucide-react";
import { useLocation } from "wouter";

const brandMark = "/manus-storage/musetera-mark_6cb27931.png";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="missing-page">
      <div className="missing-page__grid" />
      <div className="missing-page__orbit missing-page__orbit--one" />
      <div className="missing-page__orbit missing-page__orbit--two" />
      <header className="missing-header">
        <button className="missing-brand" onClick={() => setLocation("/")} aria-label="Voltar ao início">
          <img src={brandMark} alt="" />
          <span><i>SIte</i> MuseTera</span>
        </button>
        <span className="missing-header__meta">system / routing</span>
      </header>
      <main className="missing-main">
        <div className="missing-main__code"><span>error</span> 404</div>
        <div className="missing-main__line"><span /><span /><span /></div>
        <p className="eyebrow"><Circle size={8} fill="currentColor" /> Node não localizado / sinal interrompido</p>
        <h1>Este caminho<br /><em>ainda não existe.</em></h1>
        <p className="missing-main__copy">A rota que você procura saiu do mapa. Retorne ao sistema principal e escolha o próximo movimento.</p>
        <button className="button button--primary" onClick={() => setLocation("/")}>
          Voltar ao início <ChevronLeft size={16} />
        </button>
      </main>
      <footer className="missing-footer">
        <span>SIte MuseTera / digital studio</span>
        <span>signal lost at <b>404.00</b></span>
        <button onClick={() => setLocation("/")}>recalibrar <ArrowUpRight size={13} /></button>
      </footer>
    </div>
  );
}
