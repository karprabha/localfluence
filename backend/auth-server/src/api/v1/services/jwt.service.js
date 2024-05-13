const { jwt } = require('../../../../utils');
const { RefreshToken } = require('../models');

const generateTokens = (authUser) => {
  const accessToken = jwt.generateAccessToken(authUser);
  const refreshToken = jwt.generateRefreshToken(authUser);

  return { accessToken, refreshToken };
};

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

const manageRefreshToken = async (authUser, refreshToken) => {
  const existingRefreshToken = await RefreshToken.findOne({
    where: {
      userId: authUser.id,
    },
  });

  if (existingRefreshToken) {
    existingRefreshToken.token = refreshToken;
    existingRefreshToken.updatedAt = new Date();
    await existingRefreshToken.save();
  } else {
    await RefreshToken.create({
      userId: authUser.id,
      token: refreshToken,
    });
  }
};

module.exports = {
  generateTokens,
  generateOAuthToken,
  generateAccessToken,
  verifyOAuthToken,
  manageRefreshToken,
};
