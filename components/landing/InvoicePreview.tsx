export default function InvoicePreview() {
  return (
    <div className="relative pl-10">
      {/* Carte principale — légère rotation */}
      <div
        className="bg-paper rounded-3xl p-6 shadow-invoice"
        style={{ transform: "rotate(2deg)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center text-paper text-[13px] font-bold flex-shrink-0">
              EX
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink">[Émetteur]</p>
              <p className="text-[11px] text-ink/55 uppercase tracking-wide">
                Facture — exemple
              </p>
            </div>
          </div>
          <span className="bg-accent-soft text-accent-deep rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
            PAYÉE
          </span>
        </div>

        {/* Lignes */}
        <div className="space-y-2 mb-5">
          {["Prestation de service", "Consultation", "Frais divers"].map((item) => (
            <div
              key={item}
              className="flex justify-between items-center border-t border-dashed border-ink/10 pt-2"
            >
              <span className="text-[13px] text-ink/50 w-40 h-3 bg-ink/8 rounded" />
              <span className="text-[13px] text-ink/40 w-12 h-3 bg-ink/6 rounded" />
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-ink/10 pt-4 flex items-center justify-between mb-5">
          <span className="text-[13px] text-ink/55 font-medium">Total TTC</span>
          <span className="text-[26px] font-semibold text-ink tracking-tight">
            1 234,00 €
          </span>
        </div>

        {/* Bouton download */}
        <button className="w-full bg-ink text-paper rounded-2xl py-3 text-[13px] font-medium flex items-center justify-center gap-2 opacity-90">
          ↓ Télécharger le PDF
        </button>
      </div>

      {/* Mini badge stat */}
      <div
        className="absolute -bottom-4 -left-2 flex items-center gap-3 bg-paper rounded-2xl px-4 py-3 shadow-card"
        style={{ transform: "rotate(-3deg)" }}
      >
        <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center text-accent text-[20px] font-bold flex-shrink-0">
          €
        </div>
        <div>
          <p className="text-[12px] font-semibold text-ink">Conforme</p>
          <p className="text-[11px] text-ink/55">TVA · Mentions légales</p>
        </div>
      </div>
    </div>
  );
}
