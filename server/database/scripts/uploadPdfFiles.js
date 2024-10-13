const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Chapter = require('../../models/Chapter'); // Assuming you have the Chapter model defined
const Subject = require('../../models/Subject'); // Assuming you have the Chapter model defined
require('dotenv').config();

// MongoDB connection URL (from .env or use localhost by default)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ncert_smart_viewer';

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');

  // Call the function to upload PDFs
  uploadPdfFiles().then(() => {
    // Close the MongoDB connection after the upload is complete
    mongoose.connection.close();
  });
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Base path to the folders containing all chapter PDFs
const baseFolderPath = path.join(__dirname, '../data/pdf_chapters');

console.log('Base path:', baseFolderPath);

// Function to map grade to folder prefix (e.g., 'g' for grade 7, 'h' for grade 8, etc.)
const getGradeFolderPrefix = (grade) => {
  const gradeLetter = String.fromCharCode(96 + grade); // Converts grade number to letter (e.g., 7 -> 'g')
  return `${gradeLetter}esc1dd`; // Example: gesc1dd, hesc1dd, etc.
};

// Function to generate the correct chapter filename
const getPdfFileName = (grade, chapterIndex) => {
  const gradePrefix = String.fromCharCode(96 + grade); // Converts grade number to letter (e.g., 7 -> 'g')
  const chapterNumber = (101 + chapterIndex).toString(); // Starting from 101 for first chapter
  return `${gradePrefix}esc${chapterNumber}.pdf`; // Example: gesc101.pdf, hesc101.pdf
};

// Function to upload PDFs as buffers and update the chapter documents
const uploadPdfFiles = async () => {
  try {
    // Fetch all chapters from the database and populate the subjectId to get the grade
    const chapters = await Chapter.find().populate('subjectId').sort({ subjectId: 1, name: 1 });

    // Initialize chapter index for each grade
    const gradeChapterIndex = {
      7: 0, // Start the index for grade 7 at 0
      8: 0, // Start the index for grade 8 at 0
      9: 0, // Start the index for grade 9 at 0
      10: 0 // Start the index for grade 10 at 0
    };

    // Loop through each chapter and associate it with the respective PDF file
    for (const chapter of chapters) {
      const grade = chapter.subjectId.grade;  // We now have access to the grade because of populate()

      // Initialize the chapter index for this grade if not already initialized
      if (!gradeChapterIndex[grade] && gradeChapterIndex[grade] !== 0) {
        gradeChapterIndex[grade] = 0;
      }

      // Determine the folder for this grade
      const gradeFolder = getGradeFolderPrefix(grade);
      const folderPath = path.join(baseFolderPath, gradeFolder);

      // Generate the expected filename for the current chapter in this grade
      const pdfFileName = getPdfFileName(grade, gradeChapterIndex[grade]);
      const pdfFilePath = path.join(folderPath, pdfFileName);

      // Check if the file exists
      if (fs.existsSync(pdfFilePath)) {
        // Read the PDF file as a buffer
        const pdfBuffer = fs.readFileSync(pdfFilePath);

        // Update the chapter document with the PDF file data as a buffer
        chapter.pdfFile = pdfBuffer;

        // Save the updated chapter back to the database
        await chapter.save();

        console.log(`Uploaded PDF for chapter: ${chapter.name} (Grade ${grade}, File: ${pdfFileName})`);

        // Increment the chapter index for this grade
        gradeChapterIndex[grade]++;
      } else {
        console.log(`PDF file not found for chapter: ${chapter.name} (Expected file: ${pdfFileName})`);
      }
    }
  } catch (error) {
    console.error('Error uploading PDFs:', error);
  }
};
