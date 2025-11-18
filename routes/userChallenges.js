const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

router.get('/', async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const challenges = await Challenge.find({ createdBy: userId });
    res.json(challenges);
  } catch (err) {
    console.error("Error in get user challenges:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
