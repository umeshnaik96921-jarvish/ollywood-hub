"use client";

import { Play, Search, User, ChevronDown } from "lucide-react";

export default function BrowseMovies({
  movies,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  selectedCategory,
  onResetCategory,
  onOpenModal,
  searchInputRef,
}) {
  return (
    <section id="browse-movies" className="w-full bg-[#FFFFFF] text-[#0B0D12] pb-16">
      <div className="border-b border-gray-200 px-6 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4 bg-white sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#E50914] flex items-center justify-center">
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
          <span className="text-xl font-extrabold text-[#0B0D12]">
            Odia<span className="text-[#E50914]">Flix</span>
          </span>
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full bg-gray-100 text-[#0B0D12] placeholder-gray-500 text-sm pl-11 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-[#4B0082]"
          />
        </div>

        <div className="flex items-center gap-6 text-sm font-semibold">
          <a href="#" className="text-gray-700 hover:text-[#4B0082]">Home</a>
          <a href="#browse-movies" className="text-[#E50914] border-b-2 border-[#E50914] pb-1">Movies</a>
          <a href="#footer-about" className="text-gray-700 hover:text-[#4B0082]">About</a>
          <a href="#footer-about" className="text-gray-700 hover:text-[#4B0082]">Contact</a>
          <button className="btn-indigo w-9 h-9 rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-extrabold text-[#0B0D12]">Browse Odia Movies</h2>
              {selectedCategory && selectedCategory !== "All" && (
                <button
                  onClick={onResetCategory}
                  className="btn-indigo text-xs px-3 py-1 rounded-full font-semibold cursor-pointer"
                >
                  Filter: {selectedCategory} ✕
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">Discover the best of Ollywood — by year, genre and more!</p>
          </div>

          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#4B0082] text-white text-sm font-semibold pl-4 pr-10 py-2.5 rounded-full cursor-pointer focus:outline-none"
            >
              <option value="latest">Sort by: Latest</option>
              <option value="oldest">Sort by: Oldest</option>
              <option value="az">Sort by: A - Z</option>
            </select>
            <ChevronDown className="w-4 h-4 text-white absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {movies.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No movies found matching your search or filter.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id || movie._id}
                className="group bg-[#111520] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200 flex flex-col"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111520] via-transparent to-transparent" />
                  <span className="absolute top-2.5 right-2.5 bg-black/75 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {movie.year}
                  </span>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between text-center">
                  <h3 className="text-base font-bold text-white truncate mb-3">{movie.title}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenModal(movie, "movie")}
                      className="btn-indigo py-2 px-2 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      About Movie
                    </button>
                    <button
                      onClick={() => onOpenModal(movie, "cast")}
                      className="btn-indigo py-2 px-2 rounded-lg text-xs font-semibold border border-white/15 cursor-pointer"
                    >
                      Movie Cast
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}