const express = require("express");
const router = express.Router();

// user sequelize test START
// 유저, 서비스, 시퀄라이즈 불러오기
const { Users, Services, sequelize } = require("../models");

// 1. 모든 유저 가져오기(유저가 가진 서비스와 함께)
router.get("/users/findAll", async (req, res) => {
  try {
    // 모든 유저 찾기
    // const users = await Users.findAll();

    // 모든 유저 찾기(유저가 가지고있는 서비스)
    // const users = await Users.findAll({
    //   include: [
    //     {
    //       model: Services,
    //       as: "services",
    //     },
    //   ],
    // });

    // 모든 유저 찾기(유저가 가지고있는 서비스 + servicesCount)
    // const users = await Users.findAll({
    //   include: [
    //     {
    //       model: Services,
    //       as: "services",
    //     },
    //   ],
    // });
    // const result = users.map(user => {
    //   user.dataValues.servicesCount = user.services.length;
    //   return user;
    // });

    // 모든 유저 찾기(유저가 가지고있는 서비스, 리뷰) raw query
    // const [data, metadata] = await sequelize.query(`
    //   SELECT p.*, u.nickname, COALESCE(lc.cnt, lc.cnt, 0) AS 'likes'
    //   FROM Posts p
    //   LEFT JOIN (
    //           SELECT p.id, COUNT(p.id) as cnt
    //           FROM Posts p 
    //           INNER JOIN Likes l ON p.id = l.postId 
    //           GROUP BY p.id
    //       ) AS lc 
    //       ON p.id = lc.id
    //   LEFT JOIN Users u
    //   ON p.userId = u.id
    //   WHERE p.userId = ${userId};
    // `);

    res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
  }
});

// user sequelize test END

const usersRouter = require("./users.routes");
router.use("/users", usersRouter);

module.exports = router;
