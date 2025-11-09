const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

router.get('/', async (req, res) => {
  try {
    const list = await Challenge.find().sort({ createdAt: -1 }).limit(50);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const c = await Challenge.findById(req.params.id);
    if (!c) return res.status(404).json({ message: "Not found" });
    res.json(c);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const ch = new Challenge(req.body);
    await ch.save();
    res.status(201).json(ch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
