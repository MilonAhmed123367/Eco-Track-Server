const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const challengeSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  duration: { type: Number },
  target: { type: String },
  participants: { type: Number, default: 0 },
  impactMetric: { type: String },
  createdBy: { type: String }, // যদি তুমি ইউজার আইডি স্টোর করো
  startDate: { type: Date },
  endDate: { type: Date },
  imageUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
