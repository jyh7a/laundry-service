const { sequelize } = require("../models");

class ServiceRepository {
  constructor(serviceModel) {
    this.serviceModel = serviceModel;
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

  createService = async (
    nickname,
    userId,
    laundryImage,
    laundryRequest,
    phoneNumber,
    address
  ) => {
    try {
      const service = await this.serviceModel.create({
        nickname,
        userId,
        laundryImage,
        laundryRequest,
        phoneNumber,
        address,
      });
      return service;
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = ServiceRepository;
