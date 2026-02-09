"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AuthModal from "../auth/AuthModal";

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session } = useSession();
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const linkClass = (path) =>
    pathname === path
      ? "text-[#0B3A6F] font-semibold"
      : "text-gray-600 hover:text-gray-800";

  const switchAuth = (newType) => setAuthType(newType);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className='w-full bg-white shadow-sm sticky top-0 z-[99999]'>
        <div className='mx-auto px-4 md:px-32 py-3 flex items-center justify-between'>
          {/* LOGO */}

          <div className='flex justify-center items-center gap-2.5'>
            <Image
              className='rounded-xl'
              alt=''
              width={34}
              height={34}
              src='/logo.jpg'
            />
            <Link href='/' className='text-[20px] font-semibold text-gray-800'>
              Advisory Evaluate
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className='hidden md:flex items-center gap-8 text-[15px]'>
            <Link href='/' className={linkClass("/")}>
              Home
            </Link>
            <Link href='/about' className={linkClass("/about")}>
              About
            </Link>
            <Link href='/contact' className={linkClass("/contact")}>
              Contact
            </Link>

            {/* USER */}
            {session ? (
              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className='flex items-center rounded-full'>
                  <Image
                    src='/avatar.png'
                    width={38}
                    height={38}
                    className='rounded-full shadow-sm'
                    alt='User Avatar'
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className='
      absolute right-0 mt-3 w-64
      bg-white
      rounded-xl
      shadow-[0_12px_30px_rgba(0,0,0,0.15)]
      overflow-hidden
      z-[999999]
      animate-fadeIn
    '>
                    {/* PROFILE HEADER */}
                    <div className='flex items-center gap-3 px-4 py-4 bg-gray-50'>
                      <Image
                        src='/avatar.png'
                        width={44}
                        height={44}
                        className='rounded-full border'
                        alt='User Avatar'
                      />
                      <div className='leading-tight'>
                        <p className='text-[15px] font-semibold text-gray-900'>
                          {session.user.name}
                        </p>
                        <p className='text-xs text-gray-500 truncate max-w-[180px]'>
                          {session.user.email}
                        </p>
                      </div>
                    </div>

                    {/* MENU ITEMS */}
                    <div className='px-2 py-2'>
                      <Link
                        href='/saved-firms'
                        onClick={() => setDropdownOpen(false)}
                        className='
          flex items-center gap-3
          px-3 py-2.5
          rounded-lg
          text-[14px]
          text-gray-700
          hover:bg-gray-100
          transition
        '>
                        ⭐<span className='font-medium'>Saved Firms</span>
                      </Link>
                    </div>

                    {/* DIVIDER */}
                    <div className='border-t border-gray-200' />

                    {/* LOGOUT */}
                    <button
                      onClick={() => signOut()}
                      className='
        w-full flex items-center gap-3
        px-4 py-3
        text-left
        text-[14px]
        font-medium
        text-red-600
        hover:bg-red-50
        transition
      '>
                      ⏻ Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthType("login");
                    setOpenModal(true);
                  }}
                  className='text-gray-600'>
                  Log in
                </button>
                <button
                  onClick={() => {
                    setAuthType("signup");
                    setOpenModal(true);
                  }}
                  className='bg-[#0B3A6F] text-white px-5 py-2 rounded-full'>
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button className='md:hidden text-3xl' onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className='md:hidden bg-white border-t px-5 py-4 space-y-4'>
            <Link
              href='/'
              onClick={() => setOpen(false)}
              className='block py-2'>
              Home
            </Link>
            <Link
              href='/about'
              onClick={() => setOpen(false)}
              className='block py-2'>
              About
            </Link>
            <Link
              href='/contact'
              onClick={() => setOpen(false)}
              className='block py-2'>
              Contact
            </Link>

            {session ? (
              <>
                <div className='flex items-center gap-3 py-2'>
                  <Image
                    src='/avatar.png'
                    width={42}
                    height={42}
                    className='rounded-full'
                    alt='User'
                  />
                  <p>{session.user.name}</p>
                </div>

                <Link
                  href='/saved-firms'
                  onClick={() => setOpen(false)}
                  className='block py-2 text-gray-700'>
                  Saved Firms
                </Link>

                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className='w-full bg-red-600 text-white py-2 rounded-lg'>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthType("login");
                    setOpenModal(true);
                    setOpen(false);
                  }}
                  className='block py-2'>
                  Log in
                </button>
                <button
                  onClick={() => {
                    setAuthType("signup");
                    setOpenModal(true);
                    setOpen(false);
                  }}
                  className='w-full bg-[#0B3A6F] text-white py-2 rounded-lg'>
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* AUTH MODAL */}
      <AuthModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        type={authType}
        switchAuth={switchAuth}
      />
    </>
  );
}
