const express = require("express");
const router = express.Router();

const { auth_middleware } = require("../middleware/auth.middleware");
const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

router.get("/", auth_middleware, usersController.findAllUser);
router.get("/info", usersController.findUserInfo);
router.get("/:nickname", auth_middleware, usersController.findUser);
router.put("/:userId", auth_middleware, usersController.updateUser);
router.delete("/:userId", auth_middleware, usersController.deleteUser);

module.exports = router;
