const express = require("express");
const http = require("http").createServer(express().use(express.static("."))); 
const io = require("socket.io")(http);

let players = {};

io.on("connection", (socket) => {
  players[socket.id] = { x: 250, y: 200, color: "blue" };
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

http.listen(process.env.PORT || 3000);
