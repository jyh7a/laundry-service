const multer = require("multer");
const path = require("path");

const storage = (folder) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `src/public/${folder}`);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      // 한국어 처리
      cb(
        null,
        Buffer.from(
          path.basename(file.originalname, ext) + "-" + Date.now()
        ).toString("base64") + ext
      );
      // 한국어 미처리
      // cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
  });

const upload = (folder) => multer({ storage: storage(folder) });
module.exports = { upload };
