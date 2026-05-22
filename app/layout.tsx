import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FacturePro — Facture PDF professionnelle pour 1€",
  description: "Créez votre facture PDF professionnelle en quelques secondes pour seulement 1€. Sans inscription, sans logiciel. Téléchargement immédiat.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased bg-gray-50">
        <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
          <nav className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🧾</span>
              <span className="font-extrabold text-xl text-brand-900">Facture<span className="text-brand-600">Pro</span></span>
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/one-shot" className="hidden sm:block text-gray-600 hover:text-brand-700 font-medium transition">
                Facture rapide
              </Link>
              <Link href="/one-shot" className="inline-flex items-center gap-1 rounded-lg bg-brand-600 hover:bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition">
                Créer une facture →
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <footer className="mt-10 border-t border-gray-100 bg-white py-8 text-center text-sm text-gray-400">
          <p className="mb-2 font-semibold text-gray-600">🧾 FacturePro</p>
          <p>Paiement sécurisé Stripe · PDF instantané · Sans inscription</p>
          <p className="mt-2">© {new Date().getFullYear()} FacturePro</p>
        </footer>
      </body>
    </html>
  );
}
