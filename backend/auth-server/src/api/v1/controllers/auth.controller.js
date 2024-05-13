const {
  githubOAuthService,
  googleOAuthService,
  jwtService,
  authService,
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

const signUp = async (req, res, next) => {
  const { name, username, password } = req.body;

  const signedUpUser = await authService.handleUserSignUp({
    name,
    username,
    password,
  });

  res.status(201).json(signedUpUser);
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const authUser = await authService.handlePasswordLogin({
    username,
    password,
  });

  if (!authUser) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const { accessToken, refreshToken } = jwtService.generateTokens(authUser);
  await jwtService.manageRefreshToken(authUser, refreshToken);

  res.json({
    accessToken,
    refreshToken,
  });
};

module.exports = {
  login,
  oAuth,
  signUp,
  githubOAuth,
  googleOAuth,
};
