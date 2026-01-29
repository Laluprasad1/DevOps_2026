import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Programming', 'Design', 'Business', 'Marketing', 'Data Science', 'AI/ML', 'Other']
  },
  level: {
    type: String,
    required: [true, 'Please specify the level'],
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  duration: {
    type: String,
    required: [true, 'Please add duration']
  },
  instructor: {
    type: String,
    required: [true, 'Please add instructor name']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot be more than 5']
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  thumbnail: {
    type: String,
    default: 'default-course.jpg'
  },
  tags: [{
    type: String
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  syllabus: [{
    title: String,
    topics: [String]
  }]
}, {
  timestamps: true
});

// Index for search optimization
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Course = mongoose.model('Course', courseSchema);

export default Course;
