const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { GraphQLError } = require('graphql');

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    let code = 'BAD_USER_INPUT';
    let status = 400;

    if (error.name === 'TokenExpiredError') {
      code = 'UNAUTHORIZED';
      status = 401;
    } else if (error.name === 'JsonWebTokenError') {
      code = 'UNAUTHORIZED';
      status = 401;
    }

    throw new GraphQLError(error.message, {
      extensions: { code, status },
    });
  }
};

module.exports = {
  verifyAccessToken,
};
