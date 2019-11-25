const express = require('express');

const app = express();
const moment = require('moment');
const mongoose = require('mongoose');
const config = require('./config');
const shows = require('./routes/shows');
const seasons = require('./routes/seasons');
const episodes = require('./routes/episodes');


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
app.use(express.urlencoded({ extended: true }));

app.get('/ready', (req, res) => {
  res.send('I`m alive');
});

app.use('/shows', shows);
app.use('/seasons', seasons);
app.use('/episodes', episodes);

app.use((err, req, res) => {
  console.error(err.stack);
  if (res.statusCode) {
    res.send('Internal error!');
    res.status(400).end();
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
