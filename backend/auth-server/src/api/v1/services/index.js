const jwtService = require('./jwt.service');
const githubOAuthService = require('./githubOAuth.service');
const googleOAuthService = require('./googleOAuth.service');

module.exports = {
  jwtService,
  githubOAuthService,
  googleOAuthService,
};
