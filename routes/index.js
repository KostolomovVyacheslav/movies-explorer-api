const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const notExist = require('./notExist');
const auth = require('../middlewares/auth');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');
const { createUser, login, signOut } = require('../controllers/users');

router.post('/signup', validationCreateUser, createUser);

router.post('/signin', validationLogin, login);

router.use(auth);

router.use('/users', usersRouter);

router.use('/movies', moviesRouter);

router.post('/signout', signOut);

router.use('*', notExist);

module.exports = router;
