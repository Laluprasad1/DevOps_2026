# Professional Full-Stack Course Platform

## 🚀 Project Overview

A modern, professional full-stack learning management platform built with React, Node.js, Express, and MongoDB. This enterprise-grade application features a responsive design, RESTful API, and real-time data integration.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)

## ✨ Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with breakpoints for tablets and desktop
- **Modern UI/UX**: Professional glassmorphism effects, gradients, and smooth animations
- **Real-time Data**: Dynamic course catalog fetched from backend API
- **Advanced Filtering**: Search, category, level, and sorting options
- **Loading States**: Skeleton loaders and error handling
- **Performance Optimized**: Code splitting and lazy loading

### Backend Features
- **RESTful API**: Clean, scalable API architecture
- **Authentication**: JWT-based user authentication
- **Database Models**: MongoDB schemas for courses, users, and enrollments
- **Error Handling**: Comprehensive error middleware
- **Security**: Helmet, CORS, and input validation
- **API Documentation**: Clear endpoint documentation

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Axios** - HTTP client
- **CSS3** - Professional styling with custom properties
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM library
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📁 Project Structure

```
20260128/
├── backend/
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── controllers/
│   │   ├── courseController.js      # Course CRUD operations
│   │   ├── userController.js        # User authentication
│   │   ├── enrollmentController.js  # Enrollment management
│   │   └── statsController.js       # Platform statistics
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT authentication
│   │   └── errorMiddleware.js       # Error handling
│   ├── models/
│   │   ├── Course.js                # Course schema
│   │   ├── User.js                  # User schema
│   │   └── Enrollment.js            # Enrollment schema
│   ├── routes/
│   │   ├── courseRoutes.js          # Course endpoints
│   │   ├── userRoutes.js            # User endpoints
│   │   ├── enrollmentRoutes.js      # Enrollment endpoints
│   │   └── statsRoutes.js           # Stats endpoints
│   ├── scripts/
│   │   └── seedData.js              # Database seeding
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Dependencies
│   └── server.js                    # Server entry point
│
└── course-dashboard/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx           # Navigation header
    │   │   ├── WelcomeSection.jsx   # Hero section
    │   │   ├── CoursesGrid.jsx      # Course listing with filters
    │   │   ├── CourseCard.jsx       # Individual course card
    │   │   └── Footer.jsx           # Footer component
    │   ├── services/
    │   │   └── api.js               # API service layer
    │   ├── styles/
    │   │   ├── Header.css           # Header styles
    │   │   ├── WelcomeSection.css   # Hero section styles
    │   │   ├── CoursesGrid.css      # Grid and filter styles
    │   │   ├── CourseCard.css       # Card styles
    │   │   └── Footer.css           # Footer styles
    │   ├── App.jsx                  # Main app component
    │   ├── index.css                # Global styles
    │   └── main.jsx                 # App entry point
    ├── .env                         # Environment variables
    ├── index.html                   # HTML template
    ├── package.json                 # Dependencies
    └── vite.config.js               # Vite configuration
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```powershell
# Navigate to backend directory
cd D:\3_2_SEM\DevOps_2026\20260128\backend

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env and update values

# Seed database with sample data
npm run seed

# Start the server
npm run dev      # Development mode
npm start        # Production mode
```

### Frontend Setup

```powershell
# Navigate to frontend directory
cd D:\3_2_SEM\DevOps_2026\20260128\course-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Responsive Breakpoints

The application is optimized for three main breakpoints:

- **Mobile**: < 768px
  - Single column layout
  - Hamburger navigation
  - Stacked components
  
- **Tablet**: 768px - 1024px
  - Two column grid
  - Collapsible navigation
  - Optimized spacing
  
- **Desktop**: > 1024px
  - Full grid layout
  - Complete navigation
  - Maximum content width: 1400px

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/course_platform
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Courses
- `GET /courses` - Get all courses (with filters)
- `GET /courses/:id` - Get single course
- `POST /courses` - Create course (Admin only)
- `PUT /courses/:id` - Update course (Admin only)
- `DELETE /courses/:id` - Delete course (Admin only)

#### Users
- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/profile` - Get user profile (Auth required)
- `PUT /users/profile` - Update profile (Auth required)

#### Enrollments
- `GET /enrollments` - Get user enrollments (Auth required)
- `POST /enrollments` - Enroll in course (Auth required)
- `PUT /enrollments/:id` - Update progress (Auth required)

#### Stats
- `GET /stats` - Get platform statistics

### Query Parameters (Courses)

```javascript
// Filter by category
GET /courses?category=Programming

// Filter by level
GET /courses?level=Beginner

// Search courses
GET /courses?search=react

// Sort courses
GET /courses?sort=popular  // Options: popular, rating, price-low, price-high, newest

// Pagination
GET /courses?page=1&limit=12
```

### Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## 🎨 Design System

### Color Palette
- **Primary**: #667eea (Purple-Blue)
- **Secondary**: #764ba2 (Deep Purple)
- **Neutral**: Slate gray scale
- **Success**: #4facfe (Cyan)
- **Warning**: #fa709a (Pink)

### Typography
- **Headings**: Poppins (600-800)
- **Body**: Inter (300-700)
- **Base Size**: 16px (Desktop), 14px (Mobile)

### Spacing Scale
- xs: 0.5rem
- sm: 1rem
- md: 1.5rem
- lg: 2rem
- xl: 3rem
- 2xl: 4rem

## 🧪 Testing

```powershell
# Test backend API
# Use Thunder Client, Postman, or curl

# Health check
curl http://localhost:5000/api/health

# Get courses
curl http://localhost:5000/api/courses

# Get stats
curl http://localhost:5000/api/stats
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Ensure MongoDB connection string is configured
3. Deploy with `git push` or platform CLI

### Frontend Deployment (Vercel/Netlify)
1. Update API URL in .env
2. Run `npm run build`
3. Deploy dist folder

## 📈 Performance Optimizations

- Lazy loading for images
- Code splitting
- Memoization of components
- Debounced search
- Optimized database queries with indexes
- Compression middleware
- Caching strategies

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Helmet security headers
- CORS configuration
- Input validation
- MongoDB injection prevention
- XSS protection

## 🐛 Troubleshooting

### MongoDB Connection Issues
```powershell
# Check if MongoDB is running
mongod --version

# Start MongoDB service
# Windows: Start-Service MongoDB
# Mac/Linux: brew services start mongodb-community
```

### Port Already in Use
```powershell
# Change PORT in .env file
# Or kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <pid> /F
```

## 📝 License

MIT License

## 👥 Contributors

Senior Full Stack Development Team

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ by professional developers**
