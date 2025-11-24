"use client";

import Link from "next/link";
import Image from "next/image";

export default function FirmsTable({ firms = [] }) {
  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden">

      {/* TABLE */}
      <table className="w-full text-sm font-medium">
        <thead>
          <tr className="bg-[#F7F8FA] text-gray-600 border-b">
            <th className="p-4 text-left">Company Name</th>
            <th className="p-4 text-left">City / State</th>
            <th className="p-4 text-left">Firm size</th>
            <th className="p-4 text-left">Avg Client Balance</th>
            <th className="p-4 text-left">Key Service Focus</th>
            <th className="p-4 text-left">Average Fee</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {firms.map((firm, index) => (
            <tr
              key={index}
              className="border-b last:border-none hover:bg-[#FAFAFA] transition-all"
            >
              {/* COMPANY NAME */}
              <td className="p-4 flex items-center gap-3">
                <Image
                  src={firm.logo}
                  alt={firm.name}
                  width={26}
                  height={26}
                  className="rounded-full"
                />
                <span className="font-semibold text-gray-800">{firm.name}</span>
              </td>

              <td className="p-4 text-gray-700">{firm.cityState}</td>
              <td className="p-4 text-gray-700">{firm.firmSize}</td>
              <td className="p-4 text-gray-700">{firm.avgClientBalance}</td>
              <td className="p-4 text-gray-700">{firm.keyService}</td>
              <td className="p-4 text-gray-700">{firm.averageFee}</td>

              {/* ACTION BUTTONS */}
              <td className="p-4">
                <div className="flex items-center gap-3">

                  {/* SAVE BUTTON */}
                  <button className="px-4 py-1.5 rounded-md bg-[#0052FF] text-white text-xs font-semibold hover:bg-blue-700 transition-all">
                    Save Firm
                  </button>

                  {/* DETAILS BUTTON */}
                  <Link
                    href={`/advisors/${firm.id}`}
                    className="px-4 py-1.5 rounded-md border border-gray-300 text-gray-700 text-xs hover:bg-gray-100 transition-all"
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
