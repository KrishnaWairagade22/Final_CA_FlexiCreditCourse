import { useState } from "react";
import api from "../services/api.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const { data } = await api.post("/auth/login", form);
      if (data && data.token) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/home");
      } else {
        setMsg("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMsg(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Course Recommendation System</h1>
      <h2 style={{ marginTop: "10px" }}>Login</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="auth-line">
        {msg}
        <div style={{ marginTop: 10 }}>
          No account?{" "}
          <Link to="/signup" style={{ color: "#ffd60a" }}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
