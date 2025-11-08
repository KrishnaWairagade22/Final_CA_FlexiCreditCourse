import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState("");
  const [courses, setCourses] = useState([]);

  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  const courseData = {
    "Web Development": [
      "HTML, CSS, and JavaScript for Beginners",
      "React & Node.js Full Stack Bootcamp",
      "Advanced Frontend with React Hooks",
      "Building REST APIs with Express.js"
    ],
    "Data Science": [
      "Python for Data Analysis",
      "Machine Learning with Scikit-Learn",
      "Deep Learning with TensorFlow",
      "Data Visualization with Power BI"
    ],
    "Artificial Intelligence": [
      "Intro to Neural Networks",
      "AI for Everyone by Andrew Ng",
      "Natural Language Processing Basics",
      "Building Chatbots with Python"
    ],
    "Cybersecurity": [
      "Ethical Hacking Fundamentals",
      "Network Security Basics",
      "Penetration Testing with Kali Linux",
      "Incident Response and Threat Hunting"
    ]
  };

  const handleRecommend = () => {
    setCourses(courseData[selectedField] || []);
  };

  return (
    <div className="container home">
      <h1>Course Recommendation System</h1>
      <h3 style={{ marginBottom: "10px" }}>Welcome, {user?.name} 👋</h3>

      <div className="card">
        <p style={{ marginBottom: "10px" }}>
          Choose your area of interest and get personalized course suggestions.
        </p>
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          required
        >
          <option value="">-- Select Interest Area --</option>
          {Object.keys(courseData).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <button onClick={handleRecommend} style={{ marginTop: "10px" }}>
          Show Recommendations
        </button>
      </div>

      {courses.length > 0 && (
        <div className="card">
          <h3>Recommended Courses in {selectedField}</h3>
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              {index + 1}. {course}
            </div>
          ))}
        </div>
      )}

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
