const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert("users", [
      {
        email: "developer.prabhakaryadav@gmail.com",
        name: "Prabhakar Yadav",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "johndoe@example.com",
        name: "John Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "janesmith@example.com",
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
      {
        email: {
          [Op.in]: [
            "developer.prabhakaryadav@gmail.com",
            "johndoe@example.com",
            "janesmith@example.com",
          ],
        },
      },
      {}
    );
  },
};
