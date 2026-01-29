import React from 'react';
import '../styles/Instructors.css';

function Instructors() {
  const instructors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Full Stack Development",
      bio: "10+ years of experience in web development and software engineering",
      students: "2,547"
    },
    {
      name: "Prof. Michael Chen",
      specialty: "Data Science & AI",
      bio: "PhD in Computer Science, published researcher in machine learning",
      students: "3,421"
    },
    {
      name: "Emma Rodriguez",
      specialty: "UI/UX Design",
      bio: "Award-winning designer with experience at leading tech companies",
      students: "1,876"
    },
    {
      name: "David Kumar",
      specialty: "Cloud Computing",
      bio: "AWS Certified Solutions Architect with enterprise experience",
      students: "2,103"
    },
    {
      name: "Lisa Anderson",
      specialty: "Mobile Development",
      bio: "Published author and mobile app developer with 10+ apps on app stores",
      students: "1,654"
    },
    {
      name: "James Wilson",
      specialty: "Cybersecurity",
      bio: "Ethical hacker and security consultant for Fortune 500 companies",
      students: "1,432"
    }
  ];

  return (
    <section className="instructors-section" id="instructors">
      <div className="instructors-container">
        <div className="section-header">
          <h2 className="section-title">Our Expert Instructors</h2>
          <p className="section-subtitle">
            Learn from industry leaders and experienced professionals
          </p>
        </div>

        <div className="instructors-grid">
          {instructors.map((instructor, index) => (
            <div key={index} className="instructor-card">
              <div className="instructor-avatar">
                {instructor.name.charAt(0)}
              </div>
              <h3 className="instructor-name">{instructor.name}</h3>
              <p className="instructor-specialty">{instructor.specialty}</p>
              <p className="instructor-bio">{instructor.bio}</p>
              <div className="instructor-stats">
                <span className="student-count">{instructor.students} students</span>
                <svg className="star-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <span className="rating">4.8</span>
              </div>
              <button className="btn-view-profile">View Profile</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Instructors;
