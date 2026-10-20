const PLANS = {
  "30-days": { title: "MuseTera — Plano 30 dias", price: 34.9 },
  "6-months": { title: "MuseTera — Plano 6 meses", price: 199 },
  "12-months": { title: "MuseTera — Plano 12 meses", price: 399 },
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/payments/create-preference") {
      return env.ASSETS.fetch(request);
    }
    if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);
    const origin = request.headers.get("Origin");
    if (origin && origin !== url.origin) return json({ error: "Origem não autorizada." }, 403);
    if (request.headers.get("Sec-Fetch-Site") === "cross-site") return json({ error: "Requisição não autorizada." }, 403);
    if (!env.MERCADO_PAGO_ACCESS_TOKEN) return json({ error: "Pagamento temporariamente indisponível." }, 503);

    let input;
    try { input = await request.json(); } catch { return json({ error: "Dados inválidos." }, 400); }
    if (!input || typeof input.plan !== "string" || !Object.hasOwn(PLANS, input.plan)) {
      return json({ error: "Plano inválido." }, 400);
    }
    const selected = PLANS[input.plan];
    const backOrigin = env.MERCADO_PAGO_RETURN_ORIGIN || url.origin;
    let returnUrl;
    try {
      returnUrl = new URL(backOrigin);
      if (returnUrl.protocol !== "https:" || returnUrl.username || returnUrl.password || returnUrl.pathname !== "/" || returnUrl.search || returnUrl.hash) throw new Error("invalid");
    } catch { return json({ error: "Configuração de retorno inválida." }, 503); }
    const base = returnUrl.origin;
    const body = {
      items: [{ id: input.plan, title: selected.title, quantity: 1, currency_id: "BRL", unit_price: selected.price }],
      external_reference: `musetera-${input.plan}-${crypto.randomUUID()}`,
      back_urls: {
        success: `${base}/?payment=success`,
        pending: `${base}/?payment=pending`,
        failure: `${base}/?payment=failure`,
      },
      auto_return: "approved",
    };
    if (env.MERCADO_PAGO_WEBHOOK_URL) body.notification_url = env.MERCADO_PAGO_WEBHOOK_URL;
    try {
      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.MERCADO_PAGO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          "X-Idempotency-Key": crypto.randomUUID(),
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok || !result.init_point) {
        console.error("Mercado Pago create preference failed", response.status, result?.message || result?.error || "unknown");
        return json({ error: "Não foi possível iniciar o checkout. Tente novamente." }, 502);
      }
      return json({ initPoint: result.init_point, preferenceId: result.id });
    } catch (error) {
      console.error("Mercado Pago request failed", String(error));
      return json({ error: "Não foi possível iniciar o checkout. Tente novamente." }, 502);
    }
  },
};
