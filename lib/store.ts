import { kv } from "@vercel/kv";
import type { InvoiceData, StoredInvoice } from "./types";

const TTL = 60 * 60 * 24 * 30; // 30 jours

function genId(): string {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
  ).toUpperCase();
}

export async function createInvoice(data: InvoiceData): Promise<StoredInvoice> {
  const id = genId();
  const inv: StoredInvoice = { id, data, paid: false, createdAt: Date.now() };
  await kv.set(`invoice:${id}`, inv, { ex: TTL });
  return inv;
}

export async function getInvoice(id: string): Promise<StoredInvoice | undefined> {
  return (await kv.get<StoredInvoice>(`invoice:${id}`)) ?? undefined;
}

export async function markPaid(id: string): Promise<void> {
  const inv = await kv.get<StoredInvoice>(`invoice:${id}`);
  if (inv) {
    await kv.set(`invoice:${id}`, { ...inv, paid: true }, { ex: TTL });
  }
}
