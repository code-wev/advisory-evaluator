"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { articles } from "@/data/articles";

export default function GuidesInsights() {
  const cards = articles;
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % cards.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section className="w-full bg-[#ECF0F1] py-24">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-[28px] md:text-[32px] font-semibold text-[#0A0A0A] mb-2">
          Guides & Insights
        </h2>
        <p className="text-gray-600 text-[15px] max-w-xl mx-auto leading-[1.7]">
          Explore simple, educational articles that help you understand advisory
          services, SEC filings, and business evaluation.
        </p>
      </div>

      {/* Slider */}
      <div className="relative flex items-center justify-center px-10 md:px-24 lg:px-32">
        {/* LEFT BUTTON */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-10 bg-white shadow-lg w-14 h-14 
                     rounded-full flex items-center justify-center hover:bg-gray-100 transition"
        >
          <FiChevronLeft className="text-[26px]" />
        </button>

        {/* TRACK */}
        <div className="overflow-hidden w-full max-w-7xl">
          <motion.div
            className="flex gap-6"
            animate={{ x: -index * 330 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                className="
                  min-w-[320px] bg-white rounded-lg shadow-md px-7 py-6 
                  flex flex-col h-[260px]
                "
              >
                <h3 className="text-[17px] font-semibold text-[#0A0A0A] mb-2">
                  {card.title}
                </h3>

                {/* TEXT GROWS - pushes button down */}
                <p className="text-[14px] text-gray-600 leading-[1.6] mb-3 flex-grow">
                  {card.short}
                </p>

                <Link
                  href={`/${card.slug}`}
                  className="text-[#0B3A6F] text-[14px] font-medium hover:underline mt-auto"
                >
                  Read more
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-10 bg-white shadow-lg w-14 h-14 
                     rounded-full flex items-center justify-center hover:bg-gray-100 transition"
        >
          <FiChevronRight className="text-[26px]" />
        </button>
      </div>
    </section>
  );
}
