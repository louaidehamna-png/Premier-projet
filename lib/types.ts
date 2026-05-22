export type InvoiceLine = {
  description: string;
  quantity: number;
  unitPriceHT: number; // en euros
  vatRate: number; // ex: 20 = 20%
};

export type InvoiceData = {
  // Émetteur
  issuerName: string;
  issuerAddress: string;
  issuerSiret?: string;
  issuerVatNumber?: string;
  issuerEmail?: string;

  // Client
  clientName: string;
  clientAddress: string;
  clientSiret?: string;
  clientVatNumber?: string;

  // Facture
  invoiceNumber: string;
  invoiceDate: string; // YYYY-MM-DD
  dueDate?: string;

  // Lignes
  lines: InvoiceLine[];

  // Mentions
  paymentTerms?: string;
  notes?: string;
  microEntrepreneur?: boolean;
};

export type StoredInvoice = {
  id: string;
  data: InvoiceData;
  paid: boolean;
  createdAt: number;
};
