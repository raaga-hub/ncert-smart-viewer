const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routers
const subjectsRouter = require('./routes/subjects');
const chaptersRouter = require('./routes/chapters');
const pdfController = require('./controllers/pdfController');  // Import the pdfController

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/subjects', subjectsRouter);
app.use('/api/chapters', chaptersRouter);
app.use('/api', pdfController);  // Use the pdfController for question routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
