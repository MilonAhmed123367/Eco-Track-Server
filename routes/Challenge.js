const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// List all challenges
router.get('/', async (req, res) => {
  try {
    const list = await Challenge.find().sort({ createdAt: -1 }).limit(50);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get challenge by id
router.get('/:id', async (req, res) => {
  try {
    const ch = await Challenge.findOne({ _id: req.params.id });
    if (!ch) return res.status(404).json({ message: "Not found" });
    res.json(ch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a challenge
router.post('/', async (req, res) => {
  try {
    const ch = new Challenge(req.body);
    await ch.save();
    res.status(201).json(ch);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {};
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    res.status(400).json({ message: err.message });
  }
});

// Update
router.patch('/:id', async (req, res) => {
  try {
    const ch = await Challenge.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!ch) return res.status(404).json({ message: "Not found" });
    res.json(ch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const ch = await Challenge.findOneAndDelete({ _id: req.params.id });
    if (!ch) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Join challenge
router.post('/join/:id', async (req, res) => {
  try {
    const ch = await Challenge.findOne({ _id: req.params.id });
    if (!ch) return res.status(404).json({ message: "Challenge not found" });

    ch.participants += 1;
    await ch.save();
    res.json({ message: "Joined", challenge: ch });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
