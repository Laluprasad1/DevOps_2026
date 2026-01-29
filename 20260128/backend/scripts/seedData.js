import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import User from '../models/User.js';
import connectDB from '../config/database.js';

dotenv.config();
connectDB();

const sampleCourses = [
  {
    title: "Full Stack Web Development Bootcamp",
    description: "Master modern web development with React, Node.js, MongoDB, and deployment strategies. Build real-world applications from scratch.",
    category: "Programming",
    level: "Intermediate",
    duration: "12 weeks",
    instructor: "Sarah Johnson",
    price: 2999,
    rating: 4.8,
    enrolledStudents: 1247,
    tags: ["React", "Node.js", "MongoDB", "Full Stack"],
    syllabus: [
      { title: "Frontend Development", topics: ["React Fundamentals", "State Management", "React Router", "API Integration"] },
      { title: "Backend Development", topics: ["Express.js", "RESTful APIs", "Authentication", "Database Design"] },
      { title: "Deployment", topics: ["AWS", "Docker", "CI/CD", "Production Best Practices"] }
    ]
  },
  {
    title: "Machine Learning with Python",
    description: "Learn machine learning algorithms, data preprocessing, model evaluation, and deploy ML models in production environments.",
    category: "AI/ML",
    level: "Advanced",
    duration: "10 weeks",
    instructor: "Dr. Michael Chen",
    price: 3499,
    rating: 4.9,
    enrolledStudents: 892,
    tags: ["Python", "TensorFlow", "Scikit-learn", "Deep Learning"],
    syllabus: [
      { title: "ML Fundamentals", topics: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering"] },
      { title: "Deep Learning", topics: ["Neural Networks", "CNNs", "RNNs", "Transfer Learning"] },
      { title: "Production ML", topics: ["Model Deployment", "MLOps", "Monitoring"] }
    ]
  },
  {
    title: "UI/UX Design Masterclass",
    description: "Create stunning user interfaces and exceptional user experiences. Learn Figma, design systems, and user research methodologies.",
    category: "Design",
    level: "Beginner",
    duration: "8 weeks",
    instructor: "Emma Williams",
    price: 1999,
    rating: 4.7,
    enrolledStudents: 1523,
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    syllabus: [
      { title: "Design Principles", topics: ["Color Theory", "Typography", "Layout", "Visual Hierarchy"] },
      { title: "UX Research", topics: ["User Interviews", "Personas", "Journey Mapping", "Usability Testing"] },
      { title: "Design Tools", topics: ["Figma Mastery", "Prototyping", "Design Systems", "Handoff"] }
    ]
  },
  {
    title: "Data Science for Business Analytics",
    description: "Transform data into actionable business insights. Master SQL, Python, visualization tools, and statistical analysis.",
    category: "Data Science",
    level: "Intermediate",
    duration: "10 weeks",
    instructor: "David Kumar",
    price: 2799,
    rating: 4.6,
    enrolledStudents: 1089,
    tags: ["Python", "SQL", "Tableau", "Statistics"],
    syllabus: [
      { title: "Data Analysis", topics: ["Python/Pandas", "SQL Queries", "Data Cleaning", "EDA"] },
      { title: "Visualization", topics: ["Tableau", "Power BI", "Matplotlib", "Seaborn"] },
      { title: "Business Intelligence", topics: ["KPIs", "Dashboards", "Reporting", "Insights"] }
    ]
  },
  {
    title: "Digital Marketing Strategy",
    description: "Master SEO, social media marketing, content strategy, and analytics to grow your business online.",
    category: "Marketing",
    level: "Beginner",
    duration: "6 weeks",
    instructor: "Jessica Martinez",
    price: 1499,
    rating: 4.5,
    enrolledStudents: 2156,
    tags: ["SEO", "Social Media", "Content Marketing", "Analytics"],
    syllabus: [
      { title: "Digital Foundations", topics: ["SEO Basics", "Google Analytics", "Content Strategy"] },
      { title: "Social Media", topics: ["Facebook Ads", "Instagram Marketing", "LinkedIn Strategy"] },
      { title: "Conversion", topics: ["Email Marketing", "Landing Pages", "A/B Testing"] }
    ]
  },
  {
    title: "Blockchain Development",
    description: "Build decentralized applications with Ethereum, Solidity, and Web3. Learn smart contract development and DApp architecture.",
    category: "Programming",
    level: "Advanced",
    duration: "12 weeks",
    instructor: "Alex Thompson",
    price: 3999,
    rating: 4.8,
    enrolledStudents: 634,
    tags: ["Blockchain", "Solidity", "Ethereum", "Web3"],
    syllabus: [
      { title: "Blockchain Basics", topics: ["Cryptography", "Consensus", "Smart Contracts"] },
      { title: "Solidity Development", topics: ["Contract Design", "Testing", "Security"] },
      { title: "DApp Development", topics: ["Web3.js", "MetaMask", "IPFS", "Frontend Integration"] }
    ]
  },
  {
    title: "Cloud Architecture with AWS",
    description: "Design and deploy scalable cloud infrastructure. Master AWS services, DevOps practices, and cloud security.",
    category: "Programming",
    level: "Intermediate",
    duration: "8 weeks",
    instructor: "Robert Lee",
    price: 2599,
    rating: 4.7,
    enrolledStudents: 987,
    tags: ["AWS", "Cloud", "DevOps", "Infrastructure"],
    syllabus: [
      { title: "AWS Fundamentals", topics: ["EC2", "S3", "RDS", "Lambda"] },
      { title: "Architecture", topics: ["High Availability", "Auto Scaling", "Load Balancing"] },
      { title: "Security & DevOps", topics: ["IAM", "CloudWatch", "CI/CD", "Terraform"] }
    ]
  },
  {
    title: "Product Management Essentials",
    description: "Learn product strategy, roadmapping, user research, and agile methodologies to become a successful product manager.",
    category: "Business",
    level: "Beginner",
    duration: "6 weeks",
    instructor: "Linda Park",
    price: 1799,
    rating: 4.6,
    enrolledStudents: 1345,
    tags: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
    syllabus: [
      { title: "Product Fundamentals", topics: ["Product Vision", "Market Research", "User Personas"] },
      { title: "Execution", topics: ["Agile/Scrum", "Roadmapping", "Feature Prioritization"] },
      { title: "Launch & Growth", topics: ["Go-to-Market", "Metrics", "A/B Testing", "Iteration"] }
    ]
  }
];

const seedData = async () => {
  try {
    // Clear existing data
    await Course.deleteMany();
    console.log('Courses cleared');
    
    // Insert sample courses
    await Course.insertMany(sampleCourses);
    console.log('Sample courses added');
    
    console.log('✅ Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
