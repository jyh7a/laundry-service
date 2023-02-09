### transaction

1. transaction example

```javascript
const { sequelize } = require("../models"); // import the sequelize object from your models file

async function createTransaction() {
  try {
    // start the transaction
    const transaction = await sequelize.transaction();

    // perform some operations on the transaction
    const user = await User.create(
      {
        firstName: "John",
        lastName: "Doe",
      },
      { transaction }
    );

    const task = await Task.create(
      {
        title: "Buy groceries",
        userId: user.id,
      },
      { transaction }
    );

    // commit the transaction
    await transaction.commit();

    return { user, task };
  } catch (error) {
    // handle any errors and rollback the transaction
    await transaction.rollback();
    throw error;
  }
}
```
