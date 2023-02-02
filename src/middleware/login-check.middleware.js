const jwt = require("jsonwebtoken");
const { Users } = require("../models");

async function login_check_middleware(req, res, next) {
  try {
    if (!req.cookies || !req.cookies.jwt) {
      return next();
    }

    const token = req.cookies.jwt;
    const { userId: id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await Users.findByPk(id);
    if (user) {
      return res.redirect("/users");
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: error.message });
  }
}

module.exports = { login_check_middleware };
