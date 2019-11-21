const express = require('express');

const app = express();
const moment = require('moment');
const mongoose = require('mongoose');
const config = require('./config');

const PORT = process.env.PORT || 3000;

mongoose.connect(config.db.url, { useNewUrlParser: true })
  .catch((error) => console.log(error.massage));
mongoose.connection.on('error', (err) => {
  console.log(err);
});

const logger = (req, res, next) => {
  console.log(`${req.method}:${req.path} ${moment().format()}`);
  next();
};
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/ready', (req, res) => {
  res.send('I`m alive');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
