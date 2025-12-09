"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdvisorDetails() {
  const { crd } = useParams();
  const [firm, setFirm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!crd) return;

    async function fetchFirm() {
      try {
        const res = await fetch("/api/firm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ crd }),
        });

        const data = await res.json();
        setFirm(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchFirm();
  }, [crd]);

  if (loading) return <p className="p-6 text-lg">Loading...</p>;
  if (!firm) return <p className="p-6 text-lg">No Firm Found</p>;

  const i = firm.Info;
  const m = firm.MainAddr;
  const f = firm.FormInfo?.Part1A;

  return (
    <div className="px-8 py-10 max-w-6xl mx-auto">

      {/* ---------------- HEADING SECTION ---------------- */}
      <h1 className="text-3xl font-bold mb-2">{i?.LegalNm}</h1>

      <p className="text-gray-700 max-w-3xl text-[15px] leading-relaxed">
        {i?.BusNm} registered on {firm.Filing?.[0]?.Dt}.
      </p>

      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md mt-4 text-sm">
        These disclosures are from last month. They’ve solved their problems now. — Admin.
      </div>


      {/* ---------------- BASIC INFO TABLE ---------------- */}
      <div className="mt-10">
        <table className="w-full border border-gray-200 rounded-md overflow-hidden">
          <tbody className="text-[15px]">

            <tr className="border-b border-gray-200">
              <td className="p-3 font-medium bg-gray-50 w-48">Website</td>
              <td className="p-3">{f?.Item1?.WebAddrs?.WebAddr}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="p-3 font-medium bg-gray-50">Address</td>
              <td className="p-3">
                {m?.Strt1}, {m?.City}, {m?.State} {m?.PostlCd}
              </td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="p-3 font-medium bg-gray-50">Phone</td>
              <td className="p-3">{m?.PhNb}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="p-3 font-medium bg-gray-50">Registration Type</td>
              <td className="p-3">{f?.Item3A?.OrgFormNm}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="p-3 font-medium bg-gray-50">Most recent filing</td>
              <td className="p-3">{firm.Filing?.[0]?.Dt}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="p-3 font-medium bg-gray-50">Organization Type</td>
              <td className="p-3">{f?.Item3A?.OrgFormNm}</td>
            </tr>

            <tr>
              <td className="p-3 font-medium bg-gray-50">Firm Size</td>
              <td className="p-3">
                {f?.Item5F?.Q5F2C ? `$${f.Item5F.Q5F2C} AUM` : "N/A"}
              </td>
            </tr>

          </tbody>
        </table>
      </div>


      {/* ---------------- OTHER DETAILS (From Figma) ---------------- */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Websites */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Websites listed for this firm</h2>
          {f?.Item1?.WebAddrs?.WebAddrs?.map((w, idx) => (
            <p key={idx} className="text-gray-700 text-[15px]">• {w}</p>
          ))}
        </div>

        {/* Other business names */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Other Business Names</h2>
          {(f?.Item1B ?? []).length === 0 && (
            <p className="text-gray-600">No alternate business names listed.</p>
          )}
        </div>
      </div>

    </div>
  );
}
