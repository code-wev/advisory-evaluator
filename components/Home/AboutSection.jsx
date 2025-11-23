"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <>
      {/* ===================== ABOUT SECTION ===================== */}
      <section className="w-full bg-white pt-32 pb-20">
        <div className="w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-24 lg:px-32 gap-16">
          {/* LEFT IMAGE */}
          <div className="w-full md:w-[48%]">
            <div className="relative w-full h-[340px] md:h-[380px] overflow-hidden">
              <Image
                src="/meeting.jpg"
                alt="Advisory discussion"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="w-full md:w-[48%]">
            <h2 className="text-[34px] md:text-[36px] font-semibold leading-tight text-[#0A0A0A] mb-4">
              At advisory-evaluator.com,
              <br />
              our mission is simple:
            </h2>

            <p className="text-[16px] text-gray-600 leading-[1.7] mb-10 max-w-[600px]">
              At advisory-evaluator.com, our mission is to empower individuals
              with transparency and guidance when choosing financial advisors.
              We believe everyone deserves access to unbiased information about
              the firms they consider for advisory services. Our platform makes
              complex SEC data accessible, accurate, and easy to understand.
            </p>

            <Link
              href="/about"
              className="inline-block bg-[#0B3A6F] text-white text-[15px]
                          font-medium px-8 py-3 rounded-full
                          hover:bg-[#082c52] transition-shadow shadow-sm"
            >
              Learn more about us
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES SECTION ===================== */}
      <section className="w-full bg-white py-10 md:py-20">
        <div className="w-full flex flex-col md:flex-row items-start justify-center px-8 md:px-24 lg:px-32">
          {/* CARD 1 */}
          <div className="flex flex-col items-center text-center w-full md:w-1/3">
            <div className="relative w-[240px] h-[182px] mb-6">
              <Image
                src="/ab-1.png"
                alt="Accurate Reports"
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-[17px] font-semibold text-[#0A0A0A] mb-2">
              Accurate Reports
            </h3>

            <p className="text-[14px] text-gray-600 leading-[1.6] max-w-[360px]">
              All information is sourced directly from SEC filings and presented
              in a simple, easy-to-read format.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="flex flex-col items-center text-center w-full md:w-1/3">
            <div className="relative w-[240px] h-[182px] mb-6">
              <Image
                src="/ab-2.png"
                alt="Reliable Search Results"
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-[17px] font-semibold text-[#0A0A0A] mb-2">
              Reliable Search Results
            </h3>

            <p className="text-[14px] text-gray-600 leading-[1.6] max-w-[360px]">
              Our system scans filings and public records to help you discover
              firms operating in any location across the U.S.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="flex flex-col items-center text-center w-full md:w-1/3">
            <div className="relative w-[240px] h-[182px] mb-6">
              <Image
                src="/ab-3.png"
                alt="Real Data Decisions"
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-[17px] font-semibold text-[#0A0A0A] mb-2">
              Make Decisions Backed by Real Data
            </h3>

            <p className="text-[14px] text-gray-600 leading-[1.6] max-w-[360px]">
              We turn complex SEC filings into clear, structured
              insights—helping you understand a firm’s background, performance
              indicators, and key compliance details in seconds.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
