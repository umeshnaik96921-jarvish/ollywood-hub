"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import HeroSection from "./components/herosection";
import BrowseMovies from "./components/browsemovies";
import MovieModal from "./components/moviemodal";
import Footer from "./components/footer";

export default function HomePage() {
  // Backend se movies fetch karne ke liye state
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    fetch("https://ollywood-hub.onrender.com/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMoviesList(data); // Database ki saari movies yahan save ho jayengi
      })
      .catch((err) => {
        console.log("Error fetching movies:", err);
      });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Drama");
  const [filterActive, setFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [modalDataState, setModalDataState] = useState(null);
  const searchInputRef = useRef(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    if (category === "Year") {
      setSortBy("latest");
      setFilterActive(false);
    } else {
      setFilterActive(true);
    }
    document.getElementById("browse-movies")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchFocus = () => {
    document.getElementById("browse-movies")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 400);
  };

  // Ab filtering database wali `moviesList` par chalegi
  const filteredMovies = useMemo(() => {
    let list = [...moviesList];

    if (filterActive && selectedCategory && selectedCategory !== "Year") {
      list = list.filter(
        (m) => m.genre && m.genre.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          (m.title && m.title.toLowerCase().includes(q)) ||
          (m.director && m.director.toLowerCase().includes(q)) ||
          (m.cast && m.cast.toLowerCase().includes(q))
      );
    }

    if (sortBy === "latest") {
      list.sort((a, b) => b.year - a.year);
    } else if (sortBy === "oldest") {
      list.sort((a, b) => a.year - b.year);
    } else if (sortBy === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [moviesList, filterActive, selectedCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onOpenModal={(movie, tab) => setModalDataState({ movie, tab })}
        onSearchFocus={handleSearchFocus}
      />

      <BrowseMovies
        movies={filteredMovies}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedCategory={filterActive ? selectedCategory : "All"}
        onResetCategory={() => setFilterActive(false)}
        onOpenModal={(movie, tab) => setModalDataState({ movie, tab })}
        searchInputRef={searchInputRef}
      />

      <Footer />

      <MovieModal
        modalData={modalDataState}
        onClose={() => setModalDataState(null)}
      />
    </main>
  );
}