const jwt = require('jsonwebtoken');
const {
  JWT_SECRET,
  JWT_OAUTH_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_EXPIRY,
  OAUTH_TOKEN_EXPIRY,
} = require('../config');

const generateOAuthToken = (payload) => {
  return jwt.sign(payload, JWT_OAUTH_SECRET, {
    expiresIn: OAUTH_TOKEN_EXPIRY,
  });
};

const generateAccessToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

const verifyOAuthToken = (token) => {
  const decoded = jwt.verify(token, JWT_OAUTH_SECRET);
  return decoded;
};

const verifyAccessToken = (token) => {
  const tokenWithoutBearer = token.split(' ')[1];
  const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);
  return decoded;
};

const verifyRefreshToken = (token) => {
  const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
  return decoded;
};

module.exports = {
  generateOAuthToken,
  generateAccessToken,
  generateRefreshToken,
  verifyOAuthToken,
  verifyAccessToken,
  verifyRefreshToken,
};
