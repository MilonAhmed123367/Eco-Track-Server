const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  location: String,
  organizer: String,
  maxParticipants: Number,
  currentParticipants: { type: Number, default: 0 }
});

module.exports = mongoose.model('Event', eventSchema);
