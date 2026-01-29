import React from 'react';
import '../styles/About.css';

function About() {
  const features = [
    {
      title: "Expert Instructors",
      description: "Learn from industry professionals with 10+ years of experience",
      icon: "👨‍🏫"
    },
    {
      title: "Flexible Learning",
      description: "Study at your own pace with lifetime access to all materials",
      icon: "⏰"
    },
    {
      title: "Hands-On Projects",
      description: "Build real-world projects and add them to your portfolio",
      icon: "💻"
    },
    {
      title: "Certifications",
      description: "Earn recognized certificates upon course completion",
      icon: "🏆"
    },
    {
      title: "Community Support",
      description: "Join a vibrant community of learners and get peer support",
      icon: "🤝"
    },
    {
      title: "Career Growth",
      description: "Access job opportunities and career advancement resources",
      icon: "📈"
    }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">About LearnHub</h2>
          <p className="section-subtitle">
            Empowering learners worldwide with quality education and cutting-edge technology courses
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>Why Choose LearnHub?</h3>
            <p>
              LearnHub is a leading online learning platform dedicated to providing high-quality education 
              in technology, design, business, and more. We believe that everyone deserves access to world-class 
              education regardless of their background or location.
            </p>
            <p>
              Our platform combines expert instruction, interactive learning experiences, and real-world projects 
              to help you master new skills and advance your career.
            </p>
            <div className="stats-grid">
              <div className="stat-box">
                <h4>50,000+</h4>
                <p>Active Students</p>
              </div>
              <div className="stat-box">
                <h4>200+</h4>
                <p>Expert Instructors</p>
              </div>
              <div className="stat-box">
                <h4>500+</h4>
                <p>Professional Courses</p>
              </div>
              <div className="stat-box">
                <h4>95%</h4>
                <p>Completion Rate</p>
              </div>
            </div>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
