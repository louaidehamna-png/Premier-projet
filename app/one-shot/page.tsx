import InvoiceForm from "@/components/InvoiceForm";

export const metadata = {
  title: "Créer une facture · FacturePro",
};

export default function OneShotPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900">
          Votre facture, en 2 minutes
        </h1>
        <p className="mt-2 text-gray-600">
          Remplissez les champs ci-dessous, payez 1 €, et téléchargez votre
          PDF.
        </p>
      </div>
      <InvoiceForm />
    </div>
  );
}
