const UserRepository = require("../repositories/users.repository");
const { Users } = require("../models");

class UserService {
  userRepository = new UserRepository(Users);

  signup = async (
    userImage,
    nickname,
    password,
    phoneNumber,
    address,
    userType
  ) => {
    try {
      // 중복 유저 체크(닉네임)
      // 여기서 해줘도 되고
      // db에 유니크를 제약조건을 걸어둬서 그걸로 체크해도 괜찮다.
      // 이번 예제에서는 db에서 체크 하는걸로

      const point = parseInt(userType, 10) === 0 ? 1000000 : 0;
      const user = await this.userRepository.createUser(
        userImage,
        nickname,
        password,
        phoneNumber,
        address,
        userType,
        point
      );
      return user;
    } catch (err) {
      throw err;
    }
  };

  login = async (nickname, password) => {
    try {
      const user = await this.userRepository.login(nickname, password);
      if (user) {
        return user;
      } else {
        return 0;
      }
    } catch (err) {
      throw err;
    }
  };

  findAllUser = async () => {
    try {
      const users = await this.userRepository.findAllUser();
      return users;
    } catch (err) {
      throw err;
    }
  };

  // cookies jwt 확인 후 있으면
  // user nickname만 돌려준다.
  findUserInfo = async (id) => {
    try {
      const user = await this.userRepository.findUserByPk(id);
      return user;
    } catch (err) {
      throw err;
    }
  };

  findUser = async (nickname) => {
    try {
      const user = await this.userRepository.findUser(nickname);
      return user;
    } catch (err) {
      throw err;
    }
  };

  updateUser = async (userId, password, nickname, phoneNumber, address) => {
    try {
      const updatedUser = await this.userRepository.updateUser(
        userId,
        password,
        nickname,
        phoneNumber,
        address
      );
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };

  deleteUser = async (userId) => {
    try {
      const deletedUser = await this.userRepository.deleteUser(userId);
      return deletedUser;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = UserService;
