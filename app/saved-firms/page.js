// "use client";

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import Image from "next/image";

// /* ---------- helpers ---------- */

// const getFirmSizeLabel = (aum) => {
//   if (!aum || isNaN(aum)) return "N/A";
//   if (aum >= 1_000_000_000) return "Large Firm ($1B+ AUM)";
//   if (aum >= 100_000_000) return "Midsize Firm ($100M–$1B AUM)";
//   return "Small Firm (< $100M AUM)";
// };

// const formatMillions = (value) => {
//   if (!value || isNaN(value)) return "—";
//   return `${(value / 1_000_000).toFixed(1)} M`;
// };

// /* ---------- page ---------- */

// export default function SavedFirmsPage() {
//   const { status } = useSession();
//   const [firms, setFirms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (status !== "authenticated") return;

//     const loadSavedFirms = async () => {
//       try {
//         // 1️⃣ get saved CRDs
//         const savedRes = await fetch("/api/firm/saved");
//         const savedData = await savedRes.json();

//         if (!savedData.savedFirms?.length) {
//           setFirms([]);
//           return;
//         }

//         // 2️⃣ fetch firm details
//         const responses = await Promise.all(
//           savedData.savedFirms.map((crd) =>
//             fetch("/api/firm", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ crd }),
//             }).then((res) => res.json())
//           )
//         );

//         // 3️⃣ normalize correctly (🔥 FIX HERE)
//         const normalized = responses.map((item) => {
//           const filing = item.filing; // ✅ SINGLE SOURCE

//           const info = filing?.Info || {};
//           const addr = filing?.MainAddr || {};
//           const part1A = filing?.FormInfo?.Part1A || {};

//           const totalAUM =
//             part1A?.Item5F?.Q5F2C ||
//             part1A?.Item5F?.Q5F2A ||
//             null;

//           const totalClients = part1A?.Item5D?.Q5DA2 || null;

//           return {
//             crd: info.FirmCrdNb,
//             name: info.LegalNm || info.BusNm || "—",
//             cityState:
//               addr.City && addr.State
//                 ? `${addr.City}, ${addr.State}`
//                 : "—",
//             firmSize: getFirmSizeLabel(totalAUM),
//             avgClientBalance:
//               totalAUM && totalClients
//                 ? formatMillions(totalAUM / totalClients)
//                 : "—",
//             keyService:
//               part1A?.Item5G?.Q5G1 === "Y"
//                 ? "Advisory Services Offered"
//                 : "Retirement Planning",
//             averageFee:
//               part1A?.Item5E?.Q5E1 === "Y"
//                 ? "1.05%"
//                 : "Not disclosed",
//           };
//         });

//         setFirms(normalized);
//       } catch (err) {
//         console.error("Saved firms error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadSavedFirms();
//   }, [status]);

//   /* ---------- states ---------- */

//   if (status === "unauthenticated") {
//     return (
//       <div className="py-24 text-center">
//         <h2 className="text-lg font-semibold">
//           Please log in to view saved firms
//         </h2>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="py-24 text-center text-gray-500">
//         Loading saved firms…
//       </div>
//     );
//   }

//   if (!firms.length) {
//     return (
//       <div className="py-24 text-center">
//         <h2 className="text-lg font-semibold">No firms found</h2>
//         <Link
//           href="/"
//           className="inline-block mt-6 px-5 py-2 rounded-md bg-[#0F4C81] text-white font-semibold"
//         >
//           Back to Home
//         </Link>
//       </div>
//     );
//   }

//   /* ---------- table (figma match) ---------- */

//   return (
//     <div className="max-w-[1200px] mx-auto py-10">
//       <h1 className="text-[22px] font-semibold text-[#0F4C81] mb-6">
//         Financial Advisors Saved By You
//       </h1>

//       <div className="bg-white rounded-[14px] border border-[#D9DDE3] overflow-hidden">
//         <table className="w-full text-[14px]">
//           <thead>
//             <tr className="bg-[#F8FAFC] border-b border-[#E3E6EB] text-[#6B7280]">
//               <th className="px-5 py-3 text-left">Company Name</th>
//               <th className="px-5 py-3 text-left">City / State</th>
//               <th className="px-5 py-3 text-left">Firm size</th>
//               <th className="px-5 py-3 text-left">Avg Client Balance</th>
//               <th className="px-5 py-3 text-left">Key Service Focus</th>
//               <th className="px-5 py-3 text-left">Average Fee</th>
//               <th className="px-5 py-3 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {firms.map((firm) => (
//               <tr
//                 key={firm.crd}
//                 className="border-b border-[#ECEEF1] hover:bg-[#F8F9FB]"
//               >
//                 <td className="px-5 py-4 flex items-center gap-3">
//                   <Image
//                     src="/logo-placeholder.png"
//                     alt="logo"
//                     width={28}
//                     height={28}
//                   />
//                   <span className="font-semibold text-[#111827]">
//                     {firm.name}
//                   </span>
//                 </td>

//                 <td className="px-5 py-4">{firm.cityState}</td>
//                 <td className="px-5 py-4">{firm.firmSize}</td>
//                 <td className="px-5 py-4 font-semibold">
//                   {firm.avgClientBalance}
//                 </td>
//                 <td className="px-5 py-4">{firm.keyService}</td>
//                 <td className="px-5 py-4">{firm.averageFee}</td>

//                 <td className="px-5 py-4 flex gap-3">
//                   <button className="px-3 py-1 rounded bg-red-500 text-white text-[13px]">
//                     Remove
//                   </button>

//                   <Link
//                     href={`/advisors/${firm.crd}`}
//                     className="px-3 py-1 rounded border border-[#D3D7DE] text-[13px]"
//                   >
//                     Details
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
