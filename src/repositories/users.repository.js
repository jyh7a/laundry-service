const { sequelize } = require("../models");

class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  createUser = async (
    userImage,
    nickname,
    password,
    phoneNumber,
    address,
    userType,
    point
  ) => {
    try {
      const user = await this.userModel.create({
        userImage,
        nickname,
        password,
        phoneNumber,
        address,
        userType,
        point,
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (nickname, password) => {
    try {
      const user = await this.userModel.findOne({
        where: { nickname, password },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  findAllUser = async () => {
    try {
      const users = await this.userModel.findAll();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  };

  findUserByPk = async (id) => {
    try {
      const user = await this.userModel.findByPk(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  findUser = async (nickname) => {
    try {
      // 유저정보 + 신청 서비스 개수 + 작성한 리뷰 개수 가져오기 위해서
      // raw query or sequelize 함수 사용
      // 아래 코드는 raw query 사용.
      const [result, metadata] = await sequelize.query(`
        SELECT u.id , u.userImage , u.point , u.nickname , u.phoneNumber , u.address , u.userType , 
        DATE_FORMAT(DATE_ADD(u.createdAt, INTERVAL 9 HOUR), '%Y-%m-%d %H:%i:%s') AS createdAt,
        COALESCE(usrc.servicesCount, usrc.servicesCount, 0) AS servicesCount,
        COALESCE(usrc.reviewsCount, usrc.reviewsCount, 0) AS reviewsCount
        FROM Users u 
        LEFT JOIN (
            SELECT usc.*, urc.reviewsCount
            FROM (
                SELECT u.id, COUNT(u.id) AS servicesCount 
                FROM Users u 
                INNER JOIN Services s ON u.id = s.userId
                GROUP BY u.id
            ) AS usc
            LEFT JOIN (
                SELECT u.id, COUNT(u.id) AS reviewsCount
                FROM Users u 
                INNER JOIN Reviews r ON u.id = r.userId  
                GROUP BY u.id
            ) AS urc
            ON usc.id = urc.id
        ) AS usrc
        ON u.id = usrc.id
        WHERE nickname = "${nickname}"
     `);

      // const user = await this.userModel.findByPk(nickname);
      // const user = await this.userModel.findOne({ where: { nickname } });
      const [user] = result;
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateUser = async (userId, password, nickname, phoneNumber, address) => {
    try {
      const updated = await this.userModel.update(
        { password, nickname, phoneNumber, address },
        { where: { userId } }
      );
      if (updated) {
        const updatedUser = await this.userModel.findByPk(userId);
        return updatedUser;
      }
      throw new Error("User not found");
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteUser = async (userId) => {
    try {
      const deleted = await this.userModel.destroy({ where: { userId } });
      if (deleted) {
        return true;
      }
      throw new Error("User not found");
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = UserRepository;
