require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  POSTGRES_URL: process.env.POSTGRES_URL,
  MORGAN_MODE: process.env.MORGAN_MODE || 'dev',
};
