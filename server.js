const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// 기본 페이지 접속 시 index.html을 보여줌
app.use(express.static("."));

io.on("connection", (socket) => {
  console.log("새 유저 접속");

  // 유저가 'message'라는 이름으로 글을 보내면
  socket.on("message", (msg) => {
    // 접속한 모든 사람에게 그 글을 그대로 뿌림
    io.emit("message", msg);
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log("채팅 전용 서버 가동 중!");
});
