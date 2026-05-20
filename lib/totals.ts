import type { InvoiceData } from "./types";

export function computeTotals(data: InvoiceData) {
  let totalHT = 0;
  let totalTVA = 0;

  for (const line of data.lines) {
    const lineHT = line.quantity * line.unitPriceHT;
    const lineTVA = lineHT * (line.vatRate / 100);
    totalHT += lineHT;
    totalTVA += lineTVA;
  }

  const totalTTC = totalHT + totalTVA;

  return {
    totalHT: round2(totalHT),
    totalTVA: round2(totalTVA),
    totalTTC: round2(totalTTC),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function fmtEUR(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}
