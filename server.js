const express = require("express");
const http = require("http").createServer(express().use(express.static("."))); 
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("누군가 입장함!");

  // 누군가 메시지를 보내면
  socket.on("chat message", (msg) => {
    // 모든 사람에게 그 메시지를 다시 뿌림
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("누군가 퇴장함");
  });
});

http.listen(process.env.PORT || 3000);
