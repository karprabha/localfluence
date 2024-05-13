const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config');

class UserPassword extends Model {}

UserPassword.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'userPassword',
  },
);

module.exports = UserPassword;
