const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// "/" 주소로 들어오면 무조건 chat_room.html을 보여줌 (index.html 무시)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/chat_room.html");
});

io.on("connection", (socket) => {
  socket.on("chat_msg", (msg) => {
    io.emit("chat_msg", msg); // 모든 사람에게 전달
  });
});

http.listen(process.env.PORT || 3000);
