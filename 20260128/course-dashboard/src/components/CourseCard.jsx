import React from 'react';
import '../styles/CourseCard.css';

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-card-image">
        <div className="course-badge">{course.level}</div>
        <div className="course-category-badge">{course.category}</div>
      </div>

      <div className="course-card-body">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>

        <div className="course-instructor">
          <div className="instructor-avatar">
            {course.instructor.charAt(0)}
          </div>
          <div className="instructor-info">
            <p className="instructor-name">{course.instructor}</p>
            <p className="instructor-label">Instructor</p>
          </div>
        </div>

        <div className="course-tags">
          {course.tags && course.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="topic-tag">{tag}</span>
          ))}
        </div>

        <div className="course-stats">
          <div className="stat-group">
            <div className="stat-item">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              <span className="stat-value">{course.rating}</span>
            </div>
            <div className="stat-item">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="stat-value">{course.enrolledStudents?.toLocaleString() || 0}</span>
            </div>
            <div className="stat-item">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="stat-value">{course.duration}</span>
            </div>
          </div>
          <div className="course-price">₹{course.price?.toLocaleString()}</div>
        </div>
      </div>

      <div className="course-card-footer">
        <button className="btn-enroll">Enroll Now</button>
        <button className="btn-details">Learn More</button>
      </div>
    </div>
  );
}

export default CourseCard;
