import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./Courses.css";

function Courses() {
  const { theme } = useContext(ThemeContext);
  const [enrolledCourses] = useState([
    {
      id: 1,
      name: "Data Structures & Algorithms",
      code: "CS-201",
      instructor: "Dr. Smith",
      credits: 4,
      progress: 75,
      grade: "A",
      attendance: 90,
      materials: 12,
      assignments: 8,
    },
    {
      id: 2,
      name: "Web Technologies",
      code: "CS-202",
      instructor: "Ms. Johnson",
      credits: 3,
      progress: 85,
      grade: "A+",
      attendance: 95,
      materials: 15,
      assignments: 10,
    },
    {
      id: 3,
      name: "Database Management Systems",
      code: "CS-203",
      instructor: "Prof. Khan",
      credits: 4,
      progress: 65,
      grade: "B+",
      attendance: 85,
      materials: 10,
      assignments: 6,
    },
    {
      id: 4,
      name: "Software Engineering",
      code: "CS-204",
      instructor: "Dr. Patel",
      credits: 3,
      progress: 90,
      grade: "A+",
      attendance: 98,
      materials: 18,
      assignments: 12,
    },
  ]);

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
      case "A":
        return "#10b981";
      case "B+":
      case "B":
        return "#3b82f6";
      case "C+":
      case "C":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className={`courses-container ${theme}`}>
      <div className="courses-header">
        <h1>📚 My Courses</h1>
        <p>Total Courses: {enrolledCourses.length} | Total Credits: {enrolledCourses.reduce((sum, c) => sum + c.credits, 0)}</p>
      </div>

      <div className="courses-grid">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-card-header">
              <h3>{course.code}</h3>
              <span className="credit-badge">{course.credits} credits</span>
            </div>

            <h2>{course.name}</h2>
            <p className="instructor">👨‍🏫 {course.instructor}</p>

            <div className="course-metrics">
              <div className="metric">
                <label>Progress</label>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span>{course.progress}%</span>
              </div>

              <div className="metric">
                <label>Attendance</label>
                <span className="attendance-value">{course.attendance}%</span>
              </div>

              <div className="metric">
                <label>Grade</label>
                <span
                  className="grade-value"
                  style={{ color: getGradeColor(course.grade) }}
                >
                  {course.grade}
                </span>
              </div>
            </div>

            <div className="course-resources">
              <div className="resource">
                <span className="resource-icon">📄</span>
                <span className="resource-count">{course.materials}</span>
                <span className="resource-label">Materials</span>
              </div>
              <div className="resource">
                <span className="resource-icon">✍️</span>
                <span className="resource-count">{course.assignments}</span>
                <span className="resource-label">Assignments</span>
              </div>
            </div>

            <button className="view-course-btn">View Course →</button>
          </div>
        ))}
      </div>

      <div className="courses-footer">
        <div className="footer-card">
          <h3>📊 Overall Statistics</h3>
          <div className="stats-row">
            <div className="stat">
              <span className="stat-label">Avg GPA</span>
              <span className="stat-value">8.7</span>
            </div>
            <div className="stat">
              <span className="stat-label">Avg Attendance</span>
              <span className="stat-value">92%</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Credits</span>
              <span className="stat-value">14</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;