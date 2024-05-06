const { githubOAuthService, googleOAuthService } = require('../services');

const githubOAuth = async (req, res, next) => {
  const code = req.query.code;

  const access_token = await githubOAuthService.getAccessToken(code);
  const user = await githubOAuthService.getUser(access_token);

  res.json({ user });
};

const googleOAuth = async (req, res, next) => {
  const code = req.query.code;

  const access_token = await googleOAuthService.getAccessToken(code);
  const user = await googleOAuthService.getUser(access_token);

  res.json({ user });
};

module.exports = {
  githubOAuth,
  googleOAuth,
};
