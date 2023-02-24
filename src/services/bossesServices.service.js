// const { io } = require("../app.js");
const { io } = require("../util/socket");
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

  findService = async (serviceId) => {
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

      // updatedService 있으면 updatedService > 0
      // socket을 통해서 프론트에 값 1을 전달하여서
      // 서비스 데이터 받는 함수를 실행시킨다.
      if (updatedService > 0) {
        io.emit("service-updated", 1);
      } else {
        io.emit("service-updated", 0);
      }

      return updatedService;
    } catch (err) {
      throw err;
    }
  };

  updateServiceStatus = async (bossId, serviceId) => {
    try {
      const bossStatusCondition = {
        attr: ["status"],
        serviceId,
      };
      const _serviceStatus = await this.serviceRepository.findServiceStatus(
        bossStatusCondition
      );

      let condition = null;
      if (_serviceStatus === 0) {
        condition = {
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
          bossId: null,
          serviceId,
        };
      } else if (_serviceStatus > 0) {
        condition = {
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
      }

      const service = await this.serviceRepository.findService(condition);

      // 해당하는 서비스가 없거나
      if (!service) {
        return 0;
      }

      const { status: serviceStatus } = service;

      if (serviceStatus === 4) {
        return 0;
      }

      // 서비스 상태가 0 이면 updateServiceStatusToOne
      // 서비스 상태가 1 ~ 3이면 updateServiceStatus
      let updatedService = null;
      if (serviceStatus === 0) {
        updatedService = await this.serviceRepository.updateServiceStatusToOne(
          bossId,
          serviceId
        );

        if (updatedService > 0) {
          io.emit("service-updated", 1);
        } else {
          io.emit("service-updated", 0);
        }
      } else if (serviceStatus > 0 && serviceStatus < 4) {
        updatedService = await this.serviceRepository.updateServiceStatus(
          bossId,
          serviceId
        );

        if (!!updatedService) {
          io.emit("service-updated", 1);
        } else {
          io.emit("service-updated", 0);
        }
      }
      return updatedService;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = serviceService;
