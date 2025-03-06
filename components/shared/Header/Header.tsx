"use client";

import { useState, useEffect } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Logout, useSelectCurrentUser } from "@/redux/features/auth/authSlice";
import { logout } from "@/firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Cart from "../Cart/CartModal";

type MenuItem = {
  title: string;
  href: string;
};

const Menus: MenuItem[] = [
  { title: "Home", href: "/" },
  { title: "Cafeteria", href: "/menu" },
  { title: "Event", href: "/event" },
  { title: "Class Routine", href: "/class-and-faculty" },
  { title: "But Schedules", href: "/bus-schedules" },
];

const Header = () => {

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { items } = useSelector((state: RootState) => state.cart);


  const user = useAppSelector(useSelectCurrentUser);

  const dispatch = useAppDispatch();

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

  const handleLogout = async () => {
    try {
      await logout(); // ✅ Sign out from Firebase
      dispatch(Logout()); // ✅ Remove user from Redux store
      toast.success("Logout successful");
      router.push("/"); // ✅ Redirect to login page
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(items.length > 0); // Initialize based on items

  // ✅ Automatically close dialog when cart is empty
  useEffect(() => {
    if (items.length === 0) {
      setIsOpen(false);
    }
  }, [items.length]);

  return (
    <header className="shadow backdrop-blur-md fixed top-0 left-0 right-0 z-30 bg-white py-2">
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
          {Menus?.map((menu) => (
            <Link
              key={menu.title}
              href={menu.href}
              className={`${pathname === menu.href
                ? "font-bold border-b-2 border-primary"
                : ""
                } primary-color hover:text-gray-700`}
            >
              {menu.title}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center space-x-5">

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                  <div className="cursor-pointer rounded-full size-10 flex items-center justify-center">
                    <div className="relative cursor-pointer rounded-full size-10 flex items-center justify-center">
                      <ShoppingCart size={28} />
                      <h1 className="absolute border text-sm font-light bg-[#334155] text-white cursor-pointer rounded-full size-5 flex items-center justify-center -top-1 right-0">
                        {items.length}
                      </h1>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="!w-[600px] !max-w-[800px] py-8">
                  <DialogTitle>Your Added Cafeteria Items!</DialogTitle>

                  <Cart />
                </DialogContent>
              </Dialog>


              <div className="dropdown pb-1 relative">
                <div className="border bg-[#334155] text-white cursor-pointer rounded-full size-10 flex items-center justify-center">
                  <h1>{user?.firstName?.charAt(0)}</h1>
                </div>
                <div className="dropdown-menu absolute right-0 z-50 hidden shadow-md pt-2 px-6 pb-2 bg-white border w-[170px]">

                  <Link href={"/order-history"}>
                    <p className="mt-1 cursor-pointer">Order History</p>
                  </Link>

                  <div onClick={handleLogout} className="cursor-pointer pt-2" >
                    Logout
                  </div>



                </div>

              </div>


            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Sign In & Sign Up Buttons */}
              <Button variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
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
                      className={`block py-2 px-4 rounded-md primary-color ${pathname === menu.href
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
