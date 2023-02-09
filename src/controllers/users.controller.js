const jwt = require("jsonwebtoken");
const UserService = require("../services/users.service");

class UsersController {
  userService = new UserService();

  signup = async (req, res, next) => {
    try {
      const userImage = req.file.path.replace("src/public", "");
      const { nickname, password, phoneNumber, address, userType } = req.body;
      // 포인트는 서비스에서
      // userType - 0 => 1000000P
      // userType - 1 => 0P
      const user = await this.userService.signup(
        userImage,
        nickname,
        password,
        phoneNumber,
        address,
        userType
      );
      res.status(201).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  // Login
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

  // Logout
  // jwt 쿠키 지워 주면된다.
  logout = async (req, res, next) => {
    try {
      if (req?.cookies?.jwt) {
        res.clearCookie("jwt");
        res.redirect("/");
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

  // Get user info
  // 유저에게 필요한 최소 정보를 준다.
  // 필요한 유저 정보만 바로 돌려준다.(service, repository 필요 X)
  findUserInfo = async (req, res, next) => {
    try {
      if (!req.cookies || !req.cookies.jwt) {
        res.status(404);
      }
      const token = req.cookies.jwt;
      const { userId: id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await this.userService.findUserInfo(id);
      const { nickname, point } = user;
      // const { nickname } = res.locals.user;
      // 에러 테스트 코드
      if (!nickname) {
        const error = new Error("로그인을 해주세요.");
        // error.value = "Additional value";
        // 닉네임이 없다 -> 비인증 상태로 간주
        error.status = 401;
        throw error;
      }
      res.status(200).send({ nickname, point });
    } catch (error) {
      next(error);
    }
  };

  // Get user
  findUser = async (req, res, next) => {
    try {
      const { nickname } = req.params;
      const user = await this.userService.findUser(nickname);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  // Update user
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

  // Delete user
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
