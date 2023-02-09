const { sequelize } = require("../models");

class ServiceRepository {
  constructor(serviceModel, userModel) {
    this.serviceModel = serviceModel;
    this.userModel = userModel;
  }

  findAllService = async ({ userId, status }) => {
    try {
      const services = await this.serviceModel.findAll({
        where: {
          userId,
          status,
        },
      });
      return services;
    } catch (error) {
      throw new Error(error);
    }
  };

  findService = async ({ attr, userId, serviceId }) => {
    try {
      let [service] = await this.serviceModel.findAll({
        attributes: attr,
        where: {
          userId,
          id: serviceId,
        },
      });
      return service;
    } catch (error) {
      throw new Error(error);
    }
  };

  createService = async (
    nickname,
    userId,
    laundryImage,
    laundryRequest,
    phoneNumber,
    address
  ) => {
    try {
      // start the transaction
      const transaction = await sequelize.transaction();

      try {
        const service = await this.serviceModel.create(
          {
            nickname,
            userId,
            laundryImage,
            laundryRequest,
            phoneNumber,
            address,
          },
          { transaction }
        );

        throw new Error("Parameter is not a number!");
        // 유저 포인트 가지고 오기
        const user = await this.userModel.findByPk(userId);
        const userPoint = user.point - 10000;

        // 유저 업데이트 (10000 포인트 차감)
        await this.userModel.update(
          { point: userPoint },
          { where: { id: userId }, transaction }
        );

        // commit the transaction
        await transaction.commit();

        return service;
      } catch (error) {
        // handle any errors and rollback the transaction
        await transaction.rollback();
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = ServiceRepository;
