"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const params = useSearchParams();
  const id = params.get("id");
  const sessionId = params.get("session_id");

  const [status, setStatus] = useState<
    "verifying" | "ready" | "error"
  >("verifying");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setStatus("error");
      setErrorMsg("Identifiant de facture manquant.");
      return;
    }
    const url = `/api/invoice/${id}${
      sessionId ? `?session_id=${sessionId}` : ""
    }`;

    // On fait un HEAD pour vérifier la dispo, puis on déclenche le download.
    fetch(url, { method: "GET" })
      .then(async (res) => {
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error ?? `Erreur ${res.status}`);
        }
        // Le PDF est dispo : on construit l'URL de téléchargement
        setDownloadUrl(url);
        setStatus("ready");
      })
      .catch((err) => {
        setStatus("error");
        setErrorMsg(
          err instanceof Error ? err.message : "Erreur inconnue"
        );
      });
  }, [id, sessionId]);

  return (
    <div className="max-w-xl mx-auto text-center py-16">
      {status === "verifying" && (
        <>
          <div className="text-5xl mb-4">⏳</div>
          <h1 className="text-2xl font-bold text-brand-900">
            Vérification du paiement...
          </h1>
          <p className="text-gray-600 mt-2">Cela ne prend que quelques secondes.</p>
        </>
      )}

      {status === "ready" && downloadUrl && (
        <>
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-brand-900">
            Paiement reçu, merci !
          </h1>
          <p className="text-gray-600 mt-2">
            Votre facture est prête. Cliquez ci-dessous pour la télécharger.
          </p>
          <a href={downloadUrl} className="btn-primary mt-6" download>
            ⬇️ Télécharger ma facture PDF
          </a>
          <div className="mt-8">
            <Link href="/one-shot" className="text-sm text-brand-700 hover:underline">
              Créer une autre facture
            </Link>
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-brand-900">
            Un problème est survenu
          </h1>
          <p className="text-gray-600 mt-2">{errorMsg}</p>
          <Link href="/one-shot" className="btn-secondary mt-6 inline-block">
            Recommencer
          </Link>
        </>
      )}
    </div>
  );
}
