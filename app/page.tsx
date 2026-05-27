import Link from "next/link";
import InvoicePreview from "@/components/landing/InvoicePreview";
import FAQ from "@/components/landing/FAQ";

/* ── Helpers ── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-deep mb-4">
      {children}
    </p>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="w-[18px] h-[18px] rounded-full bg-accent-soft flex items-center justify-center text-accent-deep text-[11px] font-bold flex-shrink-0 mt-0.5">
        ✓
      </span>
      <span className="text-[13px] text-ink/65">{children}</span>
    </li>
  );
}

/* ═══════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div>

      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section className="py-14 md:py-24">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-14 items-center">

          {/* Gauche */}
          <div>
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 bg-accent-soft text-accent-deep rounded-full px-[14px] py-[6px] text-[13px] font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Sans inscription · Sans abonnement
            </div>

            {/* H1 */}
            <h1
              className="font-medium text-ink leading-[0.96] tracking-[-0.035em] mb-6"
              style={{ fontSize: "clamp(48px, 7vw, 84px)" }}
            >
              Votre facture
              <br />
              <em className="not-italic hero-gradient">pro à 1 €</em>
              <span className="text-ink/75">, zéro paperasse.</span>
            </h1>

            {/* Sous-titre */}
            <p className="text-[19px] text-ink/70 leading-relaxed max-w-[520px] mb-8">
              Remplissez, payez, téléchargez. Pas d'abonnement, pas de compte
              à créer, pas de logiciel à installer. Juste un PDF conforme dans
              votre boîte mail.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-9">
              <Link
                href="/one-shot"
                className="inline-flex items-center gap-2.5 bg-ink text-paper rounded-2xl px-[26px] py-4 text-[15px] font-medium hover:bg-ink/90 transition-colors"
              >
                Créer ma facture
                <span className="bg-accent text-paper rounded-full px-2 py-0.5 text-[12px] font-semibold">
                  1 €
                </span>
              </Link>
              <Link
                href="/one-shot"
                className="inline-flex items-center gap-1.5 border border-ink/18 rounded-2xl px-[26px] py-4 text-[15px] text-ink hover:bg-ink/5 transition-colors"
              >
                Voir un exemple ↗
              </Link>
            </div>

            {/* Features */}
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <CheckItem>PDF téléchargeable immédiatement</CheckItem>
              <CheckItem>Conforme TVA &amp; mentions légales</CheckItem>
              <CheckItem>Paiement Stripe</CheckItem>
            </ul>
          </div>

          {/* Droite — aperçu facture */}
          <div className="hidden md:block">
            <InvoicePreview />
          </div>
        </div>
      </section>

      {/* ══ 2. TRUST STRIP ══════════════════════════════════ */}
      <section className="mb-14">
        <div className="bg-paper rounded-2xl shadow-card px-7 py-[18px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-ink/8">
            {[
              { label: "Paiement",     value: "Stripe"           },
              { label: "Hébergement",  value: "France"           },
              { label: "Conformité",   value: "RGPD · TVA"       },
              { label: "Support",      value: "Par email"        },
            ].map(({ label, value }) => (
              <div key={label} className="px-5 py-3 first:pl-0 last:pr-0">
                <p className="text-[11px] uppercase tracking-[0.06em] text-ink/55 mb-1">
                  {label}
                </p>
                <p className="text-[17px] font-semibold text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. HOW IT WORKS ═════════════════════════════════ */}
      <section id="produit" className="py-14 md:py-20">
        <div className="text-center mb-12">
          <Eyebrow>Comment ça marche</Eyebrow>
          <h2 className="text-[52px] font-medium tracking-[-0.03em] text-ink leading-tight">
            Trois étapes. Pas une de plus.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "01", glyph: "✎", title: "Remplissez",    desc: "Vos infos, celles du client, les lignes. L'éditeur calcule TVA et totaux pendant que vous tapez."      },
            { n: "02", glyph: "€", title: "Payez 1 €",     desc: "CB, Apple Pay ou Google Pay via Stripe. Aucune carte conservée chez nous."                               },
            { n: "03", glyph: "↓", title: "Téléchargez",   desc: "PDF généré et disponible immédiatement. Une copie part aussi par email à votre adresse."            },
          ].map((s) => (
            <div key={s.n} className="bg-paper rounded-3xl p-7 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <div className="w-[52px] h-[52px] rounded-2xl bg-accent-soft flex items-center justify-center text-[22px] font-semibold text-accent-deep">
                  {s.glyph}
                </div>
                <span className="text-[28px] font-bold text-ink/20 tabular-nums">
                  {s.n}
                </span>
              </div>
              <h3 className="text-[24px] font-semibold text-ink tracking-[-0.01em] mb-2">
                {s.title}
              </h3>
              <p className="text-[15px] text-ink/65 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 4. PRICING ══════════════════════════════════════ */}
      <section id="tarif" className="py-14 md:py-20">
        <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-5">

          {/* One-shot — fond ink */}
          <div
            className="rounded-4xl p-9 relative overflow-hidden flex flex-col"
            style={{ background: "#1f1b16" }}
          >
            {/* Décoration radiale */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 220,
                height: 220,
                top: -60,
                right: -60,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(200,104,59,0.6) 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              <Eyebrow>
                <span className="text-paper/60">One-shot</span>
              </Eyebrow>
              <div className="mb-2">
                <span
                  className="font-medium text-paper"
                  style={{ fontSize: 110, lineHeight: 1, letterSpacing: "-0.05em" }}
                >
                  1€
                </span>
              </div>
              <p className="text-[16px] text-paper/55 mb-6">
                par facture · TTC
              </p>
              <p className="text-[16px] text-paper/70 leading-relaxed mb-8">
                Payez uniquement quand vous en avez besoin. Pas d'abonnement,
                pas de prélèvement récurrent.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Modèle conforme — TVA + mentions légales",
                  "Téléchargement immédiat + copie email",
                  "Paiement Stripe — pas de carte stockée",
                  "Aucune inscription, aucun compte",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="w-[18px] h-[18px] rounded-full bg-accent flex items-center justify-center text-paper text-[11px] font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-[15px] text-paper/85">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/one-shot"
                className="block text-center bg-paper text-ink rounded-2xl py-4 text-[15px] font-medium hover:bg-paper/90 transition-colors mt-auto"
              >
                Faire une facture — 1 €
              </Link>
            </div>
          </div>

          {/* Compte Pro — dashed */}
          <div className="rounded-4xl p-9 border-2 border-dashed border-ink/20 flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <Eyebrow>Compte Pro</Eyebrow>
              <span className="bg-accent-soft text-accent-deep rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide mb-4">
                BIENTÔT
              </span>
            </div>
            <div className="mb-2">
              <span
                className="font-medium text-ink/35"
                style={{ fontSize: 64, lineHeight: 1, letterSpacing: "-0.04em" }}
              >
                ~9€
              </span>
            </div>
            <p className="text-[16px] text-ink/40 mb-6">/mois</p>
            <p className="text-[16px] text-ink/70 leading-relaxed mb-8">
              Pour les indépendants et TPE qui facturent régulièrement et
              veulent une identité visuelle propre.
            </p>
            <ul className="space-y-3 mb-10 flex-1">
              {[
                "Logo et couleurs personnalisés",
                "Historique de toutes vos factures",
                "Carnet de clients & relances auto",
                "Tarif dégressif au-delà de 10/mois",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-[18px] h-[18px] rounded-full border-2 border-ink/30 flex-shrink-0 mt-0.5" />
                  <span className="text-[15px] text-ink/70">{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full border border-ink/20 rounded-2xl py-4 text-[15px] text-ink/60 hover:border-ink/40 transition-colors mt-auto">
              Me prévenir au lancement →
            </button>
          </div>
        </div>
      </section>

      {/* ══ 5. FAQ ═══════════════════════════════════════════ */}
      <FAQ />

      {/* ══ 6. FINAL CTA ═════════════════════════════════════ */}
      <section className="mb-16">
        <div
          className="rounded-5xl px-14 py-16 text-center"
          style={{ background: "linear-gradient(180deg, #fffcf7 0%, #f0e4da 100%)" }}
        >
          <h2
            className="font-medium text-ink tracking-[-0.035em] mb-5 mx-auto"
            style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05, maxWidth: 600 }}
          >
            Prêt à facturer ?
          </h2>
          <p className="text-[18px] text-ink/65 mb-10 max-w-md mx-auto leading-relaxed">
            Simple, honnête, 1 €. Le PDF est prêt avant que vous changiez
            d'avis.
          </p>
          <Link
            href="/one-shot"
            className="inline-flex items-center justify-center bg-ink text-paper rounded-full px-[34px] py-[18px] text-[16px] font-medium hover:bg-ink/90 transition-colors"
          >
            Créer ma facture pour 1 € →
          </Link>
        </div>
      </section>

    </div>
  );
}
