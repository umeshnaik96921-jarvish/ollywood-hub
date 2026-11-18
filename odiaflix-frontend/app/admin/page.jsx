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
  X,
  Image as ImageIcon
} from "lucide-react";

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const [successMessage, setSuccessMessage] = useState("");

  // Form State for Adding Movie (Added videoUrl)
  const [movieData, setMovieData] = useState({
    title: "",
    genre: "Drama",
    year: 2026,
    director: "",
    cast: "",
    synopsis: "",
    poster: "",
    videoUrl: ""
  });

  // Form State for Adding Hero Slide Banner (Added videoUrl)
  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    banner: "",
    year: "2026",
    director: "",
    cast: "",
    videoUrl: ""
  });

  const fileInputRef = useRef(null);
  const heroFileInputRef = useRef(null);

  // Handle Input Changes for Movie
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  // Handle Input Changes for Hero Slide
  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setHeroData({ ...heroData, [name]: value });
  };

  // --- Custom movies aur delete logic ---
  const [savedMovies, setSavedMovies] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);

  // 1. Backend se saari movies aur hero slides load karne ke liye
  useEffect(() => {
    fetch("http://ollywood-hub.onrender.com/api/movies")
      .then((res) => res.json())
      .then((data) => setSavedMovies(data))
      .catch((err) => console.log("Error loading movies:", err));

    fetch("http://ollywood-hub.onrender.com/api/hero-slides")
      .then((res) => res.json())
      .then((data) => setHeroSlides(data))
      .catch((err) => console.log("Error loading hero slides:", err));
  }, []);

  // 2. Backend se movie delete karne ke liye
  const handleDeleteMovie = async (id) => {
    try {
      await fetch(`http://ollywood-hub.onrender.com/api/movies/${id}`, {
        method: "DELETE",
      });
      const updatedMovies = savedMovies.filter((movie) => movie._id !== id && movie.id !== id);
      setSavedMovies(updatedMovies);
    } catch (err) {
      console.log("Error deleting movie:", err);
    }
  };

  // 3. Backend se Hero Slide delete karne ke liye
  const handleDeleteHeroSlide = async (id) => {
    try {
      await fetch(`http://ollywood-hub.onrender.com/api/hero-slides/${id}`, {
        method: "DELETE",
      });
      const updatedSlides = heroSlides.filter((slide) => slide.id !== id && slide._id !== id);
      setHeroSlides(updatedSlides);
    } catch (err) {
      console.log("Error deleting hero slide:", err);
    }
  };

  // Handle File Selector (Movie Poster)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMovieData({ ...movieData, poster: reader.result }); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle File Selector (Hero Banner Poster)
  const handleHeroFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroData({ ...heroData, banner: reader.result }); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Movie to Backend Database (MongoDB/JSON)
  const handleSaveMovie = async (e) => {
    e.preventDefault();
    if (!movieData.title || !movieData.synopsis) {
      alert("Please fill in at least the Movie Title and Description!");
      return;
    }

    try {
      const response = await fetch("http://ollywood-hub.onrender.com/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        alert("Movie successfully saved to database!");
        setMovieData({
          title: "",
          genre: "Drama",
          year: new Date().getFullYear(),
          director: "",
          cast: "",
          synopsis: "",
          poster: "",
          videoUrl: ""
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

  // Save Hero Slide to Backend Database
  const handleSaveHeroSlide = async (e) => {
    e.preventDefault();
    if (!heroData.title || !heroData.description || !heroData.banner) {
      alert("Please fill in Title, Description, and Banner Image!");
      return;
    }

    try {
      const response = await fetch("http://ollywood-hub.onrender.com/api/hero-slides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(heroData),
      });

      if (response.ok) {
        alert("Hero Banner successfully added!");
        setHeroData({
          title: "",
          description: "",
          banner: "",
          year: "2026",
          director: "",
          cast: "",
          videoUrl: ""
        });
        window.location.reload();
      } else {
        alert("Failed to save hero slide.");
      }
    } catch (err) {
      console.log("Error saving hero slide:", err);
      alert("Server error connecting to backend!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-white flex font-sans">
      
      {/* SIDEBAR */}
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
                    className="flex items-center gap-2 bg-[#4B0082] hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-indigo-900/40 cursor-pointer"
                  >
                    <PlusCircle size={18} /> Add / Save Movie
                  </button>
                </div>
              </div>

              {/* FORM & POSTER SECTION (Movie Form) */}
              <form onSubmit={handleSaveMovie} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                
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

                    {/* MOVIE YOUTUBE EMBED URL */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">YouTube Embed URL (Trailer/Movie)</label>
                      <input 
                        type="text" 
                        name="videoUrl"
                        value={movieData.videoUrl}
                        onChange={handleChange}
                        placeholder="https://www.youtube.com/embed/XYZ12345" 
                        className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
                      />
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

                {/* Movie Poster Upload Section */}
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
                    className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-gray-200 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload size={16} /> Choose File from Computer
                  </button>
                </div>

              </form>

              {/* ================= HERO BANNER SECTION ================= */}
              <div className="border-t border-gray-800 pt-10 mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-red-400">Add / Change Hero Section Banner</h2>
                    <p className="text-sm text-gray-400">Yeh movie website ke bilkul upar Hero Banner par Featured Movie ke taur par dikhegi.</p>
                  </div>
                  <button 
                    onClick={handleSaveHeroSlide}
                    className="flex items-center gap-2 bg-[#E50914] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-red-900/40 cursor-pointer"
                  >
                    <PlusCircle size={18} /> Publish to Hero Banner
                  </button>
                </div>

                <form onSubmit={handleSaveHeroSlide} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  <div className="lg:col-span-2 bg-[#121620] border border-gray-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-lg font-semibold border-b border-gray-800 pb-3 mb-6 text-red-300">Hero Slide Details</h3>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Movie / Banner Title</label>
                        <input 
                          type="text" 
                          name="title"
                          value={heroData.title}
                          onChange={handleHeroChange}
                          placeholder="e.g. Daman" 
                          required
                          className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Release Year</label>
                          <input 
                            type="text" 
                            name="year"
                            value={heroData.year}
                            onChange={handleHeroChange}
                            className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Director</label>
                          <input 
                            type="text" 
                            name="director"
                            value={heroData.director}
                            onChange={handleHeroChange}
                            placeholder="Director name"
                            className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Cast</label>
                          <input 
                            type="text" 
                            name="cast"
                            value={heroData.cast}
                            onChange={handleHeroChange}
                            placeholder="Babushaan, Dipanwit"
                            className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 text-sm"
                          />
                        </div>
                      </div>

                      {/* HERO YOUTUBE EMBED URL */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">YouTube Embed URL (Hero Trailer)</label>
                        <input 
                          type="text" 
                          name="videoUrl"
                          value={heroData.videoUrl}
                          onChange={handleHeroChange}
                          placeholder="https://www.youtube.com/embed/XYZ12345" 
                          className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Hero Description</label>
                        <textarea 
                          name="description"
                          rows="4"
                          value={heroData.description}
                          onChange={handleHeroChange}
                          placeholder="Hero section ke niche jo summary dikhegi..."
                          required
                          className="w-full bg-[#1A1F2C] border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 text-sm resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Hero Banner Image Upload */}
                  <div className="bg-[#121620] border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col">
                    <h3 className="text-lg font-semibold border-b border-gray-800 pb-3 mb-6 text-red-300">Hero Banner Background</h3>
                    
                    <div 
                      onClick={() => heroFileInputRef.current.click()}
                      className="flex-1 border-2 border-dashed border-gray-700 hover:border-red-500 bg-[#1A1F2C]/50 rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition min-h-[300px] relative overflow-hidden group"
                    >
                      {heroData.banner ? (
                        <img src={heroData.banner} alt="Hero banner preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-full bg-red-950 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition">
                            <ImageIcon size={28} />
                          </div>
                          <p className="text-sm font-medium text-white mb-1">Click to upload banner image</p>
                          <p className="text-xs text-gray-400">Wide landscape poster recommended</p>
                        </>
                      )}
                    </div>

                    <input 
                      type="file" 
                      ref={heroFileInputRef}
                      onChange={handleHeroFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    <button 
                      type="button"
                      onClick={() => heroFileInputRef.current.click()}
                      className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-gray-200 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Upload size={16} /> Choose Banner from Computer
                    </button>
                  </div>

                </form>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <h3 className="text-xl font-bold text-gray-300 mb-2">Section Under Construction</h3>
              <p className="text-sm text-gray-500">You can manage all movies seamlessly from the "Manage Movies" tab.</p>
            </div>
          )}

          {/* --- Added Movies List & Delete Section --- */}
          <div className="mt-10 p-6 bg-[#121620] rounded-2xl max-w-5xl mx-auto border border-gray-800 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Manage Added Movies</h2>
            
            {savedMovies.length === 0 ? (
              <p className="text-gray-400">Abhi tak koi custom movie add nahi ki gayi hai.</p>
            ) : (
              <div className="space-y-3">
                {savedMovies.map((movie) => (
                  <div key={movie.id || movie._id} className="flex justify-between items-center bg-[#1A1F2C] p-4 rounded-xl border border-gray-700">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{movie.title}</h3>
                      <p className="text-sm text-gray-400">Genre: {movie.genre} | Year: {movie.year} | Director: {movie.director}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteMovie(movie.id || movie._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- Added Hero Slides List & Delete Section --- */}
          <div className="mt-6 p-6 bg-[#121620] rounded-2xl max-w-5xl mx-auto border border-gray-800 shadow-xl mb-10">
            <h2 className="text-xl font-bold text-red-400 mb-4">Manage Active Hero Banners</h2>
            
            {heroSlides.length === 0 ? (
              <p className="text-gray-400">Abhi tak koi hero banner add nahi kiya gaya hai.</p>
            ) : (
              <div className="space-y-3">
                {heroSlides.map((slide) => (
                  <div key={slide.id || slide._id} className="flex justify-between items-center bg-[#1A1F2C] p-4 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-4">
                      {slide.banner && <img src={slide.banner} alt="" className="w-16 h-10 object-cover rounded-lg" />}
                      <div>
                        <h3 className="text-white font-semibold text-lg">{slide.title} ({slide.year})</h3>
                        <p className="text-xs text-gray-400">Trailer URL: {slide.videoUrl ? "Attached ✅" : "None ❌"}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteHeroSlide(slide.id || slide._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Trash2 size={16} /> Remove
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