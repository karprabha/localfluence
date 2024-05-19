const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config');

class CampaignManager extends Model {}

CampaignManager.init(
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
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campaignBudget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'campaignManager',
  },
);

module.exports = CampaignManager;
