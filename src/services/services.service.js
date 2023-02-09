const ServiceRepository = require("../repositories/services.repository");
const { Services, Users } = require("../models");

class serviceService {
  serviceRepository = new ServiceRepository(Services, Users);

  findAllService = async (userId, status) => {
    try {
      if (status === "all") {
        const condition = { userId, status: [0, 1, 2, 3, 4] };
        const services = await this.serviceRepository.findAllService(condition);
        return services;
      } else if (status === "inprogress") {
        const condition = { userId, status: [1, 2, 3] };
        const services = await this.serviceRepository.findAllService(condition);
        return services;
      } else if (status === "completed") {
        const condition = { userId, status: [4] };
        const services = await this.serviceRepository.findAllService(condition);
        return services;
      } else {
        const condition = { userId, status: [0, 1, 2, 3, 4] };
        const services = await this.serviceRepository.findAllService(condition);
        return services;
      }
    } catch (err) {
      throw err;
    }
  };

  findService = async (userId, serviceId) => {
    try {
      const condition = {
        attr: [
          "laundryImage",
          "laundryRequest",
          "nickname",
          "phoneNumber",
          "address",
        ],
        userId,
        serviceId,
      };
      const service = await this.serviceRepository.findService(condition);
      return service;
    } catch (err) {
      throw err;
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
      const service = await this.serviceRepository.createService(
        nickname,
        userId,
        laundryImage,
        laundryRequest,
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
