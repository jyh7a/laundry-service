"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Services.belongsTo(models.Users, { foreignKey: 'id', as:"user" });
      Services.belongsTo(models.Users, { foreignKey: "userId", as: "user" });
      Services.belongsTo(models.Users, { foreignKey: "bossId", as: "boss" });
    }
  }
  Services.init(
    {
      nickname: DataTypes.STRING(255),
      userId: DataTypes.BIGINT.UNSIGNED,
      bossId: DataTypes.BIGINT.UNSIGNED,
      phoneNumber: DataTypes.STRING(255),
      address: DataTypes.STRING(255),
      laundryImage: DataTypes.STRING(255),
      laundryRequest: DataTypes.TEXT,
      point: DataTypes.BIGINT.UNSIGNED,
      status: DataTypes.BIGINT.UNSIGNED,
    },
    {
      sequelize,
      modelName: "Services",
    }
  );
  return Services;
};
