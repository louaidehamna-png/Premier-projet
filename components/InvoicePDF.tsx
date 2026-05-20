import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { InvoiceData } from "@/lib/types";
import { computeTotals, fmtEUR } from "@/lib/totals";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#0f1f55",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  brand: {
    fontSize: 22,
    fontWeight: 700,
    color: "#2954d8",
  },
  meta: { textAlign: "right" },
  title: { fontSize: 18, fontWeight: 700, marginBottom: 4 },
  small: { fontSize: 9, color: "#555" },
  parties: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  block: {
    width: "48%",
  },
  blockLabel: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#888",
    marginBottom: 4,
  },
  blockTitle: { fontSize: 12, fontWeight: 700, marginBottom: 4 },
  table: { marginTop: 10 },
  thead: {
    flexDirection: "row",
    backgroundColor: "#eef4ff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#dbe6ff",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  th: { fontSize: 9, fontWeight: 700, color: "#1f42ad" },
  tr: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#e6e6e6",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  colDesc: { width: "50%" },
  colQty: { width: "10%", textAlign: "right" },
  colPU: { width: "15%", textAlign: "right" },
  colTVA: { width: "10%", textAlign: "right" },
  colTotal: { width: "15%", textAlign: "right" },
  totals: {
    marginTop: 20,
    alignSelf: "flex-end",
    width: "40%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  totalTTC: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    marginTop: 4,
    borderTopWidth: 1,
    borderColor: "#0f1f55",
    fontWeight: 700,
    fontSize: 12,
  },
  notes: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#f8faff",
    borderRadius: 4,
    fontSize: 9,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#999",
  },
});

export function InvoicePDF({ data }: { data: InvoiceData }) {
  const totals = computeTotals(data);

  return (
    <Document
      title={`Facture ${data.invoiceNumber}`}
      author={data.issuerName}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>FACTURE</Text>
            <Text style={styles.small}>N° {data.invoiceNumber}</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.title}>{data.issuerName}</Text>
            <Text style={styles.small}>Date : {formatDate(data.invoiceDate)}</Text>
            {data.dueDate ? (
              <Text style={styles.small}>
                Échéance : {formatDate(data.dueDate)}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Parties */}
        <View style={styles.parties}>
          <View style={styles.block}>
            <Text style={styles.blockLabel}>Émetteur</Text>
            <Text style={styles.blockTitle}>{data.issuerName}</Text>
            <Text>{data.issuerAddress}</Text>
            {data.issuerSiret ? (
              <Text style={styles.small}>SIRET : {data.issuerSiret}</Text>
            ) : null}
            {data.issuerVatNumber ? (
              <Text style={styles.small}>
                N° TVA : {data.issuerVatNumber}
              </Text>
            ) : null}
            {data.issuerEmail ? (
              <Text style={styles.small}>{data.issuerEmail}</Text>
            ) : null}
          </View>
          <View style={styles.block}>
            <Text style={styles.blockLabel}>Facturé à</Text>
            <Text style={styles.blockTitle}>{data.clientName}</Text>
            <Text>{data.clientAddress}</Text>
            {data.clientSiret ? (
              <Text style={styles.small}>SIRET : {data.clientSiret}</Text>
            ) : null}
            {data.clientVatNumber ? (
              <Text style={styles.small}>
                N° TVA : {data.clientVatNumber}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Lines */}
        <View style={styles.table}>
          <View style={styles.thead}>
            <Text style={[styles.th, styles.colDesc]}>Description</Text>
            <Text style={[styles.th, styles.colQty]}>Qté</Text>
            <Text style={[styles.th, styles.colPU]}>PU HT</Text>
            <Text style={[styles.th, styles.colTVA]}>TVA</Text>
            <Text style={[styles.th, styles.colTotal]}>Total HT</Text>
          </View>
          {data.lines.map((line, i) => {
            const totalHT = line.quantity * line.unitPriceHT;
            return (
              <View key={i} style={styles.tr}>
                <Text style={styles.colDesc}>{line.description}</Text>
                <Text style={styles.colQty}>{line.quantity}</Text>
                <Text style={styles.colPU}>{fmtEUR(line.unitPriceHT)}</Text>
                <Text style={styles.colTVA}>{line.vatRate} %</Text>
                <Text style={styles.colTotal}>{fmtEUR(totalHT)}</Text>
              </View>
            );
          })}
        </View>

        {/* Totaux */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Total HT</Text>
            <Text>{fmtEUR(totals.totalHT)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>TVA</Text>
            <Text>{fmtEUR(totals.totalTVA)}</Text>
          </View>
          <View style={styles.totalTTC}>
            <Text>Total TTC</Text>
            <Text>{fmtEUR(totals.totalTTC)}</Text>
          </View>
        </View>

        {/* Notes */}
        {(data.paymentTerms || data.notes) && (
          <View style={styles.notes}>
            {data.paymentTerms ? (
              <Text>
                <Text style={{ fontWeight: 700 }}>
                  Conditions de paiement :{" "}
                </Text>
                {data.paymentTerms}
              </Text>
            ) : null}
            {data.notes ? (
              <Text style={{ marginTop: 4 }}>{data.notes}</Text>
            ) : null}
          </View>
        )}

        <Text style={styles.footer} fixed>
          Document généré via FacturePro · {data.issuerName}
        </Text>
      </Page>
    </Document>
  );
}

function formatDate(d: string): string {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  if (!y || !m || !day) return d;
  return `${day}/${m}/${y}`;
}
