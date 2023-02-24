const express = require("express");
const router = express.Router();

const { upload } = require("../util/multer.util");
const { auth_middleware } = require("../middleware/auth.middleware");
const {
  boss_check_middleware,
} = require("../middleware/user-role-check.middleware");

const usersRouter = require("./users.routes");
const customersServicesRouter = require("./customersServices.routes");
const bossesServiceRouter = require("./bossesServices.routes");

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

// 로그인
router.post("/login", usersController.login);

// 로그아웃
router.get("/logout", usersController.logout);

// 회원 가입
router.post(
  "/signup",
  upload("upload-images/users").single("image"),
  usersController.signup
);

router.use("/users", usersRouter);

// services
router.use("/customers/services", auth_middleware, customersServicesRouter);

router.use(
  "/bosses/services",
  auth_middleware,
  boss_check_middleware,
  bossesServiceRouter
);

module.exports = router;
