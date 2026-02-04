import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCaptcha } from "../hooks/useCaptcha";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { captchaText, captchaValue, setCaptchaValue, verifyCaptcha } = useCaptcha();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (!verifyCaptcha(captchaValue)) {
      setError("Invalid CAPTCHA");
      return;
    }

    setLoading(true);
    try {
      setTimeout(() => {
        login(formData.email, formData.password);
        navigate("/");
        setLoading(false);
      }, 800);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🎓 College Portal</h1>
          <p>Student Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label>CAPTCHA Verification</label>
            <div className="captcha-container">
              <div className="captcha-text">{captchaText}</div>
              <input
                type="text"
                name="captcha"
                value={captchaValue}
                onChange={(e) => setCaptchaValue(e.target.value.toUpperCase())}
                placeholder="Enter CAPTCHA above"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="auth-link">
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")}>Sign up here</a>
          </p>
        </form>

        <div className="demo-credentials">
          <p>📝 Demo Credentials:</p>
          <small>Email: student@college.edu</small>
          <small>Password: password123</small>
        </div>
      </div>
    </div>
  );
}
