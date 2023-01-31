class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  createUser = async (
    password,
    point,
    nickname,
    phoneNumber,
    address,
    userType
  ) => {
    try {
      const user = await this.userModel.create({
        password,
        point,
        nickname,
        phoneNumber,
        address,
        userType,
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

  findUser = async (userId) => {
    try {
      const user = await this.userModel.findByPk(userId);
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
