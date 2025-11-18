const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const challengeSchema = new mongoose.Schema({
  _id: { type: String, default: () => randomUUID() },
  title: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  duration: { type: Number },
  target: { type: String },
  participants: { type: Number, default: 0 },
  impactMetric: { type: String },
  createdBy: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
