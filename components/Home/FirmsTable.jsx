"use client";

import Link from "next/link";
import Image from "next/image";

export default function FirmsTable({ firms = [] }) {
  return (
    <div className="w-full bg-white rounded-[14px] border border-[#D9DDE3] shadow-[0_2px_6px_rgba(0,0,0,0.04)] overflow-hidden">

      {/* TABLE */}
      <table className="w-full text-[14px] font-normal">
        <thead>
          <tr className="bg-[#F5F7FA] text-[#555] border-b border-[#E3E6EB]">
            <th className="px-5 py-3 text-left font-medium">Company Name</th>
            <th className="px-5 py-3 text-left font-medium">City / State</th>
            <th className="px-5 py-3 text-left font-medium">Firm size</th>
            <th className="px-5 py-3 text-left font-medium">Avg Client Balance</th>
            <th className="px-5 py-3 text-left font-medium">Key Service Focus</th>
            <th className="px-5 py-3 text-left font-medium">Average Fee</th>
            <th className="px-5 py-3 text-left font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {firms.map((firm, index) => (
            <tr
              key={index}
              className="border-b border-[#ECEEF1] hover:bg-[#F8F9FB] transition-all"
            >
              {/* COMPANY NAME */}
              <td className="px-5 py-4 flex items-center gap-3">
                <Image
                  src={firm.logo}
                  alt={firm.name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <span className="text-[#222] font-semibold">{firm.name}</span>
              </td>

              <td className="px-5 py-4 text-[#444]">{firm.cityState}</td>
              <td className="px-5 py-4 text-[#444]">{firm.firmSize}</td>
              <td className="px-5 py-4 text-[#444]">{firm.avgClientBalance}</td>
              <td className="px-5 py-4 text-[#444]">{firm.keyService}</td>
              <td className="px-5 py-4 text-[#444]">{firm.averageFee}</td>

              {/* ACTION BUTTONS */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">

                  {/* SAVE FIRM BUTTON — EXACT COLOR #0F4C81 */}
                  <button
                    className="px-[14px] py-[6px] rounded-[6px] text-white text-[13px] font-semibold shadow-sm"
                    style={{ backgroundColor: "#0F4C81" }}
                  >
                    Save Firm
                  </button>

                  {/* DETAILS BUTTON */}
                  <Link
                    href={`/advisors/${firm.id}`}
                    className="px-[14px] py-[6px] rounded-[6px] border border-[#D3D7DE] text-[13px] text-[#444] hover:bg-[#F0F2F5] transition"
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
