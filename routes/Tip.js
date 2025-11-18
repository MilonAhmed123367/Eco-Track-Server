const express = require('express');
const router = express.Router();
const Tip = require('../models/Tip');

router.get('/', async (req, res) => {
  try {
    const tips = await Tip.find().sort({ createdAt: -1 }).limit(10);
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const tip = new Tip(req.body);
    await tip.save();
    res.status(201).json(tip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const tip = await Tip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tip) return res.status(404).json({ message: "Not found" });
    res.json(tip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tip = await Tip.findByIdAndDelete(req.params.id);
    if (!tip) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
