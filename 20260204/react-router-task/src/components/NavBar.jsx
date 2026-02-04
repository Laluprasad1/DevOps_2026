import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import ProfileModal from "./ProfileModal";
import "./NavBar.css";

function NavBar() {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-icon">📚</span>
            EduHub
          </div>
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="icon">📊</span>
              Dashboard
            </NavLink>
            <NavLink to="/courses" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <span className="icon">📖</span>
              Courses
            </NavLink>
          </div>

          <div className="navbar-right">
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <div className="profile-dropdown">
              <button 
                className="profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <img 
                  src={user?.profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=user"} 
                  alt="Profile" 
                  className="profile-avatar-small"
                />
                <span className="user-name">{user?.firstName}</span>
              </button>

              {showProfileMenu && (
                <div className="dropdown-menu">
                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      setShowProfileModal(true);
                      setShowProfileMenu(false);
                    }}
                  >
                    👤 View Profile
                  </button>
                  <hr />
                  <button 
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
}

export default NavBar;