const express = require("express");
const router = express.Router();
const { upload } = require("../util/multer.util");

const ServicesController = require("../controllers/customersServices.controller");
const servicesController = new ServicesController();

// 선택한 서비스 상세 정보
router.get("/:serviceId", servicesController.findService);

// 고객의 모든 서비스
router.get("/", servicesController.findAllService);

// 서비스 등록
// 서비스는 userType - 0 인 손님만 가능
router.post(
  "/",
  upload("upload-images/services").single("image"),
  servicesController.createService
);

// router.get("/info", servicesController.findUserInfo);
// router.get("/:nickname", auth_middleware, servicesController.findUser);
// router.delete("/:userId", auth_middleware, servicesController.deleteUser);

module.exports = router;
