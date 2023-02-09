"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      userImage: {
        allowNull: false,
        defaultValue: "/images/default-user.jpg",
        type: Sequelize.STRING(255),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      point: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      nickname: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(255),
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      userType: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
        defaultValue: 0,
        comment: "0 - 손님, 1 - 사장님",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
