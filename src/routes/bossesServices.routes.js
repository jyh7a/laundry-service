const express = require("express");
const router = express.Router();
const { upload } = require("../util/multer.util");

const ServicesController = require("../controllers/bossesServices.controller");
const servicesController = new ServicesController();

// /api/bosses/services

// 선택한 서비스 상세 정보
router.get("/:serviceId", servicesController.findService);

// 사장님의 모든 서비스
router.get("/", servicesController.findAllService);

// 서비스 받기 {사장님(userType - 1)만 가능}
// status 가 0 -> 1
router.patch("/:serviceId", servicesController.updateServiceStatus);

// 서비스 업데이트 {사장님(userType - 1)만 가능}
// status 가 1부터 2,3,4 까지만
// router.patch("/:serviceId", servicesController.updateServiceStatus);

// router.get("/info", servicesController.findUserInfo);
// router.get("/:nickname", auth_middleware, servicesController.findUser);
// router.delete("/:userId", auth_middleware, servicesController.deleteUser);

module.exports = router;
