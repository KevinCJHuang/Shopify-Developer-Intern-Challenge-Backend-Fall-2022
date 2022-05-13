const jwt = require('jsonwebtoken');
const config = require('config');
const { decode } = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Parse token
  const token = req.header('x-auth-token');
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Token not found. Authorization failed' });
  }
  try {
    req.user = jwt.verify(token, config.get('jwtKey'));
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ msg: 'Invalid token.' });
  }
};
