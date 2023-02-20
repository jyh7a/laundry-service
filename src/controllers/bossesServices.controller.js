const pathCompatibility = require("../util/path-compatibility.js");
const serviceService = require("../services/bossesServices.service");

class servicesController {
  serviceService = new serviceService();

  // Get all findAllServices
  findAllService = async (req, res, next) => {
    try {
      // 쿼리스트링 가지고온다.
      // all, inprogress, completed 나눠야함
      const { status } = req.query;
      // 유저 id는 인증 미들웨어에서 가지고 온다 => res.locals.user
      const { id } = res.locals.user;

      const services = await this.serviceService.findAllService(id, status);
      res.status(200).json(services);
    } catch (error) {
      next(error);
    }
  };

  // Get findService
  findService = async (req, res, next) => {
    try {
      // 파라미터 가지고온다.
      const { serviceId } = req.params;
      // 유저 id는 인증 미들웨어에서 가지고 온다 => res.locals.user
      const { id } = res.locals.user;

      const service = await this.serviceService.findService(id, serviceId);
      res.status(200).json(service);
    } catch (error) {
      next(error);
    }
  };

  // update service status to one
  updateServiceStatusToOne = async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      const { id: bossId } = res.locals.user;

      const updatedService = await this.serviceService.updateServiceStatusToOne(
        bossId,
        serviceId
      );

      if (updatedService === 0) {
        return res.status(400).json({ message: "error" });
      }

      res.status(200).json(updatedService);
    } catch (error) {
      next(error);
    }
  };

  // update service status from one
  updateServiceStatus = async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      const { userId: bossId } = res.user;

      const service = await this.serviceService.updateServiceStatusToOne(
        bossId,
        serviceId
      );

      if (service === 0) {
        return res.status(400).json({ message: "error" });
      }

      res.status(200).json(service);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = servicesController;
