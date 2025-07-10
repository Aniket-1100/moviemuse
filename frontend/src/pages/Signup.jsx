import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/auth";
import { useMovieContext } from "../contexts/MovieContext"; // ✅ import context
import "../css/Auth.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUserContext } = useMovieContext(); // ✅ get context updater

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await signupUser(email, password); // { token, user }
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user.email);
      loginUserContext(data.user, data.token); // ✅ set context
      navigate("/");
    } catch (err) {
      console.error("Signup Error:", err.message);
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
