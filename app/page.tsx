import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-indigo-500 px-6 py-20 md:py-28 text-center mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white text-xs font-semibold px-4 py-1.5 mb-6 backdrop-blur-sm border border-white/20">
          ⚡ Rapide &amp; Efficace
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-3xl mx-auto">
          Votre facture professionnelle
          <br />
          <span className="text-yellow-300">pour seulement 1 €</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl mx-auto">
          Remplissez, payez, téléchargez. Aucune inscription. Aucun logiciel.
          PDF pro prêt en quelques secondes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/one-shot" className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 px-8 py-4 text-base font-bold text-brand-900 shadow-xl transition-all hover:scale-105">
            Créer ma facture maintenant →
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/70 text-sm">
          <span className="flex items-center gap-1.5">🔒 Paiement Stripe sécurisé</span>
          <span className="flex items-center gap-1.5">📄 PDF instantané</span>
          <span className="flex items-center gap-1.5">✅ Sans inscription</span>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="mb-16 grid md:grid-cols-3 gap-4">
        {[
          { stars: "★★★★★", text: "Parfait pour ma micro-entreprise. J'ai eu ma facture en 2 minutes.", name: "Karim B." },
          { stars: "★★★★★", text: "Enfin un service simple et pas cher. Je recommande à tous mes collègues freelances.", name: "Sarah M." },
          { stars: "★★★★★", text: "Facture pro et conforme, téléchargée immédiatement après le paiement.", name: "Thomas L." },
        ].map((t, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-yellow-400 text-sm mb-2">{t.stars}</div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">"{t.text}"</p>
            <span className="text-xs font-semibold text-gray-400">{t.name}</span>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="mb-16">
        <h2 className="text-3xl font-extrabold text-center text-brand-900 mb-3">
          3 étapes, c'est tout
        </h2>
        <p className="text-center text-gray-500 mb-10">Pas de prise de tête. Pas de compte. Juste votre facture.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "1", emoji: "✏️", title: "Remplissez", desc: "Vos infos, celles du client, les lignes de facturation. 2 minutes max." },
            { n: "2", emoji: "💳", title: "Payez 1 €", desc: "CB, Apple Pay, Google Pay. Paiement 100% sécurisé via Stripe." },
            { n: "3", emoji: "⬇️", title: "Téléchargez", desc: "Votre PDF professionnel est généré et prêt à envoyer immédiatement." },
          ].map((s) => (
            <div key={s.n} className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{s.emoji}</div>
              <div className="absolute top-4 right-4 h-7 w-7 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                {s.n}
              </div>
              <h3 className="font-bold text-lg text-brand-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFER CARDS */}
      <section className="mb-16 grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl p-8 text-white flex flex-col">
          <span className="text-3xl mb-4">⚡</span>
          <h2 className="text-2xl font-extrabold mb-2">Facture One-Shot</h2>
          <p className="text-white/70 text-sm mb-6">Pas d'abonnement, pas de compte. Payez uniquement quand vous en avez besoin.</p>
          <ul className="space-y-2 text-sm text-white/80 mb-8">
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Aucune inscription requise</li>
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Modèle pro avec TVA et mentions légales</li>
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Téléchargement PDF immédiat</li>
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Paiement sécurisé Stripe</li>
          </ul>
          <div className="mt-auto">
            <div className="text-4xl font-extrabold mb-4">1 € <span className="text-lg font-normal text-white/60">/ facture</span></div>
            <Link href="/one-shot" className="inline-flex w-full items-center justify-center rounded-xl bg-yellow-400 hover:bg-yellow-300 px-6 py-4 font-bold text-brand-900 transition-all hover:scale-105">
              Créer ma facture →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col opacity-80">
          <span className="text-3xl mb-4">✨</span>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-extrabold text-brand-900">Compte Pro</h2>
            <span className="text-xs font-bold rounded-full bg-amber-100 text-amber-700 px-3 py-1">Bientôt</span>
          </div>
          <p className="text-gray-500 text-sm mb-6">Pour les freelances et TPE qui facturent régulièrement.</p>
          <ul className="space-y-2 text-sm text-gray-600 mb-8">
            <li className="flex items-center gap-2"><span className="text-brand-500">🎨</span> Logo & charte graphique personnalisés</li>
            <li className="flex items-center gap-2"><span className="text-brand-500">📂</span> Historique de toutes vos factures</li>
            <li className="flex items-center gap-2"><span className="text-brand-500">👥</span> Carnet de clients</li>
            <li className="flex items-center gap-2"><span className="text-brand-500">💸</span> Tarif dégressif</li>
          </ul>
          <Link href="/compte" className="mt-auto inline-flex w-full items-center justify-center rounded-xl border-2 border-brand-200 px-6 py-4 font-semibold text-brand-700 hover:bg-brand-50 transition">
            Me prévenir au lancement
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center bg-gradient-to-r from-brand-50 to-indigo-50 rounded-3xl border border-brand-100 px-6 py-16 mb-8">
        <h2 className="text-3xl font-extrabold text-brand-900 mb-3">Prêt à facturer ?</h2>
        <p className="text-gray-500 mb-8">Rejoignez des centaines de freelances qui font confiance à FacturePro.</p>
        <Link href="/one-shot" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105">
          Créer ma facture pour 1 € →
        </Link>
        <p className="mt-4 text-xs text-gray-400">Paiement sécurisé · PDF instantané · Sans inscription</p>
      </section>
    </div>
  );
}
