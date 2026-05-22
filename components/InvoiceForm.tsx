"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { InvoiceData, InvoiceLine } from "@/lib/types";
import { computeTotals, fmtEUR } from "@/lib/totals";

const today = () => new Date().toISOString().slice(0, 10);

const emptyLine = (): InvoiceLine => ({
  description: "",
  quantity: 1,
  unitPriceHT: 0,
  vatRate: 20,
});

export default function InvoiceForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<InvoiceData>({
    issuerName: "",
    issuerAddress: "",
    issuerSiret: "",
    issuerVatNumber: "",
    issuerEmail: "",
    clientName: "",
    clientAddress: "",
    clientSiret: "",
    clientVatNumber: "",
    invoiceNumber: `F-${new Date().getFullYear()}-${Math.floor(
      Math.random() * 10000
    )
      .toString()
      .padStart(4, "0")}`,
    invoiceDate: today(),
    dueDate: "",
    lines: [emptyLine()],
    paymentTerms: "Paiement à 30 jours",
    notes: "",
  });

  const totals = useMemo(() => computeTotals(data), [data]);

  function update<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function updateLine(idx: number, patch: Partial<InvoiceLine>) {
    setData((d) => ({
      ...d,
      lines: d.lines.map((l, i) => (i === idx ? { ...l, ...patch } : l)),
    }));
  }

  function addLine() {
    setData((d) => ({ ...d, lines: [...d.lines, emptyLine()] }));
  }

  function removeLine(idx: number) {
    setData((d) => ({
      ...d,
      lines: d.lines.length > 1 ? d.lines.filter((_, i) => i !== idx) : d.lines,
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validation simple
    if (!data.issuerName || !data.clientName || data.lines.length === 0) {
      setError(
        "Merci de renseigner au minimum l'émetteur, le client et une ligne."
      );
      return;
    }
    if (data.lines.some((l) => !l.description)) {
      setError("Chaque ligne doit avoir une description.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error ?? "Erreur lors de la création du paiement");
      }
      window.location.href = json.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Émetteur / Client */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-lg mb-4 text-brand-900">
            Vos informations (émetteur)
          </h3>
          <div className="space-y-3">
            <div>
              <label className="label">Nom / Raison sociale *</label>
              <input
                className="input"
                required
                value={data.issuerName}
                onChange={(e) => update("issuerName", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Adresse complète *</label>
              <textarea
                className="input"
                required
                rows={3}
                value={data.issuerAddress}
                onChange={(e) => update("issuerAddress", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">SIRET</label>
                <input
                  className="input"
                  value={data.issuerSiret}
                  onChange={(e) => update("issuerSiret", e.target.value)}
                />
              </div>
              <div>
                <label className="label">N° TVA</label>
                <input
                  className="input"
                  value={data.issuerVatNumber}
                  onChange={(e) => update("issuerVatNumber", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                value={data.issuerEmail}
                onChange={(e) => update("issuerEmail", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-lg mb-4 text-brand-900">Client</h3>
          <div className="space-y-3">
            <div>
              <label className="label">Nom / Raison sociale *</label>
              <input
                className="input"
                required
                value={data.clientName}
                onChange={(e) => update("clientName", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Adresse complète *</label>
              <textarea
                className="input"
                required
                rows={3}
                value={data.clientAddress}
                onChange={(e) => update("clientAddress", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">SIRET</label>
                <input
                  className="input"
                  value={data.clientSiret}
                  onChange={(e) => update("clientSiret", e.target.value)}
                />
              </div>
              <div>
                <label className="label">N° TVA</label>
                <input
                  className="input"
                  value={data.clientVatNumber}
                  onChange={(e) => update("clientVatNumber", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facture */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-4 text-brand-900">Facture</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="label">N° de facture *</label>
            <input
              className="input"
              required
              value={data.invoiceNumber}
              onChange={(e) => update("invoiceNumber", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Date de facture *</label>
            <input
              className="input"
              type="date"
              required
              value={data.invoiceDate}
              onChange={(e) => update("invoiceDate", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Date d&apos;échéance</label>
            <input
              className="input"
              type="date"
              value={data.dueDate ?? ""}
              onChange={(e) => update("dueDate", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Lignes */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-4 text-brand-900">
          Lignes de facture
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 pr-2">Description</th>
                <th className="py-2 px-2 w-20">Qté</th>
                <th className="py-2 px-2 w-32">PU HT (€)</th>
                <th className="py-2 px-2 w-24">TVA (%)</th>
                <th className="py-2 px-2 w-28 text-right">Total HT</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {data.lines.map((line, i) => {
                const lineHT = line.quantity * line.unitPriceHT;
                return (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 pr-2">
                      <input
                        className="input"
                        placeholder="Prestation, produit..."
                        value={line.description}
                        onChange={(e) =>
                          updateLine(i, { description: e.target.value })
                        }
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        className="input"
                        type="number"
                        min={0}
                        step="0.01"
                        value={line.quantity}
                        onChange={(e) =>
                          updateLine(i, {
                            quantity: Number(e.target.value) || 0,
                          })
                        }
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        className="input"
                        type="number"
                        min={0}
                        step="0.01"
                        value={line.unitPriceHT}
                        onChange={(e) =>
                          updateLine(i, {
                            unitPriceHT: Number(e.target.value) || 0,
                          })
                        }
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        className="input"
                        type="number"
                        min={0}
                        step="0.1"
                        value={line.vatRate}
                        onChange={(e) =>
                          updateLine(i, {
                            vatRate: Number(e.target.value) || 0,
                          })
                        }
                      />
                    </td>
                    <td className="py-2 px-2 text-right tabular-nums">
                      {fmtEUR(lineHT)}
                    </td>
                    <td className="py-2 px-2 text-right">
                      <button
                        type="button"
                        onClick={() => removeLine(i)}
                        className="text-gray-400 hover:text-red-600"
                        aria-label="Supprimer la ligne"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          onClick={addLine}
          className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          + Ajouter une ligne
        </button>

        {/* Totaux */}
        <div className="mt-6 ml-auto max-w-xs space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Total HT</span>
            <span className="tabular-nums">{fmtEUR(totals.totalHT)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">TVA</span>
            <span className="tabular-nums">{fmtEUR(totals.totalTVA)}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold text-base">
            <span>Total TTC</span>
            <span className="tabular-nums">{fmtEUR(totals.totalTTC)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-4 text-brand-900">
          Conditions & notes
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="label">Conditions de paiement</label>
            <input
              className="input"
              value={data.paymentTerms ?? ""}
              onChange={(e) => update("paymentTerms", e.target.value)}
            />
          </div>
          <div>
            <label className="label">Notes</label>
            <input
              className="input"
              value={data.notes ?? ""}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 text-red-700 p-3 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 bg-white border border-gray-200 rounded-2xl shadow-lg p-4">
        <div className="text-sm text-gray-600">
          🔒 Paiement sécurisé via Stripe — vous serez redirigé.
        </div>
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? "Redirection..." : "Payer 1 € et générer ma facture"}
        </button>
      </div>
    </form>
  );
}
