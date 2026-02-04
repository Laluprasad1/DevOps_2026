import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCaptcha } from "../hooks/useCaptcha";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const { captchaText, captchaValue, setCaptchaValue, verifyCaptcha } = useCaptcha();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rollNumber: "",
    department: "",
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

    if (Object.values(formData).some((v) => !v)) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!verifyCaptcha(captchaValue)) {
      setError("Invalid CAPTCHA");
      return;
    }

    setLoading(true);
    try {
      setTimeout(() => {
        signup({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          rollNumber: formData.rollNumber,
          department: formData.department,
          profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.firstName}`,
          gpa: "0.0",
          attendance: "0%",
          semester: "1",
        });
        navigate("/");
        setLoading(false);
      }, 800);
    } catch (err) {
      setError("Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <h1>🎓 College Portal</h1>
          <p>Student Registration</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Create Account</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
              />
            </div>
          </div>

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
            <label>Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="CS-2024-001"
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
              />
            </div>
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="auth-link">
            Already have an account?{" "}
            <a onClick={() => navigate("/login")}>Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}
