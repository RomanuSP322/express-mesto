const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    });
};

module.exports.createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некоректные данные' });
      }
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    });
};

module.exports.updateProfile = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(owner, { name, about })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некоректные данные' });
      }
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(owner, { avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некоректные данные' });
      }
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    });
};
