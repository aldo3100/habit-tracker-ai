const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// GET all habits
router.get('/', async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

// POST create a new habit
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newHabit = new Habit({ name });
  const savedHabit = await newHabit.save();
  res.json(savedHabit);
});

// PUT add completed date
router.put('/:id', async (req, res) => {
    try {
      const habit = await Habit.findById(req.params.id);
      if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
      }
  
      const now = new Date();
      const last = habit.lastCompleted ? new Date(habit.lastCompleted) : null;
  
      if (last && (now - last) < 1000 * 60 * 60 * 24) {
        // Within 24 hours → increment streak
        habit.streak += 1;
      } else {
        // Missed 24h or first time → reset streak to 1
        habit.streak = 1;
      }
  
      habit.lastCompleted = now;
  
      const updated = await habit.save();
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// DELETE a habit
router.delete('/:id', async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: 'Habit deleted' });
});

module.exports = router;
