const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

router.get("/", usersController.findAllUser);
router.get("/:userId", usersController.findUser);
router.put("/:userId", usersController.updateUser);
router.delete("/:userId", usersController.deleteUser);

module.exports = router;
