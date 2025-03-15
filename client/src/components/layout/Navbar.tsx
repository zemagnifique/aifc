import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-[#171717] border-b border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="cursor-pointer flex items-center">
                <img
                  src="/src/assets/AIFC_y.png"
                  alt="AIFC.tv"
                  className="h-8"
                />
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/"
                className="text-white hover:text-primary px-3 py-2 font-medium"
              >
                HOME
              </Link>
              <Link
                href="/#fights"
                className="text-white hover:text-primary px-3 py-2 font-medium"
              >
                FIGHTS
              </Link>
              <Link
                href="/#events"
                className="text-white hover:text-primary px-3 py-2 font-medium"
              >
                EVENTS
              </Link>
              <Link
                href="/#results"
                className="text-white hover:text-primary px-3 py-2 font-medium"
              >
                RESULTS
              </Link>
              <Link
                href="/#about"
                className="text-white hover:text-primary px-3 py-2 font-medium"
              >
                ABOUT
              </Link>
              <Link
                href="/support-advertising"
                className="text-white hover:text-primary px-3 py-2 font-medium"
              >
                SUPPORT & ADS
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-primary text-black px-4 py-2 rounded font-bold hover:brightness-90 transition-colors">
              WATCH LIVE
            </button>
            <div className="md:hidden ml-4">
              <button
                type="button"
                className="text-gray-400 hover:text-white focus:outline-none"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-[#171717] border-t border-gray-700`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="text-white hover:bg-primary block px-3 py-2 rounded-md font-medium"
          >
            HOME
          </Link>
          <Link
            href="/#fights"
            className="text-white hover:bg-primary block px-3 py-2 rounded-md font-medium"
          >
            FIGHTS
          </Link>
          <Link
            href="/#events"
            className="text-white hover:bg-primary block px-3 py-2 rounded-md font-medium"
          >
            EVENTS
          </Link>
          <Link
            href="/#results"
            className="text-white hover:bg-primary block px-3 py-2 rounded-md font-medium"
          >
            RESULTS
          </Link>
          <Link
            href="/#about"
            className="text-white hover:bg-primary block px-3 py-2 rounded-md font-medium"
          >
            ABOUT
          </Link>
          <Link
            href="/support-advertising"
            className="text-white hover:bg-primary block px-3 py-2 rounded-md font-medium"
          >
            CONTACT & ADS
          </Link>
        </div>
      </div>
    </nav>
  );
}
