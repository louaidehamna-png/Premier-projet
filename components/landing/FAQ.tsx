"use client";

import { useState } from "react";

const items = [
  {
    q: "C'est légal ? La facture est valable pour ma compta ?",
    a: "Oui. Le modèle inclut toutes les mentions obligatoires en France (identité émetteur/client, SIRET, n° de facture séquentiel, date, désignation, quantités, TVA, total HT/TTC, conditions de paiement). Votre comptable peut l'utiliser tel quel.",
  },
  {
    q: "Comment fonctionne la TVA ? Je suis micro-entreprise.",
    a: "Vous choisissez votre régime au moment de remplir : TVA 20 %, taux réduits (10 %, 5,5 %, 2,1 %), ou mention \"TVA non applicable, art. 293 B du CGI\" pour la franchise en base. Les totaux HT/TVA/TTC sont calculés automatiquement.",
  },
  {
    q: "Que devient ma carte bancaire ? Et mes données ?",
    a: "Le paiement passe directement par Stripe (PCI-DSS niveau 1). Aucune donnée carte ne transite ni n'est stockée chez nous. Vos données de facturation sont conservées 10 ans pour des raisons légales et supprimables sur demande.",
  },
  {
    q: "Si je me trompe dans la facture, je peux la corriger ?",
    a: "Avant le paiement, oui — vous modifiez librement. Après paiement, le PDF est figé (c'est la loi). Vous pouvez en émettre une nouvelle avec mention \"annule et remplace\" pour 1 € supplémentaire.",
  },
  {
    q: "C'est vraiment 1 € ? Sans frais cachés ?",
    a: "1 € TTC, une fois, par facture émise. Pas d'abonnement, pas de prélèvement récurrent, pas de \"essai gratuit\" qui se transforme en facturation mensuelle. Vous payez quand vous en avez besoin.",
  },
  {
    q: "Vous proposez un remboursement ?",
    a: "Si le PDF ne se télécharge pas ou présente un problème technique, on rembourse intégralement. Écrivez-nous, on revient vers vous dès que possible.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number[]>([0]);

  function toggle(i: number) {
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  }

  return (
    <section id="faq" className="py-14 md:py-20">
      <div className="grid md:grid-cols-[380px_1fr] gap-14">

        {/* Colonne gauche — sticky */}
        <div className="md:sticky md:top-24 self-start">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-deep mb-4">
            FAQ
          </p>
          <h2 className="text-[44px] font-medium leading-tight tracking-[-0.03em] text-ink mb-4">
            Les vraies questions,{" "}
            <span className="text-ink/55">les vraies réponses.</span>
          </h2>
          <p className="text-[15px] text-ink/65 leading-relaxed">
            Une question qui n'y est pas ?{" "}
            <strong className="font-medium text-ink">
              [email à définir]
            </strong>
          </p>
        </div>

        {/* Colonne droite — accordéon */}
        <div className="space-y-2">
          {items.map((item, i) => {
            const isOpen = open.includes(i);
            return (
              <div
                key={i}
                className={`rounded-2xl transition-all ${
                  isOpen
                    ? "bg-paper shadow-card"
                    : "border border-ink/8"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-[22px] py-[18px] text-left gap-4"
                >
                  <span className="text-[17px] font-medium text-ink">
                    {item.q}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[16px] font-semibold transition-colors ${
                      isOpen
                        ? "bg-ink text-paper"
                        : "bg-accent-soft text-accent-deep"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="px-[22px] pb-5 text-[15px] text-ink/72 leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
