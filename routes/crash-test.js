const router = require('express').Router();
const BadRequestError = require('../errors/bad-request');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new BadRequestError('Сервер сейчас упадёт');
  }, 0);
});

module.exports = router;
