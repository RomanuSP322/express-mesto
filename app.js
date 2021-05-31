const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/users.js');

const app = express();
const { PORT = 4000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(routes);
app.use((req, res, next) => {
  req.user = {
    _id: '60b5045c0264390f8c9103dc',
  };

  next();
});

app.listen(PORT, () => {
  console.log('работаем');
});
