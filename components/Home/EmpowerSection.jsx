"use client";

import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

export default function EmpowerSection() {
  return (
    <section className="w-full bg-white py-20 flex justify-center">
      <div className="flex flex-col items-center text-center px-6">

        {/* Heading */}
        <h2 className="text-[24px] md:text-[32px] font-semibold text-[#0A0A0A] mb-3">
          Empowering clear, data-driven decisions.
        </h2>

        {/* Sub Text */}
        <p className="text-[14px] md:text-[15px] text-gray-600 leading-[1.7] max-w-[480px] mb-8">
          We simplify the process of researching advisory firms by translating
          public data into meaningful guidance for informed decision-making.
        </p>

        {/* BUTTONS */}
        <div className="flex items-center gap-4 mt-2">
          
          {/* Primary Button */}
          <Link
            href="/find-advisor"
            className="bg-[#0B3A6F] text-white text-[14px] px-6 py-2.5 rounded-full 
                       font-medium flex items-center gap-2 hover:bg-[#092d54] transition"
          >
            Find Advisor <FiArrowUpRight className="text-[16px]" />
          </Link>

          {/* Secondary Button */}
          <Link
            href="/contact"
            className="border border-gray-300 text-[14px] px-6 py-2.5 rounded-full 
                       font-medium flex items-center gap-2 hover:bg-gray-50 transition"
          >
            Contact Us <FiArrowUpRight className="text-[16px]" />
          </Link>

        </div>
      </div>
    </section>
  );
}
