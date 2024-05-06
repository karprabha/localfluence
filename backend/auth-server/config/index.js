const dbConfig = require('./db.config');
const envConfig = require('./env.config');
const oAuthConfig = require('./oauth.config');

module.exports = {
  ...envConfig,
  ...dbConfig,
  ...oAuthConfig,
};
