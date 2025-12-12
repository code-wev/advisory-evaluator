"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function FirmsTable({ firms = [] }) {
  const { data: session, status } = useSession();

  const handleSaveFirm = async (firm) => {
    if (!session) {
      toast.error("Please log in to save firms");
      return;
    }

    try {
      const res = await fetch("/api/firm/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ crd: firm.crd }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      if (data.action === "saved") {
        toast.success("Firm saved successfully");
      } else {
        toast.success("Firm removed from saved list");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    }
  };

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

  if (!firms || firms.length === 0) {
    return (
      <div className="w-full bg-white rounded-[14px] border border-[#D9DDE3] shadow-[0_2px_6px_rgba(0,0,0,0.04)] flex items-center justify-center py-24">
        <div className="text-center max-w-md">
          <h2 className="text-[18px] font-semibold text-[#111827]">
            No firms found
          </h2>

          <p className="mt-2 text-[14px] text-[#6B7280] leading-relaxed">
            We couldn’t find any advisory firms matching your current criteria.
            Please try adjusting your filters or return to the homepage to
            explore available firms.
          </p>

          <Link
            href="/"
            className="inline-block mt-6 px-[18px] py-[8px] rounded-[8px] text-white text-[14px] font-semibold"
            style={{ backgroundColor: "#0F4C81" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[14px] border border-[#D9DDE3] shadow-[0_2px_6px_rgba(0,0,0,0.04)] overflow-hidden">
      <table className="w-full text-[14px]">
        <thead>
          <tr className="bg-[#F5F7FA] text-[#6B7280] border-b border-[#E3E6EB]">
            <th className="px-5 py-3 text-left font-medium">Company Name</th>
            <th className="px-5 py-3 text-left font-medium">City / State</th>
            <th className="px-5 py-3 text-left font-medium">Firm size</th>
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
          {firms.map((firm, index) => (
            <tr
              key={index}
              className="border-b border-[#ECEEF1] hover:bg-[#F8F9FB]"
            >
              {/* COMPANY */}
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

              {/* FIRM SIZE — EXACT FIGMA */}
              <td className="px-5 py-4 text-[#374151]">
                {typeof firm.firmSize === "number"
                  ? getFirmSizeLabel(firm.firmSize)
                  : firm.firmSize
                  ? firm.firmSize
                  : getFirmSizeLabel(
                      firm.aum ?? firm.totalAum ?? firm.regulatoryAum
                    )}
              </td>

              {/* AVG CLIENT BALANCE — BOLD */}
              <td className="px-5 py-4 text-[#374151]">
                {formatMillions(firm.avgClientBalance)}
              </td>

              <td className="px-5 py-4 text-[#374151]">{firm.keyService}</td>

              <td className="px-5 py-4 text-[#374151]">{firm.averageFee}</td>

              <td className="px-5 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSaveFirm(firm)}
                    className="px-[14px] py-[6px] rounded-[6px] cursor-pointer text-white text-[13px] font-semibold"
                    style={{ backgroundColor: "#0F4C81" }}
                  >
                    Save Firm
                  </button>

                  <Link
                    href={`/advisors/${firm.crd}`}
                    className="px-[14px] py-[6px] rounded-[6px] border border-[#D3D7DE] text-[13px] text-[#374151] hover:bg-[#F0F2F5]"
                  >
                    Details
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
