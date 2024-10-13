const mongoose = require('mongoose');

// Define the Chapter schema
const chapterSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject', // Reference to the Subject model
    required: true
  },
  name: {
    type: String,
    required: true
  },
  pdfFile: {
    type: Buffer, // Store the PDF as binary data
  }
});

// Create and export the Chapter model
const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
