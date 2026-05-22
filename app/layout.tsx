import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FacturePro — Facture PDF professionnelle à 1 €",
  description: "Créez votre facture PDF professionnelle pour 1 €. Sans inscription, sans logiciel. Téléchargement immédiat.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased bg-white">
        <header className="border-b border-gray-100 sticky top-0 z-10 bg-white/90 backdrop-blur-sm">
          <nav className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
            <Link href="/" className="font-black text-xl tracking-tight text-brand-900">
              Facture<span className="text-brand-600">Pro</span>
            </Link>
            <Link
              href="/one-shot"
              className="rounded-lg bg-brand-900 hover:bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              Créer une facture
            </Link>
          </nav>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>

        <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} FacturePro · Paiement sécurisé Stripe
        </footer>
      </body>
    </html>
  );
}
