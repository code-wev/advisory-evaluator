"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <>
      {/* ===================== ABOUT SECTION ===================== */}
      <section className="w-full bg-white pt-32 pb-20">
        <div className="
          w-full 
          flex flex-col md:flex-col lg:flex-row 
          items-center justify-between 
          px-6 md:px-12 lg:px-32 
          gap-12 lg:gap-16
        ">
          {/* LEFT IMAGE */}
          <div className="w-full lg:w-[48%] flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[480px] h-[320px] md:h-[360px] lg:h-[380px] overflow-hidden rounded-lg">
              <Image
                src="/meeting.jpg"
                alt="Advisory discussion"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="w-full lg:w-[48%]">
            <h2 className="
              text-[28px] md:text-[32px] lg:text-[36px] 
              font-semibold leading-[1.25] 
              text-[#0A0A0A] mb-4
            ">
              At advisory-evaluator.com,
              <br className="hidden lg:block" />
              our mission is simple:
            </h2>

            <p className="
              text-[15px] md:text-[16px] 
              text-gray-600 leading-[1.7] 
              mb-10 max-w-[600px]
            ">
              At advisory-evaluator.com, our mission is to empower individuals
              with transparency and guidance when choosing financial advisors.
              We believe everyone deserves accessible, unbiased information about
              the firms they consider. Our platform makes complex SEC data easier
              to understand.
            </p>

            <Link
              href="/about"
              className="
                inline-block bg-[#0B3A6F] text-white text-[15px]
                font-medium px-8 py-3 rounded-full
                hover:bg-[#082c52] transition-shadow shadow-sm
              "
            >
              Learn more about us
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES SECTION ===================== */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="
          w-full 
          grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 
          gap-14 md:gap-10 lg:gap-0 
          px-6 md:px-12 lg:px-32
        ">
          {/* CARD 1 */}
          <FeatureCard
            img="/about1.svg"
            title="Accurate Reports"
            text="All information is sourced directly from SEC filings and presented in a simple, easy-to-read format."
          />

          {/* CARD 2 */}
          <FeatureCard
            img="/about2.svg"
            title="Reliable Search Results"
            text="Our system scans filings and public records to help you discover firms operating in any location across the U.S."
          />

          {/* CARD 3 */}
          <FeatureCard
            img="/about3.svg"
            title="Make Decisions Backed by Real Data"
            text="We turn complex SEC filings into clear, structured insights—helping you understand a firm’s background, performance indicators, and key compliance details in seconds."
          />
        </div>
      </section>
    </>
  );
}

/* ===================== FEATURE CARD COMPONENT ===================== */

function FeatureCard({ img, title, text }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-[220px] md:w-[240px] h-[160px] md:h-[182px] mb-6">
        <Image src={img} alt={title} fill className="object-contain" />
      </div>

      <h3 className="text-[17px] font-semibold text-[#0A0A0A] mb-2">
        {title}
      </h3>

      <p className="text-[14px] text-gray-600 leading-[1.6] max-w-[360px]">
        {text}
      </p>
    </div>
  );
}
