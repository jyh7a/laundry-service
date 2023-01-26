const UserRepository = require("../repositories/users.repository");
const { Users } = require("../models");

class UserService {
  userRepository = new UserRepository(Users);

  register = async (password, point, nickname, phoneNumber, address, userType) => {
    try {
      const user = await this.userRepository.createUser(
        password,
        point,
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
      const user = await this.userRepository.loginUser(username, password);
      return user;
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

  findUserById = async (userId) => {
    try {
      const user = await this.userRepository.findUserById(userId);
      return user;
    } catch (err) {
      throw err;
    }
  };

  updateUserById = async (userId, password, nickname, phoneNumber, address) => {
    try {
      const updatedUser = await this.userRepository.updateUserById(
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

  deleteUserById = async (userId) => {
    try {
      const deletedUser = await this.userRepository.deleteUserById(userId);
      return deletedUser;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = UserService;
