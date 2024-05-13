const bcrypt = require('bcryptjs');
const { User, UserPassword, RefreshToken } = require('../models');
const { sequelize } = require('../../../../config');

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
    if (transaction) await transaction.rollback();

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

module.exports = {
  handleUserSignUp,
  handleUserLogout,
  handlePasswordLogin,
};
