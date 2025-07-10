import React, { useState } from "react";
import PropTypes from "prop-types";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToWatched,
    removeFromWatched,
    addToWatchList,
    removeFromToWatch,
    isWatched,
    isToWatch,
  } = useMovieContext();

  const [modalOpen, setModalOpen] = useState(false);

  const toggleWatched = (movie) => {
    isWatched(movie.id) ? removeFromWatched(movie.id) : addToWatched(movie);
  };

  const toggleToWatch = (movie) => {
    isToWatch(movie.id) ? removeFromToWatch(movie.id) : addToWatchList(movie);
  };

  return (
    <>
      <div className="movie-card" onClick={() => setModalOpen(true)}>
        <div className="left">
          {movie.url ? (
            <img src={movie.url} alt={movie.title} />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>

        <div className="details" onClick={(e) => e.stopPropagation()}>
          <h4>{movie.title}</h4>
          <p><strong>Release:</strong> {movie.release_date}</p>
          <p>⭐ {movie.rating}</p>

          <div className="bottom-row">
            <div className="watch-actions">
              <button
                className={`watch-btn ${isWatched(movie.id) ? "active" : ""}`}
                onClick={() => toggleWatched(movie)}
              >
                {isWatched(movie.id) ? "✓ Watched" : "✔ Watched"}
              </button>
              <button
                className={`watch-btn ${isToWatch(movie.id) ? "active" : ""}`}
                onClick={() => toggleToWatch(movie)}
              >
                {isToWatch(movie.id) ? "+ To Watch" : "➕ To Watch"}
              </button>
            </div>

            <button
              className="favorite-btn"
              onClick={() =>
                isFavorite(movie.id)
                  ? removeFromFavorites(movie.id)
                  : addToFavorites(movie)
              }
            >
              {isFavorite(movie.id) ? "💖" : "🤍"}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {movie.url && (
              <img
                src={movie.url}
                alt={movie.title}
                className="modal-image"
              />
            )}
            <h2>{movie.title}</h2>
            <p><strong>Release:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
            <p>{movie.description}</p>

            <button className="modal-close" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
