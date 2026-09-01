import { describe, expect, it } from "vitest";

describe("Mercado Pago credentials", () => {
  it("authenticates the configured access token with the API", async () => {
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    expect(token, "MERCADOPAGO_ACCESS_TOKEN is required").toBeTruthy();

    const response = await fetch("https://api.mercadopago.com/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.ok, `Mercado Pago returned HTTP ${response.status}`).toBe(true);
    const payload = await response.json() as { id?: number };
    expect(payload.id).toBeTypeOf("number");
  }, 15_000);
});
