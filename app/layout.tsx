import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FacturePro — Générez vos factures PDF en 1 clic",
  description:
    "Créez et téléchargez votre facture PDF professionnelle pour 1€. Simple, rapide, sans inscription.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <header className="border-b border-gray-100 bg-white/70 backdrop-blur sticky top-0 z-10">
          <nav className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-brand-700">
              FacturePro
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/one-shot"
                className="text-gray-700 hover:text-brand-700 font-medium"
              >
                Facture rapide
              </Link>
              <Link
                href="/compte"
                className="text-gray-700 hover:text-brand-700 font-medium"
              >
                Compte Pro
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <footer className="mt-20 border-t border-gray-100 py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FacturePro · Paiement sécurisé Stripe
        </footer>
      </body>
    </html>
  );
}
