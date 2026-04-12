const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PPT = require('../models/PPT');

// uploads folder இல்லன்னா create பண்ணும்
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Upload PPT
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { department, year, subject, unit, uploadedBy } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const ppt = new PPT({
      filename: req.file.filename,
      department, year, subject, unit,
      uploadedBy: uploadedBy || 'Staff',
    });
    await ppt.save();
    res.json({ success: true, ppt });
  } catch (err) {
    console.log('Upload error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get PPTs by unit
router.get('/list', async (req, res) => {
  try {
    const { department, year, subject, unit } = req.query;
    const ppts = await PPT.find({ department, year, subject, unit });
    res.json(ppts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all PPTs
router.get('/all', async (req, res) => {
  try {
    const ppts = await PPT.find().sort({ uploadedAt: -1 });
    res.json(ppts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;