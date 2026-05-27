import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "FacturePro — Facture PDF professionnelle à 1 €",
  description:
    "Créez votre facture PDF professionnelle pour 1 €. Sans inscription, sans logiciel. Téléchargement immédiat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={dmSans.variable}>
      <body className="antialiased bg-cream font-sans">

        {/* ── Nav pill ── */}
        <header className="sticky top-0 z-50 pt-[18px] px-10">
          <div className="max-w-[1200px] mx-auto">
            <nav className="bg-paper shadow-card rounded-full flex items-center justify-between pl-[22px] pr-3 py-3">
              {/* Gauche */}
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2.5">
                  <span className="w-[26px] h-[26px] rounded-full bg-accent flex-shrink-0" />
                  <span className="text-[16px] font-semibold text-ink tracking-tight">
                    facturepro
                  </span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  {[
                    { label: "Produit",  href: "#produit" },
                    { label: "Tarif",    href: "#tarif"   },
                    { label: "FAQ",      href: "#faq"     },
                  ].map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="text-[14px] text-ink/65 hover:text-ink transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Droite */}
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-[13px] text-ink/55">
                  Se connecter
                </span>
                <Link
                  href="/one-shot"
                  className="bg-ink text-paper rounded-full px-[18px] py-[10px] text-[14px] font-medium hover:bg-ink/90 transition-colors whitespace-nowrap"
                >
                  Créer ma facture — 1 €
                </Link>
              </div>
            </nav>
          </div>
        </header>

        {/* ── Contenu ── */}
        <main className="max-w-[1200px] mx-auto px-10">{children}</main>

        {/* ── Footer ── */}
        <footer className="border-t border-ink/10 mt-16">
          <div className="max-w-[1200px] mx-auto px-10 py-7 flex items-center justify-between text-[13px] text-ink/55 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="w-[18px] h-[18px] rounded-full bg-accent flex-shrink-0" />
              <span>
                <strong className="font-semibold text-ink/70">facturepro</strong>{" "}
                · © 2026
              </span>
            </div>
            <span className="hidden md:block">
              Paiement sécurisé Stripe · Hébergé en France
            </span>
            <div className="flex items-center gap-4">
              <span>Mentions</span>
              <span>CGV</span>
              <span>Contact</span>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
