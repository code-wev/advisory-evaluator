"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MapBox from "./MapBox";
import { FiSearch } from "react-icons/fi";

export default function HeroBanner() {
  const [query, setQuery] = useState("");
  const [mapLocation, setMapLocation] = useState("");
  const router = useRouter();

  /* -----------------------------------------
     SEARCH HANDLER (INPUT OR MAP)
  ------------------------------------------ */
  const handleSearch = () => {
    const finalLocation = mapLocation || query;

    if (!finalLocation.trim()) return;

    router.push(
      `/advisors?location=${encodeURIComponent(finalLocation.trim())}`
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  /* -----------------------------------------
     MAP CALLBACK (NO UI CHANGE)
  ------------------------------------------ */
  const handleMapSelect = (location) => {
    setMapLocation(location);
    setQuery(location); // sync input for better UX
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
            <p className="text-white/80 text-[14px] mb-2">
              Search by Firm Name, CRD Number, or City/State
            </p>

            {/* SEARCH BAR (UNCHANGED) */}
            <div className="flex w-full max-w-xl">
              <input
                type="text"
                placeholder="Enter firm name, CRD number, or city/state"
                className="flex-1 px-4 py-[11px] bg-white text-gray-800
                  border border-gray-300 rounded-l-md 
                  focus:outline-none text-[14px]"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setMapLocation(""); // reset map when typing
                }}
                onKeyDown={handleKeyDown}
              />

              <button
                onClick={handleSearch}
                className="px-5 py-[11px] bg-white border border-gray-300 
                  border-l-0 rounded-r-md flex items-center gap-2 
                  hover:bg-gray-50 transition"
              >
                <span className="w-[28px] h-[28px] flex items-center justify-center">
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

      {/* RIGHT: MAP (MAP-BASED SEARCH ENABLED) */}
      <div className="relative w-full h-full">
        <MapBox onLocationSelect={handleMapSelect} />
      </div>
    </section>
  );
}
