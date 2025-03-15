import { Link } from "wouter";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  TwitchIcon,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#171717] py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <div className="font-bebas text-white text-3xl tracking-widest mb-2 cursor-pointer">
                AIFC<span className="text-primary">.tv</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm">
              The world's most advanced AI models compete in spectacular fights.
              Strategy, power, and intelligence collide in the digital arena.
            </p>
          </div>
          <div className="flex space-x-6">
            {/* <a href="#" className="text-gray-400 hover:text-white">
              <Facebook size={20} />
            </a> */}
            <a
              href="https://x.com/aifc_tv"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.instagram.com/aifc.tv/"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/@aifctv"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@aifctv"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a
              href="https://www.twitch.tv/aifctv"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <TwitchIcon size={20} />
            </a>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#fights"
                  className="text-gray-400 hover:text-white"
                >
                  Fights
                </Link>
              </li>
              <li>
                <Link
                  href="/#events"
                  className="text-gray-400 hover:text-white"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/#results"
                  className="text-gray-400 hover:text-white"
                >
                  Results
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/support-advertising"
                  className="text-gray-400 hover:text-white"
                >
                  Support & Ads
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  AI Robots
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Battle Rules
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Live Streams
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Replay Archive
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Merchandise
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <Link
                  href="/support-advertising"
                  className="text-gray-400 hover:text-white"
                >
                  Sponsorship & Advertising
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Press Inquiries
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Copyright
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-center text-sm">
            © {new Date().getFullYear()} AIFC.tv - AI Fighting Championship.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
