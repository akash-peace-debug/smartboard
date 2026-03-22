const mongoose = require('mongoose');

const PPTSchema = new mongoose.Schema({
  filename:      String,
  department:    String,
  year:          String,
  subject:       String,
  unit:          String,
  extractedText: String,
  uploadedBy:    String,
  isLive:        { type: Boolean, default: true },
  uploadedAt:    { type: Date, default: Date.now },
});

module.exports = mongoose.model('PPT', PPTSchema);