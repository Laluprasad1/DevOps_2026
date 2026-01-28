# DevOps2026 Course Management API

A Node.js Express application for managing courses and user enrollments with SQLite database.

## Project Structure

```
src/
├── app.js                 # Express app initialization
├── server.js              # Server entry point
├── config/
│   └── db.js             # Database configuration
├── controllers/
│   ├── course.controller.js
│   ├── enrollment.controller.js
│   └── user.controller.js
├── middleware/
│   ├── asyncHandler.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Course.js
│   ├── Enrollment.js
│   └── index.js
└── routes/
    ├── user.routes.js
    ├── course.routes.js
    └── enrollment.routes.js
```

## Installation

```bash
npm install
```

## Running the Application

- Development mode (with auto-reload):
```bash
npm run dev
```

- Production mode:
```bash
npm start
```

## Dependencies

- **express**: Web framework for Node.js
- **sequelize**: ORM for database operations
- **sqlite3**: SQLite database driver
- **nodemon**: Development tool for auto-reloading (dev only)

## Features

- User management
- Course management
- Enrollment management

## License

ISC
