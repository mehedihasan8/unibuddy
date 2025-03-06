import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="w-full py-14 bg-[#1E293B] dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Grid Section */}
        <div className="grid grid-cols-2 min-[690px]:grid-cols-4 lg:grid-cols-6 gap-4 xl:gap-8 pt-14 pb-10 mx-auto lg:max-w-full">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <Link href="/" className="text-2xl text-white font-bold  flex items-center">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-[#3b82f6]">Uni</span>Buddy
            </Link>
            <p className="py-8 text-gray-500 dark:text-gray-400 lg:max-w-xs text-center lg:text-left">
              Trusted in more than 100 countries & 5 million customers. Have any
              query?
            </p>
            <Link
              href="/"
            >
              <Button>

                Contact us
              </Button>
            </Link>
          </div>

          {/* Footer Links */}
          {[
            {
              title: "Links",
              links: ["Home", "About", "Pricing", "Features", "Pro Version"],
            },
            {
              title: "Products",
              links: [
                "Figma UI System",
                "Icons Assets",
                "Responsive Blocks",
                "Components Library",
                "Plugin Guide",
              ],
            },
            {
              title: "Resources",
              links: [
                "FAQs",
                "Quick Start",
                "Documentation",
                "User Guide",
                "Plugin Guide",
              ],
            },
            {
              title: "Support",
              links: [
                "Customer Support",
                "Cookies",
                "License",
                "Terms & Conditions",
                "Privacy Policy",
              ],
            },
          ].map((section, index) => (
            <div key={index} className="lg:mx-auto text-left">
              <h4 className="text-lg text-gray-300 font-medium mb-7">
                {section.title}
              </h4>
              <ul className="text-sm transition-all duration-500">
                {section.links.map((link, i) => (
                  <li key={i} className="mb-6">
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-gray-500 transition-all duration-500"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} <Link href="/">UniBuddy</Link>, All
            rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
