import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { stripe } from "@/lib/stripe";
import { getInvoice, markPaid } from "@/lib/store";
import { InvoicePDF } from "@/components/InvoicePDF";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const invoice = getInvoice(id);

  if (!invoice) {
    return NextResponse.json({ error: "Facture introuvable" }, { status: 404 });
  }

  // Vérifie le paiement : soit déjà marqué payé (via webhook),
  // soit via la session Stripe en query string (?session_id=...) en fallback.
  if (!invoice.paid) {
    const sessionId = req.nextUrl.searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json(
        { error: "Paiement non confirmé" },
        { status: 402 }
      );
    }
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (
        session.payment_status === "paid" &&
        session.metadata?.invoiceId === id
      ) {
        markPaid(id);
      } else {
        return NextResponse.json(
          { error: "Paiement non confirmé" },
          { status: 402 }
        );
      }
    } catch (err) {
      console.error("[/api/invoice/:id] stripe verify", err);
      return NextResponse.json(
        { error: "Impossible de vérifier le paiement" },
        { status: 500 }
      );
    }
  }

  // Génère le PDF
  // @ts-expect-error - react-pdf JSX type incompatibility avec React 18
  const buffer = await renderToBuffer(<InvoicePDF data={invoice.data} />);

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Facture-${invoice.data.invoiceNumber}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
