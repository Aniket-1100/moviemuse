import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./css/index.css";
import App from "./App.jsx";
import { MovieProvider } from "./contexts/MovieContext"; // ✅ Import your provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MovieProvider> {/* ✅ Wrap App in MovieProvider */}
        <App />
      </MovieProvider>
    </BrowserRouter>
  </StrictMode>
);
