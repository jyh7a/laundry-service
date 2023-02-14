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
      Users.hasMany(models.Services, {
        foreignKey: "userId",
        as: "services",
      });
      Users.hasMany(models.Services, {
        foreignKey: "bossId",
        as: "bossServices",
      });
      Users.hasMany(models.Reviews, {
        foreignKey: "userId",
        as: "reviews",
      });
    }
  }
  Users.init(
    {
      userImage: {
        defaultValue: "/images/default-user.jpg",
        type: DataTypes.STRING(255),
      },
      password: DataTypes.STRING(255),
      point: DataTypes.BIGINT.UNSIGNED,
      nickname: {
        unique: true,
        type: DataTypes.STRING(255),
      },
      phoneNumber: DataTypes.STRING(255),
      address: DataTypes.STRING(255),
      userType: {
        type: DataTypes.BIGINT.UNSIGNED,
        comment: "0 - 손님, 1 - 사장님",
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
