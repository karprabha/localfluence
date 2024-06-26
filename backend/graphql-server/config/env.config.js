require('dotenv').config();

module.exports = {
  POSTGRES_URL: process.env.POSTGRES_URL,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
};
