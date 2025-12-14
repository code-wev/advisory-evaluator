"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FirmsTable from "@/components/Home/FirmsTable";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// retry helper (important for stability)
async function fetchWithRetry(url, options, retries = 2) {
  let lastErr;

  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      return { ok: res.ok, data };
    } catch (e) {
      lastErr = e;
      await sleep(250 * (i + 1)); // small backoff
    }
  }

  throw lastErr;
}

export default function SavedFirmsPage() {
  const { data: session, status } = useSession();

  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;

    async function loadSavedFirms() {
      try {
        setLoading(true);

        // 1) Load saved CRDs from DB
        const res = await fetch("/api/firm/saved", { cache: "no-store" });
        const data = await res.json();

        const crds = Array.isArray(data.savedFirms) ? data.savedFirms : [];

        if (crds.length === 0) {
          setFirms([]);
          return;
        }

        const loaded = [];

        // 2) Fetch each firm summary (light endpoint)
        for (const crd of crds) {
          try {
            const result = await fetchWithRetry("/api/firm/summary", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ crd }),
            });

            const filing = result?.data?.filing;
            const feeType = result?.data?.feeType;

            if (!filing) {
              // Keep row so total count matches DB (optional but recommended)
              loaded.push({
                crd,
                name: `Firm CRD ${crd}`,
                cityState: "N/A",
                firmSize: "N/A",
                avgClientBalance: "N/A",
                keyService: "N/A",
                averageFee: "N/A",
                logo: "/avatar.png",
              });
              continue;
            }

            loaded.push({
              crd: filing.Info?.FirmCrdNb,
              name: filing.Info?.LegalNm || "Unknown Firm",
              cityState: `${filing.MainAddr?.City || ""}, ${
                filing.MainAddr?.State || ""
              }`,
              firmSize: filing.FormInfo?.Part1A?.Item5F?.Q5F2C || "N/A",
              avgClientBalance: filing.FormInfo?.Part1A?.Item5F?.Q5F2A || "N/A",
              keyService:
                filing.FormInfo?.Part1A?.Item5G?.Q5G1 === "Y"
                  ? "Financial Planning"
                  : "Advisory Services",
              averageFee: feeType || "Not disclosed",
              logo: "/avatar.png",
            });
          } catch (e) {
            // also keep row if summary fails after retry
            loaded.push({
              crd,
              name: `Firm CRD ${crd}`,
              cityState: "N/A",
              firmSize: "N/A",
              avgClientBalance: "N/A",
              keyService: "N/A",
              averageFee: "N/A",
              logo: "/avatar.png",
            });
          }
        }

        setFirms(loaded);
      } catch (err) {
        console.error("Saved firms load error:", err);
        setFirms([]);
      } finally {
        setLoading(false);
      }
    }

    loadSavedFirms();
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0F4C81]" />
        <p className="mt-4 text-gray-700 text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="px-6 md:px-20 py-16">
        <h1 className="text-2xl font-semibold">Saved Firms</h1>
        <p className="mt-2 text-gray-600">
          Please log in to view your saved firms.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-6 md:px-20 py-12">
      <h1 className="text-3xl font-semibold mb-6">Saved Firms</h1>
      <FirmsTable firms={firms} />
    </div>
  );
}
