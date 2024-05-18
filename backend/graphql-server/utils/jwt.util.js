const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const verifyAccessToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};

module.exports = {
  verifyAccessToken,
};
