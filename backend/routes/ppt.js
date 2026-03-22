const express = require('express');
const router = express.Router();
const multer = require('multer');
const PPT = require('../models/PPT');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Upload PPT
router.post('/upload', upload.single('file'), async (req, res) => {
  const { department, year, subject, unit, uploadedBy } = req.body;
  const ppt = new PPT({
    filename: req.file.filename,
    department, year, subject, unit, uploadedBy,
  });
  await ppt.save();
  res.json({ success: true, ppt });
});

// Get PPTs by unit
router.get('/list', async (req, res) => {
  const { department, year, subject, unit } = req.query;
  const ppts = await PPT.find({ department, year, subject, unit });
  res.json(ppts);
});

// Get all PPTs
router.get('/all', async (req, res) => {
  const ppts = await PPT.find().sort({ uploadedAt: -1 });
  res.json(ppts);
});

module.exports = router;