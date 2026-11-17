const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String, required: true }, // Poster image URL
  year: { type: String, required: true },
  director: { type: String },
  cast: [String],
}, { timestamps: true });

module.exports = mongoose.model('HeroSlide', heroSlideSchema);