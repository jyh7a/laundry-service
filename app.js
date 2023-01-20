const express = require("express");
const cookieParser = require("cookie-parser");

const routes = require('./src/routes');

const app = express();
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", [routes]);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    code: 10,
    message: err.message || "처리되지 않은 에러 발생!",
    error: err
  });
});

app.listen(process.env.PORT, () => {
  console.log(`http://127.0.0.1:${process.env.PORT}`);
});
