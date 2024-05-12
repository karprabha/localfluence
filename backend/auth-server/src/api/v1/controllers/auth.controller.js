const {
  githubOAuthService,
  googleOAuthService,
  jwtService,
} = require('../services');

const githubOAuth = async (req, res, next) => {
  const code = req.query.code;

  const access_token = await githubOAuthService.getAccessToken(code);
  const oAuthUser = await githubOAuthService.getUser(access_token);

  const oAuthToken = jwtService.generateOAuthToken(oAuthUser);

  res.redirect(`/oauth?oauth-token=${oAuthToken}`);
};

const googleOAuth = async (req, res, next) => {
  const code = req.query.code;

  const access_token = await googleOAuthService.getAccessToken(code);
  const oAuthUser = await googleOAuthService.getUser(access_token);

  const oAuthToken = jwtService.generateOAuthToken(oAuthUser);

  res.redirect(`/oauth?oauth-token=${oAuthToken}`);
};

const oAuth = async (req, res, next) => {
  const { token } = req.body;

  const decoded = jwtService.verifyOAuthToken(token);

  res.json({ decoded });
};

module.exports = {
  oAuth,
  githubOAuth,
  googleOAuth,
};
