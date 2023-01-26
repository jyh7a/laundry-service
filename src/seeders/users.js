"use strict";
const { Model } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          password: "password",
          point: 0,
          nickname: "John Doe",
          phoneNumber: "010-1234-5678",
          address: "123 Main St",
          userType: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          password: "password",
          point: 0,
          nickname: "Jane Doe",
          phoneNumber: "010-9876-5432",
          address: "456 Park Ave",
          userType: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          password: "password",
          point: 0,
          nickname: "Bob Smith",
          phoneNumber: "010-1111-2222",
          address: "789 Elm St",
          userType: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
