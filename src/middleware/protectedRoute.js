const protect = (req, res, next) => {
  if (req.auth) {
    return next();
  } return res.sendStatus(401);
};
module.exports = protect;
