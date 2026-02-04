import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const stats = [
    { label: "GPA", value: user?.gpa || "8.5", icon: "⭐" },
    { label: "Attendance", value: user?.attendance || "92%", icon: "✅" },
    { label: "Assignments", value: "18/20", icon: "📝" },
  ];

  const upcomingClasses = [
    { name: "Data Structures", time: "10:00 AM", room: "A-201", instructor: "Dr. Smith" },
    { name: "Web Technologies", time: "02:00 PM", room: "B-105", instructor: "Ms. Johnson" },
    { name: "Database Systems", time: "04:00 PM", room: "C-310", instructor: "Prof. Khan" },
  ];

  const assignments = [
    { title: "DSA Assignment 3", dueDate: "2025-02-10", status: "pending", subject: "Data Structures" },
    { title: "Web Project Phase 2", dueDate: "2025-02-15", status: "in-progress", subject: "Web Tech" },
    { title: "Database Design", dueDate: "2025-02-20", status: "pending", subject: "Database" },
  ];

  const announcements = [
    { title: "Semester Exams Schedule", date: "2025-01-25", priority: "high" },
    { title: "Library Extended Hours", date: "2025-01-24", priority: "low" },
    { title: "Placement Drive Notification", date: "2025-01-23", priority: "high" },
  ];

  return (
    <div className={`dashboard ${theme}`}>
      <div className="dashboard-header">
        <h1>👋 Welcome, {user?.firstName}!</h1>
        <p>Here's your academic overview for this semester</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-box">
            <span className="stat-icon">{stat.icon}</span>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        {/* Upcoming Classes */}
        <div className="card upcoming-card">
          <div className="card-header">
            <h2>📅 Today's Classes</h2>
            <span className="badge">{upcomingClasses.length} classes</span>
          </div>
          <div className="class-list">
            {upcomingClasses.map((cls, index) => (
              <div key={index} className="class-item">
                <div className="class-time">
                  <span className="time">{cls.time}</span>
                </div>
                <div className="class-details">
                  <h3>{cls.name}</h3>
                  <p>🏫 Room {cls.room} • 👨‍🏫 {cls.instructor}</p>
                </div>
                <button className="join-btn">Join Class</button>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments */}
        <div className="card assignments-card">
          <div className="card-header">
            <h2>📝 Assignments</h2>
            <span className="badge">{assignments.length} due</span>
          </div>
          <div className="assignments-list">
            {assignments.map((assignment, index) => (
              <div key={index} className={`assignment-item ${assignment.status}`}>
                <div className="assignment-header">
                  <h4>{assignment.title}</h4>
                  <span className={`status ${assignment.status}`}>
                    {assignment.status === "pending" ? "⏳ Pending" : "⏳ In Progress"}
                  </span>
                </div>
                <p className="assignment-subject">{assignment.subject}</p>
                <p className="assignment-due">📅 Due: {assignment.dueDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="dashboard-sidebar">
        {/* Announcements */}
        <div className="card announcements-card">
          <div className="card-header">
            <h2>📢 Announcements</h2>
          </div>
          <div className="announcements-list">
            {announcements.map((announcement, index) => (
              <div key={index} className={`announcement-item ${announcement.priority}`}>
                <div className="announcement-badge">{announcement.priority === "high" ? "🔴" : "🟢"}</div>
                <div className="announcement-content">
                  <p>{announcement.title}</p>
                  <small>{announcement.date}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="card quick-info">
          <h3>ℹ️ Quick Info</h3>
          <div className="info-item">
            <label>Semester</label>
            <span>{user?.semester || "1"}</span>
          </div>
          <div className="info-item">
            <label>Roll Number</label>
            <span>{user?.rollNumber}</span>
          </div>
          <div className="info-item">
            <label>Department</label>
            <span>{user?.department}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;