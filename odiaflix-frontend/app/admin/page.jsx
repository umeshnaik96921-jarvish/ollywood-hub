"use client";

import { useState, useRef, useEffect } from "react";
import { 
  LayoutDashboard, 
  Film, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  PlusCircle, 
  Trash2, 
  Upload, 
  CheckCircle2,
  Menu,
  X
} from "lucide-react";

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const [successMessage, setSuccessMessage] = useState("");

  // Form State for Adding Movie
  const [movieData, setMovieData] = useState({
    title: "",
    genre: "Drama",
    year: 2026,
    director: "",
    cast: "",
    synopsis: "",
    poster: ""
  });

  const fileInputRef = useRef(null);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };
// --- Custom movies aur delete logic ---
  const [savedMovies, setSavedMovies] = useState([]);

  // 1. Backend se saari movies load karne ke liye
  useEffect(() => {
  fetch("http://localhost:5000/api/movies")
    .then((res) => res.json()) // ✅ Yeh line add karni hai
    .then((data) => setSavedMovies(data))
    .catch((err) => console.log("Error loading movies:", err));
}, []);

  // 2. Backend se movie delete karne ke liye
  const handleDeleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "DELETE",
      });
      // Screen se turant hatane ke liye
      const updatedMovies = savedMovies.filter((movie) => movie._id !== id && movie.id !== id);
      setSavedMovies(updatedMovies);
    } catch (err) {
      console.log("Error deleting movie:", err);
    }
  };
  // Handle File Selector (Opens Local Folder)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMovieData({ ...movieData, poster: imageUrl });
    }
  };

  // Save Movie to Backend Database (MongoDB)
  const handleSaveMovie = async (e) => {
    e.preventDefault();
    if (!movieData.title || !movieData.synopsis) {
      alert("Please fill in at least the Movie Title and Description!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        alert("Movie successfully saved to database!");
        
        // Reset Form (Yeh ab function ke andar hai)
        setMovieData({
          title: "",
          genre: "Drama",
          year: new Date().getFullYear(),
          director: "",
          cast: "",
          synopsis: "",
          poster: ""
        });

        window.location.reload();
      } else {
        alert("Failed to save movie.");
      }
    } catch (err) {
      console.log("Error saving movie:", err);
      alert("Server error connecting to backend!");
    }
  };

     



  return (
    <div className="min-h-screen bg-[#0B0D12] text-white flex font-sans">
      
      {/* SIDEBAR (Inspired by Image 1 & Wireframe 2) */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#121620] border-r border-gray-800 p-5 flex flex-col transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold tracking-wider text-indigo-400">ଆମର ଓଡ଼ିଶା Admin</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === "dashboard" ? "bg-[#4B0082] text-white shadow-lg shadow-indigo-900/30" : "text-gray-400 hover:bg-gray-800/50 hover:text-white"}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === "products" ? "bg-[#4B0082] text-white shadow-lg shadow-indigo-900/30" : "text-gray-400 hover:bg-gray-800/50 hover:text-white"}`}
          >
            <Film size={20} /> Manage Movies
          </button>

          <button 
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === "analytics" ? "bg-[#4B0082] text-white shadow-lg shadow-indigo-900/30" : "text-gray-400 hover:bg-gray-800/50 hover:text-white"}`}
          >
            <BarChart3 size={20} /> Analytics
          </button>

          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === "settings" ? "bg-[#4B0082] text-white shadow-lg shadow-indigo-900/30" : "text-gray-400 hover:bg-gray-800/50 hover:text-white"}`}
          >
            <Settings size={20} /> Settings
          </button>
        </nav>

        <div className="pt-4 border-t border-gray-800 text-xs text-gray-500 text-center">
          OdiaFlix CMS v2.0
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-[#121620] border-b border-gray-800 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
              <Menu size={24} />
            </button>
            <div className="relative hidden sm:block w-72">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full bg-[#1A1F2C] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white p-2">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 bg-[#1A1F2C] border border-gray-700 px-3 py-1.5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm">UA</div>
              <span className="text-sm font-medium hidden md:inline">Admin Account</span>
            </div>
          </div>
        </header>

        {/* CONTENT BODY */}
        <main className="p-6 lg:p-8 flex-1 overflow-y-auto">
          
          {successMessage && (
            <div className="mb-6 bg-emerald-900/50 border border-emerald-600 text-emerald-200 px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg">
              <CheckCircle2 size={22} className="text-emerald-400 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {activeTab === "products" ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Add New Movie</h2>
                  <p className="text-sm text-gray-400">Fill in details to publish a movie directly to OdiaFlix website.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleSaveMovie}
                    className="flex items-center gap-2 bg-[#4B0082] hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-indigo-900/40"
                  >
                    <PlusCircle size={18} /> Add / Save Movie
                  </button>
                </div>
              </div>

              {/* FORM & POSTER SECTION (Matching Wireframe 2) */}
              <form onSubmit={handleSaveMovie} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* General Information Inputs */}
                <div className="lg:col-span-2 bg-[#121620] border border-gray-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-semibold border-b border-gray-800 pb-3 mb-6 text-indigo-300">General Information</h3>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Movie Name</label>
                      <input 
                        type="text" 
                        name="title"
                        value={movieData.title}
                        onChange={handleChange}
                        placeholder="e.g. Daman 2" 
                        required
                        className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Genre / Category</label>
                        <select 
                          name="genre"
                          value={movieData.genre}
                          onChange={handleChange}
                          className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                        >
                          <option value="Drama">Drama</option>
                          <option value="Thriller">Thriller</option>
                          <option value="Crime">Crime</option>
                          <option value="Romance">Romance</option>
                          <option value="Comedy">Comedy</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Release Year</label>
                        <input 
                          type="number" 
                          name="year"
                          value={movieData.year}
                          onChange={handleChange}
                          className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Director Name</label>
                        <input 
                          type="text" 
                          name="director"
                          value={movieData.director}
                          onChange={handleChange}
                          placeholder="e.g. Vishal Mourya" 
                          className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Actors Name (Cast)</label>
                        <input 
                          type="text" 
                          name="cast"
                          value={movieData.cast}
                          onChange={handleChange}
                          placeholder="e.g. Babushaan Mohanty" 
                          className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Movie Description / Synopsis</label>
                      <textarea 
                        name="synopsis"
                        rows="4"
                        value={movieData.synopsis}
                        onChange={handleChange}
                        placeholder="Isme movie kaisa hai wo batayega short brief answer..."
                        required
                        className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Movie Poster Upload Section (Local Device File Explorer) */}
                <div className="bg-[#121620] border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col">
                  <h3 className="text-lg font-semibold border-b border-gray-800 pb-3 mb-6 text-indigo-300">Movie Poster</h3>
                  
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="flex-1 border-2 border-dashed border-gray-700 hover:border-indigo-500 bg-[#1A1F2C]/50 rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition min-h-[300px] relative overflow-hidden group"
                  >
                    {movieData.poster ? (
                      <img src={movieData.poster} alt="Poster preview" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-indigo-950 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition">
                          <Upload size={28} />
                        </div>
                        <p className="text-sm font-medium text-white mb-1">Click to open device folder</p>
                        <p className="text-xs text-gray-400">PNG, JPG, WEBP supported</p>
                      </>
                    )}
                  </div>

                  {/* Hidden standard file input */}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-gray-200 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2"
                  >
                    <Upload size={16} /> Choose File from Computer
                  </button>
                </div>

              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <h3 className="text-xl font-bold text-gray-300 mb-2">Section Under Construction</h3>
              <p className="text-sm text-gray-500">You can manage all movies seamlessly from the "Manage Movies" tab.</p>
            </div>
          )}
{/* --- Added Movies List & Delete Section --- */}
      <div className="mt-10 p-6 bg-gray-900 rounded-xl max-w-4xl mx-auto border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Manage Added Movies</h2>
        
        {savedMovies.length === 0 ? (
          <p className="text-gray-400">Abhi tak koi custom movie add nahi ki gayi hai.</p>
        ) : (
          <div className="space-y-3">
            {savedMovies.map((movie) => (
              <div key={movie.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div>
                  <h3 className="text-white font-semibold text-lg">{movie.title}</h3>
                  <p className="text-sm text-gray-400">Genre: {movie.genre} | Year: {movie.year} | Director: {movie.director}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteMovie(movie.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
        </main>
      </div>
    </div>
  );
}