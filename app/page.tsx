import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="text-center pt-10">
        <span className="inline-block rounded-full bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1 mb-4">
          Générez vos factures en 30 secondes
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-brand-900">
          Une facture pro,
          <br />
          <span className="text-brand-600">pour 1 €.</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Remplissez le formulaire, payez, téléchargez votre PDF. Sans
          inscription. Sans logiciel à installer.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/one-shot" className="btn-primary">
            Créer ma facture maintenant
          </Link>
          <Link href="/compte" className="btn-secondary">
            J&apos;ai un compte Pro
          </Link>
        </div>
      </section>

      {/* Two offers */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Simple & Efficace */}
        <div className="card flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⚡</span>
            <h2 className="text-2xl font-bold text-brand-900">
              Simple & Efficace
            </h2>
          </div>
          <p className="text-gray-600 mb-4">
            Pas de compte, pas d&apos;abonnement. Vous remplissez, vous payez,
            vous téléchargez votre facture en PDF. C&apos;est tout.
          </p>
          <ul className="space-y-2 text-sm text-gray-700 mb-6">
            <li>✅ Aucune inscription</li>
            <li>✅ Modèle de facture pro et sobre</li>
            <li>✅ TVA, mentions légales incluses</li>
            <li>✅ Paiement sécurisé Stripe</li>
          </ul>
          <div className="mt-auto flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-brand-900">1 €</span>
            <span className="text-sm text-gray-500">/ facture</span>
          </div>
          <Link href="/one-shot" className="btn-primary mt-4">
            Faire une facture
          </Link>
        </div>

        {/* Compte Pro */}
        <div className="card flex flex-col border-brand-200 bg-gradient-to-br from-white to-brand-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">✨</span>
            <h2 className="text-2xl font-bold text-brand-900">Compte Pro</h2>
            <span className="ml-2 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 px-2 py-0.5">
              Bientôt
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            Personnalisez vos factures : logo, couleurs, modèles avancés.
            Retrouvez toutes vos factures, gérez vos clients récurrents.
          </p>
          <ul className="space-y-2 text-sm text-gray-700 mb-6">
            <li>🎨 Logo & charte graphique</li>
            <li>📂 Historique de toutes vos factures</li>
            <li>👥 Carnet de clients</li>
            <li>💸 Tarif dégressif</li>
          </ul>
          <Link href="/compte" className="btn-secondary mt-auto">
            En savoir plus
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-3xl font-bold text-center text-brand-900 mb-10">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              n: "1",
              title: "Remplissez",
              desc: "Vos infos, celles du client, les lignes de facture.",
            },
            {
              n: "2",
              title: "Payez 1 €",
              desc: "Paiement sécurisé via Stripe (CB, Apple Pay, Google Pay).",
            },
            {
              n: "3",
              title: "Téléchargez",
              desc: "Votre PDF est généré instantanément, prêt à envoyer.",
            },
          ].map((s) => (
            <div key={s.n} className="card text-center">
              <div className="mx-auto h-10 w-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center mb-3">
                {s.n}
              </div>
              <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
