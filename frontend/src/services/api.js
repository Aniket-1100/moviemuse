const API_KEY = "3adde0c0624635193c0845fd64b93050";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
    release_date: movie.release_date,
    rating: movie.vote_average,
    genre: movie.genre_ids?.[0] || "N/A", // You can later map IDs to names
    description: movie.overview,
  }));
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
    release_date: movie.release_date,
    rating: movie.vote_average,
    genre: movie.genre_ids?.[0] || "N/A",
    description: movie.overview,
  }));
};
