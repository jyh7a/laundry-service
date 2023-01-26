'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      userId: {
        allowNull:false,
        type: Sequelize.BIGINT.UNSIGNED,
        references: { model: "Users", key: "id" },
      },
      serviceId: {
        allowNull:false,
        type: Sequelize.BIGINT.UNSIGNED,
        references: { model: "Services", key: "id" },
      },
      comment: {
        allowNull:false,
        type: Sequelize.TEXT
      },
      rating: {
        allowNull:false,
        type: Sequelize.BIGINT.UNSIGNED
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};