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
  const authUser = await authService.handleOAuthLogin(oAuthUser, 'github');

  if (!authUser) {
    res.status(500).redirect(`/oauth?error=oauth-failed`);
    return;
  }

  const oAuthToken = jwtService.generateOAuthToken(authUser);

  res.redirect(`/oauth?oauth-token=${oAuthToken}`);
};

const googleOAuth = async (req, res, next) => {
  const code = req.query.code;

  const access_token = await googleOAuthService.getAccessToken(code);
  const oAuthUser = await googleOAuthService.getUser(access_token);
  const authUser = await authService.handleOAuthLogin(oAuthUser, 'google');

  if (!authUser) {
    res.status(500).redirect(`/oauth?error=oauth-failed`);
    return;
  }

  const oAuthToken = jwtService.generateOAuthToken(authUser);

  res.redirect(`/oauth?oauth-token=${oAuthToken}`);
};

const oAuth = async (req, res, next) => {
  const { token } = req.body;

  const authUserPayload = jwtService.verifyOAuthToken(token);

  const { accessToken, refreshToken } =
    jwtService.generateTokens(authUserPayload);
  await jwtService.manageRefreshToken(authUserPayload, refreshToken);

  res.json({
    accessToken,
    refreshToken,
  });
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  const signedUpUser = await authService.handleUserSignUp({
    name,
    email,
    password,
  });

  res.status(201).json(signedUpUser);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const authUser = await authService.handlePasswordLogin({
    email,
    password,
  });

  if (!authUser) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const { accessToken, refreshToken } = jwtService.generateTokens(authUser);
  await jwtService.manageRefreshToken(authUser, refreshToken);

  res.json({
    accessToken,
    refreshToken,
  });
};

const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  await authService.handleUserLogout(refreshToken);

  res.json({ message: 'Logout successful!' });
};

const refreshAccessToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  const refreshTokenRecord =
    await authService.getRefreshTokenRecord(refreshToken);

  const decodedPayload = jwtService.verifyRefreshToken(
    refreshToken,
    refreshTokenRecord,
  );

  const accessToken = jwtService.generateAccessToken(decodedPayload);

  res.json({ accessToken });
};

module.exports = {
  login,
  oAuth,
  logout,
  signUp,
  githubOAuth,
  googleOAuth,
  refreshAccessToken,
};
