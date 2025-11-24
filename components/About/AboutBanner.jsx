"use client";

import Image from "next/image";

export default function AboutBanner() {
  return (
    <section className="w-full flex flex-col md:flex-row h-[360px] md:h-[620px]">
      {/* LEFT BLUE PANEL */}
      <div className="bg-[#0F4C81] w-full md:w-[45%] flex items-center justify-center py-12 md:py-0 px-6 md:px-12">
        <h1 className="text-white text-3xl md:text-4xl font-semibold leading-snug">
          Empowering Your <br />
          Financial Decisions <br />
          With Clarity
        </h1>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative w-full md:w-[55%] h-[220px] md:h-full">
        <Image
          src="/about.jpg"
          alt="Financial team discussion"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
