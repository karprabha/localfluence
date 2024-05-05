const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkCreate("users", [
      {
        username: "karprabha",
        name: "Prabhakar Yadav",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "johndoe",
        name: "John Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "janesmith",
        name: "Jane Smith",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async ({ context: queryInterface }) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      "users",
      { username: { [Op.in]: ["karprabha", "johndoe", "janesmith"] } },
      {}
    );
  },
};
