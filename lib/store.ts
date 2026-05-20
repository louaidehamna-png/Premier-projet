import type { InvoiceData, StoredInvoice } from "./types";

/**
 * Store en mémoire pour les factures en attente / payées.
 *
 * ⚠️ MVP UNIQUEMENT : ce store est volatile (perdu au redémarrage).
 * Pour la prod, remplace ceci par une base de données (ex: Vercel KV,
 * Postgres + Prisma, Redis...).
 */
type Store = {
  invoices: Map<string, StoredInvoice>;
};

declare global {
  // eslint-disable-next-line no-var
  var __invoiceStore: Store | undefined;
}

const store: Store =
  globalThis.__invoiceStore ?? { invoices: new Map<string, StoredInvoice>() };

if (process.env.NODE_ENV !== "production") {
  globalThis.__invoiceStore = store;
}

function genId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
  ).toUpperCase();
}

export function createInvoice(data: InvoiceData): StoredInvoice {
  const id = genId();
  const inv: StoredInvoice = {
    id,
    data,
    paid: false,
    createdAt: Date.now(),
  };
  store.invoices.set(id, inv);
  return inv;
}

export function getInvoice(id: string): StoredInvoice | undefined {
  return store.invoices.get(id);
}

export function markPaid(id: string): void {
  const inv = store.invoices.get(id);
  if (inv) {
    inv.paid = true;
    store.invoices.set(id, inv);
  }
}
