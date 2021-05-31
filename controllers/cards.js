const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'Internal Server Error') {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.createCard = (req, res) => {
  Card.create({ ...req.body })
    .then((card) => {
      res.send(card);
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

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.user._id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'Internal Server Error') {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'Internal Server Error') {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'Internal Server Error') {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
