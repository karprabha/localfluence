"use strict";

const bcrypt = require("bcryptjs");
const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    const users = await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "rahul.sharma@example.com",
          name: "Rahul Sharma",
          avatar_url:
            "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          user_type: "influencer",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "priya.agarwal@example.com",
          name: "Priya Agarwal",
          avatar_url:
            "https://images.unsplash.com/photo-1615022702095-ff2c036f3360?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          user_type: "influencer",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "amit.verma@example.com",
          name: "Amit Verma",
          avatar_url:
            "https://images.unsplash.com/photo-1623053434406-befaaad987d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          user_type: "campaign_manager",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert("user_passwords", [
      {
        user_id: users[0].id,
        password: bcrypt.hashSync("password123", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: users[1].id,
        password: bcrypt.hashSync("password123", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: users[2].id,
        password: bcrypt.hashSync("password123", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("influencers", [
      {
        user_id: users[0].id,
        followers_count: 5000,
        platform: "Instagram",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: users[1].id,
        followers_count: 10000,
        platform: "YouTube",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("campaign_managers", [
      {
        user_id: users[2].id,
        company_name: "Awesome Marketing",
        campaign_budget: 100000.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("campaigns", [
      {
        user_id: users[2].id,
        name: "Summer Campaign",
        description: "Promoting summer products",
        budget: 50000.0,
        start_date: new Date("2023-06-01"),
        end_date: new Date("2023-08-31"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: users[2].id,
        name: "Winter Campaign",
        description: "Promoting winter products",
        budget: 60000.0,
        start_date: new Date("2023-11-01"),
        end_date: new Date("2024-02-28"),
        created_at: new Date(),
        updated_at: new Date(),
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
            "rahul.sharma@example.com",
            "priya.agarwal@example.com",
            "amit.verma@example.com",
          ],
        },
      },
      {}
    );
  },
};
