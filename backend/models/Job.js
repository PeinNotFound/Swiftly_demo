const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance']
  },
  salary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  jobType: {
    type: String,
    required: true,
    enum: ['Fixed Price', 'Hourly']
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['Entry Level', 'Intermediate', 'Expert']
  },
  projectSize: {
    type: String,
    required: true,
    enum: ['Small', 'Medium', 'Large']
  },
  estimatedDuration: {
    type: String,
    required: true
  },
  additionalDetails: {
    type: String,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema); 