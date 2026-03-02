const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let players = {};

io.on("connection", (socket) => {
  players[socket.id] = { x: 100, y: 100, color: "#" + Math.floor(Math.random()*16777215).toString(16) };
  io.emit("update", players);

  socket.on("move", (data) => {
    if (players[socket.id]) {
      players[socket.id].x += data.x;
      players[socket.id].y += data.y;
      io.emit("update", players);
    }
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("update", players);
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log("서버가 가동되었습니다!");
});
