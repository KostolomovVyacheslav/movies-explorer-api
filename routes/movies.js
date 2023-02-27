const router = require('express').Router();
const isUrl = require('validator/lib/isURL');
const { celebrate, Joi } = require('celebrate');
const { getMyMovies, createMovie, deleteMovie } = require('../controllers/movies');
const BadRequest = require('../errors/400-BadRequestError');

router.get('/', getMyMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((link) => {
      if (isUrl(link, { require_protocol: true })) {
        return link;
      }
      throw new BadRequest('Некорректный адрес URL');
    }),
    trailerLink: Joi.string().required().custom((link) => {
      if (isUrl(link, { require_protocol: true })) {
        return link;
      }
      throw new BadRequest('Некорректный адрес URL');
    }),
    thumbnail: Joi.string().required().custom((link) => {
      if (isUrl(link, { require_protocol: true })) {
        return link;
      }
      throw new BadRequest('Некорректный адрес URL');
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/:movieId', deleteMovie);

module.exports = router;
