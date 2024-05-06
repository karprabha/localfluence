const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_OAUTH_REDIRECT_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URI,
} = require('./env.config');

const githubOAuthOptions = {
  client_id: GITHUB_CLIENT_ID,
  client_secret: GITHUB_CLIENT_SECRET,
  redirect_uri: GITHUB_OAUTH_REDIRECT_URI,
};

const googleOAuthOptions = {
  client_id: GOOGLE_CLIENT_ID,
  client_secret: GOOGLE_CLIENT_SECRET,
  redirect_uri: GOOGLE_OAUTH_REDIRECT_URI,
  grant_type: 'authorization_code',
};

module.exports = {
  githubOAuthOptions,
  googleOAuthOptions,
};
