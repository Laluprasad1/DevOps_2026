import "./Profile.css";
import { useState } from "react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  const profileData = {
    name: "Rahul Kumar",
    email: "rahul@student.edu",
    department: "Computer Science",
    enrollmentYear: "2022",
    rollNumber: "CS-2022-001",
  };

  return (
    <div className="card profile-card">
      <div className="profile-header">
        <div className="profile-avatar">RK</div>
        <div className="profile-info">
          <h2>{profileData.name}</h2>
          <p className="department">{profileData.department}</p>
        </div>
        <button 
          className="edit-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "✏️ Edit"}
        </button>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <label>Email</label>
          <p>📧 {profileData.email}</p>
        </div>
        <div className="detail-item">
          <label>Department</label>
          <p>🏫 {profileData.department}</p>
        </div>
        <div className="detail-item">
          <label>Enrollment Year</label>
          <p>📅 {profileData.enrollmentYear}</p>
        </div>
        <div className="detail-item">
          <label>Roll Number</label>
          <p>🆔 {profileData.rollNumber}</p>
        </div>
      </div>

      {isEditing && (
        <div className="edit-section">
          <p style={{ color: "#10b981" }}>✅ Edit mode enabled</p>
        </div>
      )}
    </div>
  );
}

export default Profile;