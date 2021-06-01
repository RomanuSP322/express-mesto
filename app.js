const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(usersRouter);
app.use(cardsRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '60b5045c0264390f8c9103dc',
  };

  next();
});

app.listen(PORT, () => {

});
