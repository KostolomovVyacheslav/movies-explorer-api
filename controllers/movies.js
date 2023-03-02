const Movie = require('../models/movie');
const BadRequest = require('../errors/400-BadRequestError');
const NotFoundError = require('../errors/404-NotFoundError');
const ForbiddenError = require('../errors/403-ForbiddenError');
const ServerError = require('../errors/500-ServerError');

const getMyMovies = (req, res, next) => {
  const currentUser = req.user._id;
  Movie.find(
    { owner: currentUser },
  ).orFail(new Error('Not Found'))
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.message === 'Not Found') {
        next(new NotFoundError('Фильмы не найдены'));
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};

const createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: userId,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании фильма'));
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const currentUser = req.user._id;
  Movie.findById(
    { _id: movieId },
  ).orFail(new Error('Not Found'))
    .then((movie) => {
      if (currentUser === movie.owner.toString()) {
        Movie.deleteOne({ _id: movieId })
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        next(new ForbiddenError('В доступе отказано'));
      }
    })
    .catch((err) => {
      if (err.message === 'Not Found') {
        next(new NotFoundError('Фильм с указанным _id не найден'));
      } else if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для удаления фильма'));
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports = {
  getMyMovies,
  createMovie,
  deleteMovie,
};
