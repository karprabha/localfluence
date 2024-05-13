const User = require('./user');
const UserOAuth = require('./userOAuth');
const UserPassword = require('./userPassword');
const RefreshToken = require('./refreshToken');

User.hasMany(UserOAuth);
UserOAuth.belongsTo(User);

User.hasOne(UserPassword);
UserPassword.belongsTo(User);

User.hasOne(RefreshToken);
RefreshToken.belongsTo(User);

module.exports = {
  User,
  UserOAuth,
  UserPassword,
  RefreshToken,
};
