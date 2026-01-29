# Quick Start Commands

## Backend Setup and Run

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start MongoDB (if not running)
mongod

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

Backend will run on: **http://localhost:5000**

## Frontend Setup and Run

```powershell
# Navigate to frontend
cd course-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:5173**

## Test the Application

1. Open browser to http://localhost:5173
2. Backend API available at http://localhost:5000/api
3. Test health endpoint: http://localhost:5000/api/health

## API Endpoints

### Courses
- GET /api/courses - Get all courses
- GET /api/courses/:id - Get single course
- POST /api/courses - Create course
- PUT /api/courses/:id - Update course
- DELETE /api/courses/:id - Delete course

### Stats
- GET /api/stats - Get platform statistics

### Users
- POST /api/users/register - Register user
- POST /api/users/login - Login user
- GET /api/users/profile - Get profile (Auth required)
- PUT /api/users/profile - Update profile (Auth required)

### Enrollments
- GET /api/enrollments - Get user enrollments (Auth required)
- POST /api/enrollments - Enroll in course (Auth required)
- PUT /api/enrollments/:id - Update progress (Auth required)

## Common Issues

### Port Already in Use
```powershell
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <pid> /F
```

### MongoDB Not Running
```powershell
# Start MongoDB service
net start MongoDB

# Or start mongod manually
mongod
```

### Module Not Found
```powershell
# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## Build for Production

### Backend
```powershell
cd backend
npm start
```

### Frontend
```powershell
cd course-dashboard
npm run build
npm run preview
```

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/course_platform
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```
