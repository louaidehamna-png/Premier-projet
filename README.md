# FacturePro

Application web pour générer des factures PDF professionnelles, payantes (1 €) via Stripe. Sans inscription pour le mode rapide ; un mode "Compte Pro" avec personnalisation est prévu en V2.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** pour le design
- **Stripe Checkout** pour le paiement (1 €/facture)
- **@react-pdf/renderer** pour la génération PDF côté serveur

## Prise en main

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer Stripe

1. Créer un compte sur [stripe.com](https://dashboard.stripe.com/register) (gratuit).
2. Récupérer les clés **mode test** sur https://dashboard.stripe.com/test/apikeys.
3. Copier `.env.example` vers `.env.local` et remplir :

```bash
cp .env.example .env.local
```

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
INVOICE_PRICE_CENTS=100
# STRIPE_WEBHOOK_SECRET=whsec_... (optionnel en local, voir plus bas)
```

### 3. Lancer le serveur de dev

```bash
npm run dev
```

L'app est dispo sur http://localhost:3000.

### 4. Tester un paiement

Sur la page de paiement Stripe, utiliser la carte de test :

- **N° :** `4242 4242 4242 4242`
- **Date :** n'importe laquelle dans le futur
- **CVC :** 3 chiffres au hasard

Vous serez redirigé sur `/success?id=...` qui vérifiera le paiement et téléchargera le PDF.

### 5. (Optionnel) Webhook Stripe en local

Le webhook permet de marquer une facture comme payée même si l'utilisateur ferme l'onglet avant la redirection. En local, utiliser la CLI Stripe :

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Copier le `whsec_...` affiché dans `.env.local` (`STRIPE_WEBHOOK_SECRET`).

> Sans webhook, la vérification du paiement se fait via l'API Stripe au moment du téléchargement (param `session_id`). Ça suffit largement pour le MVP.

## Structure

```
app/
  page.tsx              # Landing page
  one-shot/page.tsx     # Formulaire facture (sans compte)
  success/page.tsx      # Page après paiement
  compte/page.tsx       # Placeholder Compte Pro (V2)
  api/
    checkout/route.ts   # Crée la session Stripe Checkout
    webhook/route.ts    # Webhook Stripe (paiement validé)
    invoice/[id]/...    # Génère et retourne le PDF
components/
  InvoiceForm.tsx       # Formulaire React (client)
  InvoicePDF.tsx        # Template react-pdf
lib/
  types.ts              # Typage InvoiceData
  totals.ts             # Calcul HT/TVA/TTC
  stripe.ts             # Client Stripe
  store.ts              # Store en mémoire (à remplacer par une DB)
```

## ⚠️ Limitations du MVP

- **Stockage en mémoire** : les factures sont stockées en RAM (`lib/store.ts`). En prod, à remplacer par une base de données (Vercel KV, Postgres + Prisma, etc.). Sur Vercel, chaque serverless function a sa propre mémoire — il faut donc une DB partagée.
- **Pas d'envoi email** : à ajouter (Resend, Postmark…) pour envoyer le PDF par mail à l'émetteur.
- **Compte Pro non implémenté** : pour la V2 (NextAuth + Prisma + dashboard de personnalisation).

## Déploiement

Le plus simple : [Vercel](https://vercel.com).

1. Pousser le repo sur GitHub.
2. Importer dans Vercel.
3. Ajouter les variables d'environnement (les mêmes que `.env.local`).
4. Déployer.
5. Mettre à jour `NEXT_PUBLIC_APP_URL` avec l'URL prod.
6. Configurer le webhook Stripe en prod : https://dashboard.stripe.com/webhooks → endpoint `https://votre-domaine.com/api/webhook` → événement `checkout.session.completed`.

## Roadmap

- [ ] V2 — Compte Pro (auth, personnalisation logo/couleurs, historique)
- [ ] Envoi automatique du PDF par email
- [ ] Base de données persistante
- [ ] Internationalisation (devises, langues)
