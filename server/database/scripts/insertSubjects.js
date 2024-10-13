const mongoose = require('mongoose');
require('dotenv').config();

// Define Subject Schema (if not already defined)
const subjectSchema = new mongoose.Schema({
  name: String,
  grade: Number,
});

const Subject = mongoose.model('Subject', subjectSchema);

// MongoDB connection URL (set in .env file)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ncert_smart_viewer';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Subjects to be inserted into the DB
const subjects = [
  { name: 'Mathematics (grade 7)', grade: 7 },
  { name: 'Science (grade 7)', grade: 7 },
  { name: 'Social Studies (grade 7)', grade: 7 },
  { name: 'Mathematics (grade 8)', grade: 8 },
  { name: 'Science (grade 8)', grade: 8 },
  { name: 'Social Studies (grade 8)', grade: 8 },
  { name: 'Mathematics (grade 9)', grade: 9 },
  { name: 'Science (grade 9)', grade: 9 },
  { name: 'Social Studies (grade 9)', grade: 9 },
  { name: 'Mathematics (grade 10)', grade: 10 },
  { name: 'Science (grade 10)', grade: 10 },
  { name: 'Social Studies (grade 10)', grade: 10 },
];

// Function to insert subjects into the DB
const insertSubjects = async () => {
  try {
    await Subject.insertMany(subjects);
    console.log('Subjects inserted successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting subjects:', error);
  }
};

// Call the function to insert subjects
insertSubjects();
