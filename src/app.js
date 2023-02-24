const express = require("express");
// const app = express();
const path = require("path");

const cookieParser = require("cookie-parser");
const { app, server } = require("./util/socket");

// // http server를 socket.io server로 upgrade한다
// var server = require("http").createServer(app);
// // http server를 socket.io server로 upgrade한다
// var io = require("socket.io")(server);
// module.exports = { io };

const routes = require("./routes");
const pageRoutes = require("./routes/pages.routes");
const { logError } = require("./util/logger.util");
const { Model } = require("sequelize");

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/public")));
require("dotenv").config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", pageRoutes);
app.use("/api", [routes]);

// SOCKET TEST CODE START
// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
// io.on("connection", function (socket) {
//   // 접속한 클라이언트의 정보가 수신되면
//   socket.on("login", function (data) {
//     console.log(
//       "Client logged-in:\n name:" + data.name + "\n userid: " + data.userid
//     );

//     // socket에 클라이언트 정보를 저장한다
//     socket.name = data.name;
//     socket.userid = data.userid;

//     // 접속된 모든 클라이언트에게 메시지를 전송한다
//     io.emit("login", data.name);
//   });

//   // 클라이언트로부터의 메시지가 수신되면
//   socket.on("chat", function (data) {
//     console.log("Message from %s: %s", socket.name, data.msg);

//     var msg = {
//       from: {
//         name: socket.name,
//         userid: socket.userid,
//       },
//       msg: data.msg,
//     };

//     // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
//     socket.broadcast.emit("chat", msg);

//     // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
//     // socket.emit('s2c chat', msg);

//     // 접속된 모든 클라이언트에게 메시지를 전송한다
//     // io.emit('s2c chat', msg);

//     // 특정 클라이언트에게만 메시지를 전송한다
//     // io.to(id).emit('s2c chat', data);
//   });

//   // force client disconnect from server
//   socket.on("forceDisconnect", function () {
//     socket.disconnect();
//   });

//   socket.on("disconnect", function () {
//     console.log("user disconnected: " + socket.name);
//   });
// });
// SOCKET TEST CODE END

app.use(function (req, res, next) {
  // console.log("req.url: ", req.url);
  res.render("notfound");

  // 기존 코드
  // res.status(404).send("Sorry, that page doesn't exist!");
  next();
});

app.use((error, req, res, next) => {
  // test => findUserInfo
  // 로그인 후 유저페이지에서 에러발생 시켜보기
  logError(error);
  console.log("[error]: ", error);
  // res.status(error.status || 500);

  // 기존 코드
  res.status(error.status || 500).send({
    // code 10은 테스트 용으로 넣어둠
    code: 10,
    message: error.message || "처리되지 않은 에러 발생!",
    error,
  });
});

server.listen(process.env.PORT, () => {
  console.log(`http://127.0.0.1:${process.env.PORT}`);
});
