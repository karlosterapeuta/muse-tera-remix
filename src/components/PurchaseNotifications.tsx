import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

type Purchase = {
  name: string;
  city: string;
  uf: string;
  plan: string;
  minutesAgo: number;
};

const purchases: Purchase[] = [
  { name: 'Mariana S.', city: 'São Paulo', uf: 'SP', plan: 'FIDELIDADE 12 Meses', minutesAgo: 2 },
  { name: 'Carlos R.', city: 'Rio de Janeiro', uf: 'RJ', plan: 'FIDELIDADE 6 Meses', minutesAgo: 4 },
  { name: 'Juliana M.', city: 'Belo Horizonte', uf: 'MG', plan: 'FIDELIDADE 12 Meses', minutesAgo: 7 },
  { name: 'Rafael T.', city: 'Curitiba', uf: 'PR', plan: 'Sem Fidelidade 30 dias', minutesAgo: 11 },
  { name: 'Patrícia L.', city: 'Porto Alegre', uf: 'RS', plan: 'FIDELIDADE 6 Meses', minutesAgo: 14 },
  { name: 'Bruno A.', city: 'Salvador', uf: 'BA', plan: 'FIDELIDADE 12 Meses', minutesAgo: 18 },
  { name: 'Camila F.', city: 'Recife', uf: 'PE', plan: 'FIDELIDADE 6 Meses', minutesAgo: 21 },
  { name: 'Eduardo N.', city: 'Fortaleza', uf: 'CE', plan: 'FIDELIDADE 12 Meses', minutesAgo: 25 },
  { name: 'Larissa V.', city: 'Brasília', uf: 'DF', plan: 'Sem Fidelidade 30 dias', minutesAgo: 28 },
  { name: 'Thiago B.', city: 'Florianópolis', uf: 'SC', plan: 'FIDELIDADE 12 Meses', minutesAgo: 32 },
  { name: 'Renata D.', city: 'Goiânia', uf: 'GO', plan: 'FIDELIDADE 6 Meses', minutesAgo: 36 },
  { name: 'Fernanda P.', city: 'Manaus', uf: 'AM', plan: 'FIDELIDADE 12 Meses', minutesAgo: 41 },
  { name: 'Gustavo H.', city: 'Belém', uf: 'PA', plan: 'FIDELIDADE 6 Meses', minutesAgo: 47 },
  { name: 'Beatriz O.', city: 'Vitória', uf: 'ES', plan: 'FIDELIDADE 12 Meses', minutesAgo: 53 },
  { name: 'André C.', city: 'Natal', uf: 'RN', plan: 'Sem Fidelidade 30 dias', minutesAgo: 58 },
];

const STORAGE_KEY = 'musetera_pn_closed';
const VISIBLE_MS = 5000;
const GAP_MS = 12000;
const INITIAL_DELAY_MS = 6000;

const PurchaseNotifications = () => {
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      setClosed(true);
      return;
    }

    let timeoutId: number | undefined;
    let i = 0;

    const showNext = () => {
      setIndex(i % purchases.length);
      setVisible(true);
      timeoutId = window.setTimeout(() => {
        setVisible(false);
        timeoutId = window.setTimeout(() => {
          i += 1;
          showNext();
        }, GAP_MS);
      }, VISIBLE_MS);
    };

    timeoutId = window.setTimeout(showNext, INITIAL_DELAY_MS);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  if (closed || index < 0) return null;

  const p = purchases[index];
  const initial = p.name.charAt(0);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed z-40 left-3 sm:left-5 bottom-20 sm:bottom-5 max-w-[19rem] sm:max-w-sm transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6 pointer-events-none'
      }`}
    >
      <div className="relative flex items-center gap-3 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-3 pr-8">
        <div className="relative flex-shrink-0">
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-primary/30">
            {initial}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-green-500 flex items-center justify-center ring-2 ring-card">
            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[13px] sm:text-sm font-semibold text-foreground leading-tight truncate">
            {p.name} • {p.city} - {p.uf}
          </p>
          <p className="text-[11px] sm:text-xs text-muted-foreground leading-tight mt-0.5 truncate">
            acabou de assinar o plano <span className="text-primary font-medium">{p.plan}</span>
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="text-[10px] uppercase tracking-wider font-mono text-green-500 font-semibold">
              há {p.minutesAgo} min · verificado
            </span>
          </div>
        </div>

        <button
          aria-label="Fechar notificações"
          onClick={() => {
            sessionStorage.setItem(STORAGE_KEY, '1');
            setClosed(true);
          }}
          className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default PurchaseNotifications;
