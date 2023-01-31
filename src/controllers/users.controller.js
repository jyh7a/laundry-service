const jwt = require("jsonwebtoken");
const UserService = require("../services/users.service");

class UsersController {
  userService = new UserService();

  signup = async (req, res, next) => {
    try {
      const { password, point, nickname, phoneNumber, address, userType } =
        req.body;
      const user = await this.userService.signup(
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
      const { nickname, password } = req.body;
      const user = await this.userService.login(nickname, password);
      if (user === 0) {
        res.status(400).send({ message: "실패" });
      } else {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
        res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 });
        res.status(200).send({ message: "성공" });
      }
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
  findUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await this.userService.findUser(userId);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  // Update user by id
  updateUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { name, email, password } = req.body;
      const updatedUser = await this.userService.updateUser(
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
  deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      await this.userService.deleteUser(userId);
      res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
