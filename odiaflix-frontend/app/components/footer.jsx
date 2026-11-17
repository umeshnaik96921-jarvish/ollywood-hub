import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b0e14] text-gray-400 py-12 px-6 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Odia<span className="text-[#E50914]">Flix</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your ultimate digital destination and archive for Odia movies, web series, cast details, and cinema history.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Explore</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="#movies" className="hover:text-white transition-colors">Movie Collection</Link></li>
            <li><Link href="#categories" className="hover:text-white transition-colors">Genres & Categories</Link></li>
            <li><Link href="#trending" className="hover:text-white transition-colors">Trending Now</Link></li>
          </ul>
        </div>

        {/* Platform & Community */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Platform</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Feedback</Link></li>
            <li><Link href="/submit" className="hover:text-white transition-colors">Suggest a Movie</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Disclaimer / Note */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Disclaimer</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            OdiaFlix is an independent movie catalog and information platform created to celebrate and document Odia cinema. We do not host or stream copyrighted video files.
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>© {new Date().getFullYear()} OdiaFlix. Made with <Heart className="w-3 h-3 inline text-[#E50914] mx-1" /> for Odia Cinema.</p>
        <p className="mt-2 sm:mt-0">Celebrating Atavi & Kalahandi Roots 🚀&copy; 2026 odiaflix.</p>
      </div>
    </footer>
  );
}