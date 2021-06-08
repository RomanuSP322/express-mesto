const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { token } = req.cookies.jwt;
  if (!token) throw new UnauthorizedError('Войдите на сайт');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Войдите на сайт');
  }

  req.user = payload;

  next();
};
