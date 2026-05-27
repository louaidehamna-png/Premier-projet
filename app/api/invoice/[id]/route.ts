import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
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
  const invoice = await getInvoice(id);

  if (!invoice) {
    return NextResponse.json({ error: "Facture introuvable" }, { status: 404 });
  }

  if (!invoice.paid) {
    const sessionId = req.nextUrl.searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json({ error: "Paiement non confirmé" }, { status: 402 });
    }
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid" && session.metadata?.invoiceId === id) {
        await markPaid(id);
      } else {
        return NextResponse.json({ error: "Paiement non confirmé" }, { status: 402 });
      }
    } catch (err) {
      console.error("[/api/invoice/:id] stripe verify", err);
      return NextResponse.json({ error: "Impossible de vérifier le paiement" }, { status: 500 });
    }
  }

  const pdfElement = React.createElement(InvoicePDF, { data: invoice.data });
  const buffer = await renderToBuffer(pdfElement as any);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Facture-${invoice.data.invoiceNumber}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
