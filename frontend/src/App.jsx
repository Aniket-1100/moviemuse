import "./css/App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import Watched from "./pages/Watched";      // ✅ New
import ToWatch from "./pages/ToWatch";      // ✅ New

import NavBar from "./components/Navbar";
import MoodChatBot from "./components/MoodChatBot"; // ✅ Import the chatbot
import { MovieProvider } from "./contexts/MovieContext";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watched" element={<Watched />} />         {/* ✅ New Route */}
          <Route path="/to-watch" element={<ToWatch />} />        {/* ✅ New Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </main>
      <MoodChatBot /> {/* ✅ Placed outside <main> so it appears on all pages */}
    </MovieProvider>
  );
}

export default App;
