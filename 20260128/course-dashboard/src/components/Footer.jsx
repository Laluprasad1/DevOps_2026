import React from 'react';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">
            LearnHub
          </h3>
          <p className="footer-description">
            Empowering learners worldwide with quality education and cutting-edge technology courses.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" title="Facebook">f</a>
            <a href="#" className="social-link" title="Twitter">X</a>
            <a href="#" className="social-link" title="LinkedIn">in</a>
            <a href="#" className="social-link" title="Instagram">ig</a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#instructors">Instructors</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li><a href="#help">Help Center</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-contact">
            <li>info@learnhub.com</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Education Street, Learning City</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} LearnHub. All rights reserved. Built with care for learners.</p>
      </div>
    </footer>
  );
}

export default Footer;
