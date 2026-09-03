import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

type Purchase = { name: string; city: string; plan: string };

const buyers: Purchase[] = [
  { name: "Ana Paula S.", city: "São Paulo, SP", plan: "Fidelidade 12 Meses" },
  { name: "Carlos M.", city: "Rio de Janeiro, RJ", plan: "Fidelidade 6 Meses" },
  { name: "Mariana S.", city: "Brasília, DF", plan: "Sem Fidelidade" },
  { name: "Juliana R.", city: "Recife, PE", plan: "Fidelidade 6 Meses" },
  { name: "Rafael T.", city: "Belo Horizonte, MG", plan: "Fidelidade 12 Meses" },
  { name: "Fernanda L.", city: "Curitiba, PR", plan: "Fidelidade 6 Meses" },
  { name: "Patrícia A.", city: "Salvador, BA", plan: "Sem Fidelidade" },
  { name: "Bruno C.", city: "Porto Alegre, RS", plan: "Fidelidade 12 Meses" },
  { name: "Camila F.", city: "Fortaleza, CE", plan: "Fidelidade 6 Meses" },
  { name: "Luciana M.", city: "Goiânia, GO", plan: "Fidelidade 6 Meses" },
];

const minutesAgo = [2, 4, 6, 8, 11, 14, 17, 21, 26, 33];

export default function SocialProofPurchases() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const cycle = (delay: number) => {
      timeoutId = setTimeout(() => {
        setVisible(true);
        timeoutId = setTimeout(() => {
          setVisible(false);
          setIndex((i) => (i + 1) % buyers.length);
          cycle(9000 + Math.random() * 6000);
        }, 6000);
      }, delay);
    };
    cycle(6000);
    return () => clearTimeout(timeoutId);
  }, [dismissed, index]);

  if (dismissed) return null;

  const buyer = buyers[index]!;
  const time = minutesAgo[index % minutesAgo.length]!;

  return (
    <div className={`proof-toast ${visible ? "proof-toast--in" : ""}`} role="status" aria-live="polite">
      <span className="proof-toast__icon"><Check size={13} /></span>
      <div className="proof-toast__body">
        <strong>{buyer.name}</strong>
        <p>assinou o plano <em>{buyer.plan}</em></p>
        <small>{buyer.city} · há {time} min</small>
      </div>
      <button type="button" aria-label="Fechar aviso" onClick={() => setDismissed(true)}><X size={12} /></button>
    </div>
  );
}
