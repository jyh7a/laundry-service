"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Services", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      userId: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
        references: { model: "Users", key: "id" },
      },
      bossId: {
        allowNull: true,
        type: Sequelize.BIGINT.UNSIGNED,
        references: { model: "Users", key: "id" },
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      laundryImage: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      laundryRequest: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      point: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      status: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
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
    await queryInterface.dropTable("Services");
  },
};
