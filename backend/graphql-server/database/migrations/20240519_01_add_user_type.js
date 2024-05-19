const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "user_type", {
      type: DataTypes.ENUM("influencer", "campaign_manager"),
      allowNull: true,
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "user_type");
  },
};
