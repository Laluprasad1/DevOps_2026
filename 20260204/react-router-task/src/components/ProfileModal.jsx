import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./ProfileModal.css";

export default function ProfileModal({ isOpen, onClose }) {
  const { user, updateProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="profile-modal-header">
          <img src={user.profileImage} alt="Profile" className="profile-avatar-large" />
          {!isEditing && (
            <div className="profile-info-view">
              <h2>{user.firstName} {user.lastName}</h2>
              <p className="roll-number">🆔 {user.rollNumber}</p>
              <p className="department">🏫 {user.department}</p>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="profile-edit-form">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>
            <div className="form-buttons">
              <button className="btn-save" onClick={handleSave}>Save Changes</button>
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="profile-details-view">
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">📧 {user.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Semester:</span>
              <span className="value">📚 {user.semester || "1"}</span>
            </div>
            <div className="detail-row">
              <span className="label">GPA:</span>
              <span className="value">⭐ {user.gpa || "0.0"}</span>
            </div>
            <div className="detail-row">
              <span className="label">Attendance:</span>
              <span className="value">✅ {user.attendance || "0%"}</span>
            </div>
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
