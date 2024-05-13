const bcrypt = require('bcryptjs');
const { User, UserPassword, RefreshToken, UserOAuth } = require('../models');
const { sequelize } = require('../../../../config');

const handleOAuthLogin = async (authUser, provider) => {
  const { name, username, avatar_url } = authUser;
  let transaction;

  try {
    transaction = await sequelize.transaction();

    let userOAuth = await UserOAuth.findOne({
      where: {
        provider,
        providerUserId: username,
      },
      include: {
        model: User,
        attributes: ['name', 'username', 'id'],
      },
      transaction,
    });

    if (userOAuth) {
      const userData = userOAuth.user.toJSON();
      return userData;
    }

    const existingUser = await User.findOne({
      where: {
        username,
      },
      transaction,
    });

    if (existingUser) {
      throw new Error('Username is already in use');
    }

    const newUser = await User.create(
      {
        name,
        username,
        avatarUrl: avatar_url,
      },
      { transaction },
    );

    userOAuth = await UserOAuth.create(
      {
        provider,
        providerUserId: username,
        userId: newUser.id,
      },
      { transaction },
    );

    await transaction.commit();

    const userData = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
    };

    return userData;
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error('Error in handleOAuthLogin:', error);
    throw error;
  }
};

const handleUserSignUp = async ({ name, username, password }) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const newUser = await User.create({ name, username }, { transaction });
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserPassword.create(
      { userId: newUser.id, password: hashedPassword },
      { transaction },
    );

    await transaction.commit();

    return newUser;
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    console.error('Error in user sign-up:', error.message);

    throw error;
  }
};

const handlePasswordLogin = async ({ username, password }) => {
  const userWithPassword = await User.findOne({
    where: {
      username,
    },
    include: {
      model: UserPassword,
      attributes: ['password'],
    },
  });

  if (!userWithPassword || !userWithPassword.userPassword?.password) {
    return null;
  }

  const storedPasswordHash = userWithPassword.userPassword?.password;

  const match = await bcrypt.compare(password, storedPasswordHash);

  if (!match) {
    return null;
  }

  return {
    id: userWithPassword.id,
    name: userWithPassword.name,
    username: userWithPassword.username,
  };
};

const handleUserLogout = async (refreshToken) => {
  const deletedTokenCount = await RefreshToken.destroy({
    where: {
      token: refreshToken,
    },
  });

  if (deletedTokenCount === 0) {
    throw new Error('Refresh token not found or already deleted');
  }
};

const getRefreshTokenRecord = async (refreshToken) => {
  const refresh = await RefreshToken.findOne({
    where: {
      token: refreshToken,
    },
  });

  if (!refresh) {
    throw new Error('Refresh token not found.');
  }

  return { userId: refresh.userId };
};

module.exports = {
  handleUserSignUp,
  handleUserLogout,
  handleOAuthLogin,
  handlePasswordLogin,
  getRefreshTokenRecord,
};
