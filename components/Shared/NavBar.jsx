"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
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

  // 🔥 Close dropdown when clicking outside
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
      <nav className="w-full bg-white shadow-sm sticky top-0 z-[99999]">
        <div className="mx-auto px-4 md:px-32 py-3 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="text-[20px] font-semibold text-gray-800 whitespace-nowrap"
          >
            Advisory evaluator
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-[15px]">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              About
            </Link>
            <Link href="/contact" className={linkClass("/contact")}>
              Contact
            </Link>

            {/* LOGGED IN USER */}
            {session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center rounded-full hover:opacity-90 transition"
                >
                  <Image
                    src="/avatar.png"
                    width={38}
                    height={38}
                    className="rounded-full shadow-sm"
                    alt="User Avatar"
                  />
                </button>

                {/* ⭐ PROFESSIONAL DROPDOWN */}
                {dropdownOpen && (
                  <div
                    className="
                      absolute right-0 mt-3 w-56 
                      bg-white
                      rounded-xl
                      shadow-[0_8px_25px_rgba(0,0,0,0.12)]
                      p-3
                      z-[999999]
                      animate-fadeIn
                    "
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                      <Image
                        src="/avatar.png"
                        width={45}
                        height={45}
                        className="rounded-full shadow-sm"
                        alt="User Img"
                      />
                      <div>
                        <p className="text-[15px] font-medium text-gray-900 leading-tight">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {session.user.email}
                        </p>
                      </div>
                    </div>

                    {/* Logout */}
                    <button
                      onClick={() => signOut()}
                      className="
                        w-full text-left 
                        text-red-600 text-[15px] 
                        px-3 py-2 mt-2 
                        rounded-lg 
                        hover:bg-red-50
                        transition
                      "
                    >
                      Logout
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
                  className="text-gray-600 hover:text-gray-800"
                >
                  Log in
                </button>

                <button
                  onClick={() => {
                    setAuthType("signup");
                    setOpenModal(true);
                  }}
                  className="bg-[#0B3A6F] text-white px-5 py-2 rounded-full text-sm hover:bg-[#093058] transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-gray-700 text-3xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-white shadow-lg border-t px-5 py-4 space-y-4 z-[99999]">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block text-[17px] py-2"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="block text-[17px] py-2"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block text-[17px] py-2"
            >
              Contact
            </Link>

            {session ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <Image
                    src="/avatar.png"
                    width={42}
                    height={42}
                    className="rounded-full shadow-sm"
                    alt="User Avatar"
                  />
                  <p className="text-gray-700">{session.user.name}</p>
                </div>

                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="w-full bg-red-600 text-white py-2 rounded-lg text-[16px]"
                >
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
                  className="w-full text-left text-[17px] py-2"
                >
                  Log in
                </button>

                <button
                  onClick={() => {
                    setAuthType("signup");
                    setOpenModal(true);
                    setOpen(false);
                  }}
                  className="w-full bg-[#0B3A6F] text-white py-2 rounded-lg text-[16px]"
                >
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
