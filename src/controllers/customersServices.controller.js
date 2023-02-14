const serviceService = require("../services/customersServices.service");

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

  // create service
  createService = async (req, res, next) => {
    try {
      // TODO : fix path for compatibility with windows(\\)
      const laundryImage = req.file.path.replace("src/public", "");
      const { laundryRequest, nickname, phoneNumber, address } = req.body;
      const { id: userId } = res.locals.user;

      const service = await this.serviceService.createService(
        nickname,
        userId,
        laundryImage,
        laundryRequest,
        phoneNumber,
        address
      );
      res.status(201).json(service);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = servicesController;
