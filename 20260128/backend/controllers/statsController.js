import Course from '../models/Course.js';
import User from '../models/User.js';
import Enrollment from '../models/Enrollment.js';

// @desc    Get platform statistics
// @route   GET /api/stats
// @access  Public
export const getStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments({ isPublished: true });
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalEnrollments = await Enrollment.countDocuments();
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    
    // Get popular courses
    const popularCourses = await Course.find({ isPublished: true })
      .sort({ enrolledStudents: -1 })
      .limit(5)
      .select('title enrolledStudents rating');
    
    // Get category distribution
    const categoryStats = await Course.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalCourses,
          totalStudents,
          totalEnrollments,
          totalInstructors
        },
        popularCourses,
        categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
