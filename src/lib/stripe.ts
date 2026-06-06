import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      // In development, we might not have the key yet.
      // We'll return a mock if needed, but for now let's throw or handle gracefully.
      console.warn("STRIPE_SECRET_KEY is missing. Stripe functionality will be limited.");
      return new Stripe("sk_test_mock", { apiVersion: "2023-10-16" as any });
    }
    stripeClient = new Stripe(key, {
      apiVersion: "2023-10-16" as any,
    });
  }
  return stripeClient;
}
