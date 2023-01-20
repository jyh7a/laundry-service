"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.hasMany(models.Orders, { foreignKey: "userId", as: "orders" });
      // models.hasMany(models.Shops, { foreignKey: "userId", as: "orders" });
    }
  }
  Users.init(
    {
      password: DataTypes.STRING,
      point: DataTypes.BIGINT,
      nickname: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      userType: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
