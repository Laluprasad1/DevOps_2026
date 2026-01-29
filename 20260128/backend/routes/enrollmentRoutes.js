import express from 'express';
import {
  enrollInCourse,
  getUserEnrollments,
  updateEnrollmentProgress
} from '../controllers/enrollmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getUserEnrollments)
  .post(protect, enrollInCourse);

router.route('/:id')
  .put(protect, updateEnrollmentProgress);

export default router;
