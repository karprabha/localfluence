const jwtService = require('./jwt.service');
const authService = require('./auth.service');
const githubOAuthService = require('./githubOAuth.service');
const googleOAuthService = require('./googleOAuth.service');

module.exports = {
  jwtService,
  authService,
  githubOAuthService,
  googleOAuthService,
};
