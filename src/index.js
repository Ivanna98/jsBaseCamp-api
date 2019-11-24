const express = require('express');

const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const shows = require('./routes/shows');
const seasons = require('./routes/seasons');
const episodes = require('./routes/episodes');
const auth = require('./routes/auth');
const isAuth = require('./middleware/isAuth');
const logger = require('./middleware/logger');

const PORT = process.env.PORT || 3000;

mongoose.connect(config.db.url, { useNewUrlParser: true })
  .catch((error) => console.log(error.massage));
mongoose.connection.on('error', (err) => {
  console.log(err);
});

app.use(logger);
app.use(isAuth);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ready', (req, res) => {
  res.send('I`m alive');
});

app.use('/shows', shows);
app.use('/seasons', seasons);
app.use('/episodes', episodes);
app.use('/auth', auth);

app.use((err, req, res) => {
  console.error(err.stack);
  if (res.statusCode) {
    res.send('Internal error!');
    res.status(400).end();
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
