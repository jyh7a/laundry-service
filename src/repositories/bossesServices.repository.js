const { sequelize } = require("../models");

class ServiceRepository {
  constructor(serviceModel, userModel) {
    this.serviceModel = serviceModel;
    this.userModel = userModel;
  }

  findAllService = async ({ bossId, status }) => {
    try {
      const services = await this.serviceModel.findAll({
        where: {
          bossId,
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

        // transaction 테스트
        // throw new Error("test");

        // 유저 업데이트 (10000 포인트 차감)
        await this.userModel.decrement("point", {
          by: 10000,
          where: { id: userId },
          transaction,
        });

        // commit the transaction
        await transaction.commit();

        return service;
      } catch (error) {
        // handle any errors and rollback the transaction
        await transaction.rollback();
        throw new Error(error);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = ServiceRepository;
