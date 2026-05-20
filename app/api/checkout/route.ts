import { NextRequest, NextResponse } from "next/server";
import { stripe, INVOICE_PRICE_CENTS } from "@/lib/stripe";
import { createInvoice } from "@/lib/store";
import type { InvoiceData } from "@/lib/types";

export const runtime = "nodejs";

function getAppUrl(req: NextRequest): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ??
    `${req.nextUrl.protocol}//${req.nextUrl.host}`
  );
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as InvoiceData;

    // Sauvegarde la facture (non payée) -> on récupère un id
    const invoice = createInvoice(data);

    const appUrl = getAppUrl(req);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: INVOICE_PRICE_CENTS,
            product_data: {
              name: "Génération de facture PDF",
              description: `Facture ${data.invoiceNumber}`,
            },
          },
        },
      ],
      success_url: `${appUrl}/success?id=${invoice.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/one-shot?canceled=1`,
      metadata: {
        invoiceId: invoice.id,
      },
    });

    return NextResponse.json({ url: session.url, id: invoice.id });
  } catch (err) {
    console.error("[/api/checkout]", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Erreur lors de la création du paiement",
      },
      { status: 500 }
    );
  }
}
