import { useEffect, useState } from 'react';
import { ArrowRight, Clock3, X } from 'lucide-react';

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
  const [remaining, setRemaining] = useState(DURATION_MS);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(CLOSED_KEY) === '1') {
      setClosed(true);
      setNavOffset(0);
      return;
    }

    setNavOffset(42);
    setRemaining(getRemaining());
    const id = window.setInterval(() => setRemaining(getRemaining()), 1000);

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
    <div className="fixed left-0 right-0 top-0 z-[60] h-[42px] overflow-hidden border-b border-amber-200/10 bg-[#101a2b]/95 text-white backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/[0.06] to-transparent" />
      <div className="container-padding relative flex h-full items-center justify-center gap-2 text-[11px] sm:gap-3 sm:text-xs">
        <Clock3 className="h-3.5 w-3.5 shrink-0 text-amber-200" />
        <span className="hidden text-white/65 sm:inline">Condição especial de lançamento termina em</span>
        <span className="text-white/65 sm:hidden">Termina em</span>
        <div className="flex items-center gap-1 font-mono font-semibold tracking-wide text-amber-100">
          <span className="rounded bg-white/[0.08] px-1.5 py-0.5 tabular-nums">{h}</span>
          <span className="text-white/35">:</span>
          <span className="rounded bg-white/[0.08] px-1.5 py-0.5 tabular-nums">{m}</span>
          <span className="text-white/35">:</span>
          <span className="rounded bg-white/[0.08] px-1.5 py-0.5 tabular-nums">{s}</span>
        </div>
        <button
          onClick={scrollToPricing}
          className="group ml-1 inline-flex items-center gap-1.5 rounded-full bg-amber-200 px-3 py-1.5 font-semibold text-slate-950 transition-colors hover:bg-amber-100"
        >
          Ver condição
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </button>
        <button
          aria-label="Fechar aviso de promoção"
          onClick={() => {
            sessionStorage.setItem(CLOSED_KEY, '1');
            setNavOffset(0);
            setClosed(true);
          }}
          className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white sm:right-3"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default PromoBar;
