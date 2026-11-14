const express = require('express');
const router = express.Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/moviecontroller');

router.get('/', getMovies);
router.post('/', addMovie);
router.delete('/:id', deleteMovie);

module.exports = router;