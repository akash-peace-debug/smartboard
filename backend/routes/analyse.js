const express = require('express');
const router = express.Router();
const PPT = require('../models/PPT');

router.post('/unit', async (req, res) => {
  const { department, year, subject, unit } = req.body;
  const ppts = await PPT.find({ department, year, subject, unit });

  const count = ppts.length;
  const score = count === 0 ? 0
    : count === 1 ? 45
    : count === 2 ? 65
    : count >= 3  ? 85 : 50;

  res.json({
    score,
    pptCount: count,
    slideCoverage: score,
    contentDepth: Math.min(score + 5, 100),
    visualQuality: Math.max(score - 5, 0),
    topicAccuracy: Math.min(score + 3, 100),
    strengths: count >= 3
      ? ['Good PPT coverage', 'Multiple files uploaded', 'Unit well documented']
      : ['Some content present'],
    improvements: count < 3
      ? ['Upload more PPTs', 'Cover all topics in unit']
      : ['Add summary slides'],
    recommendation: count === 0
      ? `No PPTs found for ${subject} - ${unit}. Immediate action needed!`
      : `${department} · ${subject} · ${unit} has ${count} PPT(s). Score: ${score}/100`,
  });
});

module.exports = router;