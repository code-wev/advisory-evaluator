"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function FirmsTable({ firms = [] }) {
  const { data: session } = useSession();

  const [savedFirms, setSavedFirms] = useState([]);
  const [loadingSave, setLoadingSave] = useState(null);

  /* -----------------------------------------
     REMOVE DUPLICATES (BY CRD)
  ------------------------------------------ */
  const uniqueFirms = useMemo(() => {
    return Array.from(new Map((firms || []).map((f) => [f.crd, f])).values());
  }, [firms]);

  /* -----------------------------------------
     LOAD SAVED FIRMS
  ------------------------------------------ */
  useEffect(() => {
    if (!session) return;

    let mounted = true;

    async function loadSavedFirms() {
      try {
        const res = await fetch("/api/firm/saved");
        const data = await res.json();

        if (res.ok && mounted) {
          setSavedFirms(Array.from(new Set(data.savedFirms || [])));
        }
      } catch {
        console.error("Failed to load saved firms");
      }
    }

    loadSavedFirms();
    return () => (mounted = false);
  }, [session]);

  /* -----------------------------------------
     SAVE / UNSAVE
  ------------------------------------------ */
  const handleSaveFirm = async (firm) => {
    if (!session) {
      toast.error("Please log in to save firms");
      return;
    }

    const isSaved = savedFirms.includes(firm.crd);
    const toastId = `save-${firm.crd}`;

    try {
      setLoadingSave(firm.crd);
      toast.loading(isSaved ? "Removing firm..." : "Saving firm...", {
        id: toastId,
      });

      const res = await fetch("/api/firm/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crd: firm.crd }),
      });

      if (!res.ok) throw new Error();

      setSavedFirms((prev) =>
        isSaved ? prev.filter((id) => id !== firm.crd) : [...prev, firm.crd]
      );

      toast.success(isSaved ? "Firm removed" : "Firm saved", {
        id: toastId,
      });
    } catch {
      toast.error("Server error", { id: toastId });
    } finally {
      setLoadingSave(null);
    }
  };

  /* -----------------------------------------
     AUM → FIRM SIZE (YOUR EXACT LOGIC)
  ------------------------------------------ */
  const getFirmSize = (aum) => {
    if (!aum || isNaN(aum)) return "N/A";

    if (aum < 250_000_000) return "Small ($250M AUM)";
    if (aum < 500_000_000) return "Small–Medium ($250–500M)";
    if (aum < 750_000_000) return "Medium ($500–750M)";
    if (aum < 1_000_000_000) return "Medium–Large ($750M–$1B)";
    if (aum < 5_000_000_000) return "Large ($1B–$5B)";
    if (aum < 15_000_000_000) return "Giant ($5B–$15B)";
    return "Mega ($15B+)";
  };

  /* -----------------------------------------
     EMPTY STATE
  ------------------------------------------ */
  if (!uniqueFirms.length) {
    return (
      <div className="text-center py-24">
        <h2 className="text-lg font-semibold">No firms found</h2>
        <p className="text-sm text-gray-500 mt-2">
          Try a different search or location.
        </p>
      </div>
    );
  }

  /* -----------------------------------------
     CARD GRID (FIGMA-MATCHED)
  ------------------------------------------ */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {uniqueFirms.map((firm) => {
        const isSaved = savedFirms.includes(firm.crd);

        return (
          <div
            key={firm.crd}
            className="bg-[#F5F7FA] rounded-xl p-6 flex flex-col"
          >
            {/* CONTENT */}
            <div className="flex-1">
              {/* TITLE */}
              <h3 className="text-[15px] font-semibold text-[#111827] mb-6">
                {firm.name}
              </h3>

              {/* META */}
              <div className="grid grid-cols-2 gap-y-5 text-[13px] text-[#6B7280]">
                <div>
                  <span className="block text-[#7F8C8D] font-medium text-[11px] uppercase tracking-wide mb-1">
                    City / State
                  </span>
                  <span className="text-[#111827]">
                    {firm.cityState && firm.cityState.replace(",", "").trim()
                      ? firm.cityState
                      : "N/A"}
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] font-medium uppercase tracking-wide mb-1">
                    Firm size
                  </span>
                  <span className="text-[#111827]">
                    {getFirmSize(firm.firmSize)}
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] font-medium uppercase tracking-wide mb-1">
                    Average Fee
                  </span>
                  <span className="text-[#111827]">{firm.averageFee}</span>
                </div>
              </div>
            </div>

            {/* ACTIONS — ALWAYS BOTTOM */}
            <div className="flex gap-3 pt-8">
              <button
                onClick={() => handleSaveFirm(firm)}
                disabled={loadingSave === firm.crd}
                className={`h-8 px-4 rounded-md text-xs font-semibold
                ${
                  isSaved
                    ? "bg-[#16A34A] text-white"
                    : "bg-[#0F4C81] text-white"
                }`}
              >
                {isSaved ? "Saved" : "Save Firm"}
              </button>

              <Link
                href={`/advisors/${firm.crd}`}
                className="h-8 px-4 rounded-md border border-[#353434]
                         text-xs font-semibold text-[#111827]
                         flex items-center justify-center"
              >
                Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
