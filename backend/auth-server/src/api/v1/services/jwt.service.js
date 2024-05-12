const { jwt } = require('../../../../utils');

const generateOAuthToken = (oAuthUser) => {
  const oAuthToken = jwt.generateOAuthToken(oAuthUser);
  return oAuthToken;
};

const generateAccessToken = (authUser) => {
  const accessToken = jwt.generateAccessToken(authUser);
  return accessToken;
};

const verifyOAuthToken = (token) => {
  const decoded = jwt.verifyOAuthToken(token);
  return decoded;
};

module.exports = {
  generateOAuthToken,
  generateAccessToken,
  verifyOAuthToken,
};
