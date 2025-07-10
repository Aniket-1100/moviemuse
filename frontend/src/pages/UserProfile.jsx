import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/UserProfile.css";

function UserProfile() {
  const { currentUser } = useMovieContext();

  return (
    <div className="profile-page">
      <h2>Welcome, {currentUser?.email}</h2>
      <div className="profile-options">
        <button>Watched</button>
        <button>To Be Watched</button>
        <button>My Ratings</button>
        {/* Add more options here */}
      </div>
    </div>
  );
}

export default UserProfile;
