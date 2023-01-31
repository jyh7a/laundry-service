const UserRepository = require("../repositories/users.repository");
const { Users } = require("../models");

class UserService {
  userRepository = new UserRepository(Users);

  signup = async (password, nickname, phoneNumber, address, userType) => {
    try {
      const user = await this.userRepository.createUser(
        password,
        nickname,
        phoneNumber,
        address,
        userType
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

  findUser = async (userId) => {
    try {
      const user = await this.userRepository.findUser(userId);
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
