"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MapBox from "./MapBox";
import { FiSearch } from "react-icons/fi";

export default function HeroBanner() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/advisors?location=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="w-full h-[520px] md:h-[560px] grid grid-cols-1 md:grid-cols-[48%_52%]">
      {/* LEFT PANEL */}
      <div className="bg-[#0F4C81] text-white flex flex-col justify-center px-8 lg:px-20">
        <div className="max-w-xl md:pl-12">
          <h1 className="text-[36px] leading-tight md:text-[44px] md:leading-[1.1] font-bold mb-6 tracking-tight">
            Find a Trusted <br /> Financial Advisor
          </h1>

          <p className="text-white/80 text-[15px] md:text-[16px] leading-relaxed mb-10 max-w-md">
            Use official SEC data to find and evaluate registered investment
            advisory firms in your area, presented in simple, understandable
            terms.
          </p>

          <div>
            {/* LABEL */}
            <p className="text-white/80 text-[14px] mb-2">
              Select your state or enter zip code
            </p>

            {/* SEARCH BAR EXACT FIGMA */}
            <div className="flex w-full max-w-xl">
              {/* INPUT */}
              <input
                type="text"
                placeholder="State / Zip code"
                className="flex-1 px-4 py-[11px] bg-white text-gray-800
                 border border-gray-300 rounded-l-md 
                 focus:outline-none text-[14px]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />

              {/* SEARCH BUTTON (EXACT FIGMA) */}
              <button
                onClick={handleSearch}
                className="px-5 py-[11px] bg-white border border-gray-300 
                 border-l-0 rounded-r-md flex items-center gap-2 
                 hover:bg-gray-50 transition"
              >
                {/* ICON CIRCLE EXACT FIGMA */}
                <span
                  className="w-[28px] h-[28px]
                      flex items-center justify-center"
                >
                  <FiSearch className="text-[18px] text-gray-700" />
                </span>

                <span className="text-gray-800 text-[14px] font-medium">
                  Search
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: REAL MAP */}
      <div className="relative w-full h-full">
        <MapBox />
      </div>
    </section>
  );
}
