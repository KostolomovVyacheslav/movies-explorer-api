const router = require('express').Router();
const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validation');
const { getMyMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMyMovies);

router.post('/', validationCreateMovie, createMovie);

router.delete('/:movieId', validationDeleteMovie, deleteMovie);

module.exports = router;
