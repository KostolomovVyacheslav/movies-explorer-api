const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getSelfInfo, profileUpdate,
} = require('../controllers/users');

router.get('/me', getSelfInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).max(30),
  }),
}), profileUpdate);

module.exports = router;
