import { MOVIES_LIST } from "./moviesdata";

export function getStoredMovies() {
  if (typeof window === "undefined") return MOVIES_LIST;
  
  try {
    const customMovies = JSON.parse(localStorage.getItem("odiaflix_admin_movies") || "[]");
    return [...customMovies, ...MOVIES_LIST];
  } catch (error) {
    return MOVIES_LIST;
  }
}