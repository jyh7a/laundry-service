"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Reviews.belongsTo(models.Users, { foreignKey: 'id', as:"user" });
      Reviews.belongsTo(models.Users, { foreignKey: "userId", as: "user" });
      Reviews.belongsTo(models.Services, {
        foreignKey: "serviceId",
        as: "service",
      });
    }
  }
  Reviews.init(
    {
      userId: DataTypes.BIGINT.UNSIGNED,
      serviceId: DataTypes.BIGINT.UNSIGNED,
      comment: DataTypes.TEXT,
      rating: DataTypes.BIGINT.UNSIGNED,
    },
    {
      sequelize,
      modelName: "Reviews",
    }
  );
  return Reviews;
};
