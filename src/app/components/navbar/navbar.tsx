"use client";
import React, { useEffect, useState } from "react";
import { Flex } from "@radix-ui/themes";
import { MenuIcon, XIcon } from "lucide-react";
import MLHBanner from "./mlh";
import Checkerboard from "../checkerboard";

const Navbar = () => {
  const [scrollXTop, setScrollXTop] = useState(0);
  const [scrollXBottom, setScrollXBottom] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrollXTop((prev) => prev - 0.5); // Scroll top stripe left
      setScrollXBottom((prev) => prev + 0.5); // Scroll bottom stripe right
    };

    const interval = setInterval(updateScroll, 16); // Smooth animation ~60fps
    return () => clearInterval(interval);
  }, []);

  const navbarButtons = [
    { label: "Apply", href: "https://my.hackprinceton.com" },
    { label: "About", href: "#about" },
    { label: "Tracks", href: "#tracks" },
    { label: "FAQ", href: "#faq" },
    { label: "Contributors", href: "#contributors" },
    { label: "Resources", href: "#resources" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-retroWhite">
      {/* Top scrolling red stripe */}
      <Checkerboard scrollXTop={scrollXTop} />

      {/* Logo Section */}
      <Flex justify="center" align="center" className="w-full relative">
        <Flex
          align="center"
          className="z-20 my-3 max-w-7xl w-full lg:w-auto px-8 h-16 relative"
        >
          <div className="relative h-full flex items-center">
            <img
              src="/images/logos/hplogo_text.png"
              alt="HackPrinceton Logo"
              className="relative h-full z-20"
            />
            <span className="z-20 absolute top-1/4 right-2 transform -translate-y-1/2 text-retroRed font-bold">
              spring 2025
            </span>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden ml-auto bg-retroWhite border-2 border-retroRed rounded-lg p-1 flex items-center">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-retroRed focus:outline-none"
            >
              {isMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Navbar Buttons for Desktop */}
          <div className="hidden lg:flex ml-8">
            {navbarButtons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                className="border-2 hover:bg-yellow-100 hover:scale-[1.05] transition-all border-retroRed rounded-xl py-1 px-2 text-retroRed bg-retroWhite font-bold text-base hover:text-retroRed mx-2"
              >
                {button.label}
              </a>
            ))}
          </div>
          <div className="ml-6 transition-all hidden lg:inline">
            <div className="right-[10%] mt-14 ">
              <MLHBanner />
            </div>
          </div>
        </Flex>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden z-10 bg-retroWhite w-full absolute top-16 left-0 shadow-lg transition-all">
            <Flex align="center" className="py-4 flex-col">
              {navbarButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  className="block py-2 text-xl px-4 text-retroRed font-bold hover:bg-yellow-100 hover:scale-[1.05] transition-all"
                >
                  {button.label}
                </a>
              ))}
            </Flex>
            <Checkerboard scrollXTop={scrollXBottom} />
          </div>
        )}
        <div className="absolute z-[-5] transition-all top-[6.25rem] right-4 w-auto inline  lg:hidden">
          <MLHBanner />
        </div>

        {/* Red stripe */}
        <div className="h-1 z-10 mt-4 bg-retroRed absolute w-full"></div>
      </Flex>

      {/* Bottom scrolling red stripe */}
      <Checkerboard scrollXTop={scrollXBottom} />
    </nav>
  );
};

export default Navbar;
