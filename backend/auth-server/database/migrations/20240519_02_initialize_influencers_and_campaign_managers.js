const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("influencers", {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      followers_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    await queryInterface.createTable("campaign_managers", {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      campaign_budget: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("influencers");
    await queryInterface.dropTable("campaign_managers");
  },
};
