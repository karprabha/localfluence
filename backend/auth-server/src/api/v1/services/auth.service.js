const bcrypt = require('bcryptjs');
const { User, UserPassword } = require('../models');
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

module.exports = {
  handleUserSignUp,
};