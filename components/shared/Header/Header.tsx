"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";

type MenuItem = {
  title: string;
  href: string;
};

const Menus: MenuItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/service" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMobileNavOpen]);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className="shadow backdrop-blur-md fixed top-0 left-0 right-0 z-50 bg-white py-2">
      <nav className="max-w-7xl mx-auto w-full px-4 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-2xl font-bold primary-color flex items-center"
        >
          <Image
            src={"/logo.png"}
            alt="logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-[#3b82f6]">Uni</span>Buddy
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {Menus.map((menu) => (
            <Link
              key={menu.title}
              href={menu.href}
              className={`${
                pathname === menu.href
                  ? "font-bold border-b-2 border-primary"
                  : ""
              } primary-color hover:text-gray-700`}
            >
              {menu.title}
            </Link>
          ))}

          {/* Sign In & Sign Up Buttons */}
          <Button variant="outline" className="ml-6">
            <Link href="/login">Login</Link>
          </Button>
          <Button>
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileNav}
          className="lg:hidden primary-color p-1"
        >
          {isMobileNavOpen ? (
            <X className="size-7" />
          ) : (
            <Menu className="size-7" />
          )}
        </button>

        {/* Mobile Menu (Backdrop + Sidebar) */}
        {isMobileNavOpen && (
          <>
            {/* Backdrop to cover background and apply blur */}
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md h-full w-full"
              onClick={() => setIsMobileNavOpen(false)} // Click outside to close
            />

            {/* Mobile Menu */}
            <div className="fixed top-0 left-0 bottom-0 h-screen w-full max-w-[90vw] bg-white shadow-lg p-6 z-50">
              {/* Header */}
              <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold primary-color">
                  UniBuddy
                </Link>
                <button
                  onClick={toggleMobileNav}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
                >
                  <X className="size-7" />
                </button>
              </div>
              <div className="h-[1px] bg-gray-600 mb-6 mt-4"></div>

              {/* Mobile Links */}
              <ul className="space-y-4">
                {Menus.map((menu) => (
                  <li key={menu.title}>
                    <Link
                      href={menu.href}
                      className={`block py-2 px-4 rounded-md primary-color ${
                        pathname === menu.href
                          ? "font-bold border-l-4 border-primary"
                          : ""
                      }`}
                    >
                      {menu.title}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Sign In & Sign Up Buttons */}
              <div className="flex items-center justify-between gap-4 mt-6 mr-6">
                <Button variant="outline" className="w-1/2">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button className="w-1/2">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>

              <p className="mt-6 text-xs text-center text-gray-400">
                © {new Date().getFullYear()} UniBuddy. All rights reserved.
              </p>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
