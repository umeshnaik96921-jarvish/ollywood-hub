"use client";

import { useState } from "react";
import {
  Play,
  Drama,
  Skull,
  Heart,
  Smile,
  Calendar,
  LogIn,
  Search,
  Info,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { HERO_SLIDES } from "../data/moviesdata";

const SIDEBAR_ITEMS = [
  { name: "Drama", icon: Play },
  { name: "Thriller", icon: Drama },
  { name: "Crime", icon: Skull },
  { name: "Romance", icon: Heart },
  { name: "Comedy", icon: Smile },
  { name: "Year", icon: Calendar },
];

export default function HeroSection({
  selectedCategory,
  onSelectCategory,
  onOpenModal,
  onSearchFocus,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeMovie = HERO_SLIDES[currentSlide];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full min-h-[680px] flex flex-col lg:flex-row bg-[#0B0D12] border-b border-white/10 overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-full lg:w-[270px] shrink-0 bg-[#0D1017] border-b lg:border-b-0 lg:border-r border-white/10 p-6 flex flex-col justify-between z-20">
        <div>
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-lg bg-[#E50914] flex items-center justify-center shadow-lg shadow-red-600/30">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Odia<span className="text-[#E50914]">Flix</span>
            </span>
          </div>

          <div className="mb-7">
            <h2 className="font-oriya text-2xl font-bold text-white tracking-wide">
              ଆମର ଓଡ଼ିଆ
            </h2>
            <p className="text-sm text-gray-400 mt-1 leading-snug">
              Explore Odia Cinema <br /> Like Never Before
            </p>
          </div>

          <nav className="space-y-2.5">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = selectedCategory === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => onSelectCategory(item.name)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#E50914] to-[#B80710] text-white shadow-lg shadow-red-900/40"
                      : "bg-[#161B26] text-gray-300 hover:bg-[#4B0082] hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 pt-4">
          <button
            onClick={() => alert("Login Triggered")}
            className="w-full btn-indigo flex items-center justify-center gap-2.5 py-3 px-5 rounded-full text-sm font-semibold border border-white/15 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </button>
        </div>
      </aside>

      {/* RIGHT HERO BANNER */}
      <div className="relative flex-1 min-h-[600px] flex flex-col justify-between p-6 lg:p-10">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${activeMovie.banner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D12] via-[#0B0D12]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-[#0B0D12]/60" />

        <header className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 mx-auto lg:mx-0 lg:ml-24">
            <button
              onClick={onSearchFocus}
              className="btn-indigo flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-white/10 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
            <span className="text-white/20">|</span>
            <a
              href="#footer-about"
              className="btn-indigo flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-white/10"
            >
              <Info className="w-4 h-4" />
              <span>About us</span>
            </a>
          </div>

          <button
            onClick={() => alert("Sign up / Login Screen")}
            className="btn-indigo flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-[#E50914] cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span>Sign up / Login</span>
          </button>
        </header>

        <div className="relative z-10 max-w-2xl my-auto py-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/40 mb-4">
            Latest Release • {activeMovie.year}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {activeMovie.title} — <span className="text-[#E50914]">Latest Odia</span> Blockbuster
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            {activeMovie.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-7">
            <button
              onClick={() => onOpenModal(activeMovie, "movie")}
              className="btn-indigo flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Now</span>
            </button>
            <button
              onClick={() => onOpenModal(activeMovie, "movie")}
              className="btn-indigo flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/20 cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>More Info</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="hidden sm:block w-24" />
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenModal(activeMovie, "movie")}
                className="btn-indigo px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
              >
                About Movie
              </button>
              <button
                onClick={() => onOpenModal(activeMovie, "cast")}
                className="btn-indigo px-6 py-2.5 rounded-full text-sm font-semibold border border-white/15 cursor-pointer"
              >
                Movie Cast
              </button>
            </div>
            <p className="text-xs text-gray-300 mt-2">
              Director: {activeMovie.director} • Cast: {activeMovie.cast.join(", ")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? "w-7 bg-[#E50914]" : "w-2.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="btn-indigo w-10 h-10 rounded-full flex items-center justify-center border border-white/15 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="btn-indigo w-10 h-10 rounded-full flex items-center justify-center border border-white/15 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}