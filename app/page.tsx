import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-24">

      {/* HERO */}
      <section className="pt-8 md:pt-16">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-brand-600 tracking-wide uppercase">
            Rapide &amp; Efficace
          </span>
          <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tighter text-brand-900 leading-none">
            Votre facture
            <br />
            <span className="text-brand-600">pro à 1 €.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 leading-relaxed max-w-lg">
            Remplissez le formulaire. Payez. Téléchargez votre PDF.
            Sans compte. Sans abonnement. Sans prise de tête.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/one-shot"
              className="inline-flex items-center justify-center rounded-xl bg-brand-900 hover:bg-brand-700 px-8 py-4 text-base font-bold text-white transition-colors"
            >
              Créer ma facture maintenant
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-400">
            <span>Paiement sécurisé Stripe</span>
            <span>·</span>
            <span>PDF téléchargeable immédiatement</span>
            <span>·</span>
            <span>Aucune inscription</span>
          </div>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-10">
          Comment ça marche
        </h2>
        <div className="grid md:grid-cols-3 gap-0 border border-gray-200 rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {[
            { n: "01", title: "Remplissez", desc: "Vos informations, celles de votre client, les lignes de facturation." },
            { n: "02", title: "Payez 1 €", desc: "CB, Apple Pay ou Google Pay. Paiement traité par Stripe." },
            { n: "03", title: "Téléchargez", desc: "Votre facture PDF est générée et disponible immédiatement." },
          ].map((s) => (
            <div key={s.n} className="p-8 bg-white">
              <span className="text-4xl font-black text-gray-100 block mb-4">{s.n}</span>
              <h3 className="font-bold text-lg text-brand-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFRES */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-brand-900 p-10 flex flex-col">
          <h2 className="text-2xl font-black text-white mb-1">One-shot</h2>
          <p className="text-brand-300 text-sm mb-8">Pas d'abonnement. Payez uniquement quand vous en avez besoin.</p>
          <ul className="space-y-3 text-sm text-brand-200 mb-10 flex-1">
            {[
              "Aucune inscription requise",
              "Modèle conforme avec TVA et mentions légales",
              "PDF téléchargeable immédiatement",
              "Paiement 100% sécurisé",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-brand-400 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="border-t border-brand-700 pt-8">
            <div className="text-5xl font-black text-white mb-6">1 €</div>
            <Link
              href="/one-shot"
              className="block text-center rounded-xl bg-white hover:bg-gray-100 px-6 py-4 font-bold text-brand-900 transition-colors"
            >
              Faire une facture
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-10 flex flex-col bg-white">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-black text-brand-900">Compte Pro</h2>
            <span className="text-xs font-bold bg-amber-100 text-amber-700 rounded-full px-3 py-1">Bientôt</span>
          </div>
          <p className="text-gray-400 text-sm mb-8">Pour ceux qui facturent régulièrement.</p>
          <ul className="space-y-3 text-sm text-gray-500 mb-10 flex-1">
            {[
              "Logo et charte graphique personnalisés",
              "Historique de toutes vos factures",
              "Carnet de clients",
              "Tarif dégressif",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-gray-300 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-100 pt-8">
            <Link
              href="/compte"
              className="block text-center rounded-xl border-2 border-gray-200 hover:border-brand-300 px-6 py-4 font-semibold text-gray-600 transition-colors"
            >
              Me prévenir au lancement
            </Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-gray-100 pt-16 pb-4 text-center">
        <h2 className="text-3xl font-black text-brand-900 mb-4">
          Prêt à facturer ?
        </h2>
        <p className="text-gray-400 mb-8">
          Simple, honnête, 1 €.
        </p>
        <Link
          href="/one-shot"
          className="inline-flex items-center justify-center rounded-xl bg-brand-900 hover:bg-brand-700 px-10 py-4 text-base font-bold text-white transition-colors"
        >
          Créer ma facture pour 1 €
        </Link>
      </section>

    </div>
  );
}
