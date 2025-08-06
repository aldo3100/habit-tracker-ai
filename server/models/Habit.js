const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  streak: { type: Number, default: 0 },
  lastCompleted: { type: Date },  // Track the last time user completed the habit
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', HabitSchema);

