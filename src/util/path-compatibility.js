const os = require("os");

const pathCompatibility = (path) => {
  const myOs = os.platform();
  console.log({ myOs });
  if (myOs === "win32") {
    return path;
  }
  return path;
};

module.exports = { pathCompatibility };
