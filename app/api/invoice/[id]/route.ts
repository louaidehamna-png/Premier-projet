import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { getInvoiceFromSession } from "@/lib/store";
import { InvoicePDF } from "@/components/InvoicePDF";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id requis" }, { status: 400 });
  }

  const result = await getInvoiceFromSession(sessionId);

  if (!result) {
    return NextResponse.json({ error: "Facture introuvable" }, { status: 404 });
  }

  if (!result.paid) {
    return NextResponse.json({ error: "Paiement non confirmé" }, { status: 402 });
  }

  const pdfElement = React.createElement(InvoicePDF, { data: result.data });
  const buffer = await renderToBuffer(pdfElement as any);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Facture-${result.data.invoiceNumber}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
