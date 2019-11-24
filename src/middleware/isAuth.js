const jsonWebToken = require('jsonwebtoken');

const config = require('../config');

const isAuth = (req, res, next) => {
  try {
    const tokenDecodedData = jsonWebToken.verify(req.headers.authorization, config.sKey);
    req.auth = true;
  } catch (e) {
    req.auth = false;
  }
  next();
};
module.exports = isAuth;
