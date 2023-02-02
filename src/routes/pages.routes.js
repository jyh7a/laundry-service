const express = require("express");
const router = express.Router();
const { auth_middleware } = require("../middleware/auth.middleware");
const {
  login_check_middleware,
} = require("../middleware/login-check.middleware");

// 기본페이지 -> 로그인 페이지
router.get("/", login_check_middleware, (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(error.message);
  }
});

// 로그인 페이지
router.get("/login", login_check_middleware, (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
});

// 회원가입 페이지
router.get("/signup", login_check_middleware, (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.log(error.message);
  }
});

// 유저 페이지
router.get("/users", auth_middleware, (req, res) => {
  try {
    return res.render("user");
  } catch (error) {
    console.log(error.message);
  }
});

// 서비스 페이지
router.get("/services", (req, res) => {
  try {
    return res.render("service");
  } catch (error) {
    console.log(error.message);
  }
});

// 서비스 폼 페이지
router.get("/services/form", (req, res) => {
  try {
    return res.render("service-form");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
