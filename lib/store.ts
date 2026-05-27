/**
 * Les données de facture sont stockées directement dans les métadonnées
 * de la session Stripe (découpées en chunks de 450 chars).
 * Aucune base de données externe requise.
 */
import { stripe } from "./stripe";
import type { InvoiceData } from "./types";

const CHUNK_SIZE = 450;

/** Encode l'invoice dans les métadonnées Stripe */
export function encodeInvoiceMeta(data: InvoiceData): Record<string, string> {
  const json = JSON.stringify(data);
  const chunks: Record<string, string> = {};
  let i = 0;
  while (i * CHUNK_SIZE < json.length) {
    chunks[`inv_${i}`] = json.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    i++;
  }
  chunks["inv_n"] = String(i);
  return chunks;
}

/** Reconstruit l'invoice depuis les métadonnées Stripe */
export function decodeInvoiceMeta(
  meta: Record<string, string>
): InvoiceData | null {
  try {
    const n = parseInt(meta["inv_n"] ?? "0");
    if (!n) return null;
    let json = "";
    for (let i = 0; i < n; i++) json += meta[`inv_${i}`] ?? "";
    return JSON.parse(json) as InvoiceData;
  } catch {
    return null;
  }
}

/** Vérifie si une session Stripe est payée et retourne les données */
export async function getInvoiceFromSession(sessionId: string): Promise<{
  data: InvoiceData;
  paid: boolean;
  invoiceNumber: string;
} | null> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const data = decodeInvoiceMeta(
      (session.metadata ?? {}) as Record<string, string>
    );
    if (!data) return null;
    return {
      data,
      paid: session.payment_status === "paid",
      invoiceNumber: data.invoiceNumber,
    };
  } catch {
    return null;
  }
}
