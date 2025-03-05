import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-14 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-14 flex justify-between items-center flex-col gap-8 lg:gap-0 lg:flex-row">
          <div className="block">
            <h3 className="font-manrope text-3xl text-gray-900 dark:text-gray-100 font-bold mb-2 text-center lg:text-left">
              Sign up to our webpage
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center lg:text-left">
              Stay up to date with the latest update and announcement.
            </p>
          </div>
          <div className="flex items-center flex-col gap-4 lg:flex-row">
            <input
              type="email"
              name="email"
              className="py-3 px-6 h-14 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm rounded-full focus:outline-none"
              placeholder="Enter your email..."
            />
            <button className="h-14 py-3.5 px-7 bg-indigo-600 hover:bg-indigo-700 shadow-sm rounded-full text-white font-bold">
              Subscribe
            </button>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-2 min-[690px]:grid-cols-4 lg:grid-cols-6 gap-4 xl:gap-8 pt-14 pb-10 max-w-xs mx-auto min-[690px]:max-w-2xl lg:max-w-full">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <Link href="/" className="flex justify-center lg:justify-start">
              <svg
                className="w-40 h-8"
                viewBox="0 0 164 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Your Logo SVG Code Here */}
              </svg>
            </Link>
            <p className="py-8 text-gray-500 dark:text-gray-400 lg:max-w-xs text-center lg:text-left">
              Trusted in more than 100 countries & 5 million customers. Have any query?
            </p>
            <Link
              href="/contact"
              className="py-2.5 px-5 h-9 block w-fit bg-indigo-600 rounded-full shadow-sm text-xs text-white mx-auto transition-all duration-500 hover:bg-indigo-700 lg:mx-0"
            >
              Contact us
            </Link>
          </div>

          {/* Footer Links */}
          {[
            {
              title: "Pagedone",
              links: ["Home", "About", "Pricing", "Features", "Pro Version"],
            },
            {
              title: "Products",
              links: ["Figma UI System", "Icons Assets", "Responsive Blocks", "Components Library", "Plugin Guide"],
            },
            {
              title: "Resources",
              links: ["FAQs", "Quick Start", "Documentation", "User Guide", "Plugin Guide"],
            },
            {
              title: "Support",
              links: ["Customer Support", "Cookies", "License", "Terms & Conditions", "Privacy Policy"],
            },
          ].map((section, index) => (
            <div key={index} className="lg:mx-auto text-left">
              <h4 className="text-lg text-gray-900 dark:text-gray-100 font-medium mb-7">
                {section.title}
              </h4>
              <ul className="text-sm transition-all duration-500">
                {section.links.map((link, i) => (
                  <li key={i} className="mb-6">
                    <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="py-7 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} <Link href="/">Pagedone</Link>, All rights reserved.
            </span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0">
              {/* Social Media Icons */}
              {[
                { href: "#", bg: "bg-[#33CCFF]", icon: "M11.8214 9.81691L16.9919..." }, // Twitter
                { href: "#", bg: "bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500", icon: "M5.63434 7.99747C5.63434..." }, // Instagram
                { href: "#", bg: "bg-[#337FFF]", icon: "M7.04111 7.81204L7.41156..." }, // Facebook
                { href: "#", bg: "bg-[#FF0000]", icon: "M13.9191 1.10651C14.558 1.27906..." }, // YouTube
              ].map((social, index) => (
                <Link key={index} href={social.href} className={`w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center ${social.bg} hover:bg-gray-900`}>
                  <svg className="w-[1.25rem] h-[1.25rem] text-white" viewBox="0 0 16 16" fill="none">
                    <path d={social.icon} fill="currentColor" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
