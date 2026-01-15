"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <>
      {/* ===================== ABOUT SECTION ===================== */}
      <section className="w-full bg-white pt-[96px] md:pt-[120px] pb-[80px] md:pb-[96px]">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-[140px] gap-[56px] lg:gap-[72px]">
          {/* LEFT IMAGE */}
          <div className="w-full flex justify-center lg:justify-start">
            <div
              className="
                relative 
                w-full 
                max-w-[520px] 
                aspect-[520/370] 
                bg-[#F6F7F9] 
                rounded-[8px] 
                overflow-hidden 
                flex items-center justify-center
              "
            >
              <img
                src="/repo.png"
                alt="Advisory Evaluator Report"
                className="w-[88%] h-auto object-contain"
              />
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="w-full max-w-[520px] text-center lg:text-left">
            <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-semibold leading-[36px] md:leading-[40px] lg:leading-[44px] text-[#0A0A0A] mb-[16px]">
              Transparent Insights,
              <br className="hidden lg:block" />
              Better Decisions.
            </h2>

            <p className="text-[15px] md:text-[16px] text-[#5F6C7B] leading-[26px] md:leading-[28px] mb-[28px] md:mb-[32px] mx-auto lg:mx-0 max-w-[480px]">
              At Advisor Evaluate, our mission is simple: to empower individuals
              with transparency and guidance as they navigate personal financial
              decisions. Everyone deserves access to clear, unbiased information
              that supports informed choices when selecting a trusted financial
              professional.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Link
                href="/about"
                className="inline-flex items-center justify-center h-[44px] px-[28px] rounded-full bg-[#0B3A6F] text-white text-[15px] font-medium hover:bg-[#082c52] transition"
              >
                Learn more about us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES SECTION ===================== */}
      <section className="w-full bg-white pt-[56px] md:pt-[64px] pb-[80px] md:pb-[96px]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-[56px] md:gap-y-[72px] xl:gap-y-0 px-6 md:px-12 lg:px-[140px]">
          <FeatureCard
            img="/about3.svg"
            title="Reliable Search Results"
            text="Our system scans filings and public records to help you discover firms operating in any location across the U.S."
          />

          <FeatureCard
            img="/about2.svg"
            title="Make Decisions Backed by Real Data"
            text="We turn lengthy SEC filings into clear, structured insights - helping you understand pertinent information about registared investment Advisors in your zip code."
          />

          <FeatureCard
            img="/about1.svg"
            title="Evaluate"
            text="Review the firm’s service and business practices to determine whether they align with and appropriately support your needs."
          />
        </div>
      </section>
    </>
  );
}

/* ===================== FEATURE CARD ===================== */

function FeatureCard({ img, title, text }) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="relative w-[180px] md:w-[200px] h-[135px] md:h-[150px] mb-[20px] md:mb-[24px]">
        <Image src={img} alt={title} fill className="object-contain" />
      </div>

      <h3 className="text-[16px] md:text-[17px] font-semibold text-[#0A0A0A] mb-[8px]">
        {title}
      </h3>

      <p className="text-[14px] text-[#5F6C7B] leading-[22px] max-w-[320px]">
        {text}
      </p>
    </div>
  );
}
