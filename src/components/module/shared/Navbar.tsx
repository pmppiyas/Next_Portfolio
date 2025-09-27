"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const LogoIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 6H10V10H6V6Z" fill="#F97316" />
    <path d="M14 6H18V10H14V6Z" fill="#F97316" />
    <path d="M6 14H10V18H6V14Z" fill="#F97316" />
    <path d="M14 14H18V18H14V14Z" fill="#F97316" fillOpacity="0.5" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface MobileMenuProps {
  isOpen: boolean;
  navItems: string[];
  onNavigate?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navItems, onNavigate }) => (
  <div
    id="mobile-menu"
    className={`
      md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-sm border-t shadow-lg
      transition-all duration-300 ease-in-out
      ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}
    `}
  >
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {navItems.map((item) => (
        <Link
          key={item}
          href={`/${item.toLowerCase()}`}
          className="block px-3 py-2 rounded-md text-base font-medium hover:text-mine"
          onClick={() => onNavigate?.()}
        >
          {item}
        </Link>
      ))}
    </div>
    <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
      <div className="px-5">
        <Button variant="outline" className="w-full" onClick={() => onNavigate?.()}>
          Download Resume
        </Button>
      </div>
    </div>
  </div>
);

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = ["About", "Features", "Blog", "Pricing", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.3;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 w-full z-30 transition-all duration-300
        ${isScrolled ? "bg-background shadow-md py-2" : "bg-transparent py-4"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <LogoIcon />
            <span className="text-xl font-bold">Qupe</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 px-10 py-3 rounded-full text-lg font-normal bg-accent/70 backdrop-blur-sm">
            {navItems.map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}>
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Button variant="secondary">Resume</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} navItems={navItems} onNavigate={() => setIsMenuOpen(false)} />
    </header >
  );
};
