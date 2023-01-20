"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.belongsTo(models.Users, { foreignKey: "userId", as: "user" });
      // models.belongsTo(models.Laundry_services, {
      //   foreignKey: "laundryServiceId",
      //   as: "laundryService",
      // });
      // models.belongsTo(models.Shops, { foreignKey: "shopId", as: "shop" });
    }
  }
  Orders.init(
    {
      userId: DataTypes.BIGINT,     
      shopId: DataTypes.BIGINT,
      status: DataTypes.INTEGER,
      due_date: DataTypes.DATE,
      laundryPicture: DataTypes.STRING,
      laundryRequest: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
