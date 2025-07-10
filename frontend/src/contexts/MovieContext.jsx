/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const isLoggedIn = !!currentUser;
  const userKey = currentUser?.email || "";

  // 🔃 Load data on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      setCurrentUser({ email });

      try {
        setFavorites(JSON.parse(localStorage.getItem(`favorites_${email}`)) || []);
        setWatched(JSON.parse(localStorage.getItem(`watched_${email}`)) || []);
        setToWatch(JSON.parse(localStorage.getItem(`toWatch_${email}`)) || []);
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    }
  }, []);

  // 💾 Sync with localStorage
  useEffect(() => {
    if (userKey) {
      localStorage.setItem(`favorites_${userKey}`, JSON.stringify(favorites));
    }
  }, [favorites, userKey]);

  useEffect(() => {
    if (userKey) {
      localStorage.setItem(`watched_${userKey}`, JSON.stringify(watched));
    }
  }, [watched, userKey]);

  useEffect(() => {
    if (userKey) {
      localStorage.setItem(`toWatch_${userKey}`, JSON.stringify(toWatch));
    }
  }, [toWatch, userKey]);

  // 🎬 Favorites
  const addToFavorites = (movie) => {
    if (!favorites.some((m) => m.id === movie.id)) {
      setFavorites((prev) => [...prev, movie]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((m) => m.id !== id));
  };

  const isFavorite = (id) => favorites.some((m) => m.id === id);

  // ✅ Watched
  const addToWatched = (movie) => {
    if (!watched.some((m) => m.id === movie.id)) {
      setWatched((prev) => [...prev, movie]);
      setToWatch((prev) => prev.filter((m) => m.id !== movie.id)); // remove from toWatch
    }
  };

  const removeFromWatched = (id) => {
    setWatched((prev) => prev.filter((m) => m.id !== id));
  };

  const isWatched = (id) => watched.some((m) => m.id === id);

  // ✅ To Watch
  const addToWatchList = (movie) => {
    if (!toWatch.some((m) => m.id === movie.id)) {
      setToWatch((prev) => [...prev, movie]);
    }
  };

  const removeFromToWatch = (id) => {
    setToWatch((prev) => prev.filter((m) => m.id !== id));
  };

  const isToWatch = (id) => toWatch.some((m) => m.id === id);

  // 👤 Auth
  const loginUserContext = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", user.email);
    setCurrentUser(user);

    try {
      const email = user.email;
      setFavorites(JSON.parse(localStorage.getItem(`favorites_${email}`)) || []);
      setWatched(JSON.parse(localStorage.getItem(`watched_${email}`)) || []);
      setToWatch(JSON.parse(localStorage.getItem(`toWatch_${email}`)) || []);
    } catch (err) {
      console.error("Error loading user data on login:", err);
      setFavorites([]);
      setWatched([]);
      setToWatch([]);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setCurrentUser(null);
    setFavorites([]);
    setWatched([]);
    setToWatch([]);
  };

  return (
    <MovieContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        favorites,
        watched,
        toWatch,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addToWatched,
        removeFromWatched,
        isWatched,
        addToWatchList,
        removeFromToWatch,
        isToWatch,
        loginUserContext,
        logoutUser,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
