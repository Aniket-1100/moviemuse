import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useMovieContext } from "../contexts/MovieContext";

function Navbar() {
  const { isLoggedIn, currentUser, logoutUser } = useMovieContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleLogout = () => {
    logoutUser();
    setDropdownOpen(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUserInitials = (email) => {
    if (!email) return "U";
    const namePart = email.split("@")[0];
    const parts = namePart.split(/[.\-_]/);
    const initials = parts.map((part) => part.charAt(0).toUpperCase());
    return initials.slice(0, 2).join("");
  };

  return (
    <nav className={`navbar ${menuOpen ? "show" : ""}`}>
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          🎬 <span className="logo-text">MovieMuse</span>
        </Link>
      </div>

      {/* Hamburger Toggle Button */}
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        ☰
      </button>

      <div className="navbar-links">
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/favorites" className="nav-link" onClick={() => setMenuOpen(false)}>Favorites</Link>
        <Link to="/watched" className="nav-link" onClick={() => setMenuOpen(false)}>Watched</Link>
        <Link to="/to-watch" className="nav-link" onClick={() => setMenuOpen(false)}>To Watch</Link>
      </div>

      <div className="navbar-auth">
        {isLoggedIn ? (
          <div className={`profile-dropdown ${dropdownOpen ? "open" : ""}`} ref={dropdownRef}>
            <button className="auth-btn profile-btn" onClick={toggleDropdown} aria-expanded={dropdownOpen}>
              <span className="avatar-initials">{getUserInitials(currentUser.email)}</span>
              <span className="user-name">{currentUser.email.split("@")[0]}</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="auth-btn login-btn">Login</Link>
            <Link to="/signup" className="auth-btn signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
