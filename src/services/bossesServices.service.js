const ServiceRepository = require("../repositories/bossesServices.repository");
const { Services, Users } = require("../models");

class serviceService {
  serviceRepository = new ServiceRepository(Services, Users);

  findAllService = async (bossId, status = "all") => {
    try {
      if (status === "all") {
        const condition = {
          bossId,
          status: [0, 1, 2, 3, 4],
        };
        const services =
          await this.serviceRepository.findAllServiceByBossIdIsNLL(condition);
        return services;
      } else if (status === "pending") {
        const condition = { bossId: null, status: [0] };
        const services = await this.serviceRepository.findAllService(condition);
        return services;
      } else if (status === "inprogress") {
        const condition = { bossId, status: [1, 2, 3] };
        const services = await this.serviceRepository.findAllService(condition);
        return services;
      } else if (status === "completed") {
        const condition = { bossId, status: [4] };
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
          "id",
          "status",
          "bossId",
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

  updateServiceStatusToOne = async (bossId, serviceId) => {
    try {
      const condition = {
        attr: [
          "id",
          "status",
          "bossId",
          "laundryImage",
          "laundryRequest",
          "nickname",
          "phoneNumber",
          "address",
        ],
        bossId,
        serviceId,
      };
      const service = await this.serviceRepository.findService(condition);

      // 해당하는 서비스가 없거나
      if (!service) {
        return 0;
      }

      const { status: serviceStatus } = service;
      // serviceStatus 없거나 0 - 대기중 이 아니면
      if (serviceStatus !== 0) {
        return 0;
      }

      const updatedService =
        await this.serviceRepository.updateServiceStatusToOne(
          bossId,
          serviceId
        );
      return updatedService;
    } catch (err) {
      throw err;
    }
  };

  updateServiceStatus = async (bossId, serviceId) => {
    try {
      const condition = {
        attr: [
          "id",
          "status",
          "bossId",
          "laundryImage",
          "laundryRequest",
          "nickname",
          "phoneNumber",
          "address",
        ],
        bossId,
        serviceId,
      };
      const service = await this.serviceRepository.findService(condition);

      // 해당하는 서비스가 없거나
      if (!service) {
        return 0;
      }

      const { status: serviceStatus } = service;
      // serviceStatus 0 - 대기중, 4 - 완료 가 아닐때만 업데이트 진행
      if (serviceStatus === 0 || serviceStatus === 4) {
        return 0;
      }

      const updatedService =
        await this.serviceRepository.updateServiceStatusToOne(
          bossId,
          serviceId
        );
      return updatedService;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = serviceService;
