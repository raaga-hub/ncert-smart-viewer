const express = require('express');
const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf');
const { OpenAI } = require('@langchain/openai');
const { loadQAStuffChain } = require('langchain/chains');
const Chapter = require('../models/Chapter');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Helper function to add ordinal suffixes to grade level numbers
function formatGradeLevel(gradeLevel) {
  if (!gradeLevel) return ''; // Return empty string if no gradeLevel provided
  
  const lastDigit = gradeLevel % 10;
  const lastTwoDigits = gradeLevel % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${gradeLevel}th`;
  }

  switch (lastDigit) {
    case 1:
      return `${gradeLevel}st`;
    case 2:
      return `${gradeLevel}nd`;
    case 3:
      return `${gradeLevel}rd`;
    default:
      return `${gradeLevel}th`;
  }
}

router.post('/question', async (req, res) => {
  const { chapterId, question, gradeLevel } = req.body;

  // Fetch PDF blob from MongoDB
  const chapter = await Chapter.findById(chapterId);
  if (!chapter) {
    return res.status(404).send('Chapter not found');
  }

  // Write the PDF blob to a temporary file
  const tempFilePath = path.join(__dirname, '../../tmp/tempfile.pdf');
  fs.writeFileSync(tempFilePath, chapter.pdfFile);

  // Load the PDF content using PDFLoader
  const loader = new PDFLoader(tempFilePath);
  const docs = await loader.load();
  const context = docs.map(doc => doc.pageContent).join('\n');

  // Clean up the temporary file
  fs.unlinkSync(tempFilePath);

  // Initialize OpenAI with LangChain
  const openAIModel = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.7,
    modelName: 'gpt-3.5-turbo',
  });

  // Load LangChain's question-answering chain
  const chain = loadQAStuffChain(openAIModel);

  // Format grade level with ordinal suffix (e.g., 7 becomes 7th), or skip if no gradeLevel is provided
  const formattedGradeLevel = formatGradeLevel(gradeLevel);

  // Adjust the question or context based on the formatted grade level if provided
  let adjustedQuestion = question;
  if (gradeLevel) {
    adjustedQuestion = `Answer the following question at a ${formattedGradeLevel} grade level: ${question}`;
  }

  // Get the answer from the chain using context and the adjusted question
  const response = await chain.call({
    input_documents: docs,
    question: adjustedQuestion,
  });

  // Return the answer to the client
  const answer = response.text;
  res.json({ answer });
});

module.exports = router;
