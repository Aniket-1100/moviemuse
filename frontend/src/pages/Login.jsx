import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { useMovieContext } from "../contexts/MovieContext"; // ✅ Import context
import "../css/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUserContext } = useMovieContext(); // ✅ Get loginUserContext

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password); // { token, user }
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user.email);
      loginUserContext(data.user, data.token); // ✅ Set user in context
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
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
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
