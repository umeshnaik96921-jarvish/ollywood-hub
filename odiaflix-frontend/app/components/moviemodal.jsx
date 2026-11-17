"use client";

import { X, Film, Users, Calendar, Play } from "lucide-react";

export default function MovieModal({ modalData, onClose }) {
  if (!modalData) return null;
  const { movie, tab } = modalData;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121622] border border-white/15 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl text-white my-8">
        
        {/* POSTER / VIDEO PREVIEW HEADER */}
        <div className="relative h-48 w-full">
          {movie.videoUrl && tab === "movie" ? (
            // Agar video URL hai aur user ne Watch Now dabaya hai toh iframe player dikhega
            <iframe
              src={movie.videoUrl}
              title={movie.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            // Normal poster image agar video nahi hai
            <img src={movie.poster || movie.banner} alt={movie.title} className="w-full h-full object-cover" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/40 to-transparent pointer-events-none" />
          
          <button
            onClick={onClose}
            className="btn-indigo absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer z-10 bg-black/60 hover:bg-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 -mt-6 relative">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#E50914] text-white mb-2">
            {tab === "cast" ? "Movie Cast & Crew" : "About Movie"}
          </span>
          <h3 className="text-2xl font-extrabold">{movie.title}</h3>

          <div className="flex items-center gap-4 text-xs text-gray-400 mt-1 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {movie.year}</span>
            <span>•</span>
            <span>{movie.genre}</span>
          </div>

          <div className="space-y-4 text-sm text-gray-300">
            {/* SYNOPSIS SECTION */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-[#E50914]" /> Synopsis
              </h4>
              <p className="leading-relaxed">{movie.description || movie.synopsis}</p>
            </div>

            {/* DIRECTOR & CAST SECTION */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#E50914]" /> Director & Cast
              </h4>
              <p><strong className="text-white">Director:</strong> {movie.director}</p>
              <p><strong className="text-white">Lead Cast:</strong> {Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast}</p>
            </div>

            {/* VIDEO EMBED INFO / NOTICE (Optional helper for user) */}
            {movie.videoUrl && tab !== "movie" && (
              <div className="text-xs text-[#E50914] bg-red-950/30 border border-red-900/50 p-2.5 rounded-lg flex items-center gap-2">
                <Play className="w-4 h-4 fill-[#E50914]" />
                <span>Trailer / Video available! Click 'Watch Now' on the banner to view.</span>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="btn-indigo px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer bg-gray-800 hover:bg-gray-700 text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}