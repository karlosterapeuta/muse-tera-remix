import { describe, expect, it } from "vitest";
import { checkoutPlans } from "./routers";

describe("Mercado Pago plan catalog", () => {
  it("keeps checkout prices aligned with the public plans", () => {
    expect(checkoutPlans["30-days"].price).toBe(69.9);
    expect(checkoutPlans["6-months"].price).toBe(399);
    expect(checkoutPlans["12-months"].price).toBe(699);
    expect(Object.keys(checkoutPlans)).toHaveLength(3);
  });
});
