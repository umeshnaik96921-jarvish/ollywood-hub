const express = require('express');
const router = express.Router();
const HeroSlide = require('../models/HeroSlide');

// Website ke liye slides fetch karne ka route (GET)
router.get('/', async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort({ createdAt: -1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin panel se nayi slide add karne ka route (POST)
router.post('/', async (req, res) => {
  try {
    const newSlide = new HeroSlide(req.body);
    await newSlide.save();
    res.status(201).json({ message: "Hero slide added successfully!", newSlide });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;