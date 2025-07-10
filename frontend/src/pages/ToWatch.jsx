import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import "../css/Watch.css"; // Reuse same CSS for layout

function ToWatch() {
  const { toWatch } = useMovieContext();

  return (
    <div className="page-container">
      <h2 className="page-title">📌 To Watch List</h2>

      {toWatch.length === 0 ? (
        <p className="empty-message">No movies added to watch later.</p>
      ) : (
        <div className="movies-grid">
          {toWatch.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ToWatch;
