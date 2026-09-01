import { describe, expect, it, vi } from "vitest";
import { Preference } from "mercadopago";
import { appRouter } from "./routers";

describe("payments.createPreference", () => {
  it("creates a Checkout Pro preference without exposing credentials", async () => {
    const create = vi.spyOn(Preference.prototype, "create").mockResolvedValue({
      id: "pref_test_123",
      init_point: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=pref_test_123",
    } as never);

    const caller = appRouter.createCaller({
      user: undefined,
      req: {
        protocol: "https",
        get: () => "musetera.test",
      } as never,
      res: {} as never,
    });

    const result = await caller.payments.createPreference({ plan: "30-days" });
    const request = create.mock.calls[0]?.[0] as { body: { items: Array<{ unit_price: number }>; notification_url?: string; back_urls: { success: string } } };

    expect(result).toEqual({
      preferenceId: "pref_test_123",
      initPoint: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=pref_test_123",
    });
    expect(request.body.items[0]?.unit_price).toBe(69.9);
    expect(request.body.notification_url).toBe(process.env.MERCADOPAGO_WEBHOOK_URL);
    expect(request.body.back_urls.success).toBe("https://musetera.test/?payment=success");
    expect(JSON.stringify(request)).not.toContain("APP_USR-");

    create.mockRestore();
  });
});
