import { useEffect, useState } from 'react';
import { Flame, X } from 'lucide-react';

const START_KEY = 'musetera_promo_start';
const CLOSED_KEY = 'musetera_promo_closed';
const DURATION_MS = 24 * 60 * 60 * 1000;

const getRemaining = () => {
  if (typeof window === 'undefined') return DURATION_MS;
  let start = Number(localStorage.getItem(START_KEY));
  const now = Date.now();
  if (!start || now - start >= DURATION_MS) {
    start = now;
    localStorage.setItem(START_KEY, String(start));
  }
  return Math.max(0, DURATION_MS - (now - start));
};

const format = (ms: number) => {
  const total = Math.floor(ms / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, '0');
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return { h, m, s };
};

const setNavOffset = (px: number) => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--promo-h', `${px}px`);
  }
};

const PromoBar = () => {
  const [remaining, setRemaining] = useState<number>(DURATION_MS);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(CLOSED_KEY) === '1') {
      setClosed(true);
      setNavOffset(0);
      return;
    }
    setNavOffset(40);
    setRemaining(getRemaining());
    const id = window.setInterval(() => {
      setRemaining(getRemaining());
    }, 1000);
    return () => {
      window.clearInterval(id);
      setNavOffset(0);
    };
  }, []);

  if (closed) return null;

  const { h, m, s } = format(remaining);

  const scrollToPricing = () => {
    document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-10 bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#1e40af] text-black shadow-lg shadow-blue-900/30 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] animate-[shine_3s_linear_infinite]" style={{ backgroundSize: '200% 100%' }} />
      <div className="relative h-full container-padding flex items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-sm font-medium">
        <Flame className="h-4 w-4 text-black/70 animate-pulse flex-shrink-0" />
        <span className="hidden sm:inline">Promoção de lançamento acaba em</span>
        <span className="sm:hidden">Acaba em</span>
        <div className="flex items-center gap-1 font-mono font-bold">
          <span className="bg-black/20 rounded px-1.5 py-0.5 tabular-nums">{h}</span>
          <span>:</span>
          <span className="bg-black/20 rounded px-1.5 py-0.5 tabular-nums">{m}</span>
          <span>:</span>
          <span className="bg-black/20 rounded px-1.5 py-0.5 tabular-nums">{s}</span>
        </div>
        <button
          onClick={scrollToPricing}
          className="ml-1 sm:ml-2 bg-black text-blue-200 hover:bg-black/80 transition-colors font-bold rounded-full px-3 py-1 text-[11px] sm:text-xs shadow"
        >
          Garantir desconto
        </button>
        <button
          aria-label="Fechar aviso de promoção"
          onClick={() => {
            sessionStorage.setItem(CLOSED_KEY, '1');
            setNavOffset(0);
            setClosed(true);
          }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <style>{`@keyframes shine { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </div>
  );
};

export default PromoBar;
