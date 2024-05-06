const User = require('./user');
const UserOAuth = require('./userOAuth');

User.hasMany(UserOAuth);
UserOAuth.hasOne(User);

module.exports = {
  User,
  UserOAuth,
};
