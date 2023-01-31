const express = require("express");
const router = express.Router();
const { auth_middleware } = require("../middleware/auth-middleware");

// 기본페이지 -> 로그인 페이지

router.get("/", (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/user", auth_middleware, (req, res) => {
  try {
    const {
      user: {
        dataValues: { nickname },
      },
    } = res.locals;
    res.render("user", { data: { nickname } });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
