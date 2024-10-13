const express = require('express');
const Chapter = require('../models/Chapter');
const router = express.Router();

router.get('/:subjectId', async function (req, res) {
  const chapters = await Chapter.find({ subjectId: req.params.subjectId });
  res.json(chapters);
});

  router.get('/pdf/:chapterId', async function (req, res) {
    const chapter = await Chapter.findById(req.params.chapterId);
    if (chapter) {
      res.set('Content-Type', 'application/pdf');
      res.send(chapter.pdfFile);
    } else {
      res.status(404).send('PDF not found');
    }
  });

module.exports = router;
