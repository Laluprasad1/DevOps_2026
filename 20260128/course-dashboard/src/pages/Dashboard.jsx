import React from 'react';
import Header from '../components/Header';
import WelcomeSection from '../components/WelcomeSection';
import CoursesGrid from '../components/CoursesGrid';
import About from '../components/About';
import Instructors from '../components/Instructors';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <main className="main-content">
        <WelcomeSection />
        <CoursesGrid />
        <About />
        <Instructors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
