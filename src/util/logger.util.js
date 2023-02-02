const fs = require("fs");
const { formattedDate } = require("../util/dateFormat.util");

const logError = (error) => {
  const date = formattedDate(new Date(), "%Y-%m-%d %H:%M:%S");
  const errorData = `[${date}]: ${error.stack} \n`;

  fs.appendFileSync("./src/logs/error.log", errorData, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = {
  logError,
};
