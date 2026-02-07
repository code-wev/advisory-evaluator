"use client";

import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className='w-full bg-[#0F4C81] text-white py-14 px-6 md:px-20'>
      <div className='max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between gap-12'>
        {/* LEFT SECTION */}
        <div className='w-full md:w-[40%]'>
          <div className='flex items-center gap-2 mb-4'>
            <span className='text-[22px] font-medium'>Advisory Evaluate</span>
          </div>

          <p className='text-[14px] leading-[1.7] text-white/80 max-w-xs'>
            We simplify the process of researching advisory firms by translating
            public data into meaningful guidance for informed decision-making.
          </p>

          {/* SOCIAL ICONS */}
          <div className='flex items-center gap-4 mt-6'>
            <FaInstagram className='text-white text-[18px] cursor-pointer hover:text-gray-300' />
          </div>
        </div>

        {/* PAGES SECTION */}
        <div className='w-full md:w-[20%]'>
          <h3 className='text-[14px] font-semibold mb-4'>Pages</h3>
          <ul className='text-[14px] text-white/80 leading-[1.9]'>
            <li className='cursor-pointer hover:text-white'>Home</li>
            <li className='cursor-pointer hover:text-white'>About</li>
            <li className='cursor-pointer hover:text-white'>Saved Firms</li>
            <li className='cursor-pointer hover:text-white'>Contact</li>
          </ul>
        </div>

        {/* CONTACT INFORMATION */}
        <div className='w-full md:w-[25%]'>
          <h3 className='text-[14px] font-semibold mb-4'>
            Contact information
          </h3>
          <ul className='text-[14px] text-white/80 leading-[1.9]'>
            <li>Email: info@advisorevaluate.com </li>
          </ul>
        </div>
      </div>

      {/* DIVIDER */}
      <div className='w-full h-px bg-white/20 my-10' />

      {/* BOTTOM BAR */}
      <div className='max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between text-[12px] text-white/70 px-2'>
        <span>All rights reserved by: Advisory Evaluator©2025</span>
        <span className='cursor-pointer hover:text-white'>Privacy Policy</span>
      </div>
    </footer>
  );
}
