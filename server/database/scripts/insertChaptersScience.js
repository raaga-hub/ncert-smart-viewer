const mongoose = require('mongoose');
require('dotenv').config();

// Define Subject and Chapter Schemas (if not already defined)
const subjectSchema = new mongoose.Schema({
  name: String,
  grade: Number,
});

const chapterSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  name: String,
});

const Subject = mongoose.model('Subject', subjectSchema);
const Chapter = mongoose.model('Chapter', chapterSchema);

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

// Function to insert chapters for Science
const insertChapters = async () => {
  try {
    // Fetch the Science subjects for all grades from the database
    const subjects = await Subject.find({ name: /Science/ });

    const chapters = [];

    subjects.forEach((subject) => {
      if (subject.grade === 7) {
        chapters.push(
          { name: 'Nutrition in Plants', subjectId: subject._id },
          { name: 'Nutrition in Animals', subjectId: subject._id },
          { name: 'Heat', subjectId: subject._id },
          { name: 'Acids, Bases and Salts', subjectId: subject._id },
          { name: 'Physical and Chemical Changes', subjectId: subject._id },
          { name: 'Respiration in Organisms', subjectId: subject._id },
          { name: 'Transportation in Animals and Plants', subjectId: subject._id },
          { name: 'Reproduction in Plants', subjectId: subject._id },
          { name: 'Motion and Time', subjectId: subject._id },
          { name: 'Electric Current and its Effects', subjectId: subject._id },
          { name: 'Light', subjectId: subject._id },
          { name: 'Forests: Our Lifeline', subjectId: subject._id },
          { name: 'Wastewater Story', subjectId: subject._id }
        );
      }

      if (subject.grade === 8) {
        chapters.push(
          { name: 'Crop Production and Management', subjectId: subject._id },
          { name: 'Microorganisms: Friend and Foe', subjectId: subject._id },
          { name: 'Synthetic Fibres and Plastics', subjectId: subject._id },
          { name: 'Materials: Metals and Non-Metals', subjectId: subject._id },
          { name: 'Coal and Petroleum', subjectId: subject._id },
          { name: 'Combustion and Flame', subjectId: subject._id },
          { name: 'Conservation of Plants and Animals', subjectId: subject._id },
          { name: 'Cell - Structure and Functions', subjectId: subject._id },
          { name: 'Reproduction in Animals', subjectId: subject._id },
          { name: 'Reaching the Age of Adolescence', subjectId: subject._id },
          { name: 'Force and Pressure', subjectId: subject._id },
          { name: 'Friction', subjectId: subject._id },
          { name: 'Sound', subjectId: subject._id },
          { name: 'Chemical Effects of Electric Current', subjectId: subject._id },
          { name: 'Some Natural Phenomena', subjectId: subject._id },
          { name: 'Light', subjectId: subject._id },
          { name: 'Stars and the Solar System', subjectId: subject._id },
          { name: 'Pollution of Air and Water', subjectId: subject._id }
        );
      }

      if (subject.grade === 9) {
        chapters.push(
          { name: 'Matter in Our Surroundings', subjectId: subject._id },
          { name: 'Is Matter Around Us Pure?', subjectId: subject._id },
          { name: 'Atoms and Molecules', subjectId: subject._id },
          { name: 'Structure of the Atom', subjectId: subject._id },
          { name: 'The Fundamental Unit of Life', subjectId: subject._id },
          { name: 'Tissues', subjectId: subject._id },
          { name: 'Motion', subjectId: subject._id },
          { name: 'Force and Laws of Motion', subjectId: subject._id },
          { name: 'Gravitation', subjectId: subject._id },
          { name: 'Work and Energy', subjectId: subject._id },
          { name: 'Sound', subjectId: subject._id },
          { name: 'Improvement in Food Resources', subjectId: subject._id }
        );
      }

      if (subject.grade === 10) {
        chapters.push(
          { name: 'Chemical Reactions and Equations', subjectId: subject._id },
          { name: 'Acids, Bases, and Salts', subjectId: subject._id },
          { name: 'Metals and Non-metals', subjectId: subject._id },
          { name: 'Carbon and its Compounds', subjectId: subject._id },
          { name: 'Life Processes', subjectId: subject._id },
          { name: 'Control and Coordination', subjectId: subject._id },
          { name: 'How do Organisms Reproduce?', subjectId: subject._id },
          { name: 'Heredity and Evolution', subjectId: subject._id },
          { name: 'Light: Reflection and Refraction', subjectId: subject._id },
          { name: 'The Human Eye and the Colourful World', subjectId: subject._id },
          { name: 'Electricity', subjectId: subject._id }
        );
      }
    });

    // Insert the chapters into the database
    await Chapter.insertMany(chapters);
    console.log('Chapters inserted successfully!');

    // Close the MongoDB connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting chapters:', error);
  }
};

// Call the function to insert chapters
insertChapters();
