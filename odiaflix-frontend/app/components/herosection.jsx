"use client";
import CategoryMenu from "./CategoryMenu";
import { useState, useEffect } from "react";
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
  const [heroSlides, setHeroSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Backend API se slides fetch karna
  useEffect(() => {
    fetch("http://localhost:5000/api/hero-slides")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setHeroSlides(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hero slides:", err);
        setLoading(false);
      });
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return <div className="min-h-[400px] flex items-center justify-center text-white bg-[#0B0D12]">Loading Hero Banner...</div>;
  }

  if (heroSlides.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-white bg-[#0B0D12] p-6 text-center">
        <p className="text-lg font-semibold mb-2">No Hero Slides Found in Database!</p>
        <p className="text-sm text-gray-400">Admin panel se koi movie hero slide ke taur par add karein.</p>
      </div>
    );
  }

  const activeMovie = heroSlides[currentSlide];

  return (
    <section className="relative w-full min-h-[400px] lg:min-h-[680px] flex flex-col lg:flex-row bg-[#0B0D12] border-b border-white/10 overflow-hidden">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-full lg:w-[270px] shrink-0 bg-[#0D1017] border-b lg:border-b-0 lg:border-r border-white/10 p-4 lg:p-6 flex flex-col justify-between z-20">
        <div>
          <div className="flex items-center gap-2.5 mb-6 lg:mb-8">
            <div className="w-9 h-9 rounded-lg bg-[#E50914] flex items-center justify-center shadow-lg shadow-red-600/30">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Odia<span className="text-[#E50914]">Flix</span>
            </span>
          </div>

          <div className="mb-6 lg:mb-7">
            <h2 className="font-oriya text-xl lg:text-2xl font-bold text-white tracking-wide">
              ଆମର ଓଡ଼ିଆ
            </h2>
            <p className="text-xs lg:text-sm text-gray-400 mt-1 leading-snug">
              Explore Odia Cinema <br /> Like Never Before
            </p>
          </div>

          <CategoryMenu 
            SIDEBAR_ITEMS={SIDEBAR_ITEMS} 
            selectedCategory={selectedCategory} 
            onSelectCategory={onSelectCategory} 
          />
        </div>

        <div className="mt-6 lg:mt-8 pt-4 hidden lg:block">
          <button
            onClick={() => alert("Login Triggered")}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-full text-sm font-semibold border border-white/15 bg-[#141824] text-white hover:bg-[#1f2636] cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </button>
        </div>
      </aside>

      {/* RIGHT HERO BANNER */}
      <div className="relative flex-1 min-h-[500px] lg:min-h-[600px] flex flex-col justify-between p-4 sm:p-6 lg:p-10">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${activeMovie.banner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D12] via-[#0B0D12]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-[#0B0D12]/60" />

        <header className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onSearchFocus}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-white/10 bg-black/40 text-white hover:bg-white/10 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
            <span className="text-white/20">|</span>
            <a
              href="#footer-about"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-white/10 bg-black/40 text-white hover:bg-white/10"
            >
              <Info className="w-4 h-4" />
              <span>About us</span>
            </a>
          </div>

          <button
            onClick={() => alert("Sign up / Login Screen")}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border-2 border-[#E50914] bg-[#E50914]/20 text-white hover:bg-[#E50914] transition-colors cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span>Sign up / Login</span>
          </button>
        </header>

        <div className="relative z-10 max-w-2xl my-auto py-8 lg:py-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/40 mb-3 lg:mb-4">
            Featured Release • {activeMovie.year}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
            {activeMovie.title}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mt-3 lg:mt-4 max-w-xl leading-relaxed">
            {activeMovie.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 lg:gap-4 mt-5 lg:mt-7">
            <button
              onClick={() => onOpenModal(activeMovie, "movie")}
              className="flex items-center gap-2.5 px-6 lg:px-7 py-3 lg:py-3.5 rounded-full text-sm font-bold bg-[#E50914] text-white hover:bg-red-700 shadow-lg shadow-red-600/30 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Now</span>
            </button>
            <button
              onClick={() => onOpenModal(activeMovie, "movie")}
              className="flex items-center gap-2.5 px-6 lg:px-7 py-3 lg:py-3.5 rounded-full text-sm font-semibold border border-white/20 bg-black/40 text-white hover:bg-white/10 cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>More Info</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="hidden sm:block w-24" />
          
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onOpenModal(activeMovie, "movie")}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                About Movie
              </button>
              <button
                onClick={() => onOpenModal(activeMovie, "cast")}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border border-white/15 bg-white/5 text-white hover:bg-white/15 cursor-pointer"
              >
                Movie Cast
              </button>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-2">
              Director: {activeMovie.director} | Cast: {Array.isArray(activeMovie.cast) ? activeMovie.cast.join(", ") : activeMovie.cast}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? "w-6 bg-[#E50914]" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 bg-black/40 text-white hover:bg-white/10 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 bg-black/40 text-white hover:bg-white/10 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}