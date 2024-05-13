const User = require('./user');
const UserOAuth = require('./userOAuth');
const UserPassword = require('./userPassword');

User.hasMany(UserOAuth);
UserOAuth.belongsTo(User);

User.hasOne(UserPassword);
UserPassword.belongsTo(User);

module.exports = {
  User,
  UserOAuth,
  UserPassword,
};
