```javascript
// user.js
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Services, { foreignKey: "userId", as: "services" });
    }
  }

  User.init(
    {
      // attributes
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

// app.js
const db = require("./models");

async function findUserServices(userId) {
  const user = await db.User.findByPk(userId, {
    include: [
      {
        model: db.Services,
        as: "services",
      },
    ],
  });

  if (!user) {
    console.log("User not found!");
    return;
  }

  const services = user.services;
  console.log(services);
}
```
