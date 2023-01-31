const express = require("express");
const router = express.Router();
const { upload } = require("../util/multer.util");

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

// user sequelize test END

// 프론트 form 데이터 받기 테스트
router.post("/test", upload.single("image"), (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(req.file.path);
  // Save the data to the database with Sequelize
  res.send("Data received");
});
// 프론트 form 데이터 받기 테스트 END

// 로그인
router.post("/login", usersController.login);

// 회원 가입
router.post("/signup", usersController.signup);

const usersRouter = require("./users.routes");
router.use("/users", usersRouter);

module.exports = router;
