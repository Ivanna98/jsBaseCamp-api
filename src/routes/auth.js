const express = require('express');

const router = express.Router();
const jsonWebToken = require('jsonwebtoken');
const config = require('../config');

router.post('/', (req, res) => {
  const { name, password } = req.body;
  if (name === config.admin.name && password === config.admin.password) {
    const token = jsonWebToken.sign(config.admin, config.sKey);
    res.json({ token });
  } else {
    res.status(400).send('Incorrect name and password');
  }
});

module.exports = router;
