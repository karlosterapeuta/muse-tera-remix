import { describe, expect, it, vi } from "vitest";
import { Preference } from "mercadopago";
import { appRouter } from "./routers";

describe("payments.createPreference", () => {
  it("creates a Checkout Pro preference with public return URLs without exposing credentials", async () => {
    const create = vi.spyOn(Preference.prototype, "create").mockResolvedValue({
      id: "pref_test_123",
      init_point: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=pref_test_123",
    } as never);

    const caller = appRouter.createCaller({
      user: undefined,
      req: {
        protocol: "https",
        get: (name: string) => name === "host" ? "musetera.test" : undefined,
      } as never,
      res: {} as never,
    });

    const result = await caller.payments.createPreference({ plan: "30-days" });
    const request = create.mock.calls[0]?.[0] as {
      body: {
        items: Array<{ unit_price: number }>;
        notification_url?: string;
        back_urls: { success: string; pending: string; failure: string };
        auto_return: string;
      };
    };

    expect(result).toEqual({
      preferenceId: "pref_test_123",
      initPoint: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=pref_test_123",
    });
    expect(request.body.items[0]?.unit_price).toBe(69.9);
    expect(request.body.notification_url).toBe(process.env.MERCADOPAGO_WEBHOOK_URL);
    expect(request.body.back_urls).toEqual({
      success: "https://musetera.test/?payment=success",
      pending: "https://musetera.test/?payment=pending",
      failure: "https://musetera.test/?payment=failure",
    });
    expect(request.body.auto_return).toBe("approved");
    expect(JSON.stringify(request)).not.toContain("APP_USR-");

    create.mockRestore();
  });

  it("falls back to a public HTTPS return origin when the request is local", async () => {
    const create = vi.spyOn(Preference.prototype, "create").mockResolvedValue({
      id: "pref_test_local",
      init_point: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=pref_test_local",
    } as never);

    const caller = appRouter.createCaller({
      user: undefined,
      req: {
        protocol: "http",
        get: (name: string) => name === "host" ? "localhost:3000" : undefined,
      } as never,
      res: {} as never,
    });

    await caller.payments.createPreference({ plan: "12-months" });
    const request = create.mock.calls[0]?.[0] as { body: { back_urls: { success: string } } };

    expect(request.body.back_urls.success).toBe("https://museterasite.netlify.app/?payment=success");

    create.mockRestore();
  });
});
