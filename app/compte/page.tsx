import Link from "next/link";

export const metadata = {
  title: "Compte Pro · FacturePro",
};

export default function ComptePage() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="card text-center">
        <span className="inline-block rounded-full bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 mb-4">
          Bientôt disponible
        </span>
        <h1 className="text-3xl font-bold text-brand-900 mb-2">
          Compte Pro — pour aller plus loin
        </h1>
        <p className="text-gray-600 mb-6">
          Le compte Pro arrive très bientôt. Vous pourrez :
        </p>

        <ul className="text-left max-w-md mx-auto space-y-3 text-gray-700 mb-8">
          <li>🎨 <strong>Personnaliser</strong> vos factures (logo, couleurs, modèles)</li>
          <li>📂 <strong>Retrouver</strong> toutes vos factures, à tout moment</li>
          <li>👥 <strong>Gérer</strong> votre carnet de clients</li>
          <li>🔁 <strong>Dupliquer</strong> et créer des factures récurrentes</li>
          <li>💸 <strong>Tarif dégressif</strong> dès la 10ème facture</li>
        </ul>

        <p className="text-sm text-gray-500 mb-6">
          En attendant, créez votre facture en mode rapide :
        </p>
        <Link href="/one-shot" className="btn-primary">
          Créer une facture maintenant (1 €)
        </Link>
      </div>
    </div>
  );
}
