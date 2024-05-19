const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config');

class Influencer extends Model {}

Influencer.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    followersCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'influencer',
  },
);

module.exports = Influencer;
