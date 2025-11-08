import { useState } from "react";
import api from "../services/api.js";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => {
    // Basic email format validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      setMsg("Please enter a valid email address with '@' and domain.");
      return;
    }
    try {
      await api.post("/auth/signup", form);
      setMsg("Signup successful! Redirecting...");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <h1>Course Recommendation System</h1>
      <h2 style={{ marginTop: "10px" }}>Signup</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      <div className="auth-line">
        {msg}
        <div style={{ marginTop: 10 }}>
          Already registered?{" "}
          <Link to="/" style={{ color: "#ffd60a" }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
