import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  // On n'explose pas au build pour permettre le déploiement avant config.
  console.warn(
    "[stripe] STRIPE_SECRET_KEY manquant — le paiement ne fonctionnera pas."
  );
}

export const stripe = new Stripe(secretKey ?? "sk_test_placeholder", {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const INVOICE_PRICE_CENTS = Number(
  process.env.INVOICE_PRICE_CENTS ?? "100"
);
