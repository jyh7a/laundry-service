const { sequelize } = require("../models");
const { Op } = require("sequelize");

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

  findAllServiceByBossIdIsNLL = async ({ bossId, status }) => {
    try {
      const services = await this.serviceModel.findAll({
        where: {
          [Op.or]: [{ bossId }, { bossId: null }],
          status,
        },
      });
      return services;
    } catch (error) {
      throw new Error(error);
    }
  };

  findService = async ({ attr, bossId, serviceId }) => {
    try {
      let [service] = await this.serviceModel.findAll({
        attributes: attr,
        where: {
          bossId: null,
          id: serviceId,
        },
      });
      return service;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateServiceStatusToOne = async (bossId, serviceId) => {
    try {
      const updatedService = await this.serviceModel.update(
        { bossId, status: 1 },
        { where: { id: serviceId } }
      );
      return updatedService;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateServiceStatus = async (bossId, serviceId) => {
    try {
      await serviceModel.increment("status", {
        where: { id: serviceId, bossId },
      });
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = ServiceRepository;
