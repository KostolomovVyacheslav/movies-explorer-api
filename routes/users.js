const router = require('express').Router();
const { validationProfileUpdate } = require('../middlewares/validation');
const { getSelfInfo, profileUpdate } = require('../controllers/users');

router.get('/me', getSelfInfo);

router.patch('/me', validationProfileUpdate, profileUpdate);

module.exports = router;
