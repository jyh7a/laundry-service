const UserService = require("../services/users.service");

class UsersController {
  userService = new UserService();

  register = async (req, res, next) => {
    try {
      const { password, point, nickname, phoneNumber, address, userType } =
        req.body;
      const user = await this.userService.register(
        password,
        point,
        nickname,
        phoneNumber,
        address,
        userType
      );
      res.status(201).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  // Login a user
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      res.status(200).json({ data: token });
    } catch (error) {
      next(error);
    }
  };

  // Get all users
  findAllUser = async (req, res, next) => {
    try {
      const users = await this.userService.findAllUser();
      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  };

  // Get user by id
  findUserById = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await this.userService.findUserById(userId);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  // Update user by id
  updateUserById = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { name, email, password } = req.body;
      const updatedUser = await this.userService.updateUserById(
        userId,
        name,
        email,
        password
      );
      res.status(200).json({ data: updatedUser });
    } catch (error) {
      next(error);
    }
  };

  // Delete user by id
  deleteUserById = async (req, res, next) => {
    try {
      const { userId } = req.params;
      await this.userService.deleteUserById(userId);
      res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
