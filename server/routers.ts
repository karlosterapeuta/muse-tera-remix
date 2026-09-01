import { z } from "zod";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { ENV } from "./_core/env";
import { TRPCError } from "@trpc/server";

export const checkoutPlans = {
  "30-days": { title: "MuseTera — Plano 30 dias", price: 69.9 },
  "6-months": { title: "MuseTera — Plano 6 meses", price: 399 },
  "12-months": { title: "MuseTera — Plano 12 meses", price: 699 },
} as const;

const planSchema = z.object({ plan: z.enum(["30-days", "6-months", "12-months"]) });

// Mercado Pago rejects auto_return when the success URL is missing or not public.
// Keep a canonical HTTPS origin for production; during tests/development we can
// still derive the origin from the request so the preference remains easy to test.
const DEFAULT_MERCADO_PAGO_RETURN_ORIGIN = "https://museterasite.netlify.app";

function getMercadoPagoReturnOrigin(req: { protocol: string; get(name: string): string | undefined }) {
  if (ENV.isProduction) {
    try {
      const configuredUrl = new URL(ENV.mercadoPagoReturnUrl || DEFAULT_MERCADO_PAGO_RETURN_ORIGIN);
      if (configuredUrl.protocol === "https:") return configuredUrl.origin;
    } catch {
      // Fall through to the canonical public HTTPS origin.
    }
    return DEFAULT_MERCADO_PAGO_RETURN_ORIGIN;
  }

  const forwardedProto = req.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const forwardedHost = req.get("x-forwarded-host")?.split(",")[0]?.trim();
  const protocol = forwardedProto === "https" ? forwardedProto : req.protocol;
  const host = forwardedHost || req.get("host");

  if (protocol === "https" && host && !/^localhost(?::\\d+)?$|^127\\.0\\.0\\.1(?::\\d+)?$/.test(host)) {
    return `https://${host}`;
  }

  return DEFAULT_MERCADO_PAGO_RETURN_ORIGIN;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  payments: router({
    createPreference: publicProcedure.input(planSchema).mutation(async ({ input, ctx }) => {
      const selectedPlan = checkoutPlans[input.plan];
      if (!ENV.mercadoPagoAccessToken) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Mercado Pago não está configurado no servidor." });
      }

      const origin = getMercadoPagoReturnOrigin(ctx.req);
      const backUrls = {
        success: new URL("/?payment=success", origin).toString(),
        pending: new URL("/?payment=pending", origin).toString(),
        failure: new URL("/?payment=failure", origin).toString(),
      };
      const client = new MercadoPagoConfig({
        accessToken: ENV.mercadoPagoAccessToken,
        options: { timeout: 5000 },
      });
      const preferenceClient = new Preference(client);
      const preference = await preferenceClient.create({
        body: {
          items: [{
            id: input.plan,
            title: selectedPlan.title,
            quantity: 1,
            currency_id: "BRL",
            unit_price: selectedPlan.price,
          }],
          external_reference: `musetera-${input.plan}-${crypto.randomUUID()}`,
          notification_url: ENV.mercadoPagoWebhookUrl || undefined,
          back_urls: backUrls,
          auto_return: "approved",
        },
      });

      const initPoint = preference.init_point ?? preference.sandbox_init_point;
      if (!initPoint) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Mercado Pago não retornou o link de checkout." });
      }

      return { preferenceId: preference.id, initPoint };
    }),
  }),
});

export type AppRouter = typeof appRouter;
