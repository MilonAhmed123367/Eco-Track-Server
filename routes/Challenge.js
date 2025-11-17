const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// ✅ PUBLIC GET: list all challenges
router.get('/', async (req, res) => {
  try {
    const list = await Challenge.find().sort({ createdAt: -1 }).limit(50);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ PUBLIC GET: get challenge by ID (string _id)
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const ch = await Challenge.findOne({ _id: id });
    if (!ch) return res.status(404).json({ message: "Not found" });
    res.json(ch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST a new challenge
router.post('/', async (req, res) => {
  try {
    // লগ করো কি ডেটা আসছে
    console.log("CreateChallenge req.body:", req.body);

    const ch = new Challenge(req.body);
    await ch.save();
    res.status(201).json(ch);
  } catch (err) {
    console.error("CreateChallenge Error:", err);

    // যদি ভ্যালিডেশন এরর হয়
    if (err.name === "ValidationError") {
      // প্রতিটি ফিল্ড এর এরর ম্যাসেজ গুলো বের করে পাঠাও
      const errors = {};
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ errors });
    }

    // অন্য যেকোনো এরর
    res.status(400).json({ message: err.message });
  }
});


// ✅ PATCH challenge
router.patch('/:id', async (req, res) => {
  try {
    const ch = await Challenge.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!ch) return res.status(404).json({ message: "Not found" });
    res.json(ch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE challenge
router.delete('/:id', async (req, res) => {
  try {
    const ch = await Challenge.findOneAndDelete({ _id: req.params.id });
    if (!ch) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Join challenge
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
