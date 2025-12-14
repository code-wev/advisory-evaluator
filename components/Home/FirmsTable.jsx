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
     NORMALIZE FIRMS (🔥 FIX DUPLICATES)
  ------------------------------------------ */
  const uniqueFirms = useMemo(() => {
    return Array.from(new Map((firms || []).map((f) => [f.crd, f])).values());
  }, [firms]);

  /* -----------------------------------------
     LOAD SAVED FIRMS (🔥 FIX DOUBLE LOAD)
  ------------------------------------------ */
  useEffect(() => {
    if (!session) return;

    let isMounted = true;

    async function loadSavedFirms() {
      try {
        const res = await fetch("/api/firm/saved");
        const data = await res.json();

        if (res.ok && isMounted) {
          const uniqueSaved = Array.from(new Set(data.savedFirms || []));
          setSavedFirms(uniqueSaved);
        }
      } catch (err) {
        console.error("Failed to load saved firms");
      }
    }

    loadSavedFirms();

    return () => {
      isMounted = false;
    };
  }, [session]);

  /* -----------------------------------------
     SAVE / UNSAVE HANDLER (🔥 RACE SAFE)
  ------------------------------------------ */
  const handleSaveFirm = async (firm) => {
    if (!session) {
      toast.error("Please log in to save firms");
      return;
    }

    const isCurrentlySaved = savedFirms.includes(firm.crd);
    const toastId = `save-${firm.crd}`;

    try {
      setLoadingSave(firm.crd);

      toast.loading(isCurrentlySaved ? "Removing firm..." : "Saving firm...", {
        id: toastId,
      });

      const res = await fetch("/api/firm/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crd: firm.crd }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong", { id: toastId });
        return;
      }

      if (isCurrentlySaved) {
        setSavedFirms((prev) => prev.filter((id) => id !== firm.crd));
        toast.success("Firm removed from saved list", { id: toastId });
      } else {
        setSavedFirms((prev) =>
          prev.includes(firm.crd) ? prev : [...prev, firm.crd]
        );
        toast.success("Firm saved successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Server error. Please try again.", { id: toastId });
    } finally {
      setLoadingSave(null);
    }
  };

  /* -----------------------------------------
     HELPERS
  ------------------------------------------ */
  const getFirmSizeLabel = (aum) => {
    if (!aum || isNaN(aum)) return "N/A";
    if (aum >= 1_000_000_000) return "Large Firm ($1B+ AUM)";
    if (aum >= 100_000_000) return "Midsize Firm ($100M–$1B AUM)";
    return "Small Firm ($100M AUM)";
  };

  const formatMillions = (aum) => {
    if (!aum || isNaN(aum)) return "N/A";
    return `${(aum / 1_000_000).toFixed(1)} M`;
  };

  /* -----------------------------------------
     EMPTY STATE (UNCHANGED)
  ------------------------------------------ */
  if (!uniqueFirms || uniqueFirms.length === 0) {
    return (
      <div className="w-full bg-white rounded-[14px] border border-[#D9DDE3] shadow-sm flex items-center justify-center py-24 px-6">
        <div className="text-center max-w-lg">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            No firms available
          </h2>

          <p className="mt-3 text-[14px] text-[#6B7280] leading-relaxed">
            We couldn’t find any advisory firms matching your current selection.
            This may be because no firms are available for the chosen location,
            or you haven’t saved any firms yet.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="px-5 py-2 rounded-lg text-white text-[14px] font-semibold transition hover:opacity-90"
              style={{ backgroundColor: "#0F4C81" }}
            >
              Browse Advisors
            </Link>

            <Link
              href="/advisors"
              className="px-5 py-2 rounded-lg border border-[#D3D7DE] text-[14px] font-semibold text-[#374151] hover:bg-[#F9FAFB] transition"
            >
              Search by Location
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* -----------------------------------------
     TABLE (UNCHANGED UI)
  ------------------------------------------ */
  return (
    <div className="w-full bg-white rounded-[14px] border border-[#D9DDE3] shadow overflow-hidden">
      <table className="w-full text-[14px]">
        <thead>
          <tr className="bg-[#F5F7FA] text-[#6B7280] border-b border-[#E3E6EB]">
            <th className="px-5 py-3 text-left font-medium">Company Name</th>
            <th className="px-5 py-3 text-left font-medium">City / State</th>
            <th className="px-5 py-3 text-left font-medium">Firm Size</th>
            <th className="px-5 py-3 text-left font-medium">
              Avg Client Balance
            </th>
            <th className="px-5 py-3 text-left font-medium">
              Key Service Focus
            </th>
            <th className="px-5 py-3 text-left font-medium">Fee Type</th>
            <th className="px-5 py-3 text-left font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {uniqueFirms.map((firm) => {
            const isSaved = savedFirms.includes(firm.crd);

            return (
              <tr
                key={firm.crd}
                className="border-b border-[#ECEEF1] hover:bg-[#F8F9FB]"
              >
                <td className="px-5 py-4 flex items-center gap-3">
                  <Image
                    src={firm.logo}
                    alt={firm.name}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <span className="font-semibold text-[#111827]">
                    {firm.name}
                  </span>
                </td>

                <td className="px-5 py-4 text-[#374151]">{firm.cityState}</td>

                <td className="px-5 py-4 text-[#374151]">
                  {typeof firm.firmSize === "number"
                    ? getFirmSizeLabel(firm.firmSize)
                    : firm.firmSize || "N/A"}
                </td>

                <td className="px-5 py-4 text-[#374151]">
                  {formatMillions(firm.avgClientBalance)}
                </td>

                <td className="px-5 py-4 text-[#374151]">{firm.keyService}</td>

                <td className="px-5 py-4 text-[#374151]">{firm.averageFee}</td>

                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    <button
                      disabled={loadingSave === firm.crd}
                      onClick={() => handleSaveFirm(firm)}
                      className={`w-[96px] px-[14px] py-[6px] rounded-[6px]
                        text-[13px] font-semibold text-white text-center
                        ${isSaved ? "bg-green-600" : "bg-[#0F4C81]"}
                        ${
                          loadingSave === firm.crd
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }
                      `}
                    >
                      {isSaved ? "Saved" : "Save Firm"}
                    </button>

                    <Link
                      href={`/advisors/${firm.crd}`}
                      className="px-[14px] py-[6px] rounded-[6px] border border-[#D3D7DE]
                        text-[13px] text-[#374151] hover:bg-[#F0F2F5]"
                    >
                      Details
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
