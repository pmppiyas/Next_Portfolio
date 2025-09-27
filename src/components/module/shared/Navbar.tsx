"use client";
import { Button } from '@/components/ui/button';
import { ChevronDown, Download, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMenuOpen]);


  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const links = [
    { name: "Home", link: "/#home" },
    { name: "About", link: "/#about" },
    { name: "Service", link: "/#service" },
    {
      name: "Projects",
      link: "/#portfolio",
    },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/#contact" },
  ];

  return (
    <header
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all  max-w-6xl mx-auto duration-300  ${scrolled ? "bg-bg-custom shadow-lg py-4 " : "bg-transparent py-4  "
        }`}
    >
      <div className="container mx-auto  w-full overflow-hidden">
        <div className="flex justify-between items-center px-4  lg:px-6">
          {/* Logo */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            <Link href="/" className="flex items-center">
              <span className="text-white/90">P</span>
              <span className="bg-gradient-to-r from-mine to-mine/70 bg-clip-text text-transparent">
                rince
              </span>
            </Link>
          </h2>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 ">
            <nav className="flex gap-1">
              {links.map((link, idx) => (
                <div key={idx} className="relative group text-accent hover:text-mine">
                  <Link
                    href={link.link}
                    className={`text-base font-medium px-4 py-2 rounded-md flex items-center gap-1 transition-all "
                      }`}

                  >
                    {link.name}

                  </Link>


                </div>
              ))}
            </nav>

            {/* Phone contact - desktop */}
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="flex items-center gap-2  text-white ring-2 ring-primary px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-yellow-300/20">
                <a
                  href=""
                  download="PrinceMahmudPiyas_CV"
                  className="flex items-center gap-2"
                >
                  <Download size={18} className="animate-pulse" />
                  <p>Download Resume</p>
                </a>
              </div>
              <div className="flex items-center gap-2 bg-mine hover:bg-mine/80 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-yellow-300/20">
                <Phone size={18} className="animate-pulse" />
                <p>Make a Call</p>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4 ">
            {/* Small phone icon for mobile */}
            <a
              href="tel:+880177233703"
              className="text-white p-2 rounded-full hover:bg-primary/50 transition-colors"
            >
              <Phone size={20} />
            </a>

            <Button
              className="p-2 rounded-full hover:bg-primary/50  transition-colors focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - slide in from right */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-[750px] w-[280px] bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out transform overflow-y-auto ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="absolute top-4 right-4 flex justify-end">
          <Button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full bg-mine/10 hover:bg-mine/20 text-mine transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Close menu"
          >
            <X
              size={24}
              strokeWidth={2.5}
              className="transition-transform hover:rotate-90 duration-300"
            />
          </Button>
        </div>

        {/* Logo in mobile menu */}
        <div className="pt-12 px-4 pb-4 border-b border-accent">
          <h2 className="text-2xl font-bold">
            <span className="text-mine">P</span>rince
          </h2>
        </div>

        <div className="px-4 pb-6 ">
          <nav className="flex flex-col gap-4 justify-between">
            {links.map((link, idx) => (
              <div key={idx} className="border-b border-accent">
                <Button variant={"secondary"} className='w-full'>{link.name}</Button>
              </div>
            ))}
          </nav>

          {/* Phone contact - mobile */}
          <Button className='w-full mt-10'>
            <Phone size={20} />
            <a href="tel:+880177233703" className="text-lg font-medium">
              Make a call
            </a>
          </Button>

        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}

// Mobile submenu component with toggle functionality
function MobileSubmenu({ link }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="w-full flex items-center justify-between py-4 px-3 text-lg text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {link.name}
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 bg-gray-50 rounded-md ${isOpen ? "max-h-64 py-2 mb-2" : "max-h-0"
          }`}
      >
        {link.subMenu?.map((subItem, subIdx) => (
          <Link
            key={subIdx}
            href={subItem.link}
            className="block pl-6 pr-3 py-3 text-gray-700 hover:text-mine border-l-2 border-transparent hover:border-mine ml-3 transition-all"
          >
            {subItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
