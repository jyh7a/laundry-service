const express = require("express");
const router = express.Router();

const { upload } = require("../util/multer.util");
const { auth_middleware } = require("../middleware/auth.middleware");

const usersRouter = require("./users.routes");
const servicesRouter = require("./services.routes");

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
router.use("/services", auth_middleware, servicesRouter);

module.exports = router;
