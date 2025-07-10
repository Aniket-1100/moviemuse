import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import "../css/Watch.css"; // Make sure Watch.css includes the right grid styles

function Watched() {
  const { watched } = useMovieContext();

  return (
    <div className="page-container">
      <h2 className="page-title">🎥 Watched Movies</h2>
      
      {watched.length === 0 ? (
        <p className="empty-message">No movies watched yet.</p>
      ) : (
        <div className="movies-grid">
          {watched.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watched;
