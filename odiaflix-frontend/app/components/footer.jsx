"use client";

import { Play, Globe, ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer-about" className="relative bg-[#0B0D12] text-gray-300 pt-16 pb-12 px-6 lg:px-16 overflow-hidden border-t border-white/10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        <div className="space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#E50914] flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
            <span className="text-2xl font-extrabold text-white">
              Odia<span className="text-[#E50914]">Flix</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Your ultimate destination for Odia movies, web series and more.
          </p>
          <div className="flex items-center gap-3">
            {["YT", "FB", "IG", "X"].map((social) => (
              <button key={social} className="btn-indigo w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border border-white/15 cursor-pointer">
                {social}
              </button>
            ))}
          </div>
          <div className="pt-2">
            <button className="btn-indigo inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium border border-white/20 cursor-pointer">
              <Globe className="w-4 h-4" />
              <span>English</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Media Centre</a></li>
            <li><a href="#" className="hover:text-white">Ways to Watch</a></li>
            <li><a href="#" className="hover:text-white">Cookie Preferences</a></li>
            <li><a href="#" className="hover:text-white">Speed Test</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-4">Help Centre</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Investor Relations</a></li>
            <li><a href="#" className="hover:text-white">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white">Corporate Information</a></li>
            <li><a href="#" className="hover:text-white">Legal Notices</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-4">Account</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Jobs</a></li>
            <li><a href="#" className="hover:text-white">Privacy</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Only on OdiaFlix</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-12 pt-6 border-t border-white/10 relative z-10">
        <p className="text-sm font-semibold text-gray-300">OdiaFlix India</p>
        <p className="text-xs text-gray-500 mt-2">This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.</p>
      </div>

      <div className="pointer-events-none absolute -bottom-20 -right-20 w-[450px] h-[240px] bg-gradient-to-tl from-[#E50914]/45 via-[#B80710]/20 to-transparent rounded-full blur-2xl" />
    </footer>
  );
}