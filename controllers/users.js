const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'Internal Server Error') {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'Internal Server Error') {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'Bad Request') {
        res.status(400).send({ message: 'Введены некоректные данные' });
      }
      if (err.name === 'Internal Server Error') {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { ...req.body })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'Bad Request') {
        res.status(400).send({ message: 'Введены некоректные данные' });
      }
      if (err.name === 'Internal Server Error') {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { ...req.body })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'Bad Request') {
        res.status(400).send({ message: 'Введены некоректные данные' });
      }
      if (err.name === 'Internal Server Error') {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
