const mongoose = require('mongoose');

// Define the Subject schema
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  }
});

// Create and export the Subject model
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
