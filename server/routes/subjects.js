const express = require('express');
const Subject = require('../models/Subject');
const router = express.Router();

router.get('/', async function (req, res) {
  const subjects = await Subject.find();
  res.json(subjects);
});

module.exports = router;
