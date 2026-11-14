"use client";

import { useState, useMemo, useRef } from "react";
import HeroSection from "./herosection";
import BrowseMovies from "./browsemovies";
import MovieModal from "./moviemodal";
import Footer from "./footer";
import { getStoredMovies } from "../data/moviesdata";

export default function MainWebsite() {
  const MOVIES_LIST = getStoredMovies();

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

  const filteredMovies = useMemo(() => {
    let list = [...MOVIES_LIST];

    if (filterActive && selectedCategory && selectedCategory !== "Year") {
      list = list.filter(
        (m) => m.genre.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.cast.toLowerCase().includes(q)
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
  }, [MOVIES_LIST, filterActive, selectedCategory, searchQuery, sortBy]);

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