const ServiceRepository = require("../repositories/services.repository");
const { Services } = require("../models");

class serviceService {
  serviceRepository = new ServiceRepository(Services);

  findAllService = async (user, status) => {
    try {
      if (status === "all") {
        const condition = { userId, status: [0, 1, 2, 3, 4] };
        const services = await this.serviceRepository.findAllUser(condition);
        return services;
      } else if (status === "inprogress") {
        const condition = { userId, status: [1, 2, 3] };
        const services = await this.serviceRepository.findAllUser(condition);
        return services;
      } else if (status === "completed") {
        const condition = { userId, status: [4] };
        const services = await this.serviceRepository.findAllUser(condition);
        return services;
      } else {
        const condition = { userId, status: [0, 1, 2, 3, 4] };
        const services = await this.serviceRepository.findAllUser(condition);
        return services;
      }
    } catch (err) {
      throw err;
    }
  };

  createService = async (
    nickname,
    userId,
    laundryImage,
    laundryRequest,
    nickname,
    phoneNumber,
    address
  ) => {
    try {
      const service = await this.serviceRepository.createService(
        nickname,
        userId,
        laundryImage,
        laundryRequest,
        nickname,
        phoneNumber,
        address
      );
      return service;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = serviceService;
